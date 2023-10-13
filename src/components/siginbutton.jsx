"use client"

import React from 'react'
import { signIn } from "next-auth/react";

export default function SigninButton({ name, id }, providers) {
  console.log(providers)
  return (
    <button
    className="p-3 bg-blue-500 text-white rounded-lg"
    onClick={()=>signIn(id, { callbackUrl : "/" })}
    >
        Sign in with {name}
    </button>
  )
}
