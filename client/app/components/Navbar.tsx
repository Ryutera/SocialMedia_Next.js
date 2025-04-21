"use client"
import Link from 'next/link'
import React from 'react'
import { useAuth } from '../context/auth'


const Navbar = () => {
  const {user} = useAuth()
  console.log(user)
  return (
    <>
    <header className="bg-gray-700 p-4 text-white">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="font-semibold text-xl">
        <Link href="/">SNS Clone</Link>
      </h1>
      <nav>
        <ul className="flex space-x-4">
          <>
          {user? <Link
              href="/login"
              className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
            >
              Logout
            </Link> : <Link
              href="/login"
              className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
            >
              Login
            </Link> }
           
            <Link
              href="/signup"
              className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
            >
              Signup
            </Link>
          </>
        </ul>
      </nav>
    </div>
  </header>
</>  
  )
}

export default Navbar