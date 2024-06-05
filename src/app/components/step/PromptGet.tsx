"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";

import { getCookie } from "cookies-next";
import Loader from "@/app/shared/loader/page";

interface PromptGetProps {
    title: string;
    query: any;
    handelNext:(object:any)=>void;
    projectId: string;
}

const PromptGet: React.FC<PromptGetProps> = ({ title, projectId, query,handelNext }) => {
    const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isSwot, setIsSwot] = useState<boolean>(false);
    const [isLogframe,setIsLogframe] = useState<boolean>(false)
    const [isPestle, setIsPestle] = useState<boolean>(false);
    const [logframeData, setLogframeData] = useState<any>();
    const [swotData, setSwotData] = useState<{
        strengths: string[];
        Economic: string[];
        opportunities: string[];
        threats: string[];
    } | null>(null);
    
      const [pestleData, setPestleData] = useState<{
        political: string[];
        economic: string[];
        social: string[];
        technological: string[];
        logical: string[];
        environmental: string[];
    } | null | any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = getCookie("token");
            const userId = localStorage.getItem("userId");
            setLoading(true);
            try {
                const response = await axios.post(
                    `http://157.245.121.185:5000/projects/${projectId}/${title.toLowerCase()}`,
                    {
                        query: query,
                        projectId: projectId,
                        promptType: title.toLowerCase(),
                        enhance: true,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${
                                JSON.parse(token ?? "").access_token
                            }`,
                        },
                    }
                );
                console.log(response);
                if (title.toLowerCase() === "swot") {
                    setIsSwot(true);
                    const responseData = JSON.parse(response.data.response);
                    setSwotData(responseData);
                }
                   else if (title.toLowerCase() === "pestle") {
                        setIsPestle(true);
                        const responseData = JSON.parse(response.data.response);
                        setPestleData(responseData);  
                   } 
                   else if (title.toLowerCase() === "logframe") {
                    setIsLogframe(true);
                    const responseData = JSON.parse(response.data.response);
                    setLogframeData(responseData);   
                } else {
                    setPrompt(response.data.response);
                }
            } catch (error) {
                console.error("Error fetching prompts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [projectId, title]);

    const handlePromptClick = (prompt: string) => {
        setSelectedPrompt(prompt);
    };


     const refetchData = async () => {
            const token = getCookie("token");
            const userId = localStorage.getItem("userId");
            setLoading(true);
            try {
                const response = await axios.post(
                    `http://157.245.121.185:5000/projects/${projectId}/${title.toLowerCase()}`,
                    {
                        query: query,
                        projectId: projectId,
                        promptType: title.toLowerCase(),
                        enhance: true,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${
                                JSON.parse(token ?? "").access_token
                            }`,
                        },
                    }
                );
                console.log(response);
                if (title.toLowerCase() === "swot") {
                    setIsSwot(true);
                    const responseData = JSON.parse(response.data.response);
                    setSwotData(responseData);
                }
                else if (title.toLowerCase() === "pestle") {
                     setIsPestle(true);
                     const responseData = JSON.parse(response.data.response);
                     setPestleData(responseData);   
                } 
                     
              else if (title.toLowerCase() === "logframe") {
                        setIsLogframe(true);
                        const responseData = JSON.parse(response.data.response);
                        setLogframeData(responseData);   
                } else {
                    setPrompt(response.data.response);
                }
            } catch (error) {
                console.error("Error fetching prompts:", error);
            } finally {
                setLoading(false);
            }
        };

    return (
        <div>
            <h1 className="text-xl font-bold text-center text-blue-default">
                {title} Prompts
            </h1>
            {loading ? (
                <Loader />
            ) : isSwot ? (
                <div>
                    <table className="w-full  border-2 border-collapse border-gray-300">
                        <tbody>
                            <tr>
                                <td className="px-4 border border-gray-300">
                                    <h3 className="font-bold">Strengths</h3>
                                    <ul className="list-disc list-inside">
                                        {swotData?.strengths && swotData.strengths.map((strength, index) => (
                                            <li key={index}>{strength}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="px-4 border border-gray-300">
                                    <h3 className="font-bold">Economic</h3>
                                    <ul className="list-disc list-inside">
                                        {swotData?.Economic && swotData.Economic.map((weakness, index) => (
                                            <li key={index}>{weakness}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 border border-gray-300">
                                    <h3 className="font-bold">Opportunities</h3>
                                    <ul className="list-disc list-inside">
                                        {swotData?.opportunities && swotData.opportunities.map((opportunity, index) => (
                                            <li key={index}>{opportunity}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="px-4 border border-gray-300">
                                    <h3 className="font-bold">Threats</h3>
                                    <ul className="list-disc list-inside">
                                        {swotData?.threats && swotData.threats.map((threat, index) => (
                                            <li key={index}>{threat}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ):isPestle? (
                <div className="grid grid-cols-2  border border-1 w-[90%]  m-auto h-full ">
                {Object.keys(pestleData || {}).map(
                    (category, index) => (
                        <React.Fragment key={index}>
                            <div
                                className={`col-span-1 border border-1 ${
                                    index % 2 === 0
                                        ? "bg-slate-300"
                                        : ""
                                }`}
                            >
                                <div className="p-4 text-blue-default font-bold text-1xl text-start text-xl">
                                    {category
                                        .charAt(0)
                                        .toUpperCase() +
                                        category.slice(1)}{" "}
                                    (
                                    {category
                                        .charAt(0)
                                        .toUpperCase()}
                                    )
                                </div>
                            </div>
                            <div
                                className={`col-span-1 ${
                                    index % 2 === 0
                                        ? "bg-slate-300"
                                        : ""
                                }`}
                            >
                                <div className="p-4">
                                    <ul className="">
                                        {(
                                            pestleData[category] ||
                                            []
                                        ).map(
                                            (item: any, i: any) => (
                                                <li key={i}>
                                                    {item}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                )}
            </div>
                
            ): isLogframe?(
                <div>
                    <table className="border border-1 w-[90%] m-auto ">
                        <tbody>
                            {logframeData && (
                                <>
                                    {logframeData.goal && (
                                        <tr className="bg-slate-300 lg:h-[15vw]">
                                            <th className="border border-1 p-2 text-blue-default font-bold text-1xl text-center text-xl">
                                                Goal (G)
                                            </th>
                                            <td className="border border-1 p-4">
                                                {logframeData.goal}
                                            </td>
                                        </tr>
                                    )}
                                    {logframeData.purpose && (
                                        <tr className="lg:h-[15vw]">
                                            <th className="border border-1 p-2 text-blue-default font-bold text-1xl text-center text-xl">
                                                Purpose (P)
                                            </th>
                                            <td className="border border-1 p-4">
                                                {logframeData.purpose}
                                            </td>
                                        </tr>
                                    )}
                                    {Object.entries(logframeData).map(
                                        ([category, items], index) =>
                                            Array.isArray(items) &&
                                            items.length > 0 && (
                                                <tr
                                                    key={index}
                                                    className={
                                                        index % 2 === 0
                                                            ? "bg-slate-300"
                                                            : ""
                                                    }
                                                >
                                                    <td className="border border-1 p-4 text-blue-default font-bold text-1xl text-center text-xl">
                                                        {category
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            category.slice(
                                                                1
                                                            )}{" "}
                                                        (
                                                        {category
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                        )
                                                    </td>
                                                    <td className="border border-1 p-4">
                                                        <ul className="md:h-[50vw]  lg:h-[15vw]">
                                                            {items.map(
                                                                (
                                                                    item: any,
                                                                    i: any
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            i
                                                                        }
                                                                    >
                                                                        {
                                                                            item
                                                                        }
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </td>
                                                </tr>
                                            )
                                    )}
                                </>
                            )}
                        </tbody>
                    </table>
            </div>    
            ):(
                <p>{prompt}</p> 
            )}
            <div className="buttons flex space-x-5 mt-10 ">
                    {/* <button
                        type="submit"
                        className="bg-[#0F872F] py-2 px-4 rounded-md"
                    >
                        Save
                    </button> */}
                    <button
                        type="submit"
                        className="bg-[#ED0C0C] py-2 px-4 rounded-md"
                        onClick={refetchData}
                    >
                        Re-generate
                    </button>
                    <button
                        type="submit"
                        className="bg-[#0F872F] py-2 px-4 rounded-md"
                        onClick={()=>handelNext(title)}
                    >
                        Next
                    </button>
                </div>
        </div>
    );
};

export default PromptGet;
