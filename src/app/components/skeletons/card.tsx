
import React from 'react';

interface StepProps {
  title: string;
  desc: React.ComponentType<any>;
}

const Step: React.FC<StepProps> = ({ title, desc: DescComponent }) => {
  return (
    <div className=' rounded-md '>
      <h1 className='text-xl font-bold text-center text-blue-default'>{title}</h1>
      <div className='my-5'>
        <DescComponent />
      </div>
     </div>
  );
};

export default Step;
