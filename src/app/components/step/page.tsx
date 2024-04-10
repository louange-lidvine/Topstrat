// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Background from "../../../../public/assets/bg.png";
// import Image from "next/image";
// import Prompt from "../prompt/page";

// function page() {
//     const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//     const [isSecModalOpen, setIsSecModalOpen] = useState<boolean>(false);
//     const [prompts, setPrompts] = useState<string[]>([]);
   


//     const [title, setTitle] = useState("untitled");
//     const handleInputChange = (event: {
//         target: { value: React.SetStateAction<string> };
//     }) => {
//         setTitle(event.target.value);
//     };

//     const handleButtonClick = () => {
//         setIsModalOpen(false);
//         setIsSecModalOpen(true);
//     };

//     return (
        
//       <div></div>
//     );
// }

// export default page;


"use client"
import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import ReactModal from 'react-modal';
import Step from './card';

interface ObjectData {
  name: string;
  desc: string;
  component: React.ComponentType<any>;
}


const Component1: React.FC = () => <div>The mission of a business refers to a concise statement that outlines the fundamental purpose, core values, and overarching goals of the organization. It defines what the business aims to achieve, whom it serves, and the principles that guide its actions. The mission statement often reflects the company's identity and provides a sense of direction for its activities and decisions.</div>;
const Component2: React.FC = () => <div> The mission of a business refers to a concise statement that outlines the fundamental purpose, core values, and overarching goals of the organization. It defines what the business aims to achieve, whom it serves, and the principles that guide its actions. The mission statement often reflects the company's identity and provides a sense of direction for its activities and decisions.</div>;
const Component3: React.FC = () => <div>The mission of a business refers to a concise statement that outlines the fundamental purpose, core values, and overarching goals of the organization. It defines what the business aims to achieve, whom it serves, and the principles that guide its actions. The mission statement often reflects the company's identity and provides a sense of direction for its activities and decisions.</div>;

const objects: ObjectData[] = [
  { name: 'Vision', desc: "The vision is an aspirational statement defining an organization's ideal future.", component: Component1 },
  { name: 'Mission', desc: "The mission is an organization's fundamental purpose.", component: Component2 },
  { name: 'Values', desc: "Values are guiding principles shaping organizational culture.", component: Component3 },
];

const Page: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedObject, setSelectedObject] = useState<ObjectData | null>(null);

  const handleObjectClick = (object: ObjectData) => {
    setSelectedObject(object);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedObject(null);
  };

    const handleGeneratePrompts = async (title: string): Promise<string[]> => {
    // Replace this with your logic to generate prompts based on the title
    // Simulating an asynchronous operation for now
    return new Promise<string[]>((resolve) => {
      setTimeout(() => {
        resolve([`Prompt 1 for ${title}`, `Prompt 2 for ${title}`, `Prompt 3 for ${title}`]);
      }, 1000);
    });
  };

  const handleSave = () => {
    console.log('Handling Save action');
    handleCloseModal();
  };

  const handleEnhance = () => {
    console.log('Handling Enhance action');
    handleCloseModal();
  };

  const handleRegenerate = () => {
    console.log('Handling Regenerate action');
    handleCloseModal();
  };

    function handleAction(arg0: string): void {
        throw new Error('Function not implemented.');
    }

  return (
    <div className='border my-4 rounded-md mx-2 w-[1150px] absolute top-[-1px] left-[320px]'>
      <div className="input flex justify-center">
        <input type="text" placeholder='untitled' className='border m-4 py-2 outline-none px-10 text-center rounded-md ' />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }} className="w-[1100px] py-20 px-20 mt-6 ml-10 bg-white ">
        {objects.map((object, index) => (
          <div key={index} onClick={() => handleObjectClick(object)} className='px-6 my-6 x-8 border w-100 text-lg rounded-md pt-2 pb-6'>
            <input type="radio" name="check" id="check" />
            <h2 className='ml-4 font-bold text-blue-default text-center'>{object.name}</h2>
            <h2 className='font-md'>{object.desc}</h2>
            <FaArrowRight className='float-right text-orange-default' />
          </div>
        ))}
      </div>
      <div className="input flex justify-between ml-24 w-[960px] border  m-4 py-3 px-6 rounded-md space-x-5 ">
        <div>
          <input type="text" placeholder='Add a short description' className='outline-none bg-transparent w-[600px]' />
        </div>
        <div>
          <button onClick={() => handleAction('Save')} className='text-blue-default font-bold'>Save</button>
          <button onClick={() => handleAction('Enhance')} className='text-blue-default font-bold'>Enhance</button>
          <button onClick={() => handleAction('Regenerate')} className='text-blue-default font-bold'>Regenerate</button>
        </div>
      </div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className="w-[600px]  p-10 mt-20 bg-white shadow-lg ml-[500px]"
      >
        {selectedObject && (
          <Step title={selectedObject.name} desc={selectedObject.component}          
           
        
          />
        )}
        <button onClick={handleCloseModal}>Close Modal</button>
      </ReactModal>
    </div>
  );
};

export default Page;



