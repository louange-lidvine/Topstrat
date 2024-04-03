import React from 'react'
interface PackageProps{
    title:string
}

const Package:React.FC<PackageProps> = ({title}) => {
  return (
    <div className='border border-blue-default rounded-md  my-6 lg:w-[300px] lg:h-[200px] py-2 px-4'>
        <h2 className='text-lg font-bold'>{title}</h2>
    </div>
  )
}

export default Package