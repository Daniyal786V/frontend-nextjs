

// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { Heart, Shield, Clock, Info, User, Mail, Coins, Calendar } from "lucide-react"
// import axios from "@/config/axios"

// export default function BuyPolicyPage({ params }) {
//   const [policy, setPolicy] = useState(null)
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const router = useRouter()

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!`${params.id}`) return

//       try {
//         setLoading(true)
//         const user = await JSON.parse(localStorage.getItem("user"))
//         const policyResponse = await axios.get(`/policy/getPolicyById/${params.id}`)

//         setPolicy(policyResponse.data)
//         setUser(user)
//       } catch (err) {
//         console.error("Error fetching data:", err)
//         setError("Failed to load policy or user details")
//         if (err.response && err.response.status === 401) {
//           router.push("/login")
//         }
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [])

//   const handleBuyNow = async () => {
//     try {
//       const token = localStorage.getItem("token")
//       await axios.post(`/assignments/assign`, { userId: user.Id, policyId: policy.PolicyId })
//       router.push(`/success/${policy.PolicyName}`)
//     } catch (err) {
//       console.log("Error purchasing policy:", err)
//       alert(err.response.data.message)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-900">
//         <div className="text-xl text-white">Loading...</div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-900">
//         <div className="text-red-500">{error}</div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto space-y-8">
//         <h1 className="text-3xl font-bold text-center text-white mb-12">Review and Purchase Policy</h1>

//         <div className="grid md:grid-cols-2 gap-8">
//           {/* Policy Details Card */}
//           <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
//             <div className="p-6">
//               {policy && (
//                 <>
//                   <div className="flex items-center justify-between mb-6">
//                     <div>
//                       <h2 className="text-2xl font-bold text-white">{policy.PolicyName}</h2>
//                       <p className="text-blue-400">Premium Insurance</p>
//                     </div>
//                     <Shield className="h-12 w-12 text-blue-500" />
//                   </div>

//                   <div className="space-y-6">
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="bg-gray-700 rounded-lg p-4">
//                         <div className="flex items-center gap-2 mb-2">
//                           <Coins className="h-5 w-5 text-blue-400" />
//                           <span className="text-gray-300">Premium</span>
//                         </div>
//                         <p className="text-2xl font-bold text-white">${policy.Premium}</p>
//                       </div>
//                       <div className="bg-gray-700 rounded-lg p-4">
//                         <div className="flex items-center gap-2 mb-2">
//                           <Clock className="h-5 w-5 text-blue-400" />
//                           <span className="text-gray-300">Coverage Period</span>
//                         </div>
//                         <p className="text-2xl font-bold text-white">{policy.Coverage}</p>
//                       </div>
//                     </div>

//                     <div className="bg-gray-700 rounded-lg p-4">
//                       <div className="flex items-center gap-2 mb-2">
//                         <Info className="h-5 w-5 text-blue-400" />
//                         <span className="text-gray-300">Description</span>
//                       </div>
//                       <p className="text-white">{policy.Description}</p>
//                     </div>

//                     <div className="bg-blue-600/10 border border-blue-500/20 rounded-lg p-4">
//                       <div className="flex items-center gap-2">
//                         <Heart className="h-5 w-5 text-blue-400" />
//                         <span className="text-blue-400">Special Benefits Included</span>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* User Details Card */}
//           <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
//             <div className="p-6">
//               {user && (
//                 <>
//                   <div className="flex items-center justify-between mb-6">
//                     <div>
//                       <h2 className="text-2xl font-bold text-white">User Details</h2>
//                       <p className="text-blue-400">Policy Holder Information</p>
//                     </div>
//                     <User className="h-12 w-12 text-blue-500" />
//                   </div>

//                   <div className="space-y-4">
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="bg-gray-700 rounded-lg p-4">
//                         <div className="flex items-center gap-2 mb-2">
//                           <User className="h-5 w-5 text-blue-400" />
//                           <span className="text-gray-300">Name</span>
//                         </div>
//                         <p className="text-xl font-semibold text-white">{user?.Name}</p>
//                       </div>
//                       <div className="bg-gray-700 rounded-lg p-4">
//                         <div className="flex items-center gap-2 mb-2">
//                           <Mail className="h-5 w-5 text-blue-400" />
//                           <span className="text-gray-300">Email</span>
//                         </div>
//                         <p className="text-xl font-semibold text-white">{user?.Email}</p>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="bg-gray-700 rounded-lg p-4">
//                         <div className="flex items-center gap-2 mb-2">
//                           <Coins className="h-5 w-5 text-blue-400" />
//                           <span className="text-gray-300">Income</span>
//                         </div>
//                         <p className="text-xl font-semibold text-white">${user?.Income}</p>
//                       </div>
//                       <div className="bg-gray-700 rounded-lg p-4">
//                         <div className="flex items-center gap-2 mb-2">
//                           <Calendar className="h-5 w-5 text-blue-400" />
//                           <span className="text-gray-300">Age</span>
//                         </div>
//                         <p className="text-xl font-semibold text-white">{user?.Age} years</p>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Action Button */}
//         <div className="flex justify-center mt-8">
//           <button
//             onClick={handleBuyNow}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
//           >
//             Purchase Policy
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Heart, Shield, Clock, Info, User, Mail, Coins, Calendar } from "lucide-react"
import axios from "@/config/axios"
import DynamicForm from "@/components/DynamicForm"
import { Button } from "@/components/ui/button"

