import React, { useState } from 'react';
import { Popover, Group } from '@mantine/core';
import { FaPlus } from "react-icons/fa";
import { Radio } from '@mantine/core';
import { useRouter } from 'next/navigation';
import '@mantine/core/styles/Popover.css';


function Choose() {
  const router = useRouter();

  const handleRadioChange = (value: string) => {
    if (value === 'quick') {
      router.push('/components/Landingpage'); 
    } else if (value === 'step') {
      // Redirect to the step page
      router.push('/components/step'); 
    }
  };
  const [opened, setOpened] = useState(false);
  return (

    <Popover 
      width={250}
    // opened position="bottom-start" 
    withArrow arrowPosition="side" 
    arrowOffset={115} 
    arrowSize={18} 
    // clickOutsideEvents={['mouseup', 'touchend']}
    // opened={opened}
    onClose={() => setOpened(false)}
    onChange={setOpened}
    >
      <Popover.Target>
          <FaPlus className="mt-4" />
       </Popover.Target>
      <Popover.Dropdown className="ml-32 mt-[300px]" style={{ position: 'fixed' }}>
      <Radio.Group
      name="favoriteFramework"
      label="Choose method" 
      withAsterisk
      onChange={handleRadioChange}

    >
      <Group my="lg">
        <Radio value="quick" label="Quick generation" />
        <Radio value="step" label="Step by step" />
      </Group>
    </Radio.Group>
      </Popover.Dropdown>
    </Popover>
   
  );
}
export default Choose


