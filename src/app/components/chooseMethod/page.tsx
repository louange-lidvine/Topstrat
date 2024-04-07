// "use client"
// import React, { useState } from 'react';
// import { Popover, Group } from '@mantine/core';
// import { FaPlus } from "react-icons/fa";
// import { Radio } from '@mantine/core';
// import { useRouter } from 'next/navigation';
// import '@mantine/core/styles/Popover.css';


// function Choose() {
//   const router = useRouter();

//   const handleRadioChange = (value: string) => {
//     if (value === 'quick') {
//       router.push('/components/Landingpage'); 
//     } else if (value === 'step') {
//       // Redirect to the step page
//       router.push('/components/step'); 
//     }
//   };
//   const [opened, setOpened] = useState(false);
//   return (

//     <Popover 
//       width={250}
//     // opened position="bottom-start" 
//     withArrow arrowPosition="side" 
//     arrowOffset={115} 
//     arrowSize={18} 
//     // clickOutsideEvents={['mouseup', 'touchend']}
//     // opened={opened}
//     onClose={() => setOpened(false)}
//     onChange={setOpened}
//     >
//       <Popover.Target>
//           <FaPlus className="mt-4" />
//        </Popover.Target>
//       <Popover.Dropdown className="ml-32 mt-[300px]" style={{ position: 'fixed' }}>
//       <Radio.Group
//       name="favoriteFramework"
//       label="Choose method" 
//       withAsterisk
//       onChange={handleRadioChange}

//     >
//       <Group my="lg">
//         <Radio value="quick" label="Quick generation" />
//         <Radio value="step" label="Step by step" />
//       </Group>
//     </Radio.Group>
//       </Popover.Dropdown>
//     </Popover>
   
//   );
// }
// export default Choose

import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

function Choose() {
  const router = useRouter();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleRadioChange = (value:any) => {
    setIsPopoverOpen(false);
    if (value === 'quick') {
      router.push('/components/Landingpage');
    } else if (value === 'step') {
      router.push('/components/step');
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <FaPlus
        className="mt-4"
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        style={{ cursor: 'pointer' }}
      />

      {isPopoverOpen && (
        <div
          className="popover"
          style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            zIndex: '9999',
            backgroundColor: '#fff',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            padding: '10px',
          }}
        >
          <label style={{ display: 'block', marginBottom: '5px' }}>Choose method</label>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="radio"
              name="favoriteFramework"
              value="quick"
              onChange={() => handleRadioChange('quick')}
              style={{ marginRight: '5px' }}
            />
            <label>Quick generation</label>
          </div>
          <div>
            <input
              type="radio"
              name="favoriteFramework"
              value="step"
              onChange={() => handleRadioChange('step')}
              style={{ marginRight: '5px' }}
            />
            <label>Step by step</label>
          </div>
        </div>
      )}
    </div>
  );
}

export default Choose;

