"use client"

import { useRouter } from "next/navigation"
import { Shield, Clock, Info, ChevronRight } from "lucide-react"

const Card = ({ policy }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/buyPolicy/${policy.PolicyId}`)
  }

  return (
    <div
      onClick={handleClick}
      className=" bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      {/* Header with badge */}
      <div className="relative p-4">
        <div className="absolute top-0 left-0 bg-blue-900  text-blue-300 text-xs px-3 py-1 rounded-br-lg">
          Income proof not required
        </div>

        <div className="mt-6">
          {/* Company and Policy Name */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">{policy.PolicyName}</h3>
              <p className="text-sm text-blue-400">Premium Insurance</p>
            </div>
            <button className="text-gray-400 hover:text-gray-200">
              <Shield className="h-6 w-6" />
            </button>
          </div>

          {/* Coverage Details */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Life Cover</p>
              <p className="text-lg font-semibold text-white">₹{policy.Coverage} Cr</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Policy Duration</p>
              <p className="text-lg font-semibold text-white">{policy.Duration} Yrs</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Cover till age</p>
              <p className="text-lg font-semibold text-white">60 Yrs</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Claim settled</p>
              <p className="text-lg font-semibold text-white">99.2%</p>
              <Info className="inline-block h-4 w-4 text-gray-400 ml-1" />
            </div>
          </div>

          {/* Additional Features */}
          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">2 Free Add-ons</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-white mr-2">₹{policy.Premium}/month</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Discount Badge */}
          {policy.Discount && (
            <div className="mt-2">
              <span className="inline-flex items-center text-sm text-green-600 dark:text-green-400">
                <Shield className="h-4 w-4 mr-1" />
                {policy.Discount}% discount included
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card

