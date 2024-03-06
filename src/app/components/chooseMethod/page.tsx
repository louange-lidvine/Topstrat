// import React from 'react'


// function Choose() {
//   return (
//       <div className='w-56 bg-white border-2 border-blue-default text-black '>
//         <div className='ml-6 pt-2'>
//           <h1 className='font-bold text-md'>Choose method</h1>
//         <div className='flex my-4'>
//         <input type="radio" name="quick method" id="" />
//        <h2 className='text-sm ml-2'>Quick method</h2>  
//         </div>
     
//      <div className='flex my-4'>
//        <input type="radio" name="step" id="" /> 
//        <h2 className='ml-2 text-sm'>Step by Step </h2> 
//      </div>x
//       <button type="submit" className='bg-orange-default text-sm px-3 py-1 mr-5 mb-2 float-right rounded-md'>
//         Next
//       </button>
      
//         </div>
       
//     </div> 
   
//   )
// }

// export default Choose


import React, { useState } from 'react';
import { Popover, TextInput, Button } from '@mantine/core';
import { FaPlus } from "react-icons/fa";

function Choose() {
  const [opened, setOpened] = useState(false);
  return (
    <Popover 
    width={250}
   opened position="bottom-start" 
    withArrow arrowPosition="side" 
    arrowOffset={115} 
    arrowSize={18} 
    clickOutsideEvents={['mouseup', 'touchend']}
    // opened={opened} 
    onChange={setOpened}
    >
      <Popover.Target>
          <FaPlus className="mt-4" />
       </Popover.Target>
      <Popover.Dropdown className='ml-32 mt-[300px]'>
        <TextInput label="Name" placeholder="Name" size="xs" />
        <TextInput label="Email" placeholder="john@doe.com" size="xs" mt="xs" />
      </Popover.Dropdown>
    </Popover>
  );
}
export default Choose