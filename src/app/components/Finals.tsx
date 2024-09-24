"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Document, Page } from "@react-pdf/renderer";
import SwotSkeleton from "./skeletons/SwotSkeleton";
import PestleSkeleton from "./skeletons/PestleSkeleton";
import LogFrameSkeleton from "./skeletons/LogFrameSkeleton";
import Skeleton from "react-loading-skeleton";
import { baseURL } from "@/app/constants";
import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";
import Image from 'next/image'
import logo from '../../../public/assets/logo.png'
import cover from '../../../public/assets/cover3.svg'

interface FinalsProps {
    id: string;
}

function Finals({ id }: FinalsProps) {
    const router = useRouter();
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



    const renderList = (data: string) => {
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
    

    const renderTextWithBold = (text: string) => {
        const parts = text.split(/\*\*(.*?)\*\*/g);
        return parts.map((part, index) =>
            index % 2 === 1 ? (
                <strong key={index}>{part}</strong>
            ) : (
                <span key={index}>{part}</span>
            )
        );
    };

    const MyDocument = () => (
        <Document pageMode="fullScreen">
            <Page size="A4" style={{ margin: "auto" }}>
        <div className="relative w-full h-screen lg:max-w-6xl overflow-hidden ">
      <div className="relative w-full overflow-hidden">
        <Image
          src={cover}
          alt="Cover page image"
          className="w-full h-screen  object-cover"
        />
      </div>

      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-8 text-white">
        <div className="flex justify-between">
      <div className="flex flex-col items-start">
   <div className="bg-white p-2 rounded-md">
              <Image
                src={projectData?.logo ? projectData.logo : logo}
                alt="organization logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          <h2 className="text-xl font-bold mt-2 text-black">   {projectData && projectData.name}</h2>
          </div>     
        </div>

  
        <div className="flex flex-col items-start mt-20">
          <h1 className="text-5xl font-bold text-black">STRATEGIC PLAN</h1>
          <h2 className="text-2xl font-semibold text-black  mt-2">2024-2028</h2>
        </div>

        <div className="flex flex-col items-start mt-8 text-black">
           <div className="flex flex-col gap-4">
                        {isLoading ? (
                            <div className="w-full">
                                <Skeleton width={100} />
                                <Skeleton />
                            </div>
                        ) : (
                            <div className="w-[50%]">
                                <p>{projectData && projectData.description}</p>
                            </div>
                        )}
                    </div>
        </div>

        <div className="text-yellow-500 mt-8">
<h3 className="text-xl font-semibold">
  {projectData && new Date(projectData.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  })}
</h3>
          <p className="text-sm text-black mt-2">
            +250-792-531-980<br />
            {userData?.email}<br />
            www.cooky.com<br />
            BP 3451 KIGALI-RWANDA
          </p>
        </div>
      </div>
    </div>
                <div
                    className={`my-4 rounded-md mx-2 p-4 font-medium ${
                hasWatermark ? "watermarked" : "" }`}
                    id={`pdf-content_${id}`}  
                >
                    <div
                        className="justify-end flex gap-2 cursor-pointer"
                        onClick={() => router.push("/")}
                    >
                        <BiArrowBack className="mt-1" />
                        <p className="">Return to home</p>
                    </div>
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

                    <div className="flex flex-col  justify-center items-center gap-4 text-xl ">
                        <div className="text-gray-400   flex items-center justify-center border-2  p-3 rounded-md py-2  px-6">
                            {" "}
                            <p>{projectData && projectData.name}</p>
                        </div>
                        <div className="text-yellow-500 font-bold ">
                            <p>Preview</p>
                        </div>
                        <div className="text-blue-default font-bold  ">
                            <p>
                                Strategic Plan {projectData && projectData.name}
                            </p>{" "}
                        </div>
                    </div>
                    <div className=" w-full">
                        {" "}
                        <div className="flex flex-col gap-6 ">
                            <div className="flex flex-col gap-4 ">
                                {" "}
                                {isLoading ? (
                                    <div className="w-full">
                                        <Skeleton width={80} />
                                        <Skeleton />
                                    </div>
                                ) : (
                                    <div>
                                        <h3 className="text-blue-default font-bold text-xl">
                                            {" "}
                                            <p> Introduction </p>
                                        </h3>
                                        <p className="">
                                            <p>
                                                {" "}
                                                {projectData &&
                                                    projectData.description}
                                            </p>
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-3">
                                {isLoading ? (
                                    <div className="w-full">
                                        {" "}
                                        <div className="w-full">
                                            <Skeleton width={80} />
                                            <Skeleton height={30} />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <h3 className="text-xl font-bold">
                                            {" "}
                                            <p
                                                style={{
                                                    fontSize: "20px",
                                                    fontWeight: "bold",
                                                    color: "#0B6C79",
                                                }}
                                            >
                                                {" "}
                                                Vision
                                            </p>
                                        </h3>
                                        <p>
                                            <p>
                                                {promptData &&
                                                    promptData.vision &&
                                                    promptData.vision.response}
                                            </p>
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-3">
                                {isLoading ? (
                                    <div className="w-full">
                                        {" "}
                                        <div className="w-full">
                                            <Skeleton width={80} />
                                            <Skeleton height={30} />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <h3 className="text-xl font-bold">
                                            {" "}
                                            <p
                                                style={{
                                                    fontSize: "20px",
                                                    fontWeight: "bold",
                                                    color: "#0B6C79",
                                                }}
                                            >
                                                Mission
                                            </p>{" "}
                                        </h3>
                                        <p>
                                            <p>
                                                {promptData &&
                                                    promptData.mission &&
                                                    promptData.mission.response}
                                            </p>
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-3">
                                {isLoading ? (
                                    <div className="w-full">
                                        <Skeleton width={80} />
                                        <Skeleton height={80} />
                                    </div>
                                ) : (
                                    <div>
                                        <h3 className="text-xl font-bold">
                                            {" "}
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
                                        {promptData && promptData.values && (
                                            <ul>
                                                {renderList(
                                                    promptData.values.response
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 mt-5 ">
                        <div className="w-[100%] flex justify-center items-center">
                            {isLoading ? (
                                <div className="w-full">
                                    <Skeleton width={100} />
                                    <SwotSkeleton />
                                </div>
                            ) : (
                                <div>
                                    <h2 className="text-xl mb-4 font-bold text-blue-default">
                                        <p
                                            style={{
                                                fontSize: "20px",
                                                fontWeight: "bold",
                                                color: "#0B6C79",
                                            }}
                                        >
                                            SWOT ANALYSIS
                                        </p>
                                    </h2>

                                    <table
                                        style={{
                                            borderCollapse: "collapse",
                                            width: "100%",
                                            overflowX: "auto",
                                        }}
                                    >
                                        <thead>
                                            <tr style={{ color: "#0B6C79" }}>
                                                <th
                                                    style={{
                                                        border: "2px solid black",
                                                        padding: "6px",
                                                        textAlign: "left",
                                                        paddingLeft: "6px",
                                                        paddingTop: "3px",
                                                    }}
                                                >
                                                    Strengths (S)
                                                </th>
                                                <th
                                                    style={{
                                                        border: "2px solid black",
                                                        padding: "6px",
                                                        textAlign: "left",
                                                        paddingLeft: "6px",
                                                        paddingTop: "3px",
                                                    }}
                                                >
                                                    Weaknesses (W)
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Loop through all strengths and weaknesses */}
                                            {promptData &&
                                                promptData.swot &&
                                                promptData.swot.response &&
                                                JSON.parse(
                                                    promptData.swot.response
                                                ).strengths.map(
                                                    (
                                                        strength: string,
                                                        index: number
                                                    ) => (
                                                        <tr key={index}>
                                                            <td
                                                                style={{
                                                                    border: "2px solid black",
                                                                    padding:
                                                                        "6px",
                                                                    textAlign:
                                                                        "left",
                                                                    paddingLeft:
                                                                        "6px",
                                                                }}
                                                            >
                                                                <p>
                                                                    {strength}
                                                                </p>
                                                            </td>
                                                            <td
                                                                style={{
                                                                    border: "2px solid black",
                                                                    padding:
                                                                        "6px",
                                                                    textAlign:
                                                                        "left",
                                                                    paddingLeft:
                                                                        "6px",
                                                                }}
                                                            >
                                                                <p>
                                                                    {JSON.parse(
                                                                        promptData
                                                                            .swot
                                                                            .response
                                                                    )
                                                                        .weaknesses[
                                                                        index
                                                                    ] || ""}
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                        </tbody>

                                        <thead>
                                            <tr style={{ color: "#0B6C79" }}>
                                                <th
                                                    style={{
                                                        border: "2px solid black",
                                                        padding: "6px",
                                                        textAlign: "left",
                                                        paddingLeft: "6px",
                                                        paddingTop: "3px",
                                                    }}
                                                >
                                                    Opportunities (O)
                                                </th>
                                                <th
                                                    style={{
                                                        border: "2px solid black",
                                                        padding: "6px",
                                                        textAlign: "left",
                                                        paddingLeft: "6px",
                                                        paddingTop: "3px",
                                                    }}
                                                >
                                                    Threats (T)
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {promptData &&
                                                promptData.swot &&
                                                promptData.swot.response &&
                                                JSON.parse(
                                                    promptData.swot.response
                                                ).opportunities.map(
                                                    (
                                                        opportunity: string,
                                                        index: number
                                                    ) => (
                                                        <tr key={index}>
                                                            <td
                                                                style={{
                                                                    border: "2px solid black",
                                                                    padding:
                                                                        "6px",
                                                                    textAlign:
                                                                        "left",
                                                                    paddingLeft:
                                                                        "6px",
                                                                }}
                                                            >
                                                                <p>
                                                                    {
                                                                        opportunity
                                                                    }
                                                                </p>
                                                            </td>
                                                            <td
                                                                style={{
                                                                    border: "2px solid black",
                                                                    padding:
                                                                        "6px",
                                                                    textAlign:
                                                                        "left",
                                                                    paddingLeft:
                                                                        "6px",
                                                                }}
                                                            >
                                                                <p>
                                                                    {JSON.parse(
                                                                        promptData
                                                                            .swot
                                                                            .response
                                                                    ).threats[
                                                                        index
                                                                    ] || ""}
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col my-6"></div>
                        {isLoading ? (
                            <div className="w-full">
                                <Skeleton width={100} />
                                <PestleSkeleton />
                            </div>
                        ) : (
                            <div className="w-full">
                                <p
                                    style={{
                                        fontSize: "20px",
                                        fontWeight: "bold",
                                        color: "#0B6C79",
                                    }}
                                >
                                    PESTLE Analysis
                                </p>
                                <div className="flex flex-col gap-3">
                                    <table className="border border-1 m-auto">
                                        <thead>
                                            <tr className="bg-slate-300">
                                                <th className="border border-1 p-2 text-blue-default font-bold text-center"></th>
                                                <th className="border border-1 p-2 text-blue-default font-bold text-center">
                                                    Influence on organization
                                                </th>
                                                <th className="border border-1 p-2 text-blue-default font-bold text-center">
                                                    Impact of organization's
                                                    activities
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pestleData && (
                                                <>
                                                    <tr>
                                                        <td className="border border-1 p-2 text-center font-bold bg-slate-300">
                                                            Political
                                                        </td>
                                                        <td className="border border-1 p-2">
                                                            {
                                                                pestleData
                                                                    ?.political
                                                                    ?.inf
                                                            }
                                                        </td>
                                                        <td className="border border-1 p-2">
                                                            {
                                                                pestleData
                                                                    ?.political
                                                                    ?.imp
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-1 p-2 text-center font-bold bg-slate-300">
                                                            Economic
                                                        </td>
                                                        <td className="border border-1 p-2">
                                                            {
                                                                pestleData
                                                                    ?.economic
                                                                    ?.inf
                                                            }
                                                        </td>
                                                        <td className="border border-1 p-2">
                                                            {
                                                                pestleData
                                                                    ?.economic
                                                                    ?.imp
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-1 p-2 text-center font-bold bg-slate-300">
                                                            Social
                                                        </td>
                                                        <td className="border border-1 p-2">
                                                            {
                                                                pestleData
                                                                    ?.social
                                                                    ?.inf
                                                            }
                                                        </td>
                                                        <td className="border border-1 p-2">
                                                            {
                                                                pestleData
                                                                    ?.social
                                                                    ?.imp
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-1 p-2 text-center font-bold bg-slate-300">
                                                            Technological
                                                        </td>
                                                        <td className="border border-1 p-2">
                                                            {
                                                                pestleData
                                                                    ?.technological
                                                                    ?.inf
                                                            }
                                                        </td>
                                                        <td className="border border-1 p-2">
                                                            {
                                                                pestleData
                                                                    ?.technological
                                                                    ?.imp
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-1 p-2 text-center font-bold bg-slate-300">
                                                            Legal
                                                        </td>
                                                        <td className="border border-1 p-2">
                                                            {
                                                                pestleData
                                                                    ?.legal?.inf
                                                            }
                                                        </td>
                                                        <td className="border border-1 p-2">
                                                            {
                                                                pestleData
                                                                    ?.legal?.imp
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-1 p-2 text-center font-bold bg-slate-300">
                                                            Environmental
                                                        </td>
                                                        <td className="border border-1 p-2">
                                                            {
                                                                pestleData
                                                                    ?.environmental
                                                                    ?.inf
                                                            }
                                                        </td>
                                                        <td className="border border-1 p-2">
                                                            {
                                                                pestleData
                                                                    ?.environmental
                                                                    ?.imp
                                                            }
                                                        </td>
                                                    </tr>
                                                </>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                        <div className="flex flex-col gap-3">
                        {isLoading ? (
                            <div className="w-full">
                                <Skeleton width={80} />
                                <Skeleton height={80} />
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-xl mt-5 font-bold">
                                    {" "}
                                    <p
                                        style={{
                                            fontSize: "20px",
                                            fontWeight: "bold",
                                            color: "#0B6C79",
                                        }}
                                    >
                                        Objectives
                                    </p>{" "}
                                </h3>

                                <h1 className="font-bold my-2">General objective</h1>
                                <p>{logframeData?.goal?.description}</p>
                                <h1 className="font-bold my-2">Specific objectives</h1>
                                {promptData && promptData.objectives && (
                                    <ul>
                                        {renderList(
                                            promptData.objectives.response
                                        )}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>

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
                                        Strategy
                                    </p>{" "}
                                </h3>
                                <ol>
                                    {promptData?.strategy?.response
                                        ? promptData.strategy.response
                                              .split("\n")
                                              .map((item: any, index: any) => (
                                                  <li
                                                      key={index}
                                                      className="py-2"
                                                  >
                                                      {renderTextWithBold(item)}
                                                  </li>
                                              ))
                                        : null}
                                </ol>
                            </div>
                        )}
                    </div>
                    <div>
                        {isLoading ? (
                            <div className="w-full">
                                <Skeleton width={100} />
                                <LogFrameSkeleton />
                            </div>
                        ) : (
                            <div className="w-full">
                                <div className="flex flex-col gap-3">
                                    <div className="text-blue-default font-bold text-2xl py-5">
                                        Logframe
                                    </div>
                                    <h1>
                                        Goal : {logframeData?.goal?.description}
                                    </h1>
                                    <div className="overflow-x-auto">
                                        <table className="border border-1 m-auto">
                                            <thead>
                                                <tr className="bg-slate-300">
                                                    <th
                                                        className="border border-1 p-2  text-blue-default font-bold text-center"
                                                        colSpan={2}
                                                    >
                                                        Results Chain
                                                    </th>
                                                    <th className="border border-1 p-2 text-blue-default font-bold text-center">
                                                        Indicator
                                                    </th>
                                                    <th className="border border-1 p-2 text-blue-default font-bold text-center">
                                                        Baseline
                                                    </th>
                                                    <th className="border border-1 p-2 text-blue-default font-bold text-center">
                                                        Target
                                                    </th>
                                                    <th className="border border-1 p-2 text-blue-default font-bold text-center">
                                                        Timeline
                                                    </th>
                                                    <th className="border border-1 p-2 text-blue-default font-bold text-center">
                                                        Assumptions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {logframeData &&
                                                    logframeData.goal && (
                                                        <>
                                                            {/* Impact Level */}
                                                            <tr className="bg-slate-100">
                                                                <td className="border border-1 p-2  font-bold text-center">
                                                                    Impact
                                                                </td>
                                                                <td className="border border-1 p-2 ">
                                                                    {logframeData
                                                                        .goal
                                                                        .impact
                                                                        ?.description ||
                                                                        "-"}
                                                                </td>
                                                                <td className="border border-1 p-2">
                                                                    {logframeData
                                                                        .goal
                                                                        .impact
                                                                        ?.indicators &&
                                                                        Object.keys(
                                                                            logframeData
                                                                                .goal
                                                                                .impact
                                                                                .indicators
                                                                        ).map(
                                                                            (
                                                                                key,
                                                                                idx
                                                                            ) => {
                                                                                const indicator =
                                                                                    logframeData
                                                                                        .goal
                                                                                        .impact
                                                                                        .indicators[
                                                                                        key
                                                                                    ];
                                                                                return (
                                                                                    <div
                                                                                        key={
                                                                                            idx
                                                                                        }
                                                                                    >
                                                                                        <p>
                                                                                            {
                                                                                                key
                                                                                            }

                                                                                            :
                                                                                        </p>{" "}
                                                                                        ,
                                                                                    </div>
                                                                                );
                                                                            }
                                                                        )}
                                                                </td>
                                                                <td className="border border-1 p-2">
                                                                    {logframeData
                                                                        .goal
                                                                        .impact
                                                                        ?.indicators &&
                                                                        Object.keys(
                                                                            logframeData
                                                                                .goal
                                                                                .impact
                                                                                .indicators
                                                                        ).map(
                                                                            (
                                                                                key,
                                                                                idx
                                                                            ) => {
                                                                                const indicator =
                                                                                    logframeData
                                                                                        .goal
                                                                                        .impact
                                                                                        .indicators[
                                                                                        key
                                                                                    ];
                                                                                return (
                                                                                    <div
                                                                                        key={
                                                                                            idx
                                                                                        }
                                                                                    >
                                                                                        {indicator.baseline ||
                                                                                            ""}

                                                                                        ,
                                                                                    </div>
                                                                                );
                                                                            }
                                                                        )}
                                                                </td>
                                                                <td className="border border-1 p-2">
                                                                    {logframeData
                                                                        .goal
                                                                        .impact
                                                                        ?.indicators &&
                                                                        Object.keys(
                                                                            logframeData
                                                                                .goal
                                                                                .impact
                                                                                .indicators
                                                                        ).map(
                                                                            (
                                                                                key,
                                                                                idx
                                                                            ) => {
                                                                                const indicator =
                                                                                    logframeData
                                                                                        .goal
                                                                                        .impact
                                                                                        .indicators[
                                                                                        key
                                                                                    ];
                                                                                return (
                                                                                    <div
                                                                                        key={
                                                                                            idx
                                                                                        }
                                                                                    >
                                                                                        {indicator.target ||
                                                                                            "-"}
                                                                                    </div>
                                                                                );
                                                                            }
                                                                        )}
                                                                </td>
                                                                <td className="border border-1 p-2">
                                                                    {logframeData
                                                                        .goal
                                                                        .impact
                                                                        ?.timeline ||
                                                                        "-"}
                                                                </td>
                                                                <td className="border border-1 p-2">
                                                                    {logframeData
                                                                        .goal
                                                                        .impact
                                                                        ?.assumptions ||
                                                                        "-"}
                                                                </td>
                                                            </tr>

                                                            {/* Outcome Level */}
                                                            {logframeData.goal.impact?.outcomes?.map(
                                                                (
                                                                    outcomeItem: any,
                                                                    outcomeIndex: any
                                                                ) => (
                                                                    <React.Fragment
                                                                        key={`outcome-${outcomeIndex}`}
                                                                    >
                                                                        <tr
                                                                            className={
                                                                                outcomeIndex %
                                                                                    2 ===
                                                                                0
                                                                                    ? "bg-slate-100"
                                                                                    : "-"
                                                                            }
                                                                        >
                                                                            <td className="border border-1 p-2  font-bold text-center">
                                                                                Outcome{" "}
                                                                                {outcomeIndex +
                                                                                    1}{" "}
                                                                            </td>
                                                                            <td className="border border-1 p-2 ">
                                                                                {outcomeItem.description ||
                                                                                    "-"}
                                                                            </td>
                                                                            <td className="border border-1 p-2">
                                                                                {outcomeItem.indicator ||
                                                                                    "-"}
                                                                            </td>
                                                                            <td className="border border-1 p-2">
                                                                                {outcomeItem.baseline ||
                                                                                    "-"}
                                                                            </td>
                                                                            <td className="border border-1 p-2">
                                                                                {outcomeItem.target ||
                                                                                    "-"}
                                                                            </td>
                                                                            <td className="border border-1 p-2">
                                                                                {outcomeItem.timeline ||
                                                                                    "-"}
                                                                            </td>
                                                                            <td className="border border-1 p-2">
                                                                                {outcomeItem.assumptions ||
                                                                                    "-"}
                                                                            </td>
                                                                        </tr>

                                                                        {/* Output Level */}
                                                                        {outcomeItem.outputs?.map(
                                                                            (
                                                                                outputItem: any,
                                                                                outputIndex: any
                                                                            ) => (
                                                                                <React.Fragment
                                                                                    key={`output-${outputIndex}`}
                                                                                >
                                                                                    <tr
                                                                                        className={
                                                                                            outputIndex %
                                                                                                2 ===
                                                                                            0
                                                                                                ? "bg-slate-100"
                                                                                                : "-"
                                                                                        }
                                                                                    >
                                                                                        <td className="border border-1 p-2  font-bold text-center">
                                                                                            Output{" "}
                                                                                            {outcomeIndex +
                                                                                                1}

                                                                                            .
                                                                                            {outputIndex +
                                                                                                1}
                                                                                        </td>
                                                                                        <td className="border border-1 p-2 ">
                                                                                            {outputItem.description ||
                                                                                                "-"}
                                                                                        </td>
                                                                                        <td className="border border-1 p-2">
                                                                                            {outputItem.indicator ||
                                                                                                "-"}
                                                                                        </td>
                                                                                        <td className="border border-1 p-2">
                                                                                            {outputItem.baseline ||
                                                                                                "0"}
                                                                                        </td>
                                                                                        <td className="border border-1 p-2">
                                                                                            {outputItem.target ||
                                                                                                "-"}
                                                                                        </td>
                                                                                        <td className="border border-1 p-2">
                                                                                            {outputItem.timeline ||
                                                                                                "-"}
                                                                                        </td>
                                                                                        <td className="border border-1 p-2">
                                                                                            {outputItem.assumptions ||
                                                                                                "-"}
                                                                                        </td>
                                                                                    </tr>

                                                                                    {/* Activity Level */}
                                                                                    {outputItem.activities?.map(
                                                                                        (
                                                                                            activityItem: any,
                                                                                            activityIndex: any
                                                                                        ) => (
                                                                                            <React.Fragment
                                                                                                key={`activity-${activityIndex}`}
                                                                                            >
                                                                                                <tr
                                                                                                    className={
                                                                                                        activityIndex %
                                                                                                            2 ===
                                                                                                        0
                                                                                                            ? "bg-slate-100"
                                                                                                            : "-"
                                                                                                    }
                                                                                                >
                                                                                                    <td className="border border-1 p-2  font-bold text-center">
                                                                                                        Activity{" "}
                                                                                                        {outcomeIndex +
                                                                                                            1}

                                                                                                        .
                                                                                                        {outputIndex +
                                                                                                            1}

                                                                                                        .
                                                                                                        {activityIndex +
                                                                                                            1}
                                                                                                    </td>
                                                                                                    <td className="border border-1 p-2 ">
                                                                                                        {activityItem.description ||
                                                                                                            "-"}
                                                                                                    </td>
                                                                                                    <td className="border border-1 p-2">
                                                                                                        {activityItem.indicator ||
                                                                                                            "-"}
                                                                                                    </td>
                                                                                                    <td className="border border-1 p-2">
                                                                                                        {activityItem.baseline ||
                                                                                                            "-"}
                                                                                                    </td>
                                                                                                    <td className="border border-1 p-2">
                                                                                                        {activityItem.target ||
                                                                                                            "-"}
                                                                                                    </td>
                                                                                                    <td className="border border-1 p-2">
                                                                                                        {activityItem.timeline ||
                                                                                                            "-"}
                                                                                                    </td>
                                                                                                    <td className="border border-1 p-2">
                                                                                                        {activityItem.assumptions ||
                                                                                                            "-"}
                                                                                                    </td>
                                                                                                </tr>

                                                                                                {/* Inputs Level */}
                                                                                      {activityItem.inputs && (
    <tr className="bg-slate-100">
        <td className="border border-1 p-2 font-bold text-center">
            Input
        </td>
        <td className="border border-1 p-2">
            {activityItem.inputs[0].description}
        </td>
        <td className="border border-1 p-2">
            {activityItem.inputs[0].baseline || "(To be determined)"}
        </td>
     <td className="border border-1 p-2">
            {activityItem.inputs[0].target || "(To be determined)"}
        </td>
        <td className="border border-1 p-2">
            {activityItem.inputs[0].indicator || "(To be determined)"}
        </td>
        <td className="border border-1 p-2">
            {activityItem.inputs[0].timeline || "-"}
        </td>
        <td className="border border-1 p-2">
            {activityItem.inputs[0].assumptions || "(To be determined)"}
        </td>
    
    </tr>
)}

                                                                                            </React.Fragment>
                                                                                        )
                                                                                    )}
                                                                                </React.Fragment>
                                                                            )
                                                                        )}
                                                                    </React.Fragment>
                                                                )
                                                            )}
                                                        </>
                                                    )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                   
                </div>
            </Page>
        </Document>
    );

    return (
        <div>
            <MyDocument />
        </div>
    );
}

export default Finals;