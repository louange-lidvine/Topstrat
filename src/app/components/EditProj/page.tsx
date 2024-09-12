import jsPDF from "jspdf";
import "jspdf-autotable";
import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { FaEllipsisH } from "react-icons/fa";
import { baseURL } from "@/app/constants";

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
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [openInput, setOpenInput] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [newName, setNewName] = useState(project.name);
    const navigate = useRouter();

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

                // Add project details to the PDF
                doc.setFontSize(18);
                doc.text(`Project: ${response.data.name}`, 10, 10);

                // Add more details like PESTLE analysis, etc. here
                doc.setFontSize(12);
                doc.text(`Mission: ${response.data.mission}`, 10, 20);
                doc.text(`Vision: ${response.data.vision}`, 10, 30);
                doc.text(`Objectives: ${response.data.objectives}`, 10, 40);

                // Example for a table
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

                doc.autoTable({
                    head: [tableColumnHeaders],
                    body: tableRows,
                });

                // Save the PDF
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
                                <li
                                    className=" hover:bg-gray-100  hover:cursor-pointer p-2"
                                    onClick={() => {
                                        setIsPopoverOpen(false);
                                        handleDelete(project._id);
                                    }}
                                >
                                    Delete
                                </li>
                                <li
                                    className=" hover:bg-gray-100  hover:cursor-pointer p-2"
                                    onClick={() => {
                                        setIsPopoverOpen(false);
                                        handlePrint(project._id);
                                    }}
                                >
                                    Print
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
