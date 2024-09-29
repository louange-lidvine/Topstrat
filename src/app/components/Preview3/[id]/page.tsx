"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { getCookie } from "cookies-next";
import Loader from "../../../shared/loader/page";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { baseURL } from "@/app/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiArrowBack } from "react-icons/bi";
import SbLoad from "@/app/shared/loader/sbload";

function Preview() {
    const { id } = useParams();
        const [isLoad, setIsLoad] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [promptData, setPromptData] = useState<any>();
    const [error, setError] = useState<string | null>(null);
    const [simpleData, setSimpleData] = useState({
        objectives: "",
        strategy: "",
    });
        const [userData, setUserData] = useState<any>(null); // Store user data here

    const[objectiveId,setObjectiveId]=useState<string|null>(null)
    const[strategyId,setStrategyId]=useState<string|null>(null)
    const [isEditingSimpleData, setIsEditingSimpleData] = useState(false);
    const [projectData, setProjectData] = useState<any>();
    const [logframeData, setLogframeData] = useState<any>({});
        const [gravatarUrl, setGravatarUrl] = useState<string>(""); // Optional: Gravatar URL
    const [hasWatermark, setHasWatermark] = useState(false);

  

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
                setProjectData(response.data);
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };
        getProject(id as string);
        setIsLoading(false);
    }, []);

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
                setSimpleData({
                    strategy: response.data.strategy.response,
                    objectives: response.data.objectives.response,
                });
                setObjectiveId(response.data.objectives._id)
                setStrategyId(response.data.strategy._id)

                setPromptData(response.data);
                const data = JSON.parse(response.data.logframe.response);
                setLogframeData(data);
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

    useEffect(() => {
        fetchData();
    }, [id]);

    const saveData = async () => {
        const token = getCookie("token");
        setIsLoad(true)

        if (!simpleData.objectives || !simpleData.strategy) {
            toast.error("No data to save. Please try again.");
            return;
        }

        const objectivesPayload = { response: simpleData.objectives };
        const strategyPayload = { response: simpleData.strategy };

        try {
            await Promise.all([
                axios.put(`${baseURL}/projects/prompts/${objectiveId}`, objectivesPayload, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }),
                axios.put(`${baseURL}/projects/prompts/${strategyId}`, strategyPayload, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }),
            ]);
       await fetchData();
            setIsEditingSimpleData(false);
            setIsLoad(false)
            toast.success("Data saved successfully!");
        } catch (error:any) {
            console.error("Error saving data:", error.message);
            toast.error("Failed to save data. Please try again.");
        }
    };

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

   setSimpleData({
                    strategy: response.data.strategy.response,
                    objectives: response.data.objectives.response,
                });
                setObjectiveId(response.data.objectives._id)
                setStrategyId(response.data.strategy._id)

                setPromptData(response.data);
                const data = JSON.parse(response.data.logframe.response);
                setLogframeData(data);
   
          
           
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


    return (
        <div
            className={`border border-blue-default mt-4 mb-12 lg:mb-4 rounded-md mx-2 p-4 font-medium ${
                hasWatermark ? "watermarked" : ""
            }`}
        >            <div className="justify-end flex gap-2 cursor-pointer" onClick={() => router.push('/')}>
                <BiArrowBack className="mt-1" />
                <p className="">Return to home</p>
            </div>
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
                    <div className="flex flex-col gap-3 no-scroll h-fit">
                        {isLoading ? (
                           <div className="w-full">
                    <Skeleton width={80} />
                    <Skeleton height={120} />
                  </div>
                        ) : (
                            <div>
                                <h3 className="text-xl font-bold text-blue-default">Objectives</h3>
                                <div className="my-2">
  <h1 className="text-lg font-bold">General objective</h1>
                                <p>{logframeData?.goal?.description}</p>
                                </div>
                              
                                <h1 className="text-lg font-bold">Specific objectives</h1>
                                {isEditingSimpleData ? (
                                    <textarea
                                        className="bg-transparent h-fit"
                                        style={{ height: "200px", width: "1100px" }}
                                        value={simpleData.objectives}
                                                                            onChange={(e) => {
    setSimpleData((prev) => ({
        ...prev,
        objectives: e.target.value,
    }));
    setIsEditingSimpleData(true); 
}}
                                    />
                                ) : (
                                    <ol   onDoubleClick={() =>
                                            setIsEditingSimpleData(true)
                                        }>
                                        {promptData?.objectives?.response?.split("\n").map((item:any, index:any) => (
                                            <li key={index} className="py-2">{item}</li>
                                        ))}
                                    </ol>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-3 no-scroll">
                        {isLoading ? (
                          <div className="w-full">
                    <Skeleton width={80} />
                    <Skeleton height={120} />
                  </div>
                        ) : (
                            <div>
                                <h3 className="text-xl font-bold text-blue-default">Strategy</h3>
                                {isEditingSimpleData ? (
                                    <textarea
                                        className="bg-transparent h-fit"
                                        style={{ height: "500px", width: "1100px" }}
                                        value={simpleData.strategy}
                                                                            onChange={(e) => {
    setSimpleData((prev) => ({
        ...prev,
    strategy: e.target.value,
    }));
    setIsEditingSimpleData(true);  
}}
                                    />
                                ) : (
                                    <ol   onDoubleClick={() =>
                                            setIsEditingSimpleData(true)
                                        }>
                                        {promptData?.strategy?.response?.split("\n").map((item:any, index:any) => (
                                            <li key={index} className="py-2">{item}</li>
                                        ))}
                                    </ol>
                                )}
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
                            className="bg-[#ED0C0C] text-white font-bold rounded-md py-3 px-6"
                            onClick={() => router.push(`../../components/Preview2/${id}`)}
                        >
                            Back
                        </button>
                      <button
                            type="submit"
                            disabled={isLoad}
                            onClick={saveData}
                            className={`bg-blue-default font-bold text-white py-2 px-6 rounded-md transition ${
                                isLoad
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-green-500"
                            }`}
                        >
                            {isLoad ? <SbLoad /> : "Save"}
                        </button>
                        <div
                            className="flex bg-blue-default text-white font-bold rounded-md py-3 px-6 cursor-pointer"
                            onClick={() => router.push(`/components/Preview4/${id}`)}
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