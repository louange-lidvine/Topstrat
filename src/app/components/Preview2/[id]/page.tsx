"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PestleSkeleton from "../../skeletons/PestleSkeleton";
import { baseURL } from "@/app/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiArrowBack } from "react-icons/bi";
import SbLoad from "@/app/shared/loader/sbload";
import '../../../globals.css'

function Preview() {
    const router = useRouter();
    const { id } = useParams();
        const [userData, setUserData] = useState<any>(null); // Store user data here
    const [gravatarUrl, setGravatarUrl] = useState<string>(""); // Optional: Gravatar URL

        const [isLoad, setIsLoad] = useState(false);
    const [hasWatermark, setHasWatermark] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [projectLoading, setProjectLoading] = useState(false);
    const [pestleLoading, setPestleLoading] = useState(false);
    const [projectData, setProjectData] = useState<any>();
    const [pestleData, setPestleData] = useState<any>(null);
    const [editablePestleData, setEditablePestleData] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [promptId, setPromptId] = useState<string | null>(null);

    useEffect(() => {
        const getProject = async (id: string) => {
            try {
                const token = getCookie("token");
                setProjectLoading(true);
                const response = await axios.get(`${baseURL}/projects/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProjectData(response.data);
            } catch (error) {
                console.error("Error fetching project data:", error);
            } finally {
                setProjectLoading(false);
            }
        };
        getProject(id as string);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const token = getCookie("token");
            setPestleLoading(true);
            try {
                const response = await axios.get(
                    `${baseURL}/projects/prompts/latest/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = JSON.parse(response.data.pestle.response);
                setPestleData(data);
                setEditablePestleData(data);
                setPromptId(response.data.pestle._id);
                console.table(data);
                console.log(data)
            } catch (error) {
                console.error("Error fetching PESTLE data:", error);
            } finally {
                setPestleLoading(false);
            }
        };

        fetchData();
    }, []);

        useEffect(() => {
        // Fetch project data
        const getProject = async (id: string) => {
            try {
                const token = getCookie("token");
                const response = await axios.get(`${baseURL}/projects/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Project data:", response.data);
                setProjectData(response.data);
            } catch (error) {
                console.error("Error fetching project data:", error);
                setError("Failed to fetch project data.");
            }
        };

        // Fetch user data using userId from localStorage
        const getUserData = async () => {
            try {
                const userId = localStorage.getItem("userId"); // Fetch userId from localStorage
                const token = getCookie("token");

                if (userId) {
                    const response = await axios.get(
                        `${baseURL}/users/${userId}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    console.log("User data:", response.data);
                    setUserData(response.data);

                    // Optional: If Gravatar URL is part of user data
                    if (response.data.gravatar) {
                        setGravatarUrl(response.data.gravatar);
                    }

                    // Check subscription type for watermark
                    if (response.data.subscription === "FreeTrial") {
                        setHasWatermark(true);
                    } else {
                        setHasWatermark(false);
                    }
                } else {
                    console.error("User ID not found in localStorage.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Failed to fetch user data.");
            }
        };

        getProject(id as string);
        getUserData();
   
    }, [id]);

    const saveData = async () => {
        const token = getCookie("token");
        setIsLoad(true)

        // Check if promptId is available
        if (!promptId) {
            console.error("Prompt ID is not available");
            toast.error("Prompt ID is missing, cannot save data.");
            return;
        }

        // Check if editablePestleData is available
        if (!editablePestleData) {
            console.error("Editable PESTLE data is missing");
            toast.error("No data to save. Please try again.");
            return;
        }

        // Prepare the response object (without converting to string)
        const response = {
            political: editablePestleData.political || {},
            economic: editablePestleData.economic || {},
            social: editablePestleData.social || {},
            technological: editablePestleData.technological || {},
            legal: editablePestleData.legal || {},
            environmental: editablePestleData.environmental || {},
        };

        console.log("Attempting to save data...");
        console.log(
            "PUT URL:",
            `${baseURL}/projects/prompts/latest/${promptId}`
        );
        console.log("Prompt ID:", promptId);
        console.log("Response Data:", response);

        try {
            const result = await axios.put(
                `${baseURL}/projects/prompts/${promptId}`, 
                { response: JSON.stringify(response) }, 
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Ensure token is valid
                    },
                }
            );

            // Log the API result
            console.log("Response from the API:", result.data);

            // Update the state with saved data
            setPestleData(editablePestleData);
            setIsLoad(false)
            setIsEditing(false);

            // Display success toast message
            toast.success("Data saved successfully?");
        } catch (error: any) {
            // Log the error for debugging
            if (error.response) {
                console.error(
                    "Error saving data (API response error):",
                    error.response.data
                );
            } else {
                console.error(
                    "Error saving data (Request error):",
                    error.message
                );
            }
            toast.error("Failed to save data. Please try again.");
        }
    };

    const refetchData = async () => {
        const token = getCookie("token");
        setPestleLoading(true);
        try {
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
            const data = JSON.parse(response.data.pestle.response);
            setPestleData(data);
            setEditablePestleData(data);
            setPromptId(response.data.pestle._id);
            console.log("updated successfully");
        } catch (error) {
            console.error("Error refetching data:", error);
        } finally {
            setPestleLoading(false);
        }
    };


    const handleCellChange = (
    category: string,
    field: string,
    value: string[]
) => {
    setEditablePestleData((prevData: any) => ({
        ...prevData,
        [category]: {
            ...prevData[category],
            [field]: value, 
        },
    }));
    setIsEditing(true);
};


const formatTextWithSpacing = (textArray: string[] | undefined): string => {
    if (!textArray || textArray.length === 0) return "";
    return textArray.join(". "); 
};


    

    return (
   <div
            className={`border border-blue-default mt-4 mb-12 lg:mb-4 rounded-md mx-2 p-4 font-medium ${
                hasWatermark ? "watermarked" : ""
            }`}
        >                  <div className="justify-end flex gap-2 cursor-pointer"  
                onClick={() =>
                                router.push('/')
                            }>
                                <BiArrowBack className="mt-1"/>
                                <p className="">Return to home</p>
                                </div>
            {projectLoading ? (
                <div>
                    <div className="flex flex-col justify-center items-center gap-4 text-2xl">
                        <Skeleton width={200} height={30} />
                        <div className="text-yellow-500 font-bold">
                            <Skeleton width={100} height={30} />
                        </div>
                        <div className="text-blue-default font-bold">
                            <Skeleton width={200} height={30} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="text-blue-default font-bold text-2xl py-5">
                            <Skeleton width={100} height={30} />
                        </div>
                        <PestleSkeleton />
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex flex-col justify-center items-center gap-4 text-xl">
                        <div className="text-gray-400 flex items-center justify-center border-2 p-3 rounded-md py-2 px-6">
                            {projectData && projectData.name}
                        </div>
                        <div className="text-yellow-500 font-bold">Preview</div>
                        <div className="text-blue-default font-bold">
                            Strategic Plan {projectData && projectData.name}
                        </div>
                    </div>
                    <div className="text-blue-default font-bold text-2xl py-5">
                        PESTLE Analysis
                    </div>
                    {pestleLoading ? (
                        <PestleSkeleton />
                    ) : (
                        <div className="overflow-x-auto">
                            {/* <table className="border border-1 m-auto">
                                <thead>
                                    <tr className="bg-slate-300">
                                        <th className="border border-1 p-2 text-blue-default font-bold text-center">
                                            Category
                                        </th>
                                        <th className="border border-1 p-2 text-blue-default font-bold text-center">
                                            Influence on organization
                                        </th>
                                        <th className="border border-1 p-2 text-blue-default font-bold text-center">
                                            Impact of organization's activities
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {editablePestleData && (
                                        <>
                                            {[
                                                "political",
                                                "economic",
                                                "social",
                                                "technological",
                                                "legal",
                                                "environmental",
                                            ].map((category) => (
                                                <tr key={category}>
                                                    <td className="border border-1 p-2 text-center font-bold bg-slate-300">
                                                        {category
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            category.slice(1)}
                                                    </td>
                                                    <td
                                                        className="border border-1 p-2"
                                                        contentEditable
                                                        suppressContentEditableWarning
                                                        onBlur={(e) =>
                                                            handleCellChange(
                                                                category,
                                                                "inf",
                                                                e.currentTarget
                                                                    .textContent ||
                                                                    ""
                                                            )
                                                        }
                                                        style={{
                                                            minWidth: "200px",
                                                        }}
                                                    >
                                                        {editablePestleData[
                                                            category
                                                        ]?.inf || ""}
                                                    </td>
                                                    <td
                                                        className="border border-1 p-2"
                                                        contentEditable
                                                        suppressContentEditableWarning
                                                        onBlur={(e) =>
                                                            handleCellChange(
                                                                category,
                                                                "imp",
                                                                e.currentTarget
                                                                    .textContent ||
                                                                    ""
                                                            )
                                                        }
                                                        style={{
                                                            minWidth: "200px",
                                                        }}
                                                    >
                                                        {editablePestleData[
                                                            category
                                                        ]?.imp || ""}
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                </tbody>
                            </table> */}

          <table className="border border-1 m-auto my-6">
            <thead>
                <tr className="bg-slate-300">
                    <th className="border border-1 p-4 text-blue-default font-bold text-center">
                        Category
                    </th>
                    <th className="border border-1 p-4 text-blue-default font-bold text-center">
                        Influence on organization
                    </th>
                    <th className="border border-1 p-4 text-blue-default font-bold text-center">
                        Impact of organization's activities
                    </th>
                </tr>
            </thead>
            <tbody>
                {editablePestleData && (
                    <>
                        {[
                                                "political",
                                                "economic",
                                                "social",
                                                "technological",
                                                "legal",
                                                "environmental",
                                            ].map((category) => (
                            <tr key={category}>
                                <td className="border border-1 p-4 text-center font-bold bg-slate-300">
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </td>
                                <td
                                    className="border border-1 p-4"
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) =>
                                        handleCellChange(
                                            category,
                                            "inf",
                                            e.currentTarget.textContent
                                                ? e.currentTarget.textContent.split(". ")
                                                : []
                                        )
                                    }
                                    style={{
                                        minWidth: "200px",
                                        whiteSpace: "pre-wrap", // Ensure multi-line display
                                    }}
                                >
                                    {formatTextWithSpacing(editablePestleData[category]?.inf || [])}
                                </td>
                                <td
                                    className="border border-1 p-4"
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) =>
                                        handleCellChange(
                                            category,
                                            "imp",
                                            e.currentTarget.textContent
                                                ? e.currentTarget.textContent.split(". ")
                                                : []
                                        )
                                    }
                                    style={{
                                        minWidth: "200px",
                                        whiteSpace: "pre-wrap", // Ensure multi-line display
                                    }}
                                >
                                    {formatTextWithSpacing(editablePestleData[category]?.imp || [])}
                                </td>
                            </tr>
                        ))}
                    </>
                )}
            </tbody>
        </table>
                        </div>
                    )}
                    <div className="flex justify-center my-5 gap-8">
                        <button
                            className="bg-[#ED0C0C] text-white font-bold rounded-md py-3 px-6"
                            onClick={() =>
                                router.push(`../../components/Preview1/${id}`)
                            }
                        >
                            Back
                        </button>
                        <button
                            className="bg-orange-default text-white font-bold rounded-md py-3 px-6"
                            onClick={refetchData}
                        >
                            Regenerate
                        </button>
                          <button
                            type="submit"
                            disabled={isLoad}
                            onClick={saveData}
                            className={`bg-blue-default text-white font-bold py-3 px-6 rounded-md transition ${
                                isLoad
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-green-500"
                            }`}
                        >
                            {isLoad ? <SbLoad /> : "Save"}
                        </button>
                        <div
                            className="flex bg-blue-default text-white font-bold rounded-md py-3 px-6 cursor-pointer"
                            onClick={() =>
                                router.push(`/components/Preview3/${id}`)
                            }
                        >
                            Next
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default Preview;
