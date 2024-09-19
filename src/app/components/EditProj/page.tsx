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
import ExportPage from "../Export/page"; // This is where PDF content is generated

interface Project {
    name: string;
    _id: string;
}

export default function ({
    project,
    remove,
    selected,
}: {
    project: Project;
    selected: boolean;
    remove: () => void;
}) {
    const { id } = useParams();
    const resolvedId = Array.isArray(id) ? id[0] : id; // Ensure `id` is a string
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [projectData, setProjectData] = useState<any>();
    const [promptData, setPromptData] = useState<any>();
    const [pestleData, setPestleData] = useState<any>();
    const [logframeData, setLogframeData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);

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

    const handleProjectClick = async (projectId: string) => {
        // Project click handler logic here
    };

    const handleDelete = async (projectId: string) => {
        // Delete project logic here
    };

    return (
        <div
            className={`relative hover:bg-white hover:bg-opacity-20 px-10 py-3 mt-3 rounded-sm ${
                selected && "bg-transparent"
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
                                <li className="hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                                    {typeof window !== "undefined" &&
                                        projectData &&
                                        promptData &&
                                        pestleData &&
                                        logframeData && (
                                            <PDFDownloadLink
                                                document={(() => (
                                                    <ExportPage
                                                        projectData={
                                                            projectData
                                                        }
                                                        promptData={promptData}
                                                        pestleData={pestleData}
                                                        logframeData={
                                                            logframeData
                                                        }
                                                        isLoading={isLoading}
                                                    />
                                                ))()}
                                                fileName={`${project.name}.pdf`}
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
        </div>
    );
}
