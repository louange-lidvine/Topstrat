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
import EdiTModal from "../../EdiModal";

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
    const [gravatarUrl, setGravatarUrl] = useState<string>(""); 
    const [hasWatermark, setHasWatermark] = useState(false); 
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);




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

                      if (response.data.gravatar) {
                          setGravatarUrl(response.data.gravatar);
                      }

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
                            onClick={()=>setIsEditModalOpen(true)}
                            className="bg-green-500 text-white font-bold rounded-md py-3 px-6"
                        >
                            Edit
                        </button>
                    </div>
            <EdiTModal isOpen={isEditModalOpen} onClose={()=>setIsEditModalOpen(false)} id={projectData._id} />
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
