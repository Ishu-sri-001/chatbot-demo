"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa"

export default function Success() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Setup Complete!</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="py-10">
          <h2 className="text-2xl font-bold mb-4">🎉 Congratulations! 🎉</h2>
          <p className="text-lg mb-6">Your chatbot has been successfully integrated.</p>
        </div>
        <div className="space-y-4">
          <Button className="w-full">Explore Admin Panel</Button>
          <Button className="w-full" variant="outline">
            Start talking to your chatbot
          </Button>
        </div>
        <div className="mt-8">
          <p className="mb-2">Share your success:</p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="icon">
              <FaTwitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <FaFacebook className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <FaLinkedin className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

