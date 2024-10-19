"use client";
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
import Image from "next/image";
import logo from "../../../public/assets/logo.png";

import cover from "../../../public/assets/cover.svg";

interface FinalsProps {
    id: string;
}

function Finals({ id }: FinalsProps) {
    const router = useRouter();
    const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
    const [showCover, setShowCover] = useState(true); // New state for showing/hiding cover
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
    const [isFreeTrial, setIsFreeTrial] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, [id]);

    const fetchUserData = async () => {
        const userId = localStorage.getItem("userId");
        const token = getCookie("token");

        try {
            const response = await fetch(`${baseURL}/users/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data);

                if (data.subscription === "FreeTrial") {
                    setIsFreeTrial(true);
                    setHasWatermark(true);
                    setProjectData({
                        name: "Topstrat Client",
                        description: "Default description for free trial users",
                        logo: logo,
                        createdAt: new Date().toISOString(),
                    });
                    fetchData();
                } else {
                    getProject(id as string);
                }
            } else {
                console.error("Failed to fetch user data");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const fetchData = async (isFreeTrial = false) => {
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
            const logframeData = JSON.parse(response.data.logframe.response);
            setLogframeData(logframeData);

            if (!isFreeTrial) {
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
            }

            setIsLoading(false);
        } catch (error) {
            setError("Error fetching data");
            setIsLoading(false);
        }
    };

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
            fetchData();
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching project data:", error);
        }
    };

    const renderList = (data: string) => {
        return (
            <ul style={{ listStyleType: "none" }}>
                {data
                    .split(/\d+\.\s*/)
                    .filter((item) => item.trim() !== "")
                    .map((item, index) => (
                        <li
                            className="py-3"
                            key={index}
                            style={{
                                fontSize: "16px",
                                color: "black",
                            }}
                        >
                            {item.trim()}
                        </li>
                    ))}
            </ul>
        );
    };

    const formatTextWithSpacing = (textArray: string[] | undefined): string => {
    if (!textArray || textArray.length === 0) return "";
    return textArray.join(". "); 
};

    const MyDocument = () => (
        <Document pageMode="fullScreen">
            <Page size="A4" style={{ margin: "auto" }}>
                <div
                    className={`my-4 rounded-md mx-2 p-4 font-medium ${
                        hasWatermark ? "watermarked" : ""
                    }`}
                    id={`pdf-content_${id}`}
                >
                    {showCover && ( // Conditionally render the cover page
                        <div
                            className="relative w-full h-full bg-white overflow-hidden break-after-page"
                            style={{ height: "1050px", display: "block" }}
                            id="cover-page-image"
                        >
                            <div className="absolute inset-0">
                                <Image
                                    src={cover}
                                    alt="Cover page image"
                                    className="w-full h-full"
                                />
                            </div>
                            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-12 text-white">
                                {/* Logo and Project Name */}
                                <div className="flex justify-between">
                                    <div className="flex flex-col items-start">
                                        <div className="bg-white p-5 mt-4 rounded-md">
                                            <Image
                                                src={
                                                    isFreeTrial
                                                        ? logo
                                                        : projectData?.logo ||
                                                          logo
                                                }
                                                alt="organization logo"
                                                width={80}
                                                height={80}
                                                className="object-contain"
                                            />
                                        </div>
                                        <h2 className="text-xl font-bold mt-2 text-black">
                                            {isLoading ? (
                                                <Skeleton width={100} />
                                            ) : (
                                                projectData?.name
                                            )}
                                        </h2>
                                    </div>
                                </div>

                                {/* Main Title */}
                                <div className="flex flex-col items-start mt-20">
                                    <h1 className="text-5xl font-bold text-black">
                                        STRATEGIC PLAN
                                    </h1>
                                    <h2 className="text-2xl font-semibold text-black mt-2">
                                        2024-2029
                                    </h2>
                                </div>

                                {/* Project Description */}
                                <div className="flex flex-col items-start mt-8 text-black">
                                    <div className="flex flex-col gap-4">
                                        {isLoading ? (
                                            <div className="w-full">
                                                <Skeleton width={100} />
                                                <Skeleton />
                                            </div>
                                        ) : (
                                            <div className="w-[50%]">
                                                <p>
                                                    {projectData?.description}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="text-yellow-500 mt-8">
                                    <h3 className="text-xl font-semibold">
                                        {projectData?.createdAt &&
                                            new Date(
                                                projectData.createdAt
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                    </h3>
                                    <p className="text-sm text-black mt-2">
                                        +250-792-531-980
                                        <br />
                                        {userData?.email || "email@example.com"}
                                        <br />
                                        www.topstrat.com
                                        <br />
                                        BP 3451 KIGALI-RWANDA
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Content Section */}
                    <div className="w-full">
                        <div className="flex flex-col gap-6">
                            {/* Introduction */}
                            <div className="flex flex-col gap-4">
                                {isLoading ? (
                                    <div className="w-full">
                                        <Skeleton width={80} />
                                        <Skeleton />
                                    </div>
                                ) : (
                                    <div>
                                        <h3 className="text-blue-default font-bold text-xl">
                                            <p>Introduction</p>
                                        </h3>
                                        <p>
                                            {projectData &&
                                                projectData.description}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Vision */}
                            <div className="flex flex-col gap-3">
                                {isLoading ? (
                                    <div className="w-full">
                                        <Skeleton width={80} />
                                        <Skeleton height={30} />
                                    </div>
                                ) : (
                                    <div>
                                        <h3
                                            className="text-xl font-bold"
                                            style={{
                                                fontSize: "20px",
                                                fontWeight: "bold",
                                                color: "#0B6C79",
                                            }}
                                        >
                                            Vision
                                        </h3>
                                        <p>{promptData?.vision?.response}</p>
                                    </div>
                                )}
                            </div>

                            {/* Mission */}
                            <div className="flex flex-col gap-3">
                                {isLoading ? (
                                    <div className="w-full">
                                        <Skeleton width={80} />
                                        <Skeleton height={30} />
                                    </div>
                                ) : (
                                    <div>
                                        <h3
                                            className="text-xl font-bold"
                                            style={{
                                                fontSize: "20px",
                                                fontWeight: "bold",
                                                color: "#0B6C79",
                                            }}
                                        >
                                            Mission
                                        </h3>
                                        <p>{promptData?.mission?.response}</p>
                                    </div>
                                )}
                            </div>

                            {/* Values */}
                            <div className="flex flex-col gap-3">
                                {isLoading ? (
                                    <div className="w-full">
                                        <Skeleton width={80} />
                                        <Skeleton height={80} />
                                    </div>
                                ) : (
                                    <div>
                                        <h3
                                            className="text-xl font-bold"
                                            style={{
                                                fontSize: "20px",
                                                fontWeight: "bold",
                                                color: "#0B6C79",
                                            }}
                                        >
                                            Values
                                        </h3>
                                        {promptData?.values && (
                                            <ul className="py-2">
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

                    {/* SWOT Analysis */}
                    <div className="flex flex-col gap-6 mt-5">
                        <div className="w-[100%] flex justify-center items-center">
                            {isLoading ? (
                                <div className="w-full">
                                    <Skeleton width={100} />
                                    <SwotSkeleton />
                                </div>
                            ) : (
                                <div>
                                    <h2
                                        className="text-xl mb-4 font-bold text-blue-default"
                                        style={{
                                            fontSize: "20px",
                                            fontWeight: "bold",
                                            color: "#0B6C79",
                                        }}
                                    >
                                        SWOT ANALYSIS
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
                                                    }}
                                                >
                                                    Strengths (S)
                                                </th>
                                                <th
                                                    style={{
                                                        border: "2px solid black",
                                                        padding: "6px",
                                                        textAlign: "left",
                                                    }}
                                                >
                                                    Weaknesses (W)
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {promptData?.swot?.response &&
                                                JSON.parse(
                                                    promptData.swot.response
                                                ).strengths.map(
                                                    (
                                                        strength: any,
                                                        index: any
                                                    ) => (
                                                        <tr key={index}>
                                                            <td
                                                                style={{
                                                                    border: "2px solid black",
                                                                    padding:
                                                                        "6px",
                                                                    textAlign:
                                                                        "left",
                                                                }}
                                                            >
                                                                {strength}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    border: "2px solid black",
                                                                    padding:
                                                                        "6px",
                                                                    textAlign:
                                                                        "left",
                                                                }}
                                                            >
                                                                {JSON.parse(
                                                                    promptData
                                                                        .swot
                                                                        .response
                                                                ).weaknesses[
                                                                    index
                                                                ] || ""}
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
                                                    }}
                                                >
                                                    Opportunities (O)
                                                </th>
                                                <th
                                                    style={{
                                                        border: "2px solid black",
                                                        padding: "6px",
                                                        textAlign: "left",
                                                    }}
                                                >
                                                    Threats (T)
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {promptData?.swot?.response &&
                                                JSON.parse(
                                                    promptData.swot.response
                                                ).opportunities.map(
                                                    (
                                                        opportunity: any,
                                                        index: any
                                                    ) => (
                                                        <tr key={index}>
                                                            <td
                                                                style={{
                                                                    border: "2px solid black",
                                                                    padding:
                                                                        "6px",
                                                                    textAlign:
                                                                        "left",
                                                                }}
                                                            >
                                                                {opportunity}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    border: "2px solid black",
                                                                    padding:
                                                                        "6px",
                                                                    textAlign:
                                                                        "left",
                                                                }}
                                                            >
                                                                {JSON.parse(
                                                                    promptData
                                                                        .swot
                                                                        .response
                                                                ).threats[
                                                                    index
                                                                ] || ""}
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

                    {/* PESTLE Analysis */}
                    <div>
                        <div className="flex flex-col my-6"></div>
                        {isLoading ? (
                            <div className="w-full">
                                <Skeleton width={100} />
                                <PestleSkeleton />
                            </div>
                        ) : (
                            // <div style={{ width: "100%", margin: "0 auto" }}>
                            //     <p
                            //         style={{
                            //             fontSize: "20px",
                            //             fontWeight: "bold",
                            //             color: "#0B6C79",
                            //             padding: "15px 0",
                            //         }}
                            //     >
                            //         PESTLE Analysis
                            //     </p>
                            //     <table
                            //         style={{
                            //             width: "100%",
                            //             borderCollapse: "collapse",
                            //             margin: "0 auto",
                            //             border: "1px solid #ccc",
                            //         }}
                            //     >
                            //         <thead>
                            //             <tr
                            //                 style={{
                            //                     backgroundColor: "#e2e8f0",
                            //                 }}
                            //             >
                            //                 <th
                            //                     style={{
                            //                         border: "1px solid #ccc",
                            //                         padding: "10px",
                            //                         fontSize: "16px",
                            //                         color: "#0B6C79",
                            //                         textAlign: "center",
                            //                         fontWeight: "bold",
                            //                     }}
                            //                 ></th>
                            //                 <th
                            //                     style={{
                            //                         border: "1px solid #ccc",
                            //                         padding: "10px",
                            //                         fontSize: "16px",
                            //                         color: "#0B6C79",
                            //                         textAlign: "center",
                            //                         fontWeight: "bold",
                            //                     }}
                            //                 >
                            //                     Influence on organization
                            //                 </th>
                            //                 <th
                            //                     style={{
                            //                         border: "1px solid #ccc",
                            //                         padding: "10px",
                            //                         fontSize: "16px",
                            //                         color: "#0B6C79",
                            //                         textAlign: "center",
                            //                         fontWeight: "bold",
                            //                     }}
                            //                 >
                            //                     Impact of organization's
                            //                     activities
                            //                 </th>
                            //             </tr>
                            //         </thead>
                            //         <tbody>
                            //             {pestleData && (
                            //                 <>
                            //                     {/* Political */}
                            //                     <tr>
                            //                         <td
                            //                             style={{
                            //                                 border: "1px solid #ccc",
                            //                                 padding: "10px",
                            //                                 fontSize: "16px",
                            //                                 color: "#0B6C79",
                            //                                 fontWeight: "bold",
                            //                             }}
                            //                         >
                            //                             Political
                            //                         </td>
                            //                         <td
                            //                             style={{
                            //                                 border: "1px solid #ccc",
                            //                                 padding: "10px",
                            //                                 fontSize: "16px",
                            //                                 color: "#000",
                            //                             }}
                            //                         >
                            //                             {
                            //                                 pestleData.political
                            //                                     ?.inf
                            //                             }
                            //                         </td>
                            //                         <td
                            //                             style={{
                            //                                 border: "1px solid #ccc",
                            //                                 padding: "10px",
                            //                                 fontSize: "16px",
                            //                                 color: "#000",
                            //                             }}
                            //                         >
                            //                             {
                            //                                 pestleData.political
                            //                                     ?.imp
                            //                             }
                            //                         </td>
                            //                     </tr>

                            //                     {/* Economic */}
                            //                     <tr>
                            //                         <td
                            //                             style={{
                            //                                 border: "1px solid #ccc",
                            //                                 padding: "10px",
                            //                                 fontSize: "16px",
                            //                                 color: "#0B6C79",
                            //                                 fontWeight: "bold",
                            //                             }}
                            //                         >
                            //                             Economic
                            //                         </td>
                            //                         <td
                            //                             style={{
                            //                                 border: "1px solid #ccc",
                            //                                 padding: "10px",
                            //                                 fontSize: "16px",
                            //                                 color: "#000",
                            //                             }}
                            //                         >
                            //                             {
                            //                                 pestleData.economic
                            //                                     ?.inf
                            //                             }
                            //                         </td>
                            //                         <td
                            //                             style={{
                            //                                 border: "1px solid #ccc",
                            //                                 padding: "10px",
                            //                                 fontSize: "16px",
                            //                                 color: "#000",
                            //                             }}
                            //                         >
                            //                             {
                            //                                 pestleData.economic
                            //                                     ?.imp
                            //                             }
                            //                         </td>
                            //                     </tr>

                            //                     {/* Social */}
                            //                     <tr>
                            //                         <td
                            //                             style={{
                            //                                 border: "1px solid #ccc",
                            //                                 padding: "10px",
                            //                                 fontSize: "16px",
                            //                                 color: "#0B6C79",
                            //                                 fontWeight: "bold",
                            //                             }}
                            //                         >
                            //                             Social
                            //                         </td>
                            //                         <td
                            //                             style={{
                            //                                 border: "1px solid #ccc",
                            //                                 padding: "10px",
                            //                                 fontSize: "16px",
                            //                                 color: "#000",
                            //                             }}
                            //                         >
                            //                             {pestleData.social?.inf}
                            //                         </td>
                            //                         <td
                            //                             style={{
                            //                                 border: "1px solid #ccc",
                            //                                 padding: "10px",
                            //                                 fontSize: "16px",
                            //                                 color: "#000",
                            //                             }}
                            //                         >
                            //                             {pestleData.social?.imp}
                            //                         </td>
                            //                     </tr>

                            //                     {/* Technological */}
                            //                     <tr>
                            //                         <td
                            //                             style={{
                            //                                 border: "1px solid #ccc",
                            //                                 padding: "10px",
                            //                                 fontSize: "16px",
                            //                                 color: "#0B6C79",
                            //                                 fontWeight: "bold",
                            //                             }}
                            //                         >
                            //                             Technological
                            //                         </td>
                            //                         <td
                            //                             style={{
                            //                                 border: "1px solid #ccc",
                            //                                 padding: "10px",
                            //                                 fontSize: "16px",
                            //                                 color: "#000",
                            //                             }}
                            //                         >
                            //                             {
                            //                                 pestleData
                            //                                     .technological
                            //                                     ?.inf
                            //                             }
                            //                         </td>
                            //                         <td
                            //                             style={{
                            //                                 border: "1px solid #ccc",
                            //                                 padding: "10px",
                            //                                 fontSize: "16px",
                            //                                 color: "#000",
                            //                             }}
                            //                         >
                            //                             {
                            //                                 pestleData
                            //                                     .technological
                            //                                     ?.imp
                            //                             }
                            //                         </td>
                            //                     </tr>

                            //                     {/* Legal */}
                            //                     <tr>
                            //                         <td
                            //                             style={{
                            //                                 border: "1px solid #ccc",
                            //                                 padding: "10px",
                            //                                 fontSize: "16px",
                            //                                 color: "#0B6C79",
                            //                                 fontWeight: "bold",
                            //                             }}
                            //                         >
                            //                             Legal
                            //                         </td>
                            //                         <td
                            //                             style={{
                            //                                 border: "1px solid #ccc",
                            //                                 padding: "10px",
                            //                                 fontSize: "16px",
                            //                                 color: "#000",
                            //                             }}
                            //                         >
                            //                             {pestleData.legal?.inf}
                            //                         </td>
                            //                         <td
                            //                             style={{
                            //                                 border: "1px solid #ccc",
                            //                                 padding: "10px",
                            //                                 fontSize: "16px",
                            //                                 color: "#000",
                            //                             }}
                            //                         >
                            //                             {pestleData.legal?.imp}
                            //                         </td>
                            //                     </tr>

                            //                     {/* Environmental */}
                            //                     <tr>
                            //                         <td
                            //                             style={{
                            //                                 border: "1px solid #ccc",
                            //                                 padding: "10px",
                            //                                 fontSize: "16px",
                            //                                 color: "#0B6C79",
                            //                                 fontWeight: "bold",
                            //                             }}
                            //                         >
                            //                             Environmental
                            //                         </td>
                            //                         <td
                            //                             style={{
                            //                                 border: "1px solid #ccc",
                            //                                 padding: "10px",
                            //                                 fontSize: "16px",
                            //                                 color: "#000",
                            //                             }}
                            //                         >
                            //                             {
                            //                                 pestleData
                            //                                     .environmental
                            //                                     ?.inf
                            //                             }
                            //                         </td>
                            //                         <td
                            //                             style={{
                            //                                 border: "1px solid #ccc",
                            //                                 padding: "10px",
                            //                                 fontSize: "16px",
                            //                                 color: "#000",
                            //                             }}
                            //                         >
                            //                             {
                            //                                 pestleData
                            //                                     .environmental
                            //                                     ?.imp
                            //                             }
                            //                         </td>
                            //                     </tr>
                            //                 </>
                            //             )}
                            //         </tbody>
                            //     </table>
                            // </div>
                              <div style={{ width: "100%", margin: "0 auto" }}>
            <p
                style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#0B6C79",
                    padding: "15px 0",
                }}
            >
                PESTLE Analysis
            </p>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    margin: "0 auto",
                    border: "1px solid #ccc",
                }}
            >
                <thead>
                    <tr
                        style={{
                            backgroundColor: "#e2e8f0",
                        }}
                    >
                        <th
                            style={{
                                border: "1px solid #ccc",
                                padding: "10px",
                                fontSize: "16px",
                                color: "#0B6C79",
                                textAlign: "center",
                                fontWeight: "bold",
                            }}
                        ></th>
                        <th
                            style={{
                                border: "1px solid #ccc",
                                padding: "10px",
                                fontSize: "16px",
                                color: "#0B6C79",
                                textAlign: "center",
                                fontWeight: "bold",
                            }}
                        >
                            Influence on organization
                        </th>
                        <th
                            style={{
                                border: "1px solid #ccc",
                                padding: "10px",
                                fontSize: "16px",
                                color: "#0B6C79",
                                textAlign: "center",
                                fontWeight: "bold",
                            }}
                        >
                            Impact of organization's activities
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {pestleData && (
                        <>
                            {/* Political */}
                            <tr>
                                <td
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "10px",
                                        fontSize: "16px",
                                        color: "#0B6C79",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Political
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "10px",
                                        fontSize: "16px",
                                        color: "#000",
                                    }}
                                >
                                    {formatTextWithSpacing(pestleData.political?.inf)}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "10px",
                                        fontSize: "16px",
                                        color: "#000",
                                    }}
                                >
                                    {formatTextWithSpacing(pestleData.political?.imp)}
                                </td>
                            </tr>

                            {/* Economic */}
                            <tr>
                                <td
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "10px",
                                        fontSize: "16px",
                                        color: "#0B6C79",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Economic
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "10px",
                                        fontSize: "16px",
                                        color: "#000",
                                    }}
                                >
                                    {formatTextWithSpacing(pestleData.economic?.inf)}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "10px",
                                        fontSize: "16px",
                                        color: "#000",
                                    }}
                                >
                                    {formatTextWithSpacing(pestleData.economic?.imp)}
                                </td>
                            </tr>

                            {/* Social */}
                            <tr>
                                <td
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "10px",
                                        fontSize: "16px",
                                        color: "#0B6C79",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Social
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "10px",
                                        fontSize: "16px",
                                        color: "#000",
                                    }}
                                >
                                    {formatTextWithSpacing(pestleData.social?.inf)}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "10px",
                                        fontSize: "16px",
                                        color: "#000",
                                    }}
                                >
                                    {formatTextWithSpacing(pestleData.social?.imp)}
                                </td>
                            </tr>

                            {/* Technological */}
                            <tr>
                                <td
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "10px",
                                        fontSize: "16px",
                                        color: "#0B6C79",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Technological
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "10px",
                                        fontSize: "16px",
                                        color: "#000",
                                    }}
                                >
                                    {formatTextWithSpacing(pestleData.technological?.inf)}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "10px",
                                        fontSize: "16px",
                                        color: "#000",
                                    }}
                                >
                                    {formatTextWithSpacing(pestleData.technological?.imp)}
                                </td>
                            </tr>

                            {/* Legal */}
                            <tr>
                                <td
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "10px",
                                        fontSize: "16px",
                                        color: "#0B6C79",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Legal
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "10px",
                                        fontSize: "16px",
                                        color: "#000",
                                    }}
                                >
                                    {formatTextWithSpacing(pestleData.legal?.inf)}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "10px",
                                        fontSize: "16px",
                                        color: "#000",
                                    }}
                                >
                                    {formatTextWithSpacing(pestleData.legal?.imp)}
                                </td>
                            </tr>

                            {/* Environmental */}
                            <tr>
                                <td
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "10px",
                                        fontSize: "16px",
                                        color: "#0B6C79",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Environmental
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "10px",
                                        fontSize: "16px",
                                        color: "#000",
                                    }}
                                >
                                    {formatTextWithSpacing(pestleData.environmental?.inf)}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "10px",
                                        fontSize: "16px",
                                        color: "#000",
                                    }}
                                >
                                    {formatTextWithSpacing(pestleData.environmental?.imp)}
                                </td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
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
                                    <div
                                        className="text-blue-default font-bold py-5"
                                        style={{ font: "20px" }}
                                    >
                                        Logframe
                                    </div>
                                    <h2
                                        style={{
                                            fontSize: "16px",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        Goal: {logframeData?.goal?.description}
                                    </h2>
                                    <div className="overflow-x-auto">
                                        <table
                                            className=" border-2 m-auto"
                                            style={{
                                                width: "100%",
                                                tableLayout: "fixed",
                                            }}
                                        >
                                            <thead>
                                                <tr className="bg-slate-300">
                                                    <th
                                                        className="border border-1 p-3 text-lg text-blue-default font-bold"
                                                        colSpan={2}
                                                        style={{
                                                            fontSize: "16px",
                                                            color: "#0B6C79",
                                                            width: "25%",
                                                        }}
                                                    >
                                                        Results Chain
                                                    </th>
                                                    <th
                                                        className="border border-1 p-3 text-lg text-blue-default font-bold"
                                                        style={{
                                                            fontSize: "16px",
                                                            width: "10%",
                                                        }}
                                                    >
                                                        Indicator
                                                    </th>
                                                    <th
                                                        className="border border-1 p-3 text-lg text-blue-default font-bold"
                                                        style={{
                                                            fontSize: "16px",
                                                            width: "10%",
                                                        }}
                                                    >
                                                        Baseline
                                                    </th>
                                                    <th
                                                        className="border border-1 p-3 text-lg text-blue-default font-bold"
                                                        style={{
                                                            fontSize: "16px",
                                                            width: "10%",
                                                        }}
                                                    >
                                                        Target
                                                    </th>
                                                    <th
                                                        className="border border-1 p-3 text-lg text-blue-default font-bold"
                                                        style={{
                                                            fontSize: "16px",
                                                            width: "10%",
                                                        }}
                                                    >
                                                        Timeline
                                                    </th>
                                                    <th
                                                        className="border border-1 p-3 text-lg text-blue-default font-bold"
                                                        style={{
                                                            fontSize: "16px",
                                                            width: "15%",
                                                        }}
                                                    >
                                                        Assumptions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {logframeData &&
                                                    logframeData.goal && (
                                                        <>
                                                            {/* Impact Level */}
                                                            <tr
                                                                style={{
                                                                    fontSize:
                                                                        "16px",
                                                                }}
                                                            >
                                                                <td
                                                                    style={{
                                                                        border: "1px solid #000",
                                                                        padding:
                                                                            "10px",
                                                                        textAlign:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    Impact
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        border: "1px solid #000",
                                                                        padding:
                                                                            "10px",
                                                                        wordWrap:
                                                                            "break-word",
                                                                        whiteSpace:
                                                                            "pre-wrap",
                                                                    }}
                                                                >
                                                                    {
                                                                        logframeData
                                                                            .goal
                                                                            .impact
                                                                            ?.description
                                                                    }
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        border: "1px solid #000",
                                                                        padding:
                                                                            "10px",
                                                                        whiteSpace:
                                                                            "pre-wrap",
                                                                        wordWrap:
                                                                            "break-word",
                                                                    }}
                                                                >
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
                                                                            ) => (
                                                                                <div
                                                                                    key={
                                                                                        idx
                                                                                    }
                                                                                    style={{
                                                                                        fontSize:
                                                                                            "16px",
                                                                                    }}
                                                                                >
                                                                                    <p>
                                                                                        {
                                                                                            key
                                                                                        }

                                                                                        :
                                                                                    </p>
                                                                                </div>
                                                                            )
                                                                        )}
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        border: "1px solid #000",
                                                                        padding:
                                                                            "10px",
                                                                        whiteSpace:
                                                                            "pre-wrap",
                                                                    }}
                                                                >
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
                                                                                        style={{
                                                                                            fontSize:
                                                                                                "16px",
                                                                                        }}
                                                                                    >
                                                                                        {indicator.baseline ||
                                                                                            ""}
                                                                                    </div>
                                                                                );
                                                                            }
                                                                        )}
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        border: "1px solid #000",
                                                                        padding:
                                                                            "10px",
                                                                        whiteSpace:
                                                                            "pre-wrap",
                                                                    }}
                                                                >
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
                                                                                        style={{
                                                                                            fontSize:
                                                                                                "16px",
                                                                                        }}
                                                                                    >
                                                                                        {
                                                                                            indicator.target
                                                                                        }
                                                                                    </div>
                                                                                );
                                                                            }
                                                                        )}
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        border: "1px solid #000",
                                                                        padding:
                                                                            "10px",
                                                                        whiteSpace:
                                                                            "pre-wrap",
                                                                    }}
                                                                >
                                                                    {
                                                                        logframeData
                                                                            .goal
                                                                            .impact
                                                                            ?.timeline
                                                                    }
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        border: "1px solid #000",
                                                                        padding:
                                                                            "10px",
                                                                        whiteSpace:
                                                                            "pre-wrap",
                                                                    }}
                                                                >
                                                                    {
                                                                        logframeData
                                                                            .goal
                                                                            .impact
                                                                            ?.assumptions
                                                                    }
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
                                                                            style={{
                                                                                fontSize:
                                                                                    "16px",
                                                                            }}
                                                                        >
                                                                            <td
                                                                                style={{
                                                                                    border: "1px solid #000",
                                                                                    padding:
                                                                                        "10px",
                                                                                    textAlign:
                                                                                        "center",
                                                                                }}
                                                                            >
                                                                                Outcome{" "}
                                                                                {outcomeIndex +
                                                                                    1}
                                                                            </td>
                                                                            <td
                                                                                style={{
                                                                                    border: "1px solid #000",
                                                                                    padding:
                                                                                        "10px",
                                                                                    wordWrap:
                                                                                        "break-word",
                                                                                    whiteSpace:
                                                                                        "pre-wrap",
                                                                                }}
                                                                            >
                                                                                {
                                                                                    outcomeItem.description
                                                                                }
                                                                            </td>
                                                                            <td
                                                                                style={{
                                                                                    border: "1px solid #000",
                                                                                    padding:
                                                                                        "10px",
                                                                                    wordWrap:
                                                                                        "break-word",
                                                                                    whiteSpace:
                                                                                        "pre-wrap",
                                                                                }}
                                                                            >
                                                                                {
                                                                                    outcomeItem.indicator
                                                                                }
                                                                            </td>
                                                                            <td
                                                                                style={{
                                                                                    border: "1px solid #000",
                                                                                    padding:
                                                                                        "10px",
                                                                                    whiteSpace:
                                                                                        "pre-wrap",
                                                                                }}
                                                                            >
                                                                                {
                                                                                    outcomeItem.baseline
                                                                                }
                                                                            </td>
                                                                            <td
                                                                                style={{
                                                                                    border: "1px solid #000",
                                                                                    padding:
                                                                                        "10px",
                                                                                    whiteSpace:
                                                                                        "pre-wrap",
                                                                                }}
                                                                            >
                                                                                {
                                                                                    outcomeItem.target
                                                                                }
                                                                            </td>
                                                                            <td
                                                                                style={{
                                                                                    border: "1px solid #000",
                                                                                    padding:
                                                                                        "10px",
                                                                                    whiteSpace:
                                                                                        "pre-wrap",
                                                                                }}
                                                                            >
                                                                                {
                                                                                    outcomeItem.timeline
                                                                                }
                                                                            </td>
                                                                            <td
                                                                                style={{
                                                                                    border: "1px solid #000",
                                                                                    padding:
                                                                                        "10px",
                                                                                    wordWrap:
                                                                                        "break-word",
                                                                                    whiteSpace:
                                                                                        "pre-wrap",
                                                                                }}
                                                                            >
                                                                                {
                                                                                    outcomeItem.assumptions
                                                                                }
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
                                                                                        style={{
                                                                                            fontSize:
                                                                                                "16px",
                                                                                        }}
                                                                                    >
                                                                                        <td
                                                                                            style={{
                                                                                                border: "1px solid #000",
                                                                                                padding:
                                                                                                    "10px",
                                                                                                textAlign:
                                                                                                    "center",
                                                                                            }}
                                                                                        >
                                                                                            Output{" "}
                                                                                            {outcomeIndex +
                                                                                                1}

                                                                                            .
                                                                                            {outputIndex +
                                                                                                1}
                                                                                        </td>
                                                                                        <td
                                                                                            style={{
                                                                                                border: "1px solid #000",
                                                                                                padding:
                                                                                                    "10px",
                                                                                                wordWrap:
                                                                                                    "break-word",
                                                                                                whiteSpace:
                                                                                                    "pre-wrap",
                                                                                            }}
                                                                                        >
                                                                                            {
                                                                                                outputItem.description
                                                                                            }
                                                                                        </td>
                                                                                        <td
                                                                                            style={{
                                                                                                border: "1px solid #000",
                                                                                                padding:
                                                                                                    "10px",
                                                                                                wordWrap:
                                                                                                    "break-word",
                                                                                                whiteSpace:
                                                                                                    "pre-wrap",
                                                                                            }}
                                                                                        >
                                                                                            {
                                                                                                outputItem.indicator
                                                                                            }
                                                                                        </td>
                                                                                        <td
                                                                                            style={{
                                                                                                border: "1px solid #000",
                                                                                                padding:
                                                                                                    "10px",
                                                                                                whiteSpace:
                                                                                                    "pre-wrap",
                                                                                            }}
                                                                                        >
                                                                                            {outputItem.baseline ||
                                                                                                "0"}
                                                                                        </td>
                                                                                        <td
                                                                                            style={{
                                                                                                border: "1px solid #000",
                                                                                                padding:
                                                                                                    "10px",
                                                                                                whiteSpace:
                                                                                                    "pre-wrap",
                                                                                            }}
                                                                                        >
                                                                                            {
                                                                                                outputItem.target
                                                                                            }
                                                                                        </td>
                                                                                        <td
                                                                                            style={{
                                                                                                border: "1px solid #000",
                                                                                                padding:
                                                                                                    "10px",
                                                                                                whiteSpace:
                                                                                                    "pre-wrap",
                                                                                            }}
                                                                                        >
                                                                                            {
                                                                                                outputItem.timeline
                                                                                            }
                                                                                        </td>
                                                                                        <td
                                                                                            style={{
                                                                                                border: "1px solid #000",
                                                                                                padding:
                                                                                                    "10px",
                                                                                                wordWrap:
                                                                                                    "break-word",
                                                                                                whiteSpace:
                                                                                                    "pre-wrap",
                                                                                            }}
                                                                                        >
                                                                                            {
                                                                                                outputItem.assumptions
                                                                                            }
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
                                                                                                    style={{
                                                                                                        fontSize:
                                                                                                            "16px",
                                                                                                    }}
                                                                                                >
                                                                                                    <td
                                                                                                        style={{
                                                                                                            border: "1px solid #000",
                                                                                                            padding:
                                                                                                                "10px",
                                                                                                            textAlign:
                                                                                                                "center",
                                                                                                        }}
                                                                                                    >
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
                                                                                                    <td
                                                                                                        style={{
                                                                                                            border: "1px solid #000",
                                                                                                            padding:
                                                                                                                "10px",
                                                                                                            wordWrap:
                                                                                                                "break-word",
                                                                                                            whiteSpace:
                                                                                                                "pre-wrap",
                                                                                                        }}
                                                                                                    >
                                                                                                        {
                                                                                                            activityItem.description
                                                                                                        }
                                                                                                    </td>
                                                                                                    <td
                                                                                                        style={{
                                                                                                            border: "1px solid #000",
                                                                                                            padding:
                                                                                                                "10px",
                                                                                                            whiteSpace:
                                                                                                                "pre-wrap",
                                                                                                        }}
                                                                                                    >
                                                                                                        {
                                                                                                            activityItem.indicator
                                                                                                        }
                                                                                                    </td>
                                                                                                    <td
                                                                                                        style={{
                                                                                                            border: "1px solid #000",
                                                                                                            padding:
                                                                                                                "10px",
                                                                                                            whiteSpace:
                                                                                                                "pre-wrap",
                                                                                                        }}
                                                                                                    >
                                                                                                        {
                                                                                                            activityItem.baseline
                                                                                                        }
                                                                                                    </td>
                                                                                                    <td
                                                                                                        style={{
                                                                                                            border: "1px solid #000",
                                                                                                            padding:
                                                                                                                "10px",
                                                                                                            whiteSpace:
                                                                                                                "pre-wrap",
                                                                                                        }}
                                                                                                    >
                                                                                                        {
                                                                                                            activityItem.target
                                                                                                        }
                                                                                                    </td>
                                                                                                    <td
                                                                                                        style={{
                                                                                                            border: "1px solid #000",
                                                                                                            padding:
                                                                                                                "10px",
                                                                                                            whiteSpace:
                                                                                                                "pre-wrap",
                                                                                                        }}
                                                                                                    >
                                                                                                        {
                                                                                                            activityItem.timeline
                                                                                                        }
                                                                                                    </td>
                                                                                                    <td
                                                                                                        style={{
                                                                                                            border: "1px solid #000",
                                                                                                            padding:
                                                                                                                "10px",
                                                                                                            wordWrap:
                                                                                                                "break-word",
                                                                                                            whiteSpace:
                                                                                                                "pre-wrap",
                                                                                                        }}
                                                                                                    >
                                                                                                        {
                                                                                                            activityItem.assumptions
                                                                                                        }
                                                                                                    </td>
                                                                                                </tr>

                                                                                                {/* Input Level */}
                                                                                                {activityItem.inputs && (
                                                                                                    <tr
                                                                                                        style={{
                                                                                                            fontSize:
                                                                                                                "16px",
                                                                                                        }}
                                                                                                    >
                                                                                                        <td
                                                                                                            style={{
                                                                                                                border: "1px solid #000",
                                                                                                                padding:
                                                                                                                    "10px",
                                                                                                                textAlign:
                                                                                                                    "center",
                                                                                                            }}
                                                                                                        >
                                                                                                            Input
                                                                                                        </td>

                                                                                                        {/* description */}
                                                                                                        <td
                                                                                                            style={{
                                                                                                                border: "1px solid #000",
                                                                                                                padding:
                                                                                                                    "10px",
                                                                                                                wordWrap:
                                                                                                                    "break-word",
                                                                                                                whiteSpace:
                                                                                                                    "pre-wrap",
                                                                                                            }}
                                                                                                        >
                                                                                                            {
                                                                                                                activityItem
                                                                                                                    .inputs[0]
                                                                                                                    ?.description
                                                                                                            }
                                                                                                        </td>
                                                                                                        {/* baseline */}
                                                                                                        <td
                                                                                                            style={{
                                                                                                                border: "1px solid #000",
                                                                                                                padding:
                                                                                                                    "10px",
                                                                                                                whiteSpace:
                                                                                                                    "pre-wrap",
                                                                                                            }}
                                                                                                        >
                                                                                                            {
                                                                                                                activityItem
                                                                                                                    .inputs[0]
                                                                                                                    ?.baseline
                                                                                                            }
                                                                                                        </td>
                                                                                                        {/* target */}
                                                                                                        <td
                                                                                                            style={{
                                                                                                                border: "1px solid #000",
                                                                                                                padding:
                                                                                                                    "10px",
                                                                                                                whiteSpace:
                                                                                                                    "pre-wrap",
                                                                                                            }}
                                                                                                        >
                                                                                                            {
                                                                                                                activityItem
                                                                                                                    .inputs[0]
                                                                                                                    ?.target
                                                                                                            }
                                                                                                        </td>
                                                                                                        <td
                                                                                                            style={{
                                                                                                                border: "1px solid #000",
                                                                                                                padding:
                                                                                                                    "10px",
                                                                                                                whiteSpace:
                                                                                                                    "pre-wrap",
                                                                                                            }}
                                                                                                        >
                                                                                                            {
                                                                                                                activityItem
                                                                                                                    .inputs[0]
                                                                                                                    ?.indicator
                                                                                                            }
                                                                                                        </td>
                                                                                                        <td
                                                                                                            style={{
                                                                                                                border: "1px solid #000",
                                                                                                                padding:
                                                                                                                    "10px",
                                                                                                                whiteSpace:
                                                                                                                    "pre-wrap",
                                                                                                            }}
                                                                                                        >
                                                                                                            {
                                                                                                                activityItem
                                                                                                                    .inputs[0]
                                                                                                                    ?.timeline
                                                                                                            }
                                                                                                        </td>
                                                                                                        <td
                                                                                                            style={{
                                                                                                                border: "1px solid #000",
                                                                                                                padding:
                                                                                                                    "10px",
                                                                                                                wordWrap:
                                                                                                                    "break-word",
                                                                                                                whiteSpace:
                                                                                                                    "pre-wrap",
                                                                                                            }}
                                                                                                        >
                                                                                                            {
                                                                                                                activityItem
                                                                                                                    .inputs[0]
                                                                                                                    ?.assumptions
                                                                                                            }
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
