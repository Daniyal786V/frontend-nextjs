import { Heart, Shield, ShieldCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"



export function   InsuranceCard({ title, icon, discount, href }) {
  return (
    <div>
      <Link
      href={href}
      className="group relative flex flex-col items-center p-4 bg-white  rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      {discount && (
        <span className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{discount}</span>
      )}
      <div className="w-16 flex items-center h-16 mb-3">
       <ShieldCheck className="h-10 w-12 text-blue-500"/> 
      </div>
      <h3 className="text-sm font-medium text-center dark:text-gray-900  text-gray-100 group-hover:text-blue-600">
        {title}
      </h3>
    </Link>
    </div>
    
  )
}

