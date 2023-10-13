"use client"
import React from 'react'
import { faker } from "@faker-js/faker"



export default function Suggestions() {
  const [ suggestions, setSuggestions ] = React.useState([])
  React.useEffect(() => {
    const suggestions = [...Array(5)].map((_,i)=>({
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
    setSuggestions(suggestions);
  }, [])
  
  return (
    <div className="mt-4 ml-10">
      <div className='flex justify-between text-sm mb-5 items-center'>
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-xs font-semibold text-gray-600">See All</button>
      </div>

      {
        suggestions.map(profile=>(
          <div key={profile.id} className='flex justify-between text-sm mb-5 items-center'>
            <img src={profile.avatar} alt="avatar" className='rounded-full border p-[2px] w-16 h-16 object-contain'/>
            <div className="flex-1 mx-4">
              <h2 className="font-semibold text-sm">{profile.username}</h2>
              <p className="text-gray-400 text-xs">Works at <span>{profile.company}</span></p>
            </div>

            <button className="text-blue-400 text-sm font-bold">Follow</button>
            </div>
        ))
      }
    </div>
  )
}
