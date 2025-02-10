import { useState, useEffect } from "react"
import { Clock, Shield, ChevronRight, X } from "lucide-react"
import Link from "next/link"
import axios from "@/config/axios"
import DynamicForm from "./DynamicForm"
import { motion, AnimatePresence } from "framer-motion"

const AssignedPolicyCard = ({ policy }) => {
  const [showClaimModal, setShowClaimModal] = useState(false)
  const [formLoading, setFormLoading] = useState(true)
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState([])
  const [error, setError] = useState(null)

  const handleRaiseClaim = (e) => {
    e.preventDefault()
    setShowClaimModal(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const questionsResponse = await axios.get(`/forms/questions/${policy.Category}?formType=claim`)
        // console.log("questions response", questionsResponse)
        if (questionsResponse.data.success) {
          setQuestions(questionsResponse.data.data)
        }
      } catch (err) {
        console.error("Error fetching questions:", err)
        setError("Failed to load questions")
      } finally {
        setLoading(false)
        setFormLoading(false)
      }
    }

    fetchData()
  }, [policy.Category])

  // const handleClaimSubmit = async (formData) => {
  //   console.log("formData", formData[5].answer)
  //   try {
  //     const user = await JSON.parse(localStorage.getItem("user"))
  //     if (!user || !user.Id) {
  //       throw new Error("User not found in local storage")
  //     }
  //     // Submit claim data to your API
  //     await axios.post("/claims/", {
  //       policyId: policy.PolicyId,
  //       userId: user.Id,
 
  //       description: formData[5].answer,
  //     })
  //     // Close modal and show success message
  //     setShowClaimModal(false)
  //     alert("Claim submitted successfully!")
  //   } catch (error) {
  //     console.log(error)
  //     console.error("Error submitting claim:", error)
  //     alert("Failed to submit claim. Please try again.", error.message)
  //   }
  // }


  const handleClaimSubmit = async (formData) => {
    // console.log("formData", formData[5].answer)
    try {
        const user = await JSON.parse(localStorage.getItem("user"))
        if (!user || !user.Id) {
            throw new Error("User not found in local storage")
        }

        // Submit claim data to your API
        const response = await axios.post("/claims/", {
            policyId: policy.PolicyId,
            userId: user.Id,
            description: formData[5].answer,
        });

        // Close modal and show success message
        setShowClaimModal(false)
        alert("Claim submitted successfully!")

    } catch (error) {
        // Get the error message from the response if it exists
        const errorMessage = error.response?.data?.message || "Failed to submit claim. Please try again.";
        
        // If the error message is an object (from your controller), convert it to string
        const displayMessage = typeof errorMessage === 'object' 
            ? JSON.stringify(errorMessage) 
            : errorMessage;

        console.error("Error submitting claim:", error);
        alert(displayMessage);
    }
}

  return (
    <div className="relative">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Link href={`/policy/${policy.Category}/${policy.PolicyId}`}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-6 ">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{policy.PolicyName}</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Assigned Policy</p>
                </div>
                <Shield className="h-8 w-8 text-blue-500" />
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Premium</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">₹{policy.Premium}/month</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Start Date</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {new Date(policy.StartDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    End Date: {new Date(policy.EndDate).toLocaleDateString()}
                  </span>
                </div>
                <ChevronRight className="h-6 w-6 text-gray-400" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      <button
        onClick={handleRaiseClaim}
        className="absolute top-4 right-4 ml-9 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
      >
        Raise Claim
      </button>

      <AnimatePresence>
        {showClaimModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Raise a Claim</h2>
                <button
                  onClick={() => setShowClaimModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              {formLoading ? (
                <p className="text-center text-gray-600 dark:text-gray-400">Loading claim form...</p>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : (
                <DynamicForm questions={questions} onSubmit={handleClaimSubmit} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AssignedPolicyCard

