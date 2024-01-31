"use client"
import React from 'react'
import Background from "../../../../public/assets/bg.png"
import Image from 'next/image';
import Prompt from '../prompt/page';

function page() {
  return (
    <div className='flex absolute top-[-1px] left-[300px]'>
      <Image  src={Background} className="w-full h-full fixed left-0 top-0 -z-10" alt="background-img"/>
       <div className=''>
        <div className='border my-4 rounded-md mx-2   w-[950px] float-right'>
        <div className="input flex justify-center">
         <input type="text" placeholder='untitled' className='border m-4 py-2 outline-none px-10 text-center rounded-md ' />
        </div>
        <div>
          <h1 className='text-3xl my-40 font-bold text-center text-blue-default'>Strategic plan</h1>
        </div>
        <div className='prompt grid grid-cols-2'>
        <Prompt content='Generate a strategic plan for a rabbit rearing
project and provide clear objectives'/>
 <Prompt content='Generate a strategic plan for a rabbit rearing
project and provide clear objectives'/>
 <Prompt content='Generate a strategic plan for a rabbit rearing
project and provide clear objectives'/>
 <Prompt content='Generate a strategic plan for a rabbit rearing
project and provide clear objectives'/>
        </div>
        <div className="input flex ml-6">
         <input type="text" placeholder='untitled' className='border m-4 py-2 outline-none w-[800px] px-8 rounded-md ' />
         <button type='submit' className=''>Generate</button>
        </div>

        </div>
       </div>
    
    </div>
  )
}

export default page
