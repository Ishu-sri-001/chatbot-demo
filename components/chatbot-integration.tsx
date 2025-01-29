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
    const websiteUrl = localStorage.getItem("websiteUrl") || "https://example.com"
    window.open(`/dummy-page?url=${encodeURIComponent(websiteUrl)}`, "_blank")
  }
  
  

  const handleIntegrate = () => {
    // Simulate integration process
    setTimeout(() => setIntegrationSuccess(true), 2000)
  }

  return (
    <Card className="border border-primary">
      <CardHeader>
        <CardTitle className="mx-auto font-inter text-xl lg:text-2xl mb-10 font-bold">Chatbot Integration & Testing</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-7 mb-5">
          <Button onClick={handleTestChatbot} className="w-full text-lg font-inter border py-5 hover:bg-white hover:text-black hover:font-bold hover:border-primary">
            Test Chatbot
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full text-lg font-inter border py-5 hover:bg-white hover:text-black hover:font-bold hover:border-primary">Integrate on your website</Button>
            </DialogTrigger>
            <DialogContent className="px-2 mx-1 lg:mx-0">
              <DialogHeader>
                <DialogTitle className="text-center mb-8 lg:text-2xl">Integration Options</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="manual">
                <TabsList className="grid w-full grid-cols-2 space-x-2 mb-5">
                  <TabsTrigger value="manual" className="border border-primary  data-[state=active]:bg-black data-[state=active]:text-white">Manual Integration</TabsTrigger>
                  <TabsTrigger value="email" className="border border-primary  data-[state=active]:bg-black data-[state=active]:text-white">Email Instructions</TabsTrigger>
                </TabsList>
                <TabsContent value="manual">
                  <p className="mt-5 pl-4">Add the following code to your website&apos;s &lt;head&gt; tag:</p>
                  <pre className="bg-gray-100 font-semibold p-2 mt-2 rounded">
                    {`<script src="https://chatbot-integration.js"></script>`}
                  </pre>
                </TabsContent>
                <TabsContent value="email">
                  <p className="mt-5 pt-7 pb-5 pl-4">We&apos;ve sent integration instructions to your developer&apos;s email.</p>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
          <Button onClick={nextStep} className="w-full text-lg font-inter border py-5 hover:bg-white hover:text-black hover:font-bold hover:border-primary">
            Test Integration
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={prevStep} variant="outline" className="border border-primary hover:bg-primary hover:text-white">
          Back
        </Button>
        {/* <Button onClick={nextStep} disabled={!integrationSuccess}>
          Next
        </Button> */}
      </CardFooter>
    </Card>
  )
}

