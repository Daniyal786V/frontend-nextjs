"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "@/config/axios"
import { ClipboardList, AlertCircle, Loader2 } from "lucide-react"


export default function UserClaimsPage() {
  const params = useParams()
  const [claims, setClaims] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Define async function inside useEffect
    const fetchClaims = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/claims/${params.userId}`)
        console.log(response.data.data)
        setClaims(response.data.data)
      } catch (err) {
        console.error("Error fetching claims:", err)
        setError("Failed to load claims. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    // Call the async function
    if (params.userId) {
      fetchClaims()
    }

    // No return value needed if no cleanup is required
  }, [params.userId])
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-red-500 flex items-center">
          <AlertCircle className="w-6 h-6 mr-2" />
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 flex items-center">
          <ClipboardList className="w-8 h-8 mr-2 text-blue-500" />
          Your Claims
        </h1>
        {claims.length === 0 ? (
          <p className="text-gray-400 text-center">No claims found.</p>
        ) : (
          <div className="space-y-6">
            {claims.map((claim) => (
              <div key={claim.id} className="bg-gray-800 rounded-lg p-6 shadow-md">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-white">Policy ID : {claim.PolicyId}</h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      claim.Status === "Approved"
                        ? "bg-green-200 text-green-800"
                        : claim.status === "Rejected"
                          ? "bg-red-200 text-red-800"
                          : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {claim.Status}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4"> 
                  <div>
                    <p className="text-sm text-gray-400">Claim Amount</p>
                    <p className="text-lg font-medium text-white">₹50,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Date Submitted</p>
                    <p className="text-lg font-medium text-white">
                      {new Date(claim.CreatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

