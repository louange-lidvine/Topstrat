"use client";
import jsPDF from "jspdf";
import "jspdf-autotable";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useParams, useRouter } from "next/navigation";
import { FaEllipsisH } from "react-icons/fa";
import { baseURL } from "@/app/constants";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PrintModal from "./printModal";
import { resolve } from "path";

interface Project {
    name: string;
    _id: string;
}

export default function ProjectCard({
    project,
    remove,
    selected,
    selectedId,
}: {
    project: Project;
    selected: boolean;
    selectedId: string;
    remove: () => void;
}) {
    const { id } = useParams();
    const resolvedId = Array.isArray(id) ? id[0] : id;
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [projectData, setProjectData] = useState<any>();
    const [promptData, setPromptData] = useState<any>();
    const [pestleData, setPestleData] = useState<any>();
    const [logframeData, setLogframeData] = useState<any>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
    const navigate = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getCookie("token");
                setIsLoading(true);

                const promptResponse = await axios.get(
                    `${baseURL}/projects/prompts/latest/${resolvedId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setPromptData(promptResponse.data);

                const projectResponse = await axios.get(
                    `${baseURL}/projects/${resolvedId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setProjectData(projectResponse.data);

                const pestleResponse = await axios.get(
                    `${baseURL}/projects/prompts/latest/${resolvedId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setPestleData(JSON.parse(pestleResponse.data.pestle.response));
                setLogframeData(
                    JSON.parse(pestleResponse.data.logframe.response)
                );
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [resolvedId]);

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
            console.log("Project deleted successfully");
            remove(); // Update UI after deleting the project
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    return (
        <div
            className={`relative group px-10 py-3 mt-3 rounded-sm transition-all duration-200 ${
                selected
                    ? "bg-white bg-opacity-20"
                    : "hover:bg-white hover:bg-opacity-20"
            }`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => {
                setIsHover(false);
                setIsPopoverOpen(false);
            }}
        >
            <div
                className="w-auto"
                onClick={() =>
                    !isPopoverOpen && handleProjectClick(project._id)
                }
            >
                <p>
                    {project.name.length > 20
                        ? `${project.name.slice(0, 16)}...`
                        : project.name}
                </p>
            </div>

            {isHover && (
                <div
                    className="absolute z-index items-center justify-end rounded text-white top-2 translate-y-1/2 right-5"
                    onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                >
                    <FaEllipsisH />
                    {isPopoverOpen && (
                        <div
                            className="absolute right-0 bg-white text-gray-800 shadow-lg rounded-lg p-3 z-50"
                            style={{ minWidth: "180px" }}
                        >
                            <ul className="flex flex-col gap-2">
                                <li
                                    onClick={() => {
                                        setIsPrintModalOpen(true);
                                    }}
                                    className="hover:bg-gray-100 p-2 rounded-md cursor-pointer"
                                >
                                    Print
                                </li>

                                <li
                                    className="hover:bg-gray-100 p-2 rounded-md cursor-pointer"
                                    onClick={() =>
                                        navigate.push(
                                            `/components/Preview/${resolvedId}`
                                        )
                                    }
                                >
                                    Edit
                                </li>
                                <li
                                    className="hover:bg-red-100 text-red-600 p-2 rounded-md cursor-pointer"
                                    onClick={() => handleDelete(project._id)}
                                >
                                    Delete
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            )}
            <PrintModal
                isOpen={isPrintModalOpen}
                id={selectedId}
                onClose={() => setIsPrintModalOpen(false)}
                projectData={projectData}
                promptData={promptData}
                pestleData={pestleData}
                logframeData={logframeData}
            />
        </div>
    );
}
