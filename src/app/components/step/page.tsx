
"use client"
import React, { useState } from 'react';
import {FaArrowRight} from 'react-icons/fa'
import ReactModal from 'react-modal';
import Step from './card';

const Component1: React.FC = () => <div>The mission of a business refers to a concise statement that outlines the fundamental purpose, core values, and overarching goals of the organization. It defines what the business aims to achieve, whom it serves, and the principles that guide its actions. The mission statement often reflects the company's identity and provides a sense of direction for its activities and decisions.</div>;
const Component2: React.FC = () => <div> The mission of a business refers to a concise statement that outlines the fundamental purpose, core values, and overarching goals of the organization. It defines what the business aims to achieve, whom it serves, and the principles that guide its actions. The mission statement often reflects the company's identity and provides a sense of direction for its activities and decisions.</div>;
const Component3: React.FC = () => <div>The mission of a business refers to a concise statement that outlines the fundamental purpose, core values, and overarching goals of the organization. It defines what the business aims to achieve, whom it serves, and the principles that guide its actions. The mission statement often reflects the company's identity and provides a sense of direction for its activities and decisions.</div>;
const Component4: React.FC = () => <div> The mission of a business refers to a concise statement that outlines the fundamental purpose, core values, and overarching goals of the organization. It defines what the business aims to achieve, whom it serves, and the principles that guide its actions. The mission statement often reflects the company's identity and provides a sense of direction for its activities and decisions.</div>;
const Component5: React.FC = () => <div>The mission of a business refers to a concise statement that outlines the fundamental purpose, core values, and overarching goals of the organization. It defines what the business aims to achieve, whom it serves, and the principles that guide its actions. The mission statement often reflects the company's identity and provides a sense of direction for its activities and decisions.</div>;
const Component6: React.FC = () => <div> The mission of a business refers to a concise statement that outlines the fundamental purpose, core values, and overarching goals of the organization. It defines what the business aims to achieve, whom it serves, and the principles that guide its actions. The mission statement often reflects the company's identity and provides a sense of direction for its activities and decisions.</div>;


interface ObjectData {
  name: string;
  desc:string;
  component: React.ComponentType<any>;
}

const objects: ObjectData[] = [
  { name: 'Vision',desc:"The vision is an aspirational statement defining an organization's ideal future." ,component: Component1 },
  { name: 'Mission',desc:"The mission is an organization's fundamental purpose.", component: Component2 },
  { name: 'Values',desc:"Values are guiding principles shaping organizational culture." ,component: Component3 },
  { name: 'Objectives',desc:"Objectives are measurable goals aligned with an organization's mission.", component: Component4 },
  { name: 'Log frames',desc:"The Logframe (Logical Framework) is a systematic project management tool." ,component: Component5 },
  { name: 'Implementation strategies',desc:"Strategies are detailed plans to achieve organizational goals.", component: Component6 },
];

const page: React.FC = () => {
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

  return (
    <div className='border my-4 rounded-md mx-2 w-[900px] float-right'>
         <div className="input flex justify-center">
         <input type="text" placeholder='untitled' className='border m-4 py-2 outline-none px-10 text-center rounded-md ' />
        </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }} className="w-[600px] py-20 px-10 mt-6 bg-white ">
        {objects.map((object, index) => (
          <div key={index} onClick={() => handleObjectClick(object)} className='px-6 my-6 x-8 border w-96 rounded-md pt-2 pb-6'>
            <input type="radio" name="check" id="check" />
            <h2 className='ml-4 font-bold text-blue-default text-center'>{object.name}</h2> 
            <h2 className='font-md'>{object.desc}</h2>
            <FaArrowRight className='float-right text-orange-default'/>

            
          </div>
        ))}
      </div>
      <div className="input flex ml-6 w-[800px] border  m-4 py-3 px-6 rounded-md ">
         <input type="text" placeholder='Add a short description' className='outline-none bg-transparent w-[700px]' />
         <button type='submit' className='text-blue-default font-bold'>Generate</button>
        </div>

      <ReactModal isOpen={isModalOpen}
       onRequestClose={handleCloseModal}
       className="w-[600px]  p-10 mt-20 bg-white shadow-lg ml-[350px]"
      >
        {selectedObject && <Step title={selectedObject.name}  desc={selectedObject.component}/>}
        <button onClick={handleCloseModal}>Close Modal</button>
      </ReactModal>
    </div>
  );
};


export default page;
