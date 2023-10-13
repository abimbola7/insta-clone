import React from 'react'
import { getProviders } from "next-auth/react"
import SigninButton from '@/components/siginbutton';



export default async function signIn() {
  const providers = await getProviders();
  return (
    <>
    <div
    className='flex flex-col items-center justify-center min-h-screen py-2 px-14 text-center'
    >
        <img className='w-80' src='https://links.papareact.com/ocw' alt=""/>
        <p className='font-xs italics'>This is not a real app, it is a personal project</p>
        <div className='mt-40'>
          {providers && Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <SigninButton name={provider.name} id={provider.id} providers={providers}/>
            </div>
          ))}
        </div>
    </div>
    </>
  )
}

// async function getData() {
//   const providers= await getProviders();
//   return providers;
// }