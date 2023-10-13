"use client"

import React, { useEffect } from 'react'
import { faker } from "@faker-js/faker"
import Story from './story'
import { useSession } from "next-auth/react"

export default function Stories() {
  const [ suggestions, setSuggestions ] = React.useState()
  const { data } = useSession();
  useEffect(() => {
    const suggestionss = [...Array(20)].map((_,i)=>({
      id: i,
      avatar : faker.image.avatar(),
      email : faker.internet.email(),
      sex : faker.person.sex(),
      dob : faker.date.birthdate(),
      firstName : faker.person.firstName(),
      lastName : faker.person.lastName(),
      username : faker.internet.displayName().toLowerCase(),
      phone : faker.phone.number(),
      website : faker.internet.url(),
      company : faker.company.name(),
      address : faker.location.streetAddress()
    }))
    setSuggestions(suggestionss)
  }, [])

  return (
    <div
    className='flex space-x-2 p-6 bg-white mt-8 border border-gray-200 rounded-sm overflow-x-scroll scrollbar-none'
    >
      {
        data && <Story img={data.user.image} username={data.user.username}/>
      }
      {
        suggestions?.map((profile) => (
          <Story key={profile.id} img={profile.avatar} username={profile.username} />
        ))
      }
    </div>
  )
}