export default function BuyPolicyPage({ params: paramsPromise }) {
  const [params, setParams] = useState(null)
  const [policy, setPolicy] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [questions, setQuestions] = useState([])
  const [formLoading, setFormLoading] = useState(true)
  const [formSubmitting, setFormSubmitting] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const fetchParams = async () => {
      try {
        const resolvedParams = await paramsPromise
        setParams(resolvedParams)
      } catch (err) {
        console.error("Failed to fetch params:", err)
        setError("Failed to load parameters")
      }
    }

    fetchParams()
  }, [paramsPromise])

  useEffect(() => {
    const fetchData = async () => {
      if (!params || !params.id) return

      try {
        setLoading(true)
        const user = await JSON.parse(localStorage.getItem("user"))
        const policyResponse = await axios.get(`/policy/getPolicyById/${params.id}`)
        setPolicy(policyResponse.data)
        setUser(user)

        // Fetch questions for the dynamic form
        const questionsResponse = await axios.get(`/forms/questions/${policyResponse.data.Category}?formType=policy`)
        if (questionsResponse.data.success) {
          setQuestions(questionsResponse.data.data)
        }
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load policy or user details")
        if (err.response && err.response.status === 401) {
          router.push("/login")
        }
      } finally {
        setLoading(false)
        setFormLoading(false)
      }
    }

    fetchData()
  }, [params, router])
  
// console.log(questions)
  const handleBuyNow = async () => {
    try {
      const token = localStorage.getItem("token")
      await axios.post(`/assignments/assign`, { userId: user.Id, policyId: policy.PolicyId })
      router.push(`/success/${policy.PolicyName}`)
    } catch (err) {
      console.log("Error purchasing policy:", err)
      alert(err.response.data.message)
    }
  }

  const handleFormSubmit = async (formData) => {
    // console.log("category:", policy.Category
    // )
    // console.log("fporm data", formData);
    
    // e.preventDefault();

    try {
      const response = await axios.post("/forms/submit", {
        categoryName: policy.Category,
        userId: user.Id,
        responses: formData,
      })

      if (response.data.success) {
        console.log("Form submitted successfully:", response.data)
        setFormSubmitting(false)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Failed to submit form. Please try again.")
    }
  }

  if (loading || formLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-xl text-white">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-white mb-12">Review and Purchase Policy</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Policy Details Card */}
          <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="p-6">
              {policy && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white">{policy.PolicyName}</h2>
                      <p className="text-blue-400">Premium Insurance</p>
                    </div>
                    <Shield className="h-12 w-12 text-blue-500" />
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Coins className="h-5 w-5 text-blue-400" />
                          <span className="text-gray-300">Premium</span>
                        </div>
                        <p className="text-2xl font-bold text-white">${policy.Premium}</p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-5 w-5 text-blue-400" />
                          <span className="text-gray-300">Coverage Period</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{policy.Coverage}</p>
                      </div>
                    </div>

                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="h-5 w-5 text-blue-400" />
                        <span className="text-gray-300">Description</span>
                      </div>
                      <p className="text-white">{policy.Description}</p>
                    </div>

                    <div className="bg-blue-600/10 border border-blue-500/20 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-blue-400" />
                        <span className="text-blue-400">Special Benefits Included</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* User Details Card */}
          <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="p-6">
              {user && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white">User Details</h2>
                      <p className="text-blue-400">Policy Holder Information</p>
                    </div>
                    <User className="h-12 w-12 text-blue-500" />
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-5 w-5 text-blue-400" />
                          <span className="text-gray-300">Name</span>
                        </div>
                        <p className="text-xl font-semibold text-white">{user?.Name}</p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Mail className="h-5 w-5 text-blue-400" />
                          <span className="text-gray-300">Email</span>
                        </div>
                        <p className="text-xl font-semibold text-white">{user?.Email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Coins className="h-5 w-5 text-blue-400" />
                          <span className="text-gray-300">Income</span>
                        </div>
                        <p className="text-xl font-semibold text-white">${user?.Income}</p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-5 w-5 text-blue-400" />
                          <span className="text-gray-300">Age</span>
                        </div>
                        <p className="text-xl font-semibold text-white">{user?.Age} years</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Form Section */}
        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden p-6">
          <h2 className="text-2xl font-bold text-white mb-6">{policy?.categoryName} Insurance Form</h2>
          <DynamicForm questions={questions} onSubmit={(data)=>{
            console.log("data here", data);
            
            handleFormSubmit(data)}} />
        </div>

        {/* Action Button */}
        {!formSubmitting && 
        (<div className="flex justify-center mt-8">
          <Button
            onClick={handleBuyNow}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold w-1/2  px-12  text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          >
            Purchase Policy
          </Button>
        </div>)
        }
        
      </div>
    </div>
  )
}
