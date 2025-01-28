"use client"

import { useState } from "react"
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
  fetchSignInMethodsForEmail 
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
        updateUserData({ name, email, uid: userCredential.user.uid })
        nextStep()
      } catch (error: any) {
        setError(error.message)
      }
    } else {
      // Login Flow
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        updateUserData({ 
          name: userCredential.user.displayName || name, 
          email: userCredential.user.email, 
          uid: userCredential.user.uid 
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
        uid: result.user.uid 
      })
      nextStep()
    } catch (error: any) {
      setError(error.message)
    }
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
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required={!isLogin} 
              />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
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
          <Button type="submit" className="w-full">
            {isLogin ? "Login" : "Register"}
          </Button>
          <Button 
            type="button" 
            variant="link" 
            onClick={() => setIsLogin(!isLogin)} 
            className="w-full"
          >
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