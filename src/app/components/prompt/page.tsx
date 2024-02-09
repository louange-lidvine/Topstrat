import React from 'react'
interface PromptProps{
    content:string
}

const Prompt:React.FC<PromptProps> = ({content}) => {
  return (
    <div className='border rounded-md mx-2 lg:mx-10 my-6 lg:w-100 lg:h-20 py-2 px-4'>
        <h2 className='text-lg text-black'>{content}</h2>
    </div>
  )
}

export default Prompt