"use client"

import { useState } from "react"
import UserRegistration from "../components/user-registration"
import OrganizationSetup from "../components/organization-setup"
import ChatbotIntegration from "../components/chatbot-integration"
import Success from "../components/success"

export default function Home() {
  const [step, setStep] = useState(1)
  const [userData, setUserData] = useState({})
  const [orgData, setOrgData] = useState({})

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const updateUserData = (data: any) => setUserData({ ...userData, ...data })
  const updateOrgData = (data: any) => {
    setOrgData({ ...orgData, ...data })
    if (data.websiteUrl) {
      localStorage.setItem("websiteUrl", data.websiteUrl)
    }
  }

  const totalSteps = 3

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-0 lg:p-4 pt-2">
      <div className="w-full max-w-4xl rounded-lg shadow-xl px-8 py-2">
        {step < 4 && (
          <div className="text-center mb-2 text-lg font-semibold">
            Step {step} of {totalSteps}
          </div>
        )}
        {step === 1 && <UserRegistration nextStep={nextStep} updateUserData={updateUserData} />}
        {step === 2 && <OrganizationSetup nextStep={nextStep} prevStep={prevStep} updateOrgData={updateOrgData} />}
        {step === 3 && <ChatbotIntegration nextStep={nextStep} prevStep={prevStep} />}
        {step === 4 && <Success />}
      </div>
    </div>
  )
}

