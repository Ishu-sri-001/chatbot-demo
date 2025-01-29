"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from "../firebase/config"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
  sendEmailVerification,
  sendPasswordResetEmail,
  type User,
} from "firebase/auth"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface UserRegistrationProps {
  nextStep: () => void
  updateUserData: (data: any) => void
}

export default function UserRegistration({ nextStep, updateUserData }: UserRegistrationProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(false)
  const [error, setError] = useState("")
  const [verificationSent, setVerificationSent] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const checkEmailExists = async (email: string) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email)
      return signInMethods.length > 0
    } catch (error) {
      console.error("Error checking email:", error)
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!isLogin) {
      // Sign Up Flow
      const emailExists = await checkEmailExists(email)
      if (emailExists) {
        setError("This email already exists. Please log in instead.")
        return
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await sendEmailVerification(userCredential.user)
        setVerificationSent(true)
        setUser(userCredential.user)
      } catch (error: any) {
        setError(error.message)
      }
    } else {
      // Login Flow
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        if (!userCredential.user.emailVerified) {
          setError("Please verify your email before logging in.")
          return
        }
        updateUserData({
          name: userCredential.user.displayName || name,
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        })
        nextStep()
      } catch (error: any) {
        setError("Invalid email or password")
      }
    }
  }

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      updateUserData({
        name: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid,
      })
      nextStep()
    } catch (error: any) {
      setError(error.message)
    }
  }

  const resendVerificationEmail = async () => {
    if (user) {
      try {
        await sendEmailVerification(user)
        setVerificationSent(true)
      } catch (error: any) {
        setError(error.message)
      }
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address.")
      return
    }
    try {
      await sendPasswordResetEmail(auth, email)
      setError("Password reset email sent. Please check your inbox.")
    } catch (error: any) {
      setError(error.message)
    }
  }

  if (verificationSent) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Verify Your Email</CardTitle>
        </CardHeader>
        <CardContent>
          <p>We&apos;ve sent a verification email to {email}. Please check your inbox and click the verification link.</p>
          <p>Once verified, please log in to continue.</p>
          <Button onClick={() => setVerificationSent(false)} className="mt-4">
            Return to Login
          </Button>
          <Button onClick={resendVerificationEmail} variant="outline" className="mt-2 w-full">
            Resend Verification Email
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isLogin ? "Login" : "User Registration"}</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required={!isLogin} />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isLogin && (
            <Button type="button" variant="link" onClick={handleForgotPassword} className="w-full text-left p-0">
              Forgot password?
            </Button>
          )}
          <Button type="submit" className="w-full">
            {isLogin ? "Login" : "Register"}
          </Button>
          <Button type="button" variant="link" onClick={() => setIsLogin(!isLogin)} className="w-full">
            {isLogin ? "Need an account? Sign up" : "Already have an account? Log in"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleGoogleSignIn} variant="outline" className="w-full">
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  )
}

