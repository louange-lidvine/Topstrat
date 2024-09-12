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
                    setSimpleData({
                        vision: response.data.vision.response,
                        mission: response.data.mission.response,
                        strategy: response.data.strategy.response,
                        objectives: response.data.objectives.response,
                    });
                    setEditableSwotData({
                        strengths:
                            JSON.parse(response.data.swot.response).strengths ||
                            {},
                        weaknesses:
                            JSON.parse(response.data.swot.response)
                                .weaknesses || {},
                        opportunities:
                            JSON.parse(response.data.swot.response)
                                .opportunities || {},
                        threats:
                            JSON.parse(response.data.swot.response).threats ||
                            {},
                    });
                    setPromptData(response.data);
                    setPromptId(response.data.pestle._id);
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
    }, []);
  const refetchData = async () => {
      try {
          const token = getCookie("token");
          setIsLoading(true);

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
              // Parse the stringified JSON in the response field
              const parsedSwotResponse = JSON.parse(
                  response.data.swot.response
              );

              // Set SWOT data using the parsed response
              setEditableSwotData({
                  strengths: parsedSwotResponse.strengths || [],
                  weaknesses: parsedSwotResponse.weaknesses || [],
                  opportunities: parsedSwotResponse.opportunities || [],
                  threats: parsedSwotResponse.threats || [],
              });

              // Set other project data (vision, mission, etc.) if needed
              setSimpleData({
                  vision: response.data.vision?.response || "",
                  mission: response.data.mission?.response || "",
                  strategy: response.data.strategy?.response || "",
                  objectives: response.data.objectives?.response || "",
              });

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
        if (!promptId) {
            console.error("Prompt ID is not available");
            return;
        }
        if (!editableSwotData && !simpleData) {
            console.error("No data to save");
            toast.error("No data to save. Please try again.");
            return;
        }

        const response = {
            vision: simpleData.vision,
            mission: simpleData.mission,
            objectives: simpleData.objectives,
            strategy: simpleData.strategy,
            swotData: editableSwotData,
        };

        try {
            const result = await axios.put(
                `${baseURL}/projects/prompts/${promptId}`,
                { response: JSON.stringify(response) },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Response from the API:", result.data);
            setSwotData(editableSwotData);
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
        // Create a new object by copying the current state
        const updatedSwotData = { ...editableSwotData };

        // Update the specific index in the array for the given type
        const updatedTypeArray = [...updatedSwotData[type]];
        updatedTypeArray[index] = value;

        // Update the state with the modified data
        updatedSwotData[type] = updatedTypeArray;

        // Set the new state
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
                    <div className="flex flex-col gap-3">
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
                                        className="bg-transparent"
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
                    <div className="flex flex-col gap-3">
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
                                        className="bg-transparent"
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
                    <div className="flex flex-col gap-3">
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
                                        className="bg-transparent"
                                        style={{
                                            height: "100px",
                                            width: "930px",
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
                                    <p
                                        onDoubleClick={() =>
                                            setIsEditingSimpleData(true)
                                        }
                                    >
                                        {promptData &&
                                            promptData.objectives &&
                                            promptData.objectives.response}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
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
                                        className="bg-transparent"
                                        style={{
                                            height: "100px",
                                            width: "930px",
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
                                    <p
                                        onDoubleClick={() =>
                                            setIsEditingSimpleData(true)
                                        }
                                    >
                                        {promptData &&
                                            promptData.strategy &&
                                            promptData.strategy.response}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                    {/* SWOT Analysis Section */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xl font-bold text-blue-default">
                            SWOT Analysis
                        </h3>
                        {isLoading ? (
                            <SwotSkeleton />
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Strengths */}
    <div className="flex flex-col gap-2 p-3">
        <h4 className="font-semibold text-blue-default">Strengths</h4>
        {editableSwotData?.strengths?.map((value: string, index: number) => (
            <div key={index} className="p-2">
                {isEditing ? (
                    <textarea
                        className="w-full h-24 p-2 border border-gray-200 rounded"
                        value={value}
                        onChange={(e) =>
                            handleTableDataChange("strengths", index, e.target.value)
                        }
                    />
                ) : (
                    <p
                        className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                        onDoubleClick={() => setIsEditing(true)}
                    >
                        {value}
                    </p>
                )}
            </div>
        ))}
    </div>

    {/* Weaknesses */}
    <div className="flex flex-col gap-2 p-3">
        <h4 className="font-semibold text-blue-default">Weaknesses</h4>
        {editableSwotData?.weaknesses?.map((value: string, index: number) => (
            <div key={index} className="p-2">
                {isEditing ? (
                    <textarea
                        className="w-full h-24 p-2 border border-gray-200 rounded"
                        value={value}
                        onChange={(e) =>
                            handleTableDataChange("weaknesses", index, e.target.value)
                        }
                    />
                ) : (
                    <p
                        className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                        onDoubleClick={() => setIsEditing(true)}
                    >
                        {value}
                    </p>
                )}
            </div>
        ))}
    </div>

    {/* Opportunities */}
    <div className="flex flex-col gap-2 p-3">
        <h4 className="font-semibold text-blue-default">Opportunities</h4>
        {editableSwotData?.opportunities?.map((value: string, index: number) => (
            <div key={index} className="p-2">
                {isEditing ? (
                    <textarea
                        className="w-full h-24 p-2 border border-gray-200 rounded"
                        value={value}
                        onChange={(e) =>
                            handleTableDataChange("opportunities", index, e.target.value)
                        }
                    />
                ) : (
                    <p
                        className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                        onDoubleClick={() => setIsEditing(true)}
                    >
                        {value}
                    </p>
                )}
            </div>
        ))}
    </div>

    {/* Threats */}
    <div className="flex flex-col gap-2 p-3">
        <h4 className="font-semibold text-blue-default">Threats</h4>
        {editableSwotData?.threats?.map((value: string, index: number) => (
            <div key={index} className="p-2">
                {isEditing ? (
                    <textarea
                        className="w-full h-24 p-2 border border-gray-200 rounded"
                        value={value}
                        onChange={(e) =>
                            handleTableDataChange("threats", index, e.target.value)
                        }
                    />
                ) : (
                    <p
                        className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                        onDoubleClick={() => setIsEditing(true)}
                    >
                        {value}
                    </p>
                )}
            </div>
        ))}
    </div>
</div>

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