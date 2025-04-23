import apiClient from '@/app/lib/apiClient'
import { PostType } from '@/app/types'
import Image from 'next/image'


//api叩いてユーザーの投稿のみをしゅとくする

async function getProfile(userId: string) {
  try {
    const res = await apiClient.get(`user/profile/${userId}`)

    return res.data
  } catch (err) {
    console.error('Profile fetch failed:', err)
    return null
  }
}


async function getPosts(userId: string) {
  try {
    const res = await apiClient.get(`posts/${userId}`)

    return res.data
  } catch (err) {
    console.error('Profile fetch failed:', err)
    return null
  }
}



const UserProfile =  async ({params}:{params:Promise<{userId:string}>}) => {
 const {userId} = await params 

const profile  = await getProfile(userId)
const posts = await getPosts(userId)

console.log(profile)


    
  return (
    <div className="container mx-auto px-4 py-8">
  <div className="w-full max-w-xl mx-auto">
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <div className="flex items-center">
        <Image className="w-20 h-20 rounded-full mr-4" alt="User Avatar" src={profile.profileImageUrl}/>
        <div>
          <h2 className="text-2xl font-semibold mb-1">{profile.user.username}</h2>
          <p className="text-gray-600">{profile.bio}</p>
        </div>
      </div>
    </div>
    {posts.map((post:PostType)=>(
 <div className="bg-white shadow-md rounded p-4 mb-4" key={post.id} >
 <div className="mb-4">
   <div className="flex items-center mb-2">
     <Image className="w-10 h-10 rounded-full mr-2" alt="User Avatar" src={profile.profileImageUrl}/>
     <div>
       <h2 className="font-semibold text-md">{post.author.username}</h2>
       <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleString()}</p>
     </div>
   </div>
   <p className="text-gray-700">{post.content}</p>
 </div>
</div>

    ))}
   
  </div>
</div>
  )
}

export default UserProfile