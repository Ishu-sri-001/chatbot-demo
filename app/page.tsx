"use client"

import { useState } from "react"
import UserRegistration from "./components/user-registration"
import OrganizationSetup from "./components/organization-setup"
import ChatbotIntegration from "./components/chatbot-integration"
import Success from "./components/success"
import { Progress } from "@/components/ui/progress"

export default function Home() {
  const [step, setStep] = useState(1)
  const [userData, setUserData] = useState({})
  const [orgData, setOrgData] = useState({})

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const updateUserData = (data: any) => setUserData({ ...userData, ...data })
  const updateOrgData = (data: any) => setOrgData({ ...orgData, ...data })

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-8">
        <Progress value={(step / 4) * 100} className="mb-8" />
        {step === 1 && <UserRegistration nextStep={nextStep} updateUserData={updateUserData} />}
        {step === 2 && <OrganizationSetup nextStep={nextStep} prevStep={prevStep} updateOrgData={updateOrgData} />}
        {step === 3 && <ChatbotIntegration nextStep={nextStep} prevStep={prevStep} />}
        {step === 4 && <Success />}
      </div>
    </div>
  )
}

