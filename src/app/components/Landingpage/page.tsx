import React from 'react'
import Background from "../../../../public/assets/bg.png"
import Image from 'next/image';

function page() {
  return (
    <body>
      <Image  src={Background} className="w-full h-full fixed left-0 top-0 -z-10"   alt="background-img"/>
      <div>
      <div></div>
        </div>
    
    </body>
  )
}

export default page
