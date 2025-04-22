import apiClient from '@/app/lib/apiClient'
import { Profile } from '@/app/types'
import axios from 'axios'
import { profile } from 'console'
import { notFound } from 'next/navigation'
import React from 'react'


type Props = {
  params: {
    userId: number
  }
}

async function getProfile(userId: number) {
  try {
    const res = await apiClient.get(`user/profile/${userId}`)
    
    return res.data
  } catch (err) {
    console.error('Profile fetch failed:', err)
    return null
  }
}


const UserProfile =  async ({ params }: Props) => {
 const {userId} = params 

const profile  = await getProfile(userId)

console.log(profile)


    
  return (
    <div className="container mx-auto px-4 py-8">
  <div className="w-full max-w-xl mx-auto">
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <div className="flex items-center">
        <img className="w-20 h-20 rounded-full mr-4" alt="User Avatar" src={profile.profileImageUrl}/>
        <div>
          <h2 className="text-2xl font-semibold mb-1">{profile.user.username}</h2>
          <p className="text-gray-600">{profile.bio}</p>
        </div>
      </div>
    </div>
    <div className="bg-white shadow-md rounded p-4 mb-4" >
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <img className="w-10 h-10 rounded-full mr-2" alt="User Avatar" />
          <div>
            <h2 className="font-semibold text-md">{profile.user.username}</h2>
            <p className="text-gray-500 text-sm">2025/01/01</p>
          </div>
        </div>
        <p className="text-gray-700">First post</p>
      </div>
    </div>
  </div>
</div>
  )
}

export default UserProfile