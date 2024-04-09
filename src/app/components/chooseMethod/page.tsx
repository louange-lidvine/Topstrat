
// import React, { useState } from 'react';
// import { FaPlus } from 'react-icons/fa';
// import { useRouter } from 'next/navigation';

// function Choose() {
//   const router = useRouter();
//   const [isPopoverOpen, setIsPopoverOpen] = useState(false);

//   const handleRadioChange = (value:any) => {
//     setIsPopoverOpen(false);
//     if (value === 'quick') {
//       router.push('/components/Landingpage');
//     } else if (value === 'step') {
//       router.push('/components/step');
//     }
//   };

//   return (
//     <div className='relative'>
//       <FaPlus
//         className="mt-4"
//         onClick={() => setIsPopoverOpen(!isPopoverOpen)}
//         style={{ cursor: 'pointer' }}
//       />

//       {isPopoverOpen && (
//         <div
//           className="popover w-[250px] absolute left-0 text-black bg-[#fff] p-[10px]"
//           style={{
//             zIndex: '9999',
//             boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//             borderRadius: '4px',
//           }}
//         >
//           <label className='text-center my-[10px] block'>Choose method</label>
//           <div className='mb-[10px]'>
//             <input
//               type="radio"
//               name="favoriteFramework"
//               value="quick"
//               onChange={() => handleRadioChange('quick')}
//               className='mr-[5px]'
//             />
//             <label>Quick generation</label>
//           </div>
//           <div className='mb-[10px]'>
//             <input
//               type="radio"
//               name="favoriteFramework"
//               value="step"
//               onChange={() => handleRadioChange('step')}
//               className='mr-[5px]'
//             />
//             <label>Step by step</label>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Choose;



import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function Choose() {
  const router = useRouter();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch userId from session
    const userIdFromSession = sessionStorage.getItem('_id');
    if (userIdFromSession) {
      setUserId(userIdFromSession);
      console.log(userId);
    }
  }, []); // Fetch userId on component mount

  // const handleRadioChange = async (value: string) => {
  //   setIsPopoverOpen(false);
  //   try {
  //     if (!userId) {
  //       return;
  //     }

  //     // Call API to create project
  //     const response = await axios.post(
  //       'https://topstrat-backend.onrender.com/projects/create',
  //       {
  //         userId: userId,
  //         name: 'Untitled',
  //         description: 'My Project',
  //       }
  //     );

  //     console.log('Project created:', response.data);
  //     router.push(`/projects/${response.data.id}`);
  //   } catch (error) {
  //     console.error('Error creating project:', error);
  //     // Handle error
  //   }
  // };

  const handleRadioChange = async (value: string) => {
    setIsPopoverOpen(false);
    try {
      if (!userId) {
        // Redirect or handle case where userId is not available
        console.log('No user Id')
        return;
      }
  
      let projectData = {
        userId: userId,
        name: 'Untitled',
        description: 'My Project',
      };
  
      // Call the API to create a project
      const response = await axios.post(
        'https://topstrat-backend.onrender.com/projects/create',
        projectData
      );
  
      console.log('Project created:', response.data);
  
      if (value === 'quick') {
        router.push(`/components/Landingpage?userId=${userId}`); 
      } else if (value === 'step') {
        router.push(`/components/step?userId=${userId}`); 
      }
    } catch (error) {
      console.error('Error navigating to page or creating project:', error);
      // Handle error
    }
  };
  

  return (
    <div className='relative'>
      <FaPlus
        className="mt-4"
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        style={{ cursor: 'pointer' }}
      />

      {isPopoverOpen && (
        <div
          className="popover w-[250px] absolute left-0 text-black bg-[#fff] p-[10px]"
          style={{
            zIndex: '9999',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
          }}
        >
          <label className='text-center my-[10px] block'>Choose method</label>
          <div className='mb-[10px]'>
            <input
              type="radio"
              name="favoriteFramework"
              value="quick"
              onChange={() => handleRadioChange('quick')}
              className='mr-[5px]'
            />
            <label>Quick generation</label>
      
          <div className='mb-[10px]'>
            <input
              type="radio"
              name="favoriteFramework"
              value="step"
              onChange={() => handleRadioChange('step')}
              className='mr-[5px]'
               />
           </div>
         </div>
        </div>
    );
}

export default Choose;
