"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { FaEllipsisH } from "react-icons/fa";
import { baseURL } from "@/app/constants";
import EditModal from "../EdiModal";

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
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [projectData, setProjectData] = useState<any>();
    const [promptData, setPromptData] = useState<any>();
    const [pestleData, setPestleData] = useState<any>();
    const [logframeData, setLogframeData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditOpen, setEditOpen] = useState(false);

    const navigate = useRouter();

    // Reference to the hidden div for PDF generation
    const printRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getCookie("token");
                setIsLoading(true);

                const pestleResponse = await axios.get(
                    `${baseURL}/projects/prompts/latest/${project._id}`, // replace resolvedId with project._id
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log("Pestle Response: ", pestleResponse.data.logframe);
                const logframeResponse = JSON.parse(
                    pestleResponse.data.logframe.response
                );

                // Ensure logframeData is an array
                setLogframeData(
                    Array.isArray(logframeResponse)
                        ? logframeResponse
                        : [logframeResponse]
                );
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [project._id]); // dependency on project._id

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

    const handleDownload = async () => {
        try {
            // Dynamically import jsPDF and html2canvas
            const { default: jsPDF } = await import("jspdf");
            const { default: html2canvas } = await import("html2canvas");

            const input = printRef.current;
            if (input) {
                // Use html2canvas to capture the div content
                const canvas = await html2canvas(input, { scale: 2 });
                const imgData = canvas.toDataURL("image/png");

                // Create a new jsPDF instance
                const pdf = new jsPDF("p", "mm", "a4");
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
                pdf.save(`${projectData?.name || "project"}.pdf`);
            }
        } catch (error) {
            console.error("Error generating PDF:", error);
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
            <div
                className="w-auto cursor-pointer"
                onClick={() => handleProjectClick(project._id)}
            >
                <p>
                    {project?.name?.length > 20
                        ? `${project?.name.slice(0, 16)}...`
                        : project?.name}
                </p>
            </div>

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
                                className="hover:bg-gray-100 p-2 rounded-md cursor-pointer"
                                onClick={handleDownload}
                            >
                                Download
                            </li>
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
            <EditModal
                isOpen={isEditOpen}
                onClose={() => setEditOpen(false)}
                id={project?._id}
            />

            {/* Hidden div to render content for PDF generation */}
            <div
                ref={printRef}
                style={{
                    position: "absolute",
                    left: "-10000px",
                    top: "0px",
                    width: "210mm", // A4 width size
                    minHeight: "297mm", // A4 height size
                    padding: "20mm",
                    backgroundColor: "white",
                }}
            >
                <div>
                    <h1 style={{ textAlign: "center" }}>{projectData?.name}</h1>
                    <h2>Mission</h2>
                    <p>{promptData?.mission?.response}</p>

                    <h2>Vision</h2>
                    <p>{promptData?.vision?.response}</p>

                    <h2>SWOT Analysis</h2>
                    <p>{promptData?.swot?.response}</p>

                    <h2>Objectives</h2>
                    <p>{promptData?.objectives?.response}</p>

                    <h2>Values</h2>
                    <p>{promptData?.values?.response}</p>

                    <h2>Strategy</h2>
                    <p>{promptData?.strategy?.response}</p>

                    {/* Include PESTLE Data */}
                    <h2>PESTLE Analysis</h2>
                    {pestleData && (
                        <ul>
                            {Object.entries(pestleData).map(
                                ([key, value]: any) => (
                                    <li key={key}>
                                        <strong>{key}:</strong> {value}
                                    </li>
                                )
                            )}
                        </ul>
                    )}

                    {/* Include Logframe Data */}
                    <h2>Logframe</h2>
                    {logframeData && (
                        <table border="1" cellPadding="5">
                            <thead>
                                <tr>
                                    <th>Goal</th>
                                    <th>Objective</th>
                                    <th>Outcome</th>
                                    <th>Output</th>
                                    <th>Activities</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logframeData.map(
                                    (item: any, index: number) => (
                                        <tr key={index}>
                                            <td>{item.goal}</td>
                                            <td>{item.objective}</td>
                                            <td>{item.outcome}</td>
                                            <td>{item.output}</td>
                                            <td>{item.activities}</td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;
