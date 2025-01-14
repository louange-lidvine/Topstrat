"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import ReactModal from "react-modal";
import Step from "../card";
import PromptGet from "../PromptGet";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaForward } from "react-icons/fa";
import { getCookie } from "cookies-next";
import axios from "axios";
import { redirect } from "next/navigation";
import { baseURL }from "@/app/constants";


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
        name: "values",
        desc: "Values are guiding principles shaping organizational culture.",
        component: Component3,
    },
    {
        name: "objectives",
        desc: "Objectives are measurable goals aligned with an organization's mission.",
        component: Component4,
    },
    {
        name: "SWOT",
        desc: "Summary of  Strength ,Weakness,Opportunities and Technology.",
        component: Component5,
    },
      { name: 'Logframe',desc:"The Logframe (Logical Framework) is a systematic project management tool." ,component: Component5 },
      { name: 'PESTLE',desc:"Project analysis based on factors like political,economic and others", component: Component6 },
];

const page: React.FC = () => {
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [prompt, setPrompt] = useState<string>();
    const [isSecModalOpen, setIsSecModalOpen] = useState<boolean>(false);
    const [selectedObject, setSelectedObject] = useState<ObjectData | null>(
        null
    );
    const [loading, setLoading] = useState<boolean>(true);
    const [projectData, setProjectData] = useState<any>();
    const [finishedObject, setFinishedObject] = useState<string[]>(["mission"]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [projectName, setProjectName] = useState<any>();

    const[editiing,setEditing]=useState<boolean>(false);
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
        setFinishedObject((prev) => [...prev, title]);
        const objectIndex = objects.findIndex(
            (object) => object.name === title
        );

        if (objectIndex === objects.length - 1) {
            router.push(`/components/Preview/${id}`);
        } else {
            setSelectedObject(objects[objectIndex + 1]);
            setIsModalOpen(true);
            setIsSecModalOpen(false);
        }
    };
    const checkResponseFormat = (response: any) => {
        const requiredFields = [
            "mission",
            "vision",
            "swot",
            "objective",
            "values",
            "strategy",
            "logframe",
            "PESTLE",
        ];

        for (const field of requiredFields) {
            if (response[field] !== null) {
                console.log(field);
                !finishedObject.includes(field) &&
                    setFinishedObject([...finishedObject, field]);
            }
        }
    };

    useEffect(() => {
        const getProject = async (id: string) => {
            try {
                const token = getCookie("token");
                const response = await axios.get(
                    `${baseURL}/projects/prompts/latest/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${
                              token
                            }`,
                        },
                    }
                );
                checkResponseFormat(response.data);
                setProjectData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };
        getProject(id as string);
        setLoading(false);
        console.log(finishedObject);
    }, []);

     useEffect(() => {
         const fetchData = async () => {
             try {
                 const token = getCookie("token");
                 setIsLoading(true);
                 const response = await axios.get(`${baseURL}/projects/${id}`, {
                     headers: {
                         "Content-Type": "application/json",
                         Authorization: `Bearer ${
                           token
                         }`,
                     },
                 });

                 setIsLoading(false);

                 if (response.data) {
                     setProjectName(response.data);
                 } else {
                     setError("No data received");
                 }
             } catch (error) {
                 setError("Error fetching data");
                 console.error("Error fetching data:", error);
                 setIsLoading(false);
             }
         };

         fetchData();
     }, []);

    const router = useRouter();

    return (
        <div className="border my-4 rounded-md w-full lg:mx-2 float-right lg:z-[9999]">
            <div className="input flex justify-center pt-4 items-center text-blue-default font-bold text-2xl">
              {projectName&&projectName.name}
            </div>
            {loading ? (
                <div className="flex items-center justify-center ">
                    <p>Loading</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 lg:w-full lg:py-20 lg:px-20 mt-6">
                    {objects.map((object, index) => (
                        <div
                            key={index}
                            onClick={() =>
                                finishedObject.includes(object.name) &&
                                handleObjectClick(object)
                            }
                            className={`relative my-6 border w-full lg:w-[calc(50% - 12px)] text-lg rounded-md pt-2 pb-6 ${
                                !finishedObject.includes(object.name) &&
                                "opacity-60 "
                            }`}
                        >
                            <h2 className="ml-4 font-bold text-blue-default text-center">
                                {object.name}
                            </h2>
                            <h2 className="font-md">{object.desc}</h2>
                            <FaArrowRight className="absolute bottom-2 right-2 text-orange-default" />
                        </div>
                    ))}
                </div>
            )}
            <div className="input flex justify-between lg:mx-auto lg:w-[90%] border m-4 py-3 px-6 rounded-md space-x-5">
                <div>
                    <input
                        type="text"
                        placeholder="Add a short description"
                        className="outline-none bg-transparent lg:w-full"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="hidden lg:text-blue-default font-bold"
                    >
                        Generate
                    </button>
                    <div className="lg:hidden block">
                        <FaForward className="text-blue-default" />
                    </div>
                </div>
            </div>

            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                className="p-10  mt-20 bg-white shadow-lg lg:w-full lg:max-w-[800px] mx-auto"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"

            >
                {selectedObject && (
                    <Step
                        title={selectedObject.name}
                        desc={selectedObject.component}
                    />
                )}
                <div className="input flex border my-4 py-3 px-5 rounded-md space-x-5">
                    <input
                        type="text"
                        placeholder="Add a short description"
                        className="outline-none bg-transparent flex-1 mr-4"
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
                className="px-10 py-10 mt-20 bg-white shadow-lg lg:w-full lg:max-w-[800px] mx-auto"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"

            
            >
                <div className="overflow-y-auto max-h-[70vh]">
                     {selectedObject && (
                    <PromptGet
                        title={selectedObject.name}
                        projectId={id as string}
                        query={prompt}
                        handelNext={handleNextObject}
                    />
                )}
                </div>
               
            </ReactModal>
        </div>
    );
};

export default page;