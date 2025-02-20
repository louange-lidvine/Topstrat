"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useParams, useRouter } from "next/navigation";
import { FaEllipsisH } from "react-icons/fa";
import { baseURL } from "@/app/constants";
import EditModal from "../EdiModal";

// import PrintModal from "./printModal";
const PrintModal = dynamic(() => import("./printModal"), { ssr: false });
import { downloadPdf, downloadWord } from "@/app/utils/downloadPdf";
import Finals from "../Finals";

interface Project {
    name: string;
    _id: string;
}

function ProjectCard({
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
    const [isElite, setIsElite] = useState(false);
    const [projectData, setProjectData] = useState<any>();
    const [promptData, setPromptData] = useState<any>();
    const [pestleData, setPestleData] = useState<any>();
    const [logframeData, setLogframeData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
    const [isEditOpen, setEditOpen] = useState(false);

    const navigate = useRouter();

    // Fetching data methods...
    const fetchUserData = async () => {
        const userId = localStorage.getItem("userId");
        const token = getCookie("token");

        try {
            const response = await fetch(`${baseURL}/users/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();

                if (data.subscription === "Elite") {
                    setIsElite(true);
                } else {
                }
            } else {
                console.error("Failed to fetch user data");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

const handleDownloadFinals = async (
    projectId: string,
    format: "pdf" | "word"
) => {
    const elementId = `pdf-content_${projectId}`;

    // Check if projectId and project name are defined
    if (!projectId || !project?.name) {
        console.error("Project ID or name is missing");
        return;
    }

    console.log(`Downloading ${format} for project ID: ${projectId}`);

    if (format === "pdf") {
        // Show the cover page when downloading PDF
        await downloadPdf(elementId, project?.name || "project", {
            showCover: true,
        });
    } else if (format === "word") {
        // Hide the cover page when downloading Word
        await downloadWord(elementId, project?.name || "project", {
            showCover: false,
        });
    }
};

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
        fetchUserData();
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
                navigate.push(`/components/cover/${projectId}`);
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
            remove();
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    return (
        <div
            className={`relative group px-10 py-2 mt-1 rounded-sm transition-all duration-200 ${
                selected
                    ? "bg-white bg-opacity-20"
                    : "hover:bg-white hover:bg-opacity-20"
            }`}
        >
            {/* Project Name */}
            <div
                className="cursor-pointer"
                onClick={() => handleProjectClick(project._id)}
            >
                <p className="text-lg text-white truncate">
                    {project?.name?.length > 20
                        ? `${project?.name.slice(0, 16)}...`
                        : project?.name}
                </p>
            </div>

            {/* Popover Menu */}
            <div
                className="absolute top-3 right-5 cursor-pointer"
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            >
                <FaEllipsisH />
                {isPopoverOpen && (
                    <div
                        className="absolute right-0 bg-white text-gray-800 shadow-lg rounded-lg p-3 z-50"
                        style={{ minWidth: "180px" }}
                        onMouseLeave={() => setIsPopoverOpen(false)}
                    >
                        <ul className="flex flex-col gap-2">
                            <li
                                onClick={() => setIsPrintModalOpen(true)}
                                className="hover:bg-gray-100 p-2 rounded-md cursor-pointer"
                            >
                                Print
                            </li>
                            <li
                                onClick={() =>
                                    handleDownloadFinals(selectedId, "pdf")
                                }
                                className="hover:bg-gray-100 p-2 rounded-md cursor-pointer"
                            >
                                Download PDF
                            </li>

                            {isElite && (
                                <li
                                    onClick={() =>
                                        handleDownloadFinals(selectedId, "word")
                                    }
                                    className="hover:bg-gray-100 p-2 rounded-md cursor-pointer"
                                >
                                    Download Word
                                </li>
                            )}

                            <li
                                className="hover:bg-gray-100 p-2 rounded-md cursor-pointer"
                                onClick={() => setEditOpen(true)}
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

            {/* Edit Modal */}
            <EditModal
                isOpen={isEditOpen}
                onClose={() => setEditOpen(false)}
                id={project?._id}
                projectData={projectData}
                promptData={promptData}
                pestleData={pestleData}
                logframeData={logframeData}
            />

            {/* Print Modal */}
            <PrintModal
                isOpen={isPrintModalOpen}
                id={selectedId}
                onClose={() => setIsPrintModalOpen(false)}
                projectData={projectData}
                promptData={promptData}
                pestleData={pestleData}
                logframeData={logframeData}
                showCover={false}
            />

            {/* Hidden Finals Component */}
            <div className="hidden">
                <Finals id={selectedId} />
            </div>
        </div>
    );
}

export default ProjectCard;
