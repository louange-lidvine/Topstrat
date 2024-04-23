"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import ReactModal from "react-modal";
import Step from "../card";
import PromptGet from "../PromptGet";
import { useEffect } from "react";
import { useRouter } from "next/navigation";



const Component1: React.FC = () => (
    <div>
        The mission of a business refers to a concise statement that outlines
        the fundamental purpose, core values, and overarching goals of the
        organization. It defines what the business aims to achieve, whom it
        serves, and the principles that guide its actions. The mission statement
        often reflects the company's identity and provides a sense of direction
        for its activities and decisions.
    </div>
);
const Component2: React.FC = () => (
    <div>
        {" "}
        The mission of a business refers to a concise statement that outlines
        the fundamental purpose, core values, and overarching goals of the
        organization. It defines what the business aims to achieve, whom it
        serves, and the principles that guide its actions. The mission statement
        often reflects the company's identity and provides a sense of direction
        for its activities and decisions.
    </div>
);
const Component3: React.FC = () => (
    <div>
        The mission of a business refers to a concise statement that outlines
        the fundamental purpose, core values, and overarching goals of the
        organization. It defines what the business aims to achieve, whom it
        serves, and the principles that guide its actions. The mission statement
        often reflects the company's identity and provides a sense of direction
        for its activities and decisions.
    </div>
);
const Component4: React.FC = () => (
    <div>
        {" "}
        The mission of a business refers to a concise statement that outlines
        the fundamental purpose, core values, and overarching goals of the
        organization. It defines what the business aims to achieve, whom it
        serves, and the principles that guide its actions. The mission statement
        often reflects the company's identity and provides a sense of direction
        for its activities and decisions.
    </div>
);
const Component5: React.FC = () => (
    <div>
        The mission of a business refers to a concise statement that outlines
        the fundamental purpose, core values, and overarching goals of the
        organization. It defines what the business aims to achieve, whom it
        serves, and the principles that guide its actions. The mission statement
        often reflects the company's identity and provides a sense of direction
        for its activities and decisions.
    </div>
);
const Component6: React.FC = () => (
    <div>
        The mission of a business refers to a concise statement that outlines
        the fundamental purpose, core values, and overarching goals of the
        organization. It defines what the business aims to achieve, whom it
        serves, and the principles that guide its actions. The mission statement
        often reflects the company's identity and provides a sense of direction
        for its activities and decisions.
    </div>
);

interface ObjectData {
    name: string;
    desc: string;
    component: React.ComponentType<any>;
}

const objects: ObjectData[] = [
    {
        name: "mission",
        desc: "The Mission is an aspirational statement defining an organization's ideal future.",
        component: Component1,
    },
    {
        name: "vision",
        desc: "The vision is an organization's fundamental purpose.",
        component: Component2,
    },
    {
        name: "strategy",
        desc: "The strategy is an organization's fundamental purpose.",
        component: Component2,
    },
    {
        name: "Values",
        desc: "Values are guiding principles shaping organizational culture.",
        component: Component3,
    },
    {
        name: "Objectives",
        desc: "Objectives are measurable goals aligned with an organization's mission.",
        component: Component4,
    },
    {
        name: "SWOT",
        desc: "Summary of  Strength ,Weakness,Opportunities and Technology.",
        component: Component5,
    },
    //   { name: 'Log frames',desc:"The Logframe (Logical Framework) is a systematic project management tool." ,component: Component5 },
    //   { name: 'Implementation strategies',desc:"Strategies are detailed plans to achieve organizational goals.", component: Component6 },
];

const page: React.FC = () => {

    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [prompt, setPrompt] = useState<string>();
    const [isSecModalOpen, setIsSecModalOpen] = useState<boolean>(false);
    const [selectedObject, setSelectedObject] = useState<ObjectData | null>(
        null
    );
    const [finishedObject,setFinishedObject] = useState<string[]>(["mission"])

    const handleObjectClick = (object: ObjectData) => {
        setSelectedObject(object);
        setIsModalOpen(true);
        setIsSecModalOpen(false);
    };
    const handleChange = (event: {
        target: { value: React.SetStateAction<string | undefined> };
    }) => {
        setPrompt(event.target.value);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedObject(null);
        setIsSecModalOpen(false);
    }; 
    const handleButtonClick = () => {
        setIsModalOpen(false);
        setIsSecModalOpen(true);
    };
    const handleNextObject = (title: string) => {
        setFinishedObject(prev => [...prev, title]);
        const objectIndex = objects.findIndex(object => object.name === title);
        
        if (objectIndex === objects.length - 1) {
            // If the last title is reached, navigate to the preview page
            router.push("/components/Preview");
        } else {
            // Otherwise, proceed to the next title
            setSelectedObject(objects[objectIndex + 1]);
            setIsModalOpen(true);
            setIsSecModalOpen(false)
        }
    };
    
    const router = useRouter();
  

    return (
        <div className="w-[100%">
               <div className="border my-4 rounded-md mx-2  lg:w-[1150px] lg:absolute lg:top-[-1px] lg:left-[320px]">
            <div className="input flex justify-center">
                <input
                    type="text"
                    placeholder="untitled"
                    className="border m-4 lg:py-2 mt-10 p-2  outline-none px-10 text-center rounded-md "
                />
            </div>
            <div
                className=" grid lg:grid-cols-2 grid-cols-1 gap-[16px] lg:w-[1100px] lg:py-20 mx-3 lg:px-20 mt-6 lg:ml-10 bg-white "
            >
                {objects.map((object, index) => (
                    <div
                        key={index}
                        onClick={() => finishedObject.includes(object.name) && handleObjectClick(object)}
                        className={`px-6 my-6 x-8 border lg:w-100 text-lg rounded-md pt-2 pb-6 ${!finishedObject.includes(object.name) && "opacity-60"}`}
                    >
                        {/* <input type="radio" name="check" id="check" /> */}
                        <h2 className="ml-4 font-bold text-blue-default text-center">
                            {object.name}
                        </h2>
                        <h2 className="font-md">{object.desc}</h2>
                        <FaArrowRight className="float-right text-orange-default" />
                    </div>
                ))}
            </div>
            <div className="input flex justify-between lg:ml-24 lg:w-[960px] border  m-4 py-3 px-6 rounded-md space-x-5 ">
                <div>
                    <input
                        type="text"
                        placeholder="Add a short description"
                        className="outline-none bg-transparent lg:w-[600px]"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="text-blue-default font-bold"
                    >
                        Generate
                    </button>
                </div>
            </div>

            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                className="lg:w-[600px]  p-10 mt-20 bg-white shadow-lg lg:ml-[500px] "
            >
                {selectedObject && (
                    <Step
                        title={selectedObject.name}
                        desc={selectedObject.component}
                    />
                )}
                <div className="input flex border  my-4 py-3 px-5 rounded-md ">
                    <input
                        type="text"
                        placeholder="Add a short description"
                        className="outline-none  space-x-32 mr-4 lg:w-[500px] bg-transparent"
                        onChange={handleChange}
                        required
                        value={prompt}
                    />
                    <button
                        type="submit"
                        className="text-blue-default font-bold"
                        onClick={handleButtonClick}
                    >
                        Generate
                    </button>
                </div>
                <button onClick={handleCloseModal}>Close Modal</button>
            </ReactModal>

            <ReactModal
                isOpen={isSecModalOpen}
                onRequestClose={handleCloseModal}
                className="lg:w-[900px]  px-10 py-10 mt-20 bg-white shadow-lg lg:ml-[300px]"
            >
                {selectedObject && (
                    <PromptGet
                        title={selectedObject.name}
                        projectId={id as string}
                        query={prompt}
                        handelNext={handleNextObject}
                    />
                )}
                
            </ReactModal>
        </div> 
        </div>
    
    );
};

export default page;
