// "use client"
 
// import Link from "next/link"
// import Image from "next/image"
// import { ChevronDown, Phone } from "lucide-react"
// import { Button } from "@/components/ui/button"

// export function NavBar() {
//   return (
//     <header className="border-b border-gray-800 dark:bg-gray-900">
//       <nav className="container flex h-16 items-center justify-between dark:text-gray-100">
//         <Link href="/" className="flex items-center space-x-2 p-5">
//           <Image
//             src={`/logo.webp`}
//             alt="PolicyBazaar Logo"
//             width={180}
//             height={40}
//             className="h-10 w-auto"
//           />
//         </Link>

//         <div className="flex items-center space-x-6">
//           <div className="flex items-center space-x-4">
//             <Link
//               href="#"
//               className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
//             >
//               Insurance Products
//               <ChevronDown className="ml-1 h-4 w-4" />
//             </Link>
//             <Link
//               href="#"
//               className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
//             >
//               Renew Your Policy
//               <ChevronDown className="ml-1 h-4 w-4" />
//             </Link>
//             <Link
//               href="#"
//               className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
//             >
//               Claim
//               <ChevronDown className="ml-1 h-4 w-4" />
//             </Link>
//             <Link
//               href="#"
//               className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
//             >
//               Support
//               <ChevronDown className="ml-1 h-4 w-4" />
//             </Link>
//           </div>

//           <div className="flex items-center space-x-4">
//             <Button variant="outline" className="flex items-center dark:border-gray-700 dark:text-gray-300">
//               <Phone className="mr-2 h-4 w-4" />
//               Talk to Expert
//             </Button>
//             <Link
//               href="/login"
//             >
//                         <Button className="dark:bg-blue-600 dark:hover:bg-blue-700">Sign in</Button>

//             </Link>
//           </div>
//         </div>
//       </nav>
//     </header>
//   )
// }
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, CircleStop, CircleX, HandHeartIcon, Phone, TriangleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "@/config/axios";

export function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showChat, setShowChat] = useState(false); // State to control chat visibility
  const router = useRouter();

  // useEffect(() => {
  //   // Check localStorage on component mount
  //   const token = localStorage.getItem('token');
  //   const userData = localStorage.getItem('user');

  //   if (token && userData) {
  //     setIsLoggedIn(true);
  //     setUser(JSON.parse(userData));
  //   }
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    const expiry = localStorage.getItem("expiry");
  
    if (token && userData && expiry) {
      const now = new Date().getTime();
  
      if (now > parseInt(expiry)) {
        handleLogout(); // Logout if expired
      } else {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      }
    }
  }, []);
  

  const handleLogout = async () => {
    try {
      await axios.post("users/logout");

      // Remove token and user from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem("expiry");


      setIsLoggedIn(false);
      setUser(null);

      window.location.reload();
      router.refresh("/");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleChat = () => {
    setShowChat(!showChat); // Toggle chat visibility
  };

  return (
    <header className="border-b border-gray-800 dark:bg-gray-900">
      <nav className="container flex h-16 items-center justify-between dark:text-gray-100">
        <Link href="/" className="flex  items-center space-x-1 px-5">
          
          <HandHeartIcon size={32}/> <h1 className="font-semibold text-2xl text-blue-500">Policy</h1><h1 className="font-semibold text-xl ">Sure</h1>
        </Link>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <Link
              href="#"
              className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Insurance Products
              <ChevronDown className="ml-1 h-4 w-4" />
            </Link>
            <Link
              href="#"
              className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Renew Your Policy
              <ChevronDown className="ml-1 h-4 w-4" />
            </Link>
            {user && (
              <Link
                href={`/claims/${user.Id}`}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Claim
                <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
            )}
            <Link
              href="#"
              className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Support
              <ChevronDown className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="flex items-center dark:border-gray-700 dark:text-gray-300"
              onClick={toggleChat} // Toggle chat on button click
            >
              <Phone className="mr-2 h-4 w-4" />
              Talk to Expert
            </Button>
            {isLoggedIn ? (
              <Button
                onClick={handleLogout}
                className="dark:bg-red-600 dark:hover:bg-red-700"
              >
                Logout
              </Button>
            ) : (
              <Link href="/login">
                <Button className="dark:bg-blue-600 dark:hover:bg-blue-700">
                  Sign in
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Chat iframe */}
      {showChat && (
        <div
          style={{
            position: "fixed",
            top: "60px",
            right: "20px",
            width: "350px",
            height: "500px",
            zIndex: 1000,
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 1)",
          }}
        >
          <div className="p-2 opacity-50 flex justify-end cursor-pointer" onClick={toggleChat}><CircleX /></div>
          <iframe
            src="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/01/29/10/20250129104650-M4LD1YWL.json"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
            title="Bot Chat"
          />
        </div>
      )}
    </header>
  );
}