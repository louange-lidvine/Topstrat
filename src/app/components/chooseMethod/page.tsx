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
          </div>
          <div className='mb-[10px]'>
            <input
              type="radio"
              name="favoriteFramework"
              value="step"
              onChange={() => handleRadioChange('step')}
              className='mr-[5px]'
            />
            <label>Step by step</label>
          </div>
        </div>
      )}
    </div>
  );
}

export default Choose;

