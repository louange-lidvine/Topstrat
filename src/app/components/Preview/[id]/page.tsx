"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { getCookie } from "cookies-next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { baseURL } from "@/app/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiArrowBack } from "react-icons/bi";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ExportPage from "../../Export/page";
import '../../../globals.css'

function Preview() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [promptData, setPromptData] = useState<any>();
    const [error, setError] = useState<string | null>(null);
    const [swotData, setSwotData] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [projectData, setProjectData] = useState<any>();
    const [visionId, setVisionId] = useState<string | null>(null);
    const [missionId, setMissionId] = useState<string | null>(null);
    const [valuesId, setValuesId] = useState<string | null>(null);
    const [simpleData, setSimpleData] = useState({
        vision: "",
        mission: "",
        values: "",
    });
    const [isEditingSimpleData, setIsEditingSimpleData] = useState(false);
    const [editableSwotData, setEditableSwotData] = useState<any>(null);
    const [promptId, setPromptId] = useState<string | null>(null);

    const [userData, setUserData] = useState<any>(null); // Store user data here
    const [gravatarUrl, setGravatarUrl] = useState<string>(""); // Optional: Gravatar URL
    const [hasWatermark, setHasWatermark] = useState(false); // State for watermark

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
        setIsLoading(false);
    }, [id]);

    const renderList = (data: string | undefined) => {
        if (typeof data !== "string") {
            return (
                <ul>
                    <li>Loading...</li>
                </ul>
            );
        }

        return (
            <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
                {data
                    .split(/\d+\.\s*/)
                    .filter((item) => item.trim() !== "")
                    .map((item, index) => (
                        <li
                            key={index}
                            style={{
                                marginBottom: "8px",
                                fontSize: "16px",
                                color: "#333",
                            }}
                        >
                            {item.trim()}
                        </li>
                    ))}
            </ul>
        );
    };

    const fetchData = async () => {
        try {
            const token = getCookie("token");
            setIsLoading(true);

            // Fetching the latest project data
            const response = await axios.get(
                `${baseURL}/projects/prompts/latest/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data) {
                console.log("Prompt data:", response.data);

                // Set the fetched content for simpleData and SWOT analysis
                setSimpleData({
                    vision: response.data.vision.response,
                    mission: response.data.mission.response,
                    values: response.data.values.response,
                });

                // Parse SWOT response and set editable SWOT data
                setEditableSwotData({
                    strengths:
                        JSON.parse(response.data.swot.response).strengths || [],
                    weaknesses:
                        JSON.parse(response.data.swot.response).weaknesses ||
                        [],
                    opportunities:
                        JSON.parse(response.data.swot.response).opportunities ||
                        [],
                    threats:
                        JSON.parse(response.data.swot.response).threats || [],
                });

                // Set individual section IDs
                setVisionId(response.data.vision._id);
                setMissionId(response.data.mission._id);
                setValuesId(response.data.values._id);

                // Store prompt data for later use
                setPromptData(response.data);
                setPromptId(response.data.swot._id); // Storing the SWOT ID as the promptId
            } else {
                setError("No data received.");
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching prompt data:", error);
            setError("Error fetching prompt data.");
            setIsLoading(false);
        }
    };

    // useEffect for initial fetch
    useEffect(() => {
        fetchData();
    }, [id]);

    const refetchData = async () => {
        try {
            const token = getCookie("token");
            setIsLoading(true);

            // Sending request to regenerate the analysis
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

            console.log("API Response:", response.data);

            if (response.data && response.data.swot?.response) {
                // Parse the SWOT response and update editable SWOT data
                const parsedSwotResponse = JSON.parse(
                    response.data.swot.response
                );

                setEditableSwotData({
                    strengths: parsedSwotResponse.strengths || [],
                    weaknesses: parsedSwotResponse.weaknesses || [],
                    opportunities: parsedSwotResponse.opportunities || [],
                    threats: parsedSwotResponse.threats || [],
                });

                // Update simpleData with the new refetched data
                setSimpleData({
                    vision: response.data.vision?.response || "",
                    mission: response.data.mission?.response || "",
                    values: response.data.values?.response || "",
                });

                // Update individual section IDs in case they change after regeneration
                setVisionId(response.data.vision._id);
                setMissionId(response.data.mission._id);
                setValuesId(response.data.values._id);

                // Store prompt data after the refetch
                setPromptData(response.data);
            } else {
                setError("No data received.");
            }

            setIsLoading(false);
        } catch (error) {
            console.error("Error refetching data:", error);
            setError("Error refetching data.");
            setIsLoading(false);
        }
    };

    const saveData = async () => {
        const token = getCookie("token");
        console.log(simpleData);

        // Validate presence of IDs and data
        if (!visionId || !missionId || !valuesId) {
            console.error("One or more required IDs are not available");
            toast.error("One or more required IDs are missing.");
            return;
        }

        if (
            !simpleData ||
            (!simpleData.vision && !simpleData.mission && !simpleData.values)
        ) {
            console.error("No data to save");
            toast.error("No data to save. Please try again.");
            return;
        }

        // Prepare payloads
        const visionPayload = { response: simpleData.vision };
        const missionPayload = { response: simpleData.mission };
        const valuesPayload = { response: simpleData.values };

        // Make the API calls
        const apiCalls = [
            axios.put(
                `${baseURL}/projects/prompts/${visionId}`,
                visionPayload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            ),
            axios.put(
                `${baseURL}/projects/prompts/${missionId}`,
                missionPayload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            ),
            axios.put(
                `${baseURL}/projects/prompts/${valuesId}`,
                valuesPayload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            ),
        ];

        try {
            await Promise.all(apiCalls);
            console.log("Response from the API: Data saved successfully!");

            // Refetch data
            await fetchData();

            setIsEditing(false);
            setIsEditingSimpleData(false);
            toast.success("Data saved successfully!");
        } catch (error: any) {
            console.error(
                "Error saving data:",
                error.response ? error.response.data : error.message
            );
            toast.error("Failed to save data. Please try again.");
        }
    };

    return (
        <div
            className={`border border-blue-default mt-4 mb-12 lg:mb-4 rounded-md mx-2 p-4 font-medium ${
                hasWatermark ? "watermarked" : ""
            }`}
        >
            <div
                className="justify-end flex gap-2 cursor-pointer"
                onClick={() => router.push("/")}
            >
                <BiArrowBack className="mt-1" />
                <p>Return to home</p>
            </div>

            {/* Display user information and Gravatar if available */}
            {userData && (
                <div className="flex items-center gap-4 mb-4">
                    {gravatarUrl && (
                        <img
                            src={gravatarUrl}
                            alt="User Gravatar"
                            className="w-16 h-16 rounded-full"
                        />
                    )}
                    {/* <div>
                        <p className="font-bold">User: {userData.name}</p>
                        <p className="text-gray-500">Email: {userData.email}</p>
                        <p className="text-gray-500">
                            Subscription: {userData.subscription}
                        </p>
                    </div> */}
                </div>
            )}

            {/* Main Content */}
            <div className="flex flex-col justify-center items-center gap-4 text-xl">
                <div className="text-gray-400 flex items-center justify-center border-2 p-3 rounded-md py-2 px-6">
                    {projectData && projectData.name}
                </div>
                <div className="text-yellow-500 font-bold">Preview</div>
                <div className="text-blue-default font-bold">
                    Strategic Plan {projectData && projectData.name}
                </div>
            </div>

            {/* Page Content */}
            <div className="w-full mt-4">
                <div className="flex flex-col gap-6">
                    {/* Introduction Section */}
                    <div className="flex flex-col gap-4">
                        {isLoading ? (
                            <div className="w-full">
                                <Skeleton width={100} />
                                <Skeleton />
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-blue-default font-bold text-xl">
                                    Introduction
                                </h3>
                                <p>{projectData && projectData.description}</p>
                            </div>
                        )}
                    </div>

                    {/* Vision Section */}
                    <div className="flex flex-col gap-3 no-scroll">
                        {isLoading ? (
                            <div className="w-full">
                                <Skeleton width={100} />
                                <Skeleton height={30} />
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-xl font-bold text-blue-default">
                                    Vision
                                </h3>
                                {isEditingSimpleData ? (
                                    <textarea
                                        className="bg-transparent h-fit"
                                        style={{
                                            height: "150px",
                                            width: "100%",
                                        }}
                                        value={simpleData.vision}
                                        onChange={(e) => {
                                            setSimpleData((prev) => ({
                                                ...prev,
                                                vision: e.target.value,
                                            }));
                                            setIsEditing(true);
                                        }}
                                    />
                                ) : (
                                    <p
                                        onDoubleClick={() =>
                                            setIsEditingSimpleData(true)
                                        }
                                    >
                                        {promptData?.vision?.response || ""}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mission Section */}
                    <div className="flex flex-col gap-3 no-scroll">
                        {isLoading ? (
                            <div className="w-full">
                                <Skeleton width={100} />
                                <Skeleton height={30} />
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-xl font-bold text-blue-default">
                                    Mission
                                </h3>
                                {isEditingSimpleData ? (
                                    <textarea
                                        className="bg-transparent h-fit"
                                        style={{
                                            height: "150px",
                                            width: "100%",
                                        }}
                                        value={simpleData.mission}
                                        onChange={(e) => {
                                            setSimpleData((prev) => ({
                                                ...prev,
                                                mission: e.target.value,
                                            }));
                                            setIsEditing(true);
                                        }}
                                    />
                                ) : (
                                    <p
                                        onDoubleClick={() =>
                                            setIsEditingSimpleData(true)
                                        }
                                    >
                                        {promptData?.mission?.response || ""}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Values Section */}
                    <div className="flex flex-col gap-3">
                        {isLoading ? (
                            <div className="w-full">
                                <Skeleton width={80} />
                                <Skeleton height={80} />
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-xl font-bold">
                                    <p
                                        style={{
                                            fontSize: "20px",
                                            fontWeight: "bold",
                                            color: "#0B6C79",
                                        }}
                                    >
                                        Values
                                    </p>
                                </h3>
                                {isEditing ? (
                                    <textarea
                                        className="bg-transparent h-fit"
                                        style={{
                                            height: "250px",
                                            width: "100%",
                                        }}
                                        value={simpleData.values}
                                        onChange={(e) => {
                                            setSimpleData((prev) => ({
                                                ...prev,
                                                values: e.target.value,
                                            }));
                                            setIsEditing(true);
                                        }}
                                    />
                                ) : (
                                    <ul
                                        onDoubleClick={() => setIsEditing(true)}
                                    >
                                        {renderList(
                                            promptData?.values?.response
                                        )}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Regenerate and Save Buttons */}
                    <div className="flex justify-center my-5 gap-8">
                        <button
                            className="bg-orange-default text-white font-bold rounded-md py-3 px-6"
                            onClick={refetchData}
                        >
                            Regenerate
                        </button>
                        <button
                            className="bg-green-500 text-white font-bold rounded-md cursor-pointer py-3 px-6"
                            onClick={saveData}
                            disabled={!isEditing}
                        >
                            Save
                        </button>
                        <div
                            className="flex bg-blue-default text-white font-bold rounded-md py-3 px-6 cursor-pointer"
                            onClick={() =>
                                router.push(`/components/Preview1/${id}`)
                            }
                        >
                            Next
                        </div>
                        {/* <div className="flex bg-blue-default text-white font-bold py-3 px-6 rounded-md">
                            <PDFDownloadLink
                                document={
                                    <ExportPage
                                        projectData={projectData}
                                        promptData={promptData}
                                        pestleData={swotData}
                                        logframeData={swotData?.logframe}
                                        isLoading={false} // hasWatermark={hasWatermark}
                                    />
                                }
                                fileName="preview.pdf"
                            >
                                {({ loading }) =>
                                    loading
                                        ? "Loading document..."
                                        : "Download PDF"
                                }
                            </PDFDownloadLink>
                        </div> */}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Preview;
