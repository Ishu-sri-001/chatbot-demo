// "use client"

// import { Suspense } from "react"
// import { useSearchParams } from "next/navigation"
// import { useEffect, useState } from "react"
// import { IoMdSend } from "react-icons/io";


// function DummyPageContent() {
//   const searchParams = useSearchParams()
//   const [url, setUrl] = useState("")

//   useEffect(() => {
//     const websiteUrl = searchParams.get("url")
//     if (websiteUrl) {
//       setUrl(websiteUrl)
//     }
//   }, [searchParams])

//   return (
//     <div className="min-h-screen flex flex-col">
//       <div className="bg-primary text-white p-4 text-center ">
//         <p className="hover:underline hover:">Chatbot not working as intended? Share feedback</p>
//       </div>
//       <div className="flex-grow p-4">
//         <h1 className="text-2xl font-bold mb-4">{url}</h1>
//         <p>This is a dummy page representing the client&apos;s website.</p>
//       </div>
//       <div className="fixed bottom-4 right-4 w-64 h-96 bg-white border border-primary rounded-lg shadow-lg flex flex-col">
//         <div className="bg-primary text-white p-2 rounded-t-lg">Chatbot</div>
//         <div className="flex-grow p-2 overflow-y-auto">
//           <div className="mb-2">
//             <div className="bg-zinc-500 text-white p-2 rounded-lg inline-block">Hello! How can I assist you today?</div>
//           </div>
//           <div className="mb-2 text-right">
//             <div className="bg-gray-200 border border-primary text-gray-800 p-2 rounded-lg inline-block">
//               I have a question about your services.
//             </div>
//           </div>
//           <div className="mb-2">
//             <div className="bg-zinc-500 text-white p-2 rounded-lg inline-block">
//               Of course! I'd be happy to help. What would you like to know about our services?
//             </div>
//           </div>
//         </div>
//         <div className="p-2 border-t">
//           <div className="relative w-full">
//             <input type="text" placeholder="Type a message..." className="w-full p-2 pr-10 border border-primary rounded" />
//                 <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
//                   <IoMdSend />
//                 </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


// export default function DummyPage() {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
//       </div>
//     }>
//       <DummyPageContent />
//     </Suspense>
//   )
// }

"use client"

import { Suspense, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { IoMdSend } from "react-icons/io"

function DummyPageContent() {
  const searchParams = useSearchParams()
  const [url, setUrl] = useState("")
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", isUser: false },
    { text: "I have a question about your services.", isUser: true },
    { text: "Of course! I'd be happy to help. What would you like to know about our services?", isUser: false },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const websiteUrl = searchParams.get("url")
    if (websiteUrl) {
      setUrl(websiteUrl)
    }
  }, [searchParams])

  useEffect(() => {
    scrollToBottom()
  }, []) //Removed unnecessary dependency: messages

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { text: inputMessage, isUser: true }])
      setInputMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-primary text-white p-4 text-center ">
        <p className="hover:underline hover:">Chatbot not working as intended? Share feedback</p>
      </div>
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">{url}</h1>
        <p>This is a dummy page representing the client&apos;s website.</p>
      </div>
      <div className="fixed bottom-4 right-4 w-48 h-80 lg:w-64 lg:h-96 bg-white border border-primary rounded-lg shadow-lg flex flex-col">
        <div className="bg-primary text-white p-2 rounded-t-lg">Chatbot</div>
        <div className="flex-grow p-2 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className={`mb-2 ${message.isUser ? "text-right" : ""}`}>
              <div
                className={`p-2 rounded-lg inline-block text-sm lg:text-base ${
                  message.isUser ? "bg-gray-200 border border-primary text-gray-800" : "bg-zinc-700 text-white"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-2 border-t">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 pr-10 border border-primary rounded"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={handleSendMessage}
            >
              <IoMdSend />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DummyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
        </div>
      }
    >
      <DummyPageContent />
    </Suspense>
  )
}

