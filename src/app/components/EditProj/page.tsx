"use client";

import jsPDF from "jspdf";
import "jspdf-autotable";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useParams, useRouter } from "next/navigation";
import { FaEllipsisH } from "react-icons/fa";
import { baseURL } from "@/app/constants";
import ReactModal from "react-modal";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ExportPage from "../Export/page";

interface Project {
    name: string;
    _id: string;
}

export default function ({
    project = { name: "", _id: "" },
    remove,
    selected,
}: {
    project: Project;
    selected: boolean;
    remove: () => void;
}) {
    const { id } = useParams();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [openInput, setOpenInput] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [newName, setNewName] = useState(project.name);
    const navigate = useRouter();

    const [projectData, setProjectData] = useState<any>();
    const [pestleData, setPestleData] = useState<any>();
    const [logframeData, setLogframeData] = useState<any>([]);
    const [Data, setData] = useState<any>([]);
    const [error, setError] = useState<string | null>(null);
    const [promptData, setPromptData] = useState<any>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getCookie("token");
                setIsLoading(true);

                const promptResponse = await axios.get(
                    `${baseURL}/projects/prompts/latest/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setPromptData(promptResponse.data);

                const projectResponse = await axios.get(
                    `${baseURL}/projects/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setProjectData(projectResponse.data);

                const response = await axios.get(
                    `${baseURL}/projects/prompts/latest/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setPestleData(JSON.parse(response.data.pestle.response));

                const logframeData = JSON.parse(
                    response.data.logframe.response
                );
                setData(logframeData);
                setLogframeData(logframeData);
                setIsLoading(false);
                setIsLoading(false);
                return logframeData;
            } catch (error) {
                setError("Error fetching data");
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const regenerateData = async () => {
        try {
            const token = getCookie("token");
            setIsLoading(true);

            const promptResponse = await axios.get(
                `${baseURL}/projects/projects/generate-analysis/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setPromptData(promptResponse.data);

            const projectResponse = await axios.get(
                `${baseURL}/projects/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setProjectData(projectResponse.data);

            const response = await axios.post(
                `${baseURL}/projects/projects/generate-analysis/${id}`,
                { projectId: id },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setPestleData(JSON.parse(response.data.pestle.response));

            const logframeData = JSON.parse(response.data.logframe.response);
            setLogframeData(logframeData);
            setData(logframeData);
            return logframeData;
        } catch (error) {
            setError("Error fetching data");
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    };

    const checkResponseFormat = (response: any) => {
        const requiredFields = [
            "mission",
            "vision",
            "swot",
            "objectives",
            "values",
            "strategy",
            "logframe",
            "pestle",
        ];

        // Check if all required fields exist in the response
        for (const field of requiredFields) {
            if (!(field in response)) {
                return false;
            }
        }
        return true;
    };

    const handleProjectClick = async (projectId: string) => {
        try {
            const token = getCookie("token");
            const response = await axios.get(
                `${baseURL}/projects/prompts/latest/${projectId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (checkResponseFormat(response.data)) {
                navigate.push(`/components/Preview/${projectId}`);
            } else {
                navigate.push(`/components/step/${projectId}`);
            }
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching project data:", error);
        }
    };

    const handleDelete = async (projectId: string) => {
        try {
            const token = getCookie("token");
            await axios.delete(`${baseURL}/projects/${projectId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Delete API called");
            remove();
        } catch (error) {
            console.error("Error deleting:", error);
            console.log("proj id" + projectId);
        }
    };

    // Function to handle the printing
   const handlePrint = async (projectId: string) => {
       try {
           const token = getCookie("token");
           const response = await axios.get(
               `${baseURL}/projects/prompts/latest/${projectId}`,
               {
                   headers: {
                       "Content-Type": "application/json",
                       Authorization: `Bearer ${token}`,
                   },
               }
           );

           if (response.data) {
               const doc = new jsPDF();

              
               doc.setFontSize(18);
               doc.text(`Project: ${response.data.name}`, 10, 10);

               
               doc.setFontSize(12);
               doc.text(`Mission: ${response.data.mission}`, 10, 20);
               doc.text(`Vision: ${response.data.vision}`, 10, 30);
               doc.text(`Objectives: ${response.data.objectives}`, 10, 40);

              
               const pestleData = response.data.pestle;
               const tableColumnHeaders = ["Category", "Influence", "Impact"];
               const tableRows: any[] = [];

               [
                   "political",
                   "economic",
                   "social",
                   "technological",
                   "legal",
                   "environmental",
               ].forEach((category) => {
                   tableRows.push([
                       category.charAt(0).toUpperCase() + category.slice(1),
                       pestleData[category]?.inf || "",
                       pestleData[category]?.imp || "",
                   ]);
               });

             
               doc.save(`${response.data.name}_Project.pdf`);
           }
       } catch (error) {
           console.error("Error generating PDF:", error);
       }
   };


    return (
        <div
            className={`relative hover:bg-white hover:bg-opacity-20  px-10 py-3 mt-3  rounded-sm ${
                selected && "bg-transparent"
            }`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => {
                setIsHover(false);
                setOpenInput(false);
                setIsPopoverOpen(false);
            }}
        >
            <div
                className="  w-[auto] "
                onClick={() =>
                    isPopoverOpen === false && handleProjectClick(project._id)
                }
            >
                {openInput ? (
                    <input
                        className="bg-white text-white w-full"
                        type="text"
                        placeholder={project.name}
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                ) : (
                    <p>
                        {project.name.length > 20
                            ? project.name.slice(20) + "..."
                            : project.name}
                    </p>
                )}
            </div>
            {isHover && (
                <div
                    className="absolute z-index items-center justify-end bg-blue-default rounded  text-white top-2 translate-y-1/2 right-5"
                    onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                >
                    <FaEllipsisH />
                    {isPopoverOpen && (
                        <div
                            className="popover w-[200px] absolute left-0 text-black bg-[#fff] p-[10px]"
                            style={{
                                zIndex: "50",
                                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                                borderRadius: "4px",
                            }}
                        >
                            <ul className=" flex flex-col gap-3">
                                <li className=" hover:bg-gray-100  hover:cursor-pointer p-2">
                                    
                                    {promptData && (
                                        <PDFDownloadLink
                                            document={
                                                <ExportPage
                                                    projectData={projectData}
                                                    promptData={promptData} pestleData={null} logframeData={null} isLoading={false}                                                />
                                            }
                                            fileName={`${project.name}_document.pdf`}
                                        >
                                            {({ loading }) =>
                                                loading
                                                    ? "Loading document..."
                                                    : "Download PDF"
                                            }
                                        </PDFDownloadLink>
                                    )}
                                </li>

                                <li
                                    className=" hover:bg-gray-100  hover:cursor-pointer p-2"
                                    onClick={() => {
                                        setIsPopoverOpen(false);
                                        handleDelete(project._id);
                                    }}
                                >
                                    Delete
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            )}
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                className="lg:w-[600px] w-[90%] max-w-lg mx-auto p-8 mt-20 bg-white shadow-2xl rounded-lg"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
            >
                <form className="flex flex-col justify-center items-center gap-6">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                        Choose section to edit
                    </h2>

                    <div
                        className="bg-gray-100 h-20 w-full rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex items-center justify-center p-3 text-lg font-medium text-gray-700 hover:bg-gray-200"
                        onClick={() =>
                            navigate.push(`/components/Preview/${id}`)
                        }
                    >
                        Section A: Mission, Vision, Values, Strategies, SWOT
                    </div>

                    <div
                        className="bg-gray-100 h-20 w-full rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex items-center justify-center p-3 text-lg font-medium text-gray-700 hover:bg-gray-200"
                        onClick={() =>
                            navigate.push(`/components/Preview2/${id}`)
                        }
                    >
                        Section B: PESTLE Analysis
                    </div>

                    <div
                        className="bg-gray-100 h-20 w-full rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex items-center justify-center p-3 text-lg font-medium text-gray-700 hover:bg-gray-200"
                        onClick={() =>
                            navigate.push(`/components/Preview3/${id}`)
                        }
                    >
                        Section C: Logframe Analysis
                    </div>

                    <button
                        type="button"
                        onClick={handleCloseModal}
                        className="bg-blue-default text-white py-2 px-8 rounded-md  transition-colors duration-200"
                    >
                        Cancel
                    </button>
                </form>
            </ReactModal>
        </div>
    );
}
