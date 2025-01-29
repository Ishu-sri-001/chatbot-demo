"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"


function DummyPageContent() {
  const searchParams = useSearchParams()
  const [url, setUrl] = useState("")

  useEffect(() => {
    const websiteUrl = searchParams.get("url")
    if (websiteUrl) {
      setUrl(websiteUrl)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-blue-500 text-white p-4 text-center">
        Chatbot not working as intended? Share feedback
      </div>
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">{url}</h1>
        <p>This is a dummy page representing the client&apos;s website.</p>
      </div>
      <div className="fixed bottom-4 right-4 w-64 h-96 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col">
        <div className="bg-blue-500 text-white p-2 rounded-t-lg">Chatbot</div>
        <div className="flex-grow p-2 overflow-y-auto">
          {/* Chatbot messages would go here */}
        </div>
        <div className="p-2 border-t">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>
  )
}


export default function DummyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
      </div>
    }>
      <DummyPageContent />
    </Suspense>
  )
}