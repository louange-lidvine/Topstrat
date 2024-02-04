import React from 'react'
interface PromptProps{
    content:string
}

const Prompt:React.FC<PromptProps> = ({content}) => {
  return (
    <div className='border rounded-md mx-10 my-6 w-80 h-20 py-2 px-4'>
        <h2 className='text-sm text-black'>{content}</h2>
    </div>
  )
}

export default Prompt