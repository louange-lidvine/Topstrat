"use client"
import React, { useEffect, useState } from "react";
import Finals from "../../Finals";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { baseURL } from "@/app/constants";
import axios from "axios";
import { getCookie } from "cookies-next";
import PrintModal from "../../EditProj/printModal";
import ReactModal from "react-modal";

function Page() {
    const { id } = useParams();
    const router = useRouter();
    const resolvedId = Array.isArray(id) ? id[0] : id;
     const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [promptData, setPromptData] = useState<any>();
    const [projectData, setProjectData] = useState<any>();
    const [pestleData, setPestleData] = useState<any>();
    const [logframeData, setLogframeData] = useState<any>([]);
    const [Data, setData] = useState<any>([]);
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [gravatarUrl, setGravatarUrl] = useState<string>(""); // Optional: Gravatar URL
    const [hasWatermark, setHasWatermark] = useState(false); // State for watermark



    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getCookie("token");
                setIsLoading(true);

                const promptResponse = await axios.get(
                    `${baseURL}/projects/prompts/latest/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setPromptData(promptResponse.data);

                const projectResponse = await axios.get(
                    `${baseURL}/projects/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setProjectData(projectResponse.data);

                const response = await axios.get(
                    `${baseURL}/projects/prompts/latest/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setPestleData(JSON.parse(response.data.pestle.response));

                const logframeData = JSON.parse(
                    response.data.logframe.response
                );
                setData(logframeData);
                setLogframeData(logframeData);
                setIsLoading(false);
                return logframeData;
            } catch (error) {
                setError("Error fetching data");
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    
      useEffect(() => {
          // Fetch project data
          const getProject = async (id: string) => {
              try {
                  const token = getCookie("token");
                  const response = await axios.get(
                      `${baseURL}/projects/${id}`,
                      {
                          headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                          },
                      }
                  );
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


 

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };


       const regenerateData = async () => {
        try {
            const token = getCookie("token");
            setIsLoading(true);

            const promptResponse = await axios.get(
                `${baseURL}/projects/projects/generate-analysis/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setPromptData(promptResponse.data);

            const projectResponse = await axios.get(
                `${baseURL}/projects/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setProjectData(projectResponse.data);

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

            setPestleData(JSON.parse(response.data.pestle.response));

            const logframeData = JSON.parse(response.data.logframe.response);
            setLogframeData(logframeData);
            setData(logframeData);
            return logframeData;
        } catch (error) {
            setError("Error fetching data");
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    };

    return (
        <div className="border  border-blue-default my-2 rounded-md">
            <Finals id={resolvedId} />
             <div className="flex justify-center gap-8 my-5">
                               <button
                            onClick={()=>router.push('/components/Landingpage')}
                            className="bg-blue-400 text-white font-bold rounded-md py-3 px-6"
                        >
                            Save and Exit
                        </button>
                        <button className="bg-blue-default text-white font-bold rounded-md py-3 px-6" onClick={()=>{setIsPrintModalOpen(true)}}>
                        Download
                        </button>

                        <button
                            onClick={regenerateData}
                            className="bg-orange-default text-white font-bold rounded-md py-3 px-6"
                        >
                            Regenerate
                        </button>
                        <button
                            onClick={handleOpenModal}
                            className="bg-green-500 text-white font-bold rounded-md py-3 px-6"
                        >
                            Edit
                        </button>
                    </div>
                          <ReactModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                className="lg:w-[600px] w-[90%] max-w-lg mx-auto p-8 mt-20 bg-white shadow-2xl rounded-lg"
                overlayClassName="fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-start"
            >
                <form className="flex flex-col justify-center items-center gap-6">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                        Choose section to edit
                    </h2>
                    <div className="grid lg:grid-cols-2 gap-4">
                        <div
                            className="bg-gray-100 h-16 w-full rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex items-center justify-center p-3 text-lg font-medium text-gray-700 hover:bg-gray-200"
                            onClick={() =>
                                router.push(`/components/Preview/${id}`)
                            }
                        >
                            Section A: Mission, Vision, Values
                        </div>

                        <div
                            className="bg-gray-100 h-16 w-full rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex items-center justify-center p-3 text-lg font-medium text-gray-700 hover:bg-gray-200"
                            onClick={() =>
                                router.push(`/components/Preview1/${id}`)
                            }
                        >
                            Section B:SWOT Analysis
                        </div>

                        <div
                            className="bg-gray-100 h-16 w-full rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex items-center justify-center p-3 text-lg font-medium text-gray-700 hover:bg-gray-200"
                            onClick={() =>
                                router.push(`/components/Preview2/${id}`)
                            }
                        >
                            Section C: PESTLE Analysis
                        </div>
                        <div
                            className="bg-gray-100 h-16 w-full rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex items-center justify-center p-3 text-lg font-medium text-gray-700 hover:bg-gray-200"
                            onClick={() =>
                                router.push(`/components/Preview3/${id}`)
                            }
                        >
                            Section D: Objectives and strategies
                        </div>

                        <div
                            className="bg-gray-100 h-16 w-full rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex items-center justify-center p-3 text-lg font-medium text-gray-700 hover:bg-gray-200"
                            onClick={() =>
                                router.push(`/components/Preview4/${id}`)
                            }
                        >
                            Section D: Logframe Analysis
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleCloseModal}
                        className="bg-blue-default text-white py-2 px-8 rounded-md  transition-colors duration-200"
                    >
                        Cancel
                    </button>
                </form>
            </ReactModal>
              <PrintModal
          isOpen={isPrintModalOpen}
                id={resolvedId}
                onClose={() => setIsPrintModalOpen(false)}
                projectData={projectData}
                promptData={promptData}
                pestleData={pestleData}
                logframeData={logframeData}
            />
        </div>
    );
}

export default Page;
