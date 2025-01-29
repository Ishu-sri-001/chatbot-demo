"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface ChatbotIntegrationProps {
  nextStep: () => void
  prevStep: () => void
}

export default function ChatbotIntegration({ nextStep, prevStep }: ChatbotIntegrationProps) {
  const [integrationSuccess, setIntegrationSuccess] = useState(false)

  const handleTestChatbot = () => {
    window.open("https://example.com", "_blank")
  }

  const handleIntegrate = () => {
    // Simulate integration process
    setTimeout(() => setIntegrationSuccess(true), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chatbot Integration & Testing</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={handleTestChatbot} className="w-full">
            Test Chatbot
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">Integrate on your website</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Integration Options</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="manual">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="manual">Manual Integration</TabsTrigger>
                  <TabsTrigger value="email">Email Instructions</TabsTrigger>
                </TabsList>
                <TabsContent value="manual">
                  <p className="mt-2">Add the following code to your website&apos;s &lt;head&gt; tag:</p>
                  <pre className="bg-gray-100 p-2 mt-2 rounded">
                    {`<script src="https://chatbot-integration.js"></script>`}
                  </pre>
                </TabsContent>
                <TabsContent value="email">
                  <p className="mt-2">We&apos;ve sent integration instructions to your developer&apos;s email.</p>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
          <Button onClick={handleIntegrate} className="w-full">
            Test Integration
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={prevStep} variant="outline">
          Back
        </Button>
        <Button onClick={nextStep} disabled={!integrationSuccess}>
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

