"use client"
import React from 'react'
import { useSession, signOut }  from "next-auth/react";

export default function MiniProfile() {
  const { data } = useSession();
  return (
    <>
      {
          <div className='flex items-center justify-between mt-14 ml-10'>
            <img src={"https://links.papareact.com/3ke"} alt="avatar" className='rounded-full border p-[2px] w-16 h-16 object-contain'/>
            <div className="flex-1 mx-4">
              <h2 className="font-bold">{data?.user?.username}</h2>
              <p className="text-gray-400 text-sm">Welcome to Instagram</p>
            </div>
            <button
            onClick={signOut}
            className="text-blue-400 text-sm font-semibold">Sign Out</button>
          </div>
      }
    </>
  )
}
