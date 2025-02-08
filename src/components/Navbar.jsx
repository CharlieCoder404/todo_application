import React from 'react'

export default function Navbar() {
  return (
    <>
      <div className='bg-emerald-800 h-12 w-3xl m-auto rounded-lg flex justify-between items-center mt-0.5'>
        <h1 className='text-2xl mx-4 font-bold'>iTask <span className='text-[8px] items-end font-light'>a pritish.co company</span></h1>
        <ul className='flex gap-6 mx-4'>
            <li className='font-bold cursor-pointer hover:underline'>Home</li>
            <li className='font-bold cursor-pointer hover:underline'>About</li>
        </ul>
      </div>
    </>
  )
}
