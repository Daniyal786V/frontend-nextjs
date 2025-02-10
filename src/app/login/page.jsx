//this code was working fine but without adding the functionality of storing the expiry to invalidate user form local storage after the tokrn was expired 
"use client"
import React, { useState, useContext } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import axios from './config/axios'
import axios from '@/config/axios'
// import axios from 'axios'
import { UserContext } from '@/context/user.context'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setUser } from '@/slices/userSlice'
 const Login = () => {
    const dispatch = useDispatch()



    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    // const { setUser } = useContext(UserContext)
      const router = useRouter();


    // const navigate = useNavigate()

    async function submitHandler(e) {

        e.preventDefault()

        axios.post('/users/login', {
            email,
            password
        }).then((res) => {
            console.log("data coming from the api  ",res.data)

            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            const user = JSON.parse(localStorage.getItem('user'))


            const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours from now
                
            localStorage.setItem("expiry", expiryTime.toString());
            console.log('user from local storage', user)
            // setUser(res.data.user)
            dispatch(setUser(res.data.user))
            router.push("/"); 

            // navigate('/')  
        }).catch((err) => {
            console.log(err)
        })
    //     const response = await axios.post('http://localhost:4000/users/login', 
    //         { email, password },
    //         { 
    //             withCredentials: true,
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         }
    //     );
    //     console.log(response.data)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
                <form
                    onSubmit={submitHandler}
                >
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
                        <input

                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
                <p className="text-gray-400 mt-4">
                    Don't have an account? <Link href="/signup"  className="text-blue-500 hover:underline">Create one</Link>
                </p>
            </div>
        </div>
    )
}

export default Login



// "use client"
// import React, { useState, useContext } from 'react'
// import axios from '@/config/axios'
// import { UserContext } from '@/context/user.context'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import { useDispatch } from 'react-redux'
// import { setUser } from '@/slices/userSlice'

// const Login = () => {
//     const dispatch = useDispatch()
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const router = useRouter()

//     // Function to set data in localStorage with expiry
//     const setWithExpiry = (key, value, expiryInHours) => {
//         const now = new Date()
//         const expiryTime = now.getTime() + expiryInHours * 60 * 60 * 1000 // Convert hours to milliseconds
//         const item = {
//             value: value,
//             expiry: expiryTime,
//         }
//         localStorage.setItem(key, JSON.stringify(item))
//     }

//     async function submitHandler(e) {
//         e.preventDefault()

//         axios.post('/users/login', {
//             email,
//             password
//         }).then((res) => {
//             console.log("data coming from the api  ", res.data)

//             // Store token and user data with expiry (e.g., 24 hours)
//             setWithExpiry('token', res.data.token, 24)
//             setWithExpiry('user', JSON.stringify(res.data.user), 24)

//             // Dispatch user data to Redux store
//             dispatch(setUser(res.data.user))

//             // Redirect to home page
//             router.push("/")
//         }).catch((err) => {
//             console.log(err)
//         })
//     }

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-900">
//             <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
//                 <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
//                 <form onSubmit={submitHandler}>
//                     <div className="mb-4">
//                         <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
//                         <input
//                             onChange={(e) => setEmail(e.target.value)}
//                             type="email"
//                             id="email"
//                             className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Enter your email"
//                         />
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
//                         <input
//                             onChange={(e) => setPassword(e.target.value)}
//                             type="password"
//                             id="password"
//                             className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Enter your password"
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full p-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         Login
//                     </button>
//                 </form>
//                 <p className="text-gray-400 mt-4">
//                     Don't have an account? <Link href="/signup" className="text-blue-500 hover:underline">Create one</Link>
//                 </p>
//             </div>
//         </div>
//     )
// }

// export default Login