import React from 'react'

const Post = () => {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
  <div className="mb-4">
    <div className="flex items-center mb-2">
      <img
        className="w-10 h-10 rounded-full mr-2"
        src="https://via.placeholder.com/150"
        alt="User Avatar"
      />
      <div>
        <h2 className="font-semibold text-md">ryusei</h2>
        <p className="text-gray-500 text-sm">01/01 13:00</p>
      </div>
    </div>
    <p className="text-gray-700">First post</p>
  </div>
</div>
  )
}

export default Post