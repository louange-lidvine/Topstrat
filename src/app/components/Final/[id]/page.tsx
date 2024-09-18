"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
import Loader from "@/app/shared/loader/page";
import { useParams } from "next/navigation";
import SwotSkeleton from "../../skeletons/SwotSkeleton";
import LogFrameSkeleton from "../../skeletons/LogFrameSkeleton";
import PestleSkeleton from "../../skeletons/PestleSkeleton";
import Skeleton from "react-loading-skeleton";
import ExportPage from "../../Export/page";
import { baseURL } from "@/app/constants";
import ReactModal from "react-modal";
import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";

function Final() {
    const { id } = useParams();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [promptData, setPromptData] = useState<any>();
    const [projectData, setProjectData] = useState<any>();
    const [pestleData, setPestleData] = useState<any>();
    const [logframeData, setLogframeData] = useState<any>([]);
    const [Data, setData] = useState<any>([]);
    const [error, setError] = useState<string | null>(null);

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
                <div className="border border-blue-default my-4 rounded-md mx-2 p-4 font-medium">
                    <div
                        className="justify-end flex gap-2 cursor-pointer"
                        onClick={() => router.push("/")}
                    >
                        <BiArrowBack className="mt-1" />
                        <p className="">Return to home</p>
                    </div>
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
                                                                                                        <td className="border border-1 p-2  font-bold text-center">
                                                                                                            Input
                                                                                                        </td>
                                                                                                        <td className="border border-1 p-2 ">
                                                                                                            {activityItem.inputs.join(
                                                                                                                ", "
                                                                                                            )}
                                                                                                        </td>
                                                                                                        <td className="border border-1 p-2">
                                                                                                            (To
                                                                                                            be
                                                                                                            determined)
                                                                                                        </td>
                                                                                                        <td className="border border-1 p-2">
                                                                                                            (To
                                                                                                            be
                                                                                                            determined)
                                                                                                        </td>
                                                                                                        <td className="border border-1 p-2">
                                                                                                            (To
                                                                                                            be
                                                                                                            determined)
                                                                                                        </td>
                                                                                                        <td className="border border-1 p-2">
                                                                                                            -
                                                                                                        </td>
                                                                                                        <td className="border border-1 p-2">
                                                                                                            Funding
                                                                                                            is
                                                                                                            secured,
                                                                                                            and
                                                                                                            all
                                                                                                            necessary
                                                                                                            resources
                                                                                                            are
                                                                                                            available
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
                    <div className="flex justify-center gap-8 my-5">
                        <button className="bg-blue-default text-white font-bold rounded-md py-3 px-6">
                            {typeof window !== "undefined" && (
                                <PDFDownloadLink
                                    document={
                                        <ExportPage
                                            projectData={projectData}
                                            promptData={promptData}
                                            pestleData={pestleData}
                                            logframeData={logframeData}
                                            isLoading={false}
                                        />
                                    }
                                    fileName={`${projectData?.name}.pdf`}
                                >
                                    {({ loading }) =>
                                        loading
                                            ? "Loading document..."
                                            : "Download PDF"
                                    }
                                </PDFDownloadLink>
                            )}
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
                </div>
            </Page>
        </Document>
    );

    return (
        <div>
            <MyDocument />
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
        </div>
    );
}

export default Final;
