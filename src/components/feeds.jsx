"use client"

import React from 'react'
import MiniProfile from './miniprofile'
import Posts from './posts'
import Stories from './stories'
import Suggestions from './suggestions'
import { useSession } from "next-auth/react";

const Feeds = () => {
  const { data } = useSession()
  return (
    <main
    className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl lg:grid-cols-3 lg:max-w-6xl mx-auto ${ !data && '!grid-cols-1 !max-w-3xl' }`}
    >
      {/* Section */}
      <section
      className='col-span-2 overflow-y-scroll scrollbar-hide '
      >
        <Stories />
        <Posts />
        {/* Stories */}
        {/* posts */}
      </section>

        {
          data && (
            <section  className='hidden lg:inline-grid md:col-span-1'>
              <div>
                {/* Miniprofile */}
                <MiniProfile />
                {/* Suggestions */}
                <Suggestions />
              </div>
            </section>   
          )
        }
    </main>
  )
}

export default Feeds