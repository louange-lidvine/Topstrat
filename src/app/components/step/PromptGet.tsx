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
    const [swotData, setSwotData] = useState<{
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        threats: string[];
    } | null>(null);
    

    useEffect(() => {
        const fetchData = async () => {
            const token = getCookie("token");
            const userId = localStorage.getItem("userId");
            setLoading(true);
            try {
                const response = await axios.post(
                    `https://topstrat-backend.onrender.com/projects/${projectId}/${title.toLowerCase()}`,
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
                    `https://topstrat-backend.onrender.com/projects/${projectId}/${title.toLowerCase()}`,
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
                                    <h3 className="font-bold">Weaknesses</h3>
                                    <ul className="list-disc list-inside">
                                        {swotData?.weaknesses && swotData.weaknesses.map((weakness, index) => (
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
            ) : (
                <p>{prompt}</p>
                
            )}
            <div className="buttons flex space-x-5 mt-10 ">
                    <button
                        type="submit"
                        className="bg-[#0F872F] py-2 px-4 rounded-md"
                    >
                        Save
                    </button>
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
