import React from 'react'

function Choose() {
  return (
    <div className='w-56 h-20 bg-white text-black m-4'>
        <div className='ml-6'>
        <div className='flex my-4'>
        <input type="radio" name="quick method" id="" />
       <h2 className='ml-2'>Quick method</h2>  
        </div>
     
     <div className='flex my-4'>
       <input type="radio" name="step" id="" />
       <h2 className='ml-2'>Step by Step </h2> 
     </div>
      <button type="submit" className='bg-orange-default px-3 py-1'>
        Next
      </button>
      
        </div>
       
    </div>
  )
}

export default Choose
