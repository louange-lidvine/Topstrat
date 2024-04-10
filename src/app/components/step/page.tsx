// "use client"
// import React, { useState } from 'react';
// import { FaArrowRight } from 'react-icons/fa';
// import ReactModal from 'react-modal';
// import Step from './card';
// import PromptGet from './PromptGet';
// // Import your custom components here
// const Component1: React.FC = () => <div>The mission of a business refers to a concise statement that outlines the fundamental purpose, core values, and overarching goals of the organization. It defines what the business aims to achieve, whom it serves, and the principles that guide its actions. The mission statement often reflects the company's identity and provides a sense of direction for its activities and decisions.</div>;
// const Component2: React.FC = () => <div> The mission of a business refers to a concise statement that outlines the fundamental purpose, core values, and overarching goals of the organization. It defines what the business aims to achieve, whom it serves, and the principles that guide its actions. The mission statement often reflects the company's identity and provides a sense of direction for its activities and decisions.</div>;
// const Component3: React.FC = () => <div>The mission of a business refers to a concise statement that outlines the fundamental purpose, core values, and overarching goals of the organization. It defines what the business aims to achieve, whom it serves, and the principles that guide its actions. The mission statement often reflects the company's identity and provides a sense of direction for its activities and decisions.</div>;
// const Component4: React.FC = () => <div> The mission of a business refers to a concise statement that outlines the fundamental purpose, core values, and overarching goals of the organization. It defines what the business aims to achieve, whom it serves, and the principles that guide its actions. The mission statement often reflects the company's identity and provides a sense of direction for its activities and decisions.</div>;
// const Component5: React.FC = () => <div>The mission of a business refers to a concise statement that outlines the fundamental purpose, core values, and overarching goals of the organization. It defines what the business aims to achieve, whom it serves, and the principles that guide its actions. The mission statement often reflects the company's identity and provides a sense of direction for its activities and decisions.</div>;
// const Component6: React.FC = () => <div> The mission of a business refers to a concise statement that outlines the fundamental purpose, core values, and overarching goals of the organization. It defines what the business aims to achieve, whom it serves, and the principles that guide its actions. The mission statement often reflects the company's identity and provides a sense of direction for its activities and decisions.</div>;

// // Define your custom components similar to Component1, Component2, etc.

// interface ObjectData {
//   name: string;
//   desc: string;
//   component: React.ComponentType<any>;
// }

// const objects: ObjectData[] = [
//   { name: 'Vision', desc: "The vision is an aspirational statement defining an organization's ideal future.", component: Component1 },
//   { name: 'Mission', desc: "The mission is an organization's fundamental purpose.", component: Component2 },
//   { name: 'Values', desc: "Values are guiding principles shaping organizational culture.", component: Component3 },
//   { name: 'Vision', desc: "The vision is an aspirational statement defining an organization's ideal future.", component: Component4 },
//   { name: 'Mission', desc: "The mission is an organization's fundamental purpose.", component: Component5 },
//   { name: 'Values', desc: "Values are guiding principles shaping organizational culture.", component: Component6 },
//   // Add more custom components as needed
// ];

// const page: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [isSecModalOpen, setIsSecModalOpen] = useState<boolean>(false);
//   const [selectedObject, setSelectedObject] = useState<ObjectData | null>(null);

//   const handleObjectClick = (object: ObjectData) => {
//     setSelectedObject(object);
//     setIsModalOpen(true);
//     setIsSecModalOpen(false);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedObject(null);
//     setIsSecModalOpen(false);
//   };

//   const handleButtonClick = () => {
//     setIsModalOpen(false);
//     setIsSecModalOpen(true);
//   };

//   return (
//     <div className='border lg:mt-4 mt-10 my-4 rounded-md mx-2 lg:w-[1150px] lg:absolute lg:top-[-1px] lg:left-[320px]'>
//       <div className="input flex justify-center">
//         <input type="text" placeholder='untitled' className='border m-4 py-2 outline-none lg:px-10 text-center rounded-md ' />
//       </div>
//       <div className="lg:w-[1100px] grid lg:grid-cols-2 grid-cols-1 gap-4 py-20 lg:px-20 lg:mt-6 lg:ml-10 bg-white">
//         {objects.map((object, index) => (
//           <div key={index} onClick={() => handleObjectClick(object)} className='px-6 my-6 x-8 border w-100 text-lg rounded-md pt-2 pb-6'>
//             <input type="radio" name="check" id="check" />
//             <h2 className='ml-4 font-bold text-blue-default text-center'>{object.name}</h2>
//             <h2 className='font-md'>{object.desc}</h2>
//             <FaArrowRight className='float-right text-orange-default' />
//           </div>
//         ))}
//       </div>
//       <div className="input flex justify-between lg:ml-24 lg:w-[960px] border  m-4 py-3 px-6 rounded-md space-x-5 ">

//         <div>
//           <input type="text" placeholder='Add a short description' className='outline-none bg-transparent lg:w-[600px]' />
//         </div>
//         <div>
//           <button type='submit' className='text-blue-default font-bold'>Generate</button>
//         </div>

//       </div>

//       <ReactModal isOpen={isModalOpen}
//         onRequestClose={handleCloseModal}
//         className="w-[600px]  p-10 mt-20 bg-white shadow-lg lg:ml-[500px]"
//       >
//         {selectedObject && <Step title={selectedObject.name} desc={selectedObject.component} />}
//         <div className="input flex lg:space-x-44 lg:w-[500px] border  my-4 py-3 px-6 rounded-md ">
//           <input type="text" placeholder='Add a short description' className='outline-none bg-transparent w-[300px]' />
//           <button type='submit' className='text-blue-default font-bold' onClick={handleButtonClick}>Generate</button>
//         </div>
//         <button onClick={handleCloseModal}>Close Modal</button>

