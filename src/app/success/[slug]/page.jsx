'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { CheckCircle, Home, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Dynamically import confetti
const Confetti = dynamic(() => import('canvas-confetti'), { ssr: false })

export default function ThankYouPage({ params }) {
  const router = useRouter()
  const [policyName, setPolicyName] = useState('')

  useEffect(() => {
    // Trigger confetti animation on client-side only
    if (typeof window !== 'undefined') {
      Confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }

    // Decode the policy name from the route parameter
    if (params.slug) {
      setPolicyName(decodeURIComponent(params.slug))
    }
  }, [params.slug])

  const handleViewPolicy = () => {
    router.push('/policy-details')
  }

  const handleBackToHome = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-md w-full px-6 py-8 bg-gray-800 rounded-lg shadow-xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <CheckCircle className="w-20 h-20 mx-auto text-green-500 mb-6" />
          <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
          <p className="text-xl mb-6">
            Your policy {policyName && <span className="font-semibold">{policyName}</span>} has been successfully purchased.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-4"
        >
          <p className="text-gray-300 text-center mb-6">
            We've sent a confirmation email with all the details. You can also view your policy information in your account dashboard.
          </p>

          <div className="flex flex-col space-y-4">
            <Button
              onClick={handleViewPolicy}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <FileText className="w-5 h-5 mr-2" />
              View Policy Details
            </Button>
            <Button
              onClick={handleBackToHome}
              variant="outline"
              className="w-full dark:bg-slate-200 text-black hover:text-blue-800"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}