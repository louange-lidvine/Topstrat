"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { getCookie } from "cookies-next";
import Loader from "../../../shared/loader/page";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SwotSkeleton from "../../skeletons/SwotSkeleton";
import { baseURL } from "@/app/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const [objectivesId, setObjectivesId] = useState<string | null>(null);
    const [strategyId, setStrategyId] = useState<string | null>(null);
    const [swotId, setSwotId] = useState<string | null>(null);

    const [simpleData, setSimpleData] = useState({
        vision: "",
        mission: "",
        objectives: "",
        strategy: "",
    });
    const [isEditingSimpleData, setIsEditingSimpleData] = useState(false);
    const [editableSwotData, setEditableSwotData] = useState<any>(null);
    const [promptId, setPromptId] = useState<string | null>(null);

    const handleNextClick = () => {
        router.push(`/components/Preview2/${id}`);
    };

    useEffect(() => {
        const getProject = async (id: string) => {
            try {
                const token = getCookie("token");
                const response = await axios.get(`${baseURL}/projects/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                setProjectData(response.data);
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };
        getProject(id as string);
        console.log("projects");
        setIsLoading(false);
    }, []);

    useEffect(() => {
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
                    console.log(response.data);

                    // Set the fetched content for simpleData and SWOT analysis
                    setSimpleData({
                        vision: response.data.vision.response,
                        mission: response.data.mission.response,
                        strategy: response.data.strategy.response,
                        objectives: response.data.objectives.response,
                    });

                    // Parse SWOT response and set editable SWOT data
                    setEditableSwotData({
                        strengths:
                            JSON.parse(response.data.swot.response).strengths ||
                            [],
                        weaknesses:
                            JSON.parse(response.data.swot.response)
                                .weaknesses || [],
                        opportunities:
                            JSON.parse(response.data.swot.response)
                                .opportunities || [],
                        threats:
                            JSON.parse(response.data.swot.response).threats ||
                            [],
                    });

                    // Set individual section IDs
                    setVisionId(response.data.vision._id);
                    setMissionId(response.data.mission._id);
                    setObjectivesId(response.data.objectives._id);
                    setStrategyId(response.data.strategy._id);
                    setSwotId(response.data.swot._id);

                    // Store full prompt data for later use
                    setPromptData(response.data);
                    setPromptId(response.data.swot._id); // Storing the SWOT ID as the promptId
                } else {
                    setError("No data received");
                }
                setIsLoading(false);
            } catch (error) {
                setError("Error fetching data");
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]); // Dependencies updated

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
                    strategy: response.data.strategy?.response || "",
                    objectives: response.data.objectives?.response || "",
                });

                // Update individual section IDs in case they change after regeneration
                setVisionId(response.data.vision._id);
                setMissionId(response.data.mission._id);
                setObjectivesId(response.data.objectives._id);
                setStrategyId(response.data.strategy._id);
                setSwotId(response.data.swot._id);

                // Store prompt data after the refetch
                setPromptData(response.data);
            } else {
                setError("No data received");
            }

            setIsLoading(false);
        } catch (error) {
            setError("Error fetching data");
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    };

    const saveData = async () => {
        const token = getCookie("token");

        // Validate presence of IDs and data
        if (
            !visionId ||
            !missionId ||
            !objectivesId ||
            !strategyId ||
            !swotId
        ) {
            console.error("One or more required IDs are not available");
            return;
        }
        if (!editableSwotData && !simpleData) {
            console.error("No data to save");
            toast.error("No data to save. Please try again.");
            return;
        }

        // Prepare individual payloads for each section
        const visionPayload = { vision: simpleData.vision };
        const missionPayload = { mission: simpleData.mission };
        const objectivesPayload = { objectives: simpleData.objectives };
        const strategyPayload = { strategy: simpleData.strategy };
        const swotPayload = { swotData: editableSwotData };

        // Array of API calls with specific IDs
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
                `${baseURL}/projects/prompts/${objectivesId}`,
                objectivesPayload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            ),
            axios.put(
                `${baseURL}/projects/prompts/${strategyId}`,
                strategyPayload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            ),
            axios.put(`${baseURL}/projects/prompts/${swotId}`, swotPayload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }),
        ];

        try {
            // Send all requests concurrently
            const results = await Promise.all(apiCalls);
            console.log("Response from the API:", results);

            // Assuming success if all are resolved, update state accordingly
            setSwotData(editableSwotData);
            setIsEditing(false);
            setIsEditingSimpleData(false);
            console.log("Editable SWOT Data:", editableSwotData);
            console.log("Simple Data:", simpleData);
            // setPromptId(swotId); // Storing the SWOT ID as the promptId

            // Notify user of success
            toast.success("Data saved successfully!");
        } catch (error: any) {
            console.error(
                "Error saving data:",
                error.response ? error.response.data : error.message
            );
            toast.error("Failed to save data. Please try again.");
        }
    };

    const handleCellChange = (
        category: string,
        field: string,
        value: string
    ) => {
        setEditableSwotData((prevData: any) => ({
            ...prevData,
            [category]: {
                ...prevData[category],
                [field]: value,
            },
        }));
        setIsEditing(true);
    };

    const handleTableDataChange = (type: string, index: number, value: any) => {
        const updatedSwotData = { ...editableSwotData };

        const updatedTypeArray = [...updatedSwotData[type]];
        updatedTypeArray[index] = value;

        updatedSwotData[type] = updatedTypeArray;

        setEditableSwotData(updatedSwotData);
    };

    return (
        <div className="border border-blue-default mt-4 mb-12 lg:mb-4 rounded-md mx-2 p-4 font-medium">
            <div className="flex flex-col justify-center items-center gap-4 text-xl">
                <div className="text-gray-400 flex items-center justify-center border-2 p-3 rounded-md py-2 px-6">
                    {projectData && projectData.name}
                </div>
                <div className="text-yellow-500 font-bold">Preview</div>
                <div className="text-blue-default font-bold">
                    Strategic Plan {projectData && projectData.name}
                </div>
            </div>
            <div className="w-full mt-4">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        {isLoading ? (
                            <div className="w-full">
                                <Skeleton width={100} />
                                <Skeleton />
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-blue-default font-bold text-xl">
                                    Project Overview
                                </h3>
                                <p>{projectData && projectData.description}</p>
                            </div>
                        )}
                    </div>
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
                                            height: "100px",
                                            width: "930px",
                                        }}
                                        value={simpleData.vision}
                                        onChange={(e) =>
                                            setSimpleData((prev) => ({
                                                ...prev,
                                                vision: e.target.value,
                                            }))
                                        }
                                    />
                                ) : (
                                    <p
                                        onDoubleClick={() =>
                                            setIsEditingSimpleData(true)
                                        }
                                    >
                                        {promptData &&
                                            promptData.vision &&
                                            promptData.vision.response}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-3 no-scroll">
                        {isLoading ? (
                            <div className="w-full">
                                <Skeleton width={100} />
                                <Skeleton />
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
                                            height: "100px",
                                            width: "930px",
                                        }}
                                        value={simpleData.mission}
                                        onChange={(e) =>
                                            setSimpleData((prev) => ({
                                                ...prev,
                                                mission: e.target.value,
                                            }))
                                        }
                                    />
                                ) : (
                                    <p
                                        onDoubleClick={() =>
                                            setIsEditingSimpleData(true)
                                        }
                                    >
                                        {promptData &&
                                            promptData.mission &&
                                            promptData.mission.response}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-3 no-scroll h-fit">
                        {isLoading ? (
                            <div className="w-full">
                                <Skeleton width={100} />
                                <Skeleton />
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-xl font-bold text-blue-default">
                                    Objectives
                                </h3>
                                {isEditingSimpleData ? (
                                    <textarea
                                        className="bg-transparent h-fit"
                                        style={{
                                            height: "200px",
                                            width: "1100px",
                                        }}
                                        value={simpleData.objectives}
                                        onChange={(e) =>
                                            setSimpleData((prev) => ({
                                                ...prev,
                                                objectives: e.target.value,
                                            }))
                                        }
                                    />
                                ) : (
                                    <ol>
                                        {promptData?.objectives?.response
                                            ? promptData.objectives.response
                                                  .split("\n")
                                                  .map(
                                                      (
                                                          item: string,
                                                          index: number
                                                      ) => (
                                                          <li
                                                              key={index}
                                                              className="py-2"
                                                          >
                                                              {item}
                                                          </li>
                                                      )
                                                  )
                                            : null}
                                    </ol>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-3 no-scroll">
                        {isLoading ? (
                            <div className="w-full">
                                <Skeleton width={100} />
                                <Skeleton />
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-xl font-bold text-blue-default">
                                    Strategy
                                </h3>
                                {isEditingSimpleData ? (
                                    <textarea
                                        className="bg-transparent scr"
                                        style={{
                                            height: "500px",
                                            width: "1100px",
                                        }}
                                        value={simpleData.strategy}
                                        onChange={(e) =>
                                            setSimpleData((prev) => ({
                                                ...prev,
                                                strategy: e.target.value,
                                            }))
                                        }
                                    />
                                ) : (
                                    <ol>
                                        {promptData?.strategy?.response
                                            ? promptData.strategy.response
                                                  .split("\n")
                                                  .map(
                                                      (
                                                          item: string,
                                                          index: number
                                                      ) => (
                                                          <li
                                                              key={index}
                                                              className="py-2"
                                                          >
                                                              {item}
                                                          </li>
                                                      )
                                                  )
                                            : null}
                                    </ol>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-3">
                        <h3 className="text-xl font-bold text-blue-default">
                            SWOT Analysis
                        </h3>
                        {isLoading ? (
                            <SwotSkeleton />
                        ) : (
                            <table className="min-w-full table-auto border-collapse border border-gray-300">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 p-3 text-blue-default font-semibold">
                                            Strengths
                                        </th>
                                        <th className="border border-gray-300 p-3 text-blue-default font-semibold">
                                            Weaknesses
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 p-3 align-top">
                                            {editableSwotData?.strengths?.map(
                                                (
                                                    value: string,
                                                    index: number
                                                ) => (
                                                    <div
                                                        key={index}
                                                        className="p-2"
                                                    >
                                                        {isEditing ? (
                                                            <textarea
                                                                className="w-full overflow-y-hidden h-fit p-2 border border-gray-200 rounded resize-none"
                                                                value={value}
                                                                onChange={(e) =>
                                                                    handleTableDataChange(
                                                                        "strengths",
                                                                        index,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                rows={Math.max(
                                                                    2,
                                                                    value.split(
                                                                        "\n"
                                                                    ).length
                                                                )}
                                                            />
                                                        ) : (
                                                            <p
                                                                className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                                                                onDoubleClick={() =>
                                                                    setIsEditing(
                                                                        true
                                                                    )
                                                                }
                                                            >
                                                                {value}
                                                            </p>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </td>
                                        <td className="border border-gray-300 p-3 align-top">
                                            {editableSwotData?.weaknesses?.map(
                                                (
                                                    value: string,
                                                    index: number
                                                ) => (
                                                    <div
                                                        key={index}
                                                        className="p-2"
                                                    >
                                                        {isEditing ? (
                                                            <textarea
                                                                className="w-full overflow-y-hidden h-fit p-2 border border-gray-200 rounded resize-none"
                                                                value={value}
                                                                onChange={(e) =>
                                                                    handleTableDataChange(
                                                                        "weaknesses",
                                                                        index,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                rows={Math.max(
                                                                    2,
                                                                    value.split(
                                                                        "\n"
                                                                    ).length
                                                                )}
                                                            />
                                                        ) : (
                                                            <p
                                                                className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                                                                onDoubleClick={() =>
                                                                    setIsEditing(
                                                                        true
                                                                    )
                                                                }
                                                            >
                                                                {value}
                                                            </p>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="border border-gray-300 p-3 text-blue-default font-semibold">
                                            Opportunities
                                        </th>
                                        <th className="border border-gray-300 p-3 text-blue-default font-semibold">
                                            Threats
                                        </th>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 p-3 align-top">
                                            {editableSwotData?.opportunities?.map(
                                                (
                                                    value: string,
                                                    index: number
                                                ) => (
                                                    <div
                                                        key={index}
                                                        className="p-2"
                                                    >
                                                        {isEditing ? (
                                                            <textarea
                                                                className="w-full overflow-y-hidden h-fit p-2 border border-gray-200 rounded resize-none"
                                                                value={value}
                                                                onChange={(e) =>
                                                                    handleTableDataChange(
                                                                        "opportunities",
                                                                        index,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                rows={Math.max(
                                                                    2,
                                                                    value.split(
                                                                        "\n"
                                                                    ).length
                                                                )}
                                                            />
                                                        ) : (
                                                            <p
                                                                className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                                                                onDoubleClick={() =>
                                                                    setIsEditing(
                                                                        true
                                                                    )
                                                                }
                                                            >
                                                                {value}
                                                            </p>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </td>
                                        <td className="border border-gray-300 p-3 align-top">
                                            {editableSwotData?.threats?.map(
                                                (
                                                    value: string,
                                                    index: number
                                                ) => (
                                                    <div
                                                        key={index}
                                                        className="p-2"
                                                    >
                                                        {isEditing ? (
                                                            <textarea
                                                                className="w-full h-fit overflow-y-hidden  p-2 border border-gray-200 rounded resize-none"
                                                                value={value}
                                                                onChange={(e) =>
                                                                    handleTableDataChange(
                                                                        "threats",
                                                                        index,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                rows={Math.max(
                                                                    2,
                                                                    value.split(
                                                                        "\n"
                                                                    ).length
                                                                )}
                                                            />
                                                        ) : (
                                                            <p
                                                                className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                                                                onDoubleClick={() =>
                                                                    setIsEditing(
                                                                        true
                                                                    )
                                                                }
                                                            >
                                                                {value}
                                                            </p>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </div>

                    <div className="flex justify-center my-5 gap-8">
                        <button
                            className="bg-orange-default text-white font-bold rounded-md py-3 px-6"
                            onClick={refetchData}
                        >
                            Regenerate
                        </button>
                        <button
                            className="bg-green-500 text-white font-bold rounded-md  py-3 px-6"
                            onClick={saveData}
                            disabled={!isEditing}
                        >
                            Save
                        </button>
                        <div
                            className="flex bg-blue-default text-white font-bold rounded-md py-3 px-6 cursor-pointer"
                            onClick={() =>
                                router.push(`/components/Preview2/${id}`)
                            }
                        >
                            Next
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Preview;