//       </ReactModal>

//       <ReactModal isOpen={isSecModalOpen}
//         onRequestClose={handleCloseModal}
//         className="w-[600px]  px-10 py-20 mt-20 bg-white shadow-lg lg:ml-[500px]">
//         {/* Render the selected custom component */}
//         {selectedObject && <selectedObject.component title={selectedObject.name} />}
//         <div className="buttons flex space-x-5 float-end">
//           <button type="submit" className='bg-[#0F872F] py-2 px-4 rounded-md'>Save</button>
//           <button type="submit" className='bg-[#C3BC0D] py-2 px-4 rounded-md'>Enhance</button>
//           <button type="submit" className='bg-[#ED0C0C] py-2 px-4 rounded-md'>Re-generate</button>
//         </div>
//       </ReactModal>
//     </div>
//   );
// };

// export default page;

"use client"
import React, { useState } from 'react';
import {FaArrowRight} from 'react-icons/fa'
import ReactModal from 'react-modal';
import Step from './card';
import PromptGet from './PromptGet';

const Component1: React.FC = () => <div>The mission of a business refers to a concise statement that outlines the fundamental purpose, core values, and overarching goals of the organization. It defines what the business aims to achieve, whom it serves, and the principles that guide its actions. The mission statement often reflects the company's identity and provides a sense of direction for its activities and decisions.</div>;
const Component2: React.FC = () => <div> The mission of a business refers to a concise statement that outlines the fundamental purpose, core values, and overarching goals of the organization. It defines what the business aims to achieve, whom it serves, and the principles that guide its actions. The mission statement often reflects the company's identity and provides a sense of direction for its activities and decisions.</div>;
const Component3: React.FC = () => <div>The mission of a business refers to a concise statement that outlines the fundamental purpose, core values, and overarching goals of the organization. It defines what the business aims to achieve, whom it serves, and the principles that guide its actions. The mission statement often reflects the company's identity and provides a sense of direction for its activities and decisions.</div>;
const Component4: React.FC = () => <div> The mission of a business refers to a concise statement that outlines the fundamental purpose, core values, and overarching goals of the organization. It defines what the business aims to achieve, whom it serves, and the principles that guide its actions. The mission statement often reflects the company's identity and provides a sense of direction for its activities and decisions.</div>;
const Component5: React.FC = () => <div>The mission of a business refers to a concise statement that outlines the fundamental purpose, core values, and overarching goals of the organization. It defines what the business aims to achieve, whom it serves, and the principles that guide its actions. The mission statement often reflects the company's identity and provides a sense of direction for its activities and decisions.</div>;
const Component6: React.FC = () => <div>The mission of a business refers to a concise statement that outlines the fundamental purpose, core values, and overarching goals of the organization. It defines what the business aims to achieve, whom it serves, and the principles that guide its actions. The mission statement often reflects the company's identity and provides a sense of direction for its activities and decisions.</div>;


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
  const [isSecModalOpen, setIsSecModalOpen] = useState<boolean>(false);
  const [selectedObject, setSelectedObject] = useState<ObjectData | null>(null);

  const handleObjectClick = (object: ObjectData) => {
    setSelectedObject(object);
    setIsModalOpen(true);
    setIsSecModalOpen(false)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedObject(null);
    setIsSecModalOpen(false)
  };
  const handleButtonClick = () => {
    setIsModalOpen(false);
    setIsSecModalOpen(true)
  };

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
            <FaArrowRight className='float-right text-orange-default'/>

            
          </div>
        ))}
      </div>
      <div className="input flex justify-between ml-24 w-[960px] border  m-4 py-3 px-6 rounded-md space-x-5 ">
        
         <div> 
          <input type="text" placeholder='Add a short description' className='outline-none bg-transparent w-[600px]' /></div>
         <div>     
          <button type='submit' className='text-blue-default font-bold'>Generate</button></div>
    
        </div>
        
      <ReactModal isOpen={isModalOpen}
       onRequestClose={handleCloseModal}
       className="w-[600px]  p-10 mt-20 bg-white shadow-lg ml-[500px]"
      >
        {selectedObject && <Step title={selectedObject.name}  desc={selectedObject.component}/>}
        <div className="input flex space-x-44 w-[500px] border  my-4 py-3 px-6 rounded-md ">
         <input type="text" placeholder='Add a short description' className='outline-none bg-transparent w-[300px]' />
         <button type='submit' className='text-blue-default font-bold' onClick={handleButtonClick}>Generate</button>
        </div>
        <button onClick={handleCloseModal}>Close Modal</button>

      </ReactModal>

    <ReactModal isOpen={isSecModalOpen}
    onRequestClose={handleCloseModal}
    className="w-[600px]  p-10 mt-20 bg-white shadow-lg ml-[500px]">
    {selectedObject && <PromptGet title={selectedObject.name} />}
    <div className="buttons flex space-x-5 float-end">
      <button type="submit" className='bg-[#0F872F] py-2 px-4 rounded-md'>Save</button>
      <button type="submit" className='bg-[#C3BC0D] py-2 px-4 rounded-md'>Enhance</button>
      <button type="submit" className='bg-[#ED0C0C] py-2 px-4 rounded-md'>Re-generate</button>

      </div>
    </ReactModal>
    </div>
  );
};


export default page;