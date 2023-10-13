"use client"

import Image from 'next/image'
import React from 'react'
import { AiOutlineSearch, AiFillHome, AiOutlineMenu, AiOutlineHeart } from "react-icons/ai"
import { PiPaperPlane } from "react-icons/pi";
import { BsPlusCircle } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from "next/navigation"
import { useRecoilState } from 'recoil';
import { modalAtom } from '@/atoms/modal-atom';



function Header() {
  const router = useRouter();
  const { data } = useSession();
  const [ open, setOpen ] = useRecoilState(modalAtom)
  console.log(data);
  return (
    <header
    className='bg-white shadow-md sticky top-0 z-[1000]'
    >
    <div className='flex justify-between max-w-6xl mx-5 lg:mx-auto items-center bg-white'>
      <div
      onClick={()=>router.push("/")}
      className='relative w-24 h-24 hidden lg:inline-grid cursor-pointer'
      >
        <Image
        src={`https://links.papareact.com/ocw`}
        alt="Instagram Logo"
        fill
        className='object-contain'
        />
      </div>
      <div
      onClick={()=>router.push("/")}
      className='relative w-10 h-10 lg:hidden cursor-pointer flex-shrink-0'
      >
        <Image
        src={`https://links.papareact.com/jjm`}
        alt="Instagram Logo"
        fill
        className='object-contain'
        />
      </div>

      {/* Middle - Search Input Field */}
      <div
      className='max-w-xs'
      >
        <div
        className='relative p-3 rounded-md'
        >
          <AiOutlineSearch
            className='absolute text-gray-400 pointer-events-none top-5 left-5 text-xl'
          />
          <input
          type='text'
          placeholder='Search'
          className='bg-gray-50 focus:outline-none block w-full pl-10 py-2 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md'
          />
        </div>
      </div>
      
      <div
      className='flex items-center justify-end space-x-4'>
        <AiFillHome
         onClick={()=>router.push("/")}
         className='btn' />
        <AiOutlineMenu className='md:hidden cursor-pointer '/>
        {
          data ? (
            <>
              <PiPaperPlane className="btn"/> 
              <BsPlusCircle 
              onClick={()=>setOpen(true)}
              className='btn' />
              <HiOutlineUserGroup className="btn"/>
              <AiOutlineHeart className="btn" />
            </>
          ) : (
            <button
            clasName="text-xs md:text-base"
            onClick={signIn}
            >Sign in</button>
          )
        }

        <img 
        onClick={signOut}
        src={data?.user?.image} 
        alt='' 
        className='rounded-full h-10 cursor-pointer' />
      </div>
    </div>
    </header>
  )
}

export default Header