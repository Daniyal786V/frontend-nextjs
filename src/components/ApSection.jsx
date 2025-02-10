import { useState, useEffect } from "react"
import axios from "@/config/axios"
import AssignedPolicyCard from "@/components/ApCard"

const AssignedPoliciesSection = () => {
  const [assignedPolicies, setAssignedPolicies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAssignedPolicies = async () => {
      try {
        const user = await JSON.parse(localStorage.getItem("user"))
        if (!user || !user.Id) {
          throw new Error("User not found in local storage")
        }
        // console.log(user.Id)

        const response = await axios.get(`/assignments/user/${user.Id}`)
        setAssignedPolicies(response.data)
        // console.log(response.data , "Assigned policies")
      } catch (err) {
        console.error("Error fetching assigned policies:", err)
        setError("Failed to load assigned policies")
      } finally {
        setLoading(false)
      }
    }

    fetchAssignedPolicies()
  }, [])

  if (loading) {
    return <div className="text-center text-white">Loading assigned policies...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  if (assignedPolicies.length === 0) {
    return <div className="text-center text-white">No assigned policies found.</div>
  }

  return (
    <section className="py-12 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-white">Your Assigned Policies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignedPolicies.map((policy) => (
            <AssignedPolicyCard key={policy.PolicyId} policy={policy} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default AssignedPoliciesSection

