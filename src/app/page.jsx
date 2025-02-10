// this code was working fine but without adding the functionality of storing the expiry to invalidate user form local storage after the tokrn was expired 

"use client"
import { useState, useEffect } from "react"
import { NavBar } from "@/components/Navbar"
import { HeroSection } from "@/components/hero-section"
import { InsuranceCard } from "@/components/insurance-card"
import AssignedPoliciesSection from "@/components/ApSection"
import CustomerSupportChat from "@/components/Chat"


const insuranceProducts = [
  {
    title: "Term Life Insurance",
    discount: "Upto 30% Discount",
    href: "/policy/termLife",
  },
  {
    title: "Health Insurance",
    discount: "FREE Home Visit",
    href: "/policy/health",
  },
  {
    title: "Investment Plans",
    discount: "In-Built Life Cover",
    href: "/policy/investmentPlans",
  },
  {
    title: "Car Insurance",
    discount: "Upto 91% Discount",
    href: "/policy/carInsurance",
  },
  {
    title: "2 Wheeler Insurance",
    href: "/policy/twoWheeler",
  },
  {
    title: "Family Health Insurance",
    discount: "Upto 25% Discount",
    href: "/policy/familyHealth",
  },
  {
    title: "Travel Insurance",
    href: "/policy/travelInsurance",
  },
  {
    title: "Home Insurance",
    href: "/policy/homeInsurance",
  },
]

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserID] = useState("")

  useEffect(() => {
    // Check if user token exists in localStorage
    const token = localStorage.getItem('token')
    const user =  JSON.parse(localStorage.getItem("user"))
    setUserID(user?.Id) // get user id from local storage when component mounts



    setIsLoggedIn(!!token)
  }, [])
console.log(userId)
  return (
    <main className="dark">
      {/* <NavBar /> */}
      <HeroSection />
      <section className="py-12 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-white">Insurance Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {insuranceProducts.map((product) => (
              <InsuranceCard
                key={product.title}
                title={product.title}
                icon={product.icon}
                discount={product.discount}
                href={product.href}
              />
            ))}
          </div>
        </div>
      </section>
      {isLoggedIn && <AssignedPoliciesSection />}
      <CustomerSupportChat userId={userId}/>
    </main>
  )
}

// "use client"
// import { useState, useEffect } from "react"
// import { NavBar } from "@/components/Navbar"
// import { HeroSection } from "@/components/hero-section"
// import { InsuranceCard } from "@/components/insurance-card"
// import AssignedPoliciesSection from "@/components/ApSection"

// const insuranceProducts = [
//   {
//     title: "Term Life Insurance",
//     discount: "Upto 30% Discount",
//     href: "/policy/termLife",
//   },
//   {
//     title: "Health Insurance",
//     discount: "FREE Home Visit",
//     href: "/policy/healthInsurance",
//   },
//   {
//     title: "Investment Plans",
//     discount: "In-Built Life Cover",
//     href: "/policy/investmentPlans",
//   },
//   {
//     title: "Car Insurance",
//     discount: "Upto 91% Discount",
//     href: "/policy/carInsurance",
//   },
//   {
//     title: "2 Wheeler Insurance",
//     href: "/policy/twoWheeler",
//   },
//   {
//     title: "Family Health Insurance",
//     discount: "Upto 25% Discount",
//     href: "/policy/familyHealth",
//   },
//   {
//     title: "Travel Insurance",
//     href: "/policy/travelInsurance",
//   },
//   {
//     title: "Home Insurance",
//     href: "/policy/homeInsurance",
//   },
// ]

// // Function to retrieve data from localStorage with expiry check
// const getWithExpiry = (key) => {
//   const itemStr = localStorage.getItem(key)
//   if (!itemStr) {
//     return null
//   }
//   console.log(itemStr)
//   const item = JSON.parse(itemStr)
//   console.log(item)
//   const now = new Date()
//   if (now.getTime() > item.expiry) {
//     localStorage.removeItem(key) // Clear expired item
//     return null
//   }
//   return item.value
// }

// export default function Home() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false)

//   useEffect(() => {
//     // Check if user token exists and is not expired
//     const token = getWithExpiry('token')
//     setIsLoggedIn(!!token)
//   }, [])

//   return (
//     <main className="dark">
//       <NavBar />
//       <HeroSection />
//       <section className="py-12 dark:bg-gray-800">
//         <div className="container mx-auto px-4">
//           <h2 className="text-2xl font-bold mb-6 text-white">Insurance Products</h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {insuranceProducts.map((product) => (
//               <InsuranceCard
//                 key={product.title}
//                 title={product.title}
//                 icon={product.icon}
//                 discount={product.discount}
//                 href={product.href}
//               />
//             ))}
//           </div>
//         </div>
//       </section>
//       {isLoggedIn && <AssignedPoliciesSection />}
//     </main>
//   )
// }