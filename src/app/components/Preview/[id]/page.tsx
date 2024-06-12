"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { getCookie } from "cookies-next";
import Loader from "../../../shared/loader/page";
import { Skeleton } from "@mantine/core";

function Preview() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [promptData, setPromptData] = useState<any>();
    const [error, setError] = useState<string | null>(null);
    const [projectData, setProjectData] = useState<any>();

    const handleNextClick = () => {
        router.push(`/components/Preview2/${id}`);
    };

    useEffect(() => {
        const getProject = async (id: string) => {
            try {
                const token = getCookie("token");
                const response = await axios.get(
                    `http://157.245.121.185:5000/projects/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${JSON.parse(token ?? "").access_token}`,
                        },
                    }
                );
                setProjectData(response.data);
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };
        getProject(id as string);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getCookie("token");
                setIsLoading(true);
                const response = await axios.get(
                    `http://157.245.121.185:5000/projects/prompts/latest/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${JSON.parse(token ?? "").access_token}`,
                        },
                    }
                );
                if (response.data) {
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

        fetchData();
    }, []);

    const refetchData = async () => {
        try {
            const token = getCookie("token");
            setIsLoading(true);
            const response = await axios.get(
                `http://157.245.121.185:5000/projects/prompts/latest/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${JSON.parse(token ?? "").access_token}`,
                    },
                }
            );
            if (response.data) {
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

    const renderList = (data: string) => {
        return data
            .split(/\d+\.\s*/)  
            .filter(item => item.trim() !== '')
            .map((item, index) => <li key={index}>{index + 1}. {item.trim()}</li>);
    };

    return (
        <div className="border border-blue-default mt-4 mb-12 lg:mb-4 rounded-md mx-2 p-4 font-medium">
            <div className="flex flex-col justify-center items-center gap-4 text-2xl">
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
                        <h3 className="text-blue-default font-bold text-xl">Project Overview</h3>
                        {isLoading ? (
                            <div className="w-full"><Skeleton /></div>
                        ) : (
                            <p>{projectData && projectData.description}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xl font-bold">Vision</h3>
                        {isLoading ? (
                            <div className="w-full"><Skeleton height={30} /></div>
                        ) : (
                            <p>{promptData && promptData.vision && promptData.vision.response}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xl font-bold">Mission</h3>
                        {isLoading ? (
                            <div className="w-full"><Skeleton /></div>
                        ) : (
                            <p>{promptData && promptData.mission && promptData.mission.response}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xl font-bold">Objectives</h3>
                        {isLoading ? (
                            <div className="w-full"><Skeleton /></div>
                        ) : (
                            <ul>{promptData && promptData.objectives && renderList(promptData.objectives.response)}</ul>
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xl font-bold">Values</h3>
                        {isLoading ? (
                            <div className="w-full"><Skeleton /></div>
                        ) : (
                            <ul>{promptData && promptData.values && renderList(promptData.values.response)}</ul>
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xl font-bold">Strategy</h3>
                        {isLoading ? (
                            <div className="w-full"><Skeleton /></div>
                        ) : (
                            <ul>{promptData && promptData.strategy && renderList(promptData.strategy.response)}</ul>
                        )}                                                                                                                             
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-blue-default">SWOT ANALYSIS</h2>
                <div className="w-[100%] flex justify-center items-center">
                    {isLoading ? (
                        <div className="w-full"><Loader /></div>

                    ) : (
                        // <table className="border border-collapse w-full overflow-x-auto">
                        //     <thead>
                        //         <tr className="text-blue-default">
                        //             <td className="border-2 border-solid border-black p-[6px] text-left px-6 py-3">Strengths(S)</td>
                        //             <td className="border-2 border-solid border-black p-[6px] text-left px-6">Weaknesses(W)</td>
                        //         </tr>
                        //     </thead>
                        //     {/* <tbody>
                        //         {promptData && promptData.swot && promptData.swot.response && (
                        //             JSON.parse(promptData.swot.response).strengths.map((strength:any, index:number) => (
                        //                 <tr key={index}>
                        //                     <td className="border-2 border-solid border-black p-[6px] text-left px-6">{strength}</td>
                        //                     <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                        //                         {JSON.parse(promptData.swot.response).weaknesses[index]}
                        //                     </td>
                        //                 </tr>
                        //             ))
                        //         )}
                        //         <tr className="text-blue-default">
                        //             <td className="border-2 border-solid border-black p-[6px] text-left px-6 py-3">Opportunities (O)</td>
                        //             <td className="border-2 border-solid border-black p-[6px] text-left px-6">Threats (T)</td>
                        //         </tr>
                        //         {promptData && promptData.swot && promptData.swot.response && (
                        //             JSON.parse(promptData.swot.response).opportunities.map((opportunity:any, index:number) => (
                        //                 <tr key={index}>
                        //                     <td className="border-2 border-solid border-black p-[6px] text-left px-6">{opportunity}</td>
                        //                     <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                        //                         {JSON.parse(promptData.swot.response).threats[index]}
                        //                     </td>
                        //                 </tr>
                        //             ))
                        //         )}
                        //     </tbody> */}
                        // </table>
                        <div className="flex flex-col gap-6 mt-5 ">
                        <h2 className="text-xl font-bold text-blue-default">
                            SWOT ANALYSIS
                        </h2>
                        <div className="w-[100%] flex justify-center items-center">
                          {isLoading ? (
                            <div className="w-full">
                              <Loader />
                            </div>
                          ) : (
                            <table
                              style={{
                                borderCollapse: "collapse",
                                width: "100%",
                                overflowX: "auto",
                              }}
                            >
                              <tr style={{ color: "#0B6C79" }}>
                                <td
                                  style={{
                                    border: "2px solid black",
                                    padding: "6px",
                                    textAlign: "left",
                                    paddingLeft: "6px",
                                    paddingTop: "3px",
                                  }}
                                >
                              Strengths(S)
                                </td>
                                <td
                                  style={{
                                    border: "2px solid black",
                                    padding: "6px",
                                    textAlign: "left",
                                    paddingLeft: "6px",
                                  }}
                                >
                             Weaknesses(W)
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    border: "2px solid black",
                                    padding: "6px",
                                    textAlign: "left",
                                    paddingLeft: "6px",
                                  }}
                                >
                             
                                    {promptData &&
                                      promptData.swot &&
                                      promptData.swot.response &&
                                      JSON.parse(promptData.swot.response).strengths[0]}
                          
                                </td>
                                <td
                                  style={{
                                    border: "2px solid black",
                                    padding: "6px",
                                    textAlign: "left",
                                    paddingLeft: "6px",
                                  }}
                                >
                             
                                    {promptData &&
                                      promptData.swot &&
                                      promptData.swot.response &&
                                      JSON.parse(promptData.swot.response).weaknesses[0]}
                          
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    border: "2px solid black",
                                    padding: "6px",
                                    textAlign: "left",
                                    paddingLeft: "6px",
                                  }}
                                >
                             
                                    {promptData &&
                                      promptData.swot &&
                                      promptData.swot.response &&
                                      JSON.parse(promptData.swot.response).strengths[1]}
                          
                                </td>
                                <td
                                  style={{
                                    border: "2px solid black",
                                    padding: "6px",
                                    textAlign: "left",
                                    paddingLeft: "6px",
                                  }}
                                >
                             
                                    {promptData &&
                                      promptData.swot &&
                                      promptData.swot.response &&
                                      JSON.parse(promptData.swot.response).weaknesses[1]}
                          
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    border: "2px solid black",
                                    padding: "6px",
                                    textAlign: "left",
                                    paddingLeft: "6px",
                                  }}
                                >
                             
                                    {promptData &&
                                      promptData.swot &&
                                      promptData.swot.response &&
                                      JSON.parse(promptData.swot.response).strengths[2]}
                          
                                </td>
                                <td
                                  style={{
                                    border: "2px solid black",
                                    padding: "6px",
                                    textAlign: "left",
                                    paddingLeft: "6px",
                                  }}
                                >
                             
                                    {promptData &&
                                      promptData.swot &&
                                      promptData.swot.response &&
                                      JSON.parse(promptData.swot.response).weaknesses[2]}
                          
                                </td>
                              </tr>
                              <tr style={{ color: "#0B6C79" }}>
                                <td
                                  style={{
                                    border: "2px solid black",
                                    padding: "6px",
                                    textAlign: "left",
                                    paddingLeft: "6px",
                                    paddingTop: "3px",
                                  }}
                                >
                             Opportunities (O)
                                </td>
                                <td
                                  style={{
                                    border: "2px solid black",
                                    padding: "6px",
                                    textAlign: "left",
                                    paddingLeft: "6px",
                                  }}
                                >
                              Threats (T)
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    border: "2px solid black",
                                    padding: "6px",
                                    textAlign: "left",
                                    paddingLeft: "6px",
                                  }}
                                >
                             
                                    {promptData &&
                                      promptData.swot &&
                                      promptData.swot.response &&
                                      JSON.parse(promptData.swot.response).opportunities[0]}
                          
                                </td>
                                <td
                                  style={{
                                    border: "2px solid black",
                                    padding: "6px",
                                    textAlign: "left",
                                    paddingLeft: "6px",
                                  }}
                                >
                             
                                    {promptData &&
                                      promptData.swot &&
                                      promptData.swot.response &&
                                      JSON.parse(promptData.swot.response).threats[0]}
                          
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    border: "2px solid black",
                                    padding: "6px",
                                    textAlign: "left",
                                    paddingLeft: "6px",
                                  }}
                                >
                             
                                    {promptData &&
                                      promptData.swot &&
                                      promptData.swot.response &&
                                      JSON.parse(promptData.swot.response).opportunities[1]}
                          
                                </td>
                                <td
                                  style={{
                                    border: "2px solid black",
                                    padding: "6px",
                                    textAlign: "left",
                                    paddingLeft: "6px",
                                  }}
                                >
                             
                                    {promptData &&
                                      promptData.swot &&
                                      promptData.swot.response &&
                                      JSON.parse(promptData.swot.response).threats[1]}
                          
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    border: "2px solid black",
                                    padding: "6px",
                                    textAlign: "left",
                                    paddingLeft: "6px",
                                  }}
                                >
                             
                                    {promptData &&
                                      promptData.swot &&
                                      promptData.swot.response &&
                                      JSON.parse(promptData.swot.response).opportunities[2]}
                          
                                </td>
                                <td
                                  style={{
                                    border: "2px solid black",
                                    padding: "6px",
                                    textAlign: "left",
                                    paddingLeft: "6px",
                                  }}
                                >
                     
                                    {promptData &&
                                      promptData.swot &&
                                      promptData.swot.response &&
                                      JSON.parse(promptData.swot.response).threats[2]}
                          
                                </td>
                              </tr>
                            </table>
                          )}
                        </div>
                      </div>
                    )}
                </div>
                <div className="flex justify-center mx-auto gap-5">
                    <button
                        className="bg-orange-default text-white font-bold rounded-md py-3 px-6"
                        onClick={refetchData}
                    >
                        Regenerate
                    </button>
                    <button
                        className="bg-blue-default text-white font-bold rounded-md py-3 px-6 cursor-pointer"
                        onClick={handleNextClick}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Preview;
