
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
      <div className="input flex space-x-44 w-[500px] border  my-4 py-3 px-6 rounded-md ">
         <input type="text" placeholder='Add a short description' className='outline-none bg-transparent w-[300px]' />
         <button type='submit' className='text-blue-default font-bold'>Generate</button>
        </div>
    
     </div>
  );
};

export default Step;
