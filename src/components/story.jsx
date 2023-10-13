import React from 'react'

export default function Story({ img, username }) {
  return (
    <div>
      <img src={img} alt={username} className="w-14 h-14 rounded-full p-[1.5px] border-2 border-red-500 cursor-pointer object-contain transition-transform hover:scale-110 duration-200 ease-out"/>
      <p className="text-xs truncate text-center w-14">{username}</p>
    </div>
  )
}
