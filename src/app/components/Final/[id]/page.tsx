"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { PDFDownloadLink, Document, Page,Text,View } from '@react-pdf/renderer';
import Loader from "@/app/shared/loader/page";
import { useParams } from "next/navigation";

function Final() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [promptData, setPromptData] = useState<any>();
    const [projectData, setProjectData] = useState<any>();
    const [pestleData, setPestleData] = useState<any>();
    const [logframeData, setLogframeData] = useState<any>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getCookie("token");
                setIsLoading(true);
                const response = await axios.get(
                    `https://topstrat-backend.onrender.com/projects/prompts/latest/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${
                                JSON.parse(token ?? "").access_token
                            }`,
                        },
                    }
                );
                setIsLoading(false);
                if (response.data) {
                    setPromptData(response.data);
                } else {
                    setError("No data received");
                }
            } catch (error) {
                setError("Error fetching data");
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const getProject = async (id: string) => {
            try {
                const token = getCookie("token");
                const response = await axios.get(
                    `https://topstrat-backend.onrender.com/projects/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${
                                JSON.parse(token ?? "").access_token
                            }`,
                        },
                    }
                );
                setProjectData(response.data);
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };
        getProject(id as string);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const token = getCookie("token");
            try {
                const response = await axios.post(
                    `https://topstrat-backend.onrender.com/projects/projects/generate-analysis/${id}`,
                    { projectId: id },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${
                                JSON.parse(token ?? "").access_token
                            }`,
                        },
                    }
                );
                setPestleData(JSON.parse(response.data.pestle.response));
                setLogframeData(JSON.parse(response.data.logframe.response));
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const MyDocument = () => (
            <Document>
                <Page>
                    <div className="border border-blue-default my-4 rounded-md mx-2 p-4 font-medium">
                        <div className="flex flex-col  justify-center items-center gap-4 text-2xl ">
                            <div className="text-gray-400   flex items-center justify-center border-2  p-3 rounded-md py-2  px-6">
                                <Text>{projectData && projectData.name}</Text>
                            </div>
                            <div className="text-yellow-500 font-bold "><Text>Preview</Text></div>
                            <div className="text-blue-default font-bold  ">
                              <Text>Strategic Plan {projectData && projectData.name}</Text>  
                            </div>
                        </div>
                        <div className=" w-full">
                            {" "}
                            <div className="flex flex-col gap-6 ">
                                <div className="flex flex-col gap-4 ">
                                    <h3 className="text-blue-default font-bold text-xl">
                                        {" "}
                                   <Text>   Project Overview {" "}</Text>  
                                    </h3>
                                    {isLoading ? (
                                        <div className="w-full">
                                            {" "}
                                            <Loader />
                                        </div>
                                    ) : (
                                        <p className="">
                                          <Text> {projectData && projectData.description}</Text> 
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-xl font-bold">  <Text style={{ fontSize: "20px", fontWeight: "bold", color: "#0B6C79" }}> Vision</Text></h3>
                                    {isLoading ? (
                                        <div className="w-full">
                                            {" "}
                                            <Loader />
                                        </div>
                                    ) : (
                                        <p>
                                            <Text>
                                                  {promptData &&
                                                promptData.vision &&
                                                promptData.mission.response}
                                            </Text>
                                          
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-xl font-bold"> <Text style={{ fontSize: "20px", fontWeight: "bold", color: "#0B6C79" }}>Mission</Text> </h3>
                                    {isLoading ? (
                                        <div className="w-full">
                                            {" "}
                                            <Loader />
                                        </div>
                                    ) : (
                                        <p>
                                            <Text>        
                                                {promptData &&
                                                promptData.mission &&
                                                promptData.vision.response}
                                                </Text>
                                    
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-xl font-bold"> <Text style={{ fontSize: "20px", fontWeight: "bold", color: "#0B6C79" }}>Objectives</Text> </h3>
                                    {isLoading ? (
                                        <div className="w-full">
                                            {" "}
                                            <Loader />
                                        </div>
                                    ) : (
                                        <p>
                                            <Text>
                                                 {promptData &&
                                                promptData.objectives &&
                                                promptData.objectives.response}
                                            </Text>
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-xl font-bold">  <Text style={{ fontSize: "20px", fontWeight: "bold", color: "#0B6C79" }}>Values</Text></h3>
                                    {isLoading ? (
                                        <div className="w-full">
                                            {" "}
                                            <Loader />
                                        </div>
                                    ) : (
                                        <p>
                                            <Text>
                                                  {promptData &&
                                                promptData.values &&
                                                promptData.values.response}
                                            </Text>
                                          
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-xl font-bold">
                                    <Text style={{ fontSize: "20px", fontWeight: "bold", color: "#0B6C79" }}>
                                        Strategy
                                        </Text> </h3>
                                    {isLoading ? (
                                        <div className="w-full">
                                            {" "}
                                            <Loader />
                                        </div>
                                    ) : (
                                        <p>
                                            <Text>
                                                 {promptData &&
                                                promptData.strategy &&
                                                promptData.strategy.response}
                                            </Text>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6 mt-5 ">
                            <h2 className="text-xl font-bold text-blue-default">
                                <Text style={{ fontSize: "20px", fontWeight: "bold", color: "#0B6C79" }}>
                                     SWOT ANALYSIS 
                                </Text>
                              
                            </h2>
                            <div className="w-[100%] flex justify-center items-center">
                        {isLoading ? (
                            <div className="w-full">
                               <Loader />
                            </div>
                        ) : (
                            <table className="border border-collapse w-full overflow-x-auto">
                                <tr className="text-blue-default">
                                    <td className="border-2 border-solid border-black p-[6px] text-left px-6 py-3">
                                        <Text>Strengths(S)</Text>
                                    </td>
                                    <td className="border-2 border-solid border-black p-[6px] text-left px-6 ">
                                        <Text>Weaknesses(W)</Text>
                                    </td>
                                </tr>
                                {promptData &&
                                    promptData.swot &&
                                    promptData.swot.response && (
                                        <React.Fragment>
                                            <tr>
                                                <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                                                    <Text>{JSON.parse(promptData.swot.response).strengths[0]}</Text>
                                                </td>
                                                <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                                                    <Text>{JSON.parse(promptData.swot.response).weaknesses[0]}</Text>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                                                    <Text>{JSON.parse(promptData.swot.response).strengths[1]}</Text>
                                                </td>
                                                <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                                                    <Text>{JSON.parse(promptData.swot.response).weaknesses[1]}</Text>
                                                </td>
                                            </tr>
                                            {/* Add more rows as needed */}
                                        </React.Fragment>
                                    )}
                            </table>
                        )}
                    </div>
                </div>
                <div>
                    <div className="flex flex-col my-6">
                        <Text style={{ fontSize: "20px", fontWeight: "bold", color: "#0B6C79" }}>PESTLE Analysis</Text>
                        {isLoading ? (
                            <div className="w-full">
                              <Loader/>
                            </div>
                        ) : (
                        <div className="grid grid-cols-2 border border-1 w-full overflow-x-auto m-auto h-full">
                            {Object.keys(pestleData || {}).map((category, index) => (
                                <React.Fragment key={index}>
                                    <div
                                        className={`col-span-1 border border-1 ${
                                            index % 2 === 0 ? "bg-slate-300" : ""
                                        }`}
                                    >
                                        <div className="p-4 text-blue-default font-bold text-1xl text-start text-xl">
                                            <Text>
                                                {category.charAt(0).toUpperCase() + category.slice(1)} ({category.charAt(0).toUpperCase()})
                                            </Text>
                                        </div>
                                    </div>
                                    <div className={`col-span-1 ${index % 2 === 0 ? "bg-slate-300" : ""}`}>
                                        <div className="p-4">
                                            <ul className=" md:h-[50vw]  lg:h-[15vw] ">
                                                {(pestleData[category] || []).map((item:any, i:any) => (
                                                    <li key={i}>
                                                        <Text>{item}</Text>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                        )}
                    </div>
                </div>
                <div>
                    <div className="flex flex-col  my-6">
                        <Text style={{ fontSize: "20px", fontWeight: "bold", color: "#0B6C79" }}>Logframe</Text>
                        <table className="border border-1 w-full overflow-x-auto m-auto">
                        {isLoading ? (
                                <div className="w-full">
                                    {/* Loader */}
                                </div>
                            ) : (
                            <tbody>
                                {logframeData &&
                                    Object.entries(logframeData).map(([category, items], index) => (
                                        Array.isArray(items) &&
                                        items.length > 0 && (
                                            <tr key={index} className={index % 2 === 0 ? "bg-slate-300" : ""}>
                                                <td className="border border-1 p-4 text-blue-default font-bold text-1xl text-center text-xl">
                                                    <Text>
                                                        {category.charAt(0).toUpperCase() + category.slice(1)} ({category.charAt(0).toUpperCase()})
                                                    </Text>
                                                </td>
                                                <td className="border border-1 p-4">
                                                    <ul className="md:h-[50vw]  lg:h-[15vw]">
                                                        {items.map((item, i) => (
                                                            <li key={i}>
                                                                <Text>{item}</Text>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                            </tr>
                                        )
                                    ))}
                            </tbody>
                            )}
                        </table>
                    </div>
                </div>
                        </div>
                </Page>
            </Document>
    );

    return (
        <div>
            <MyDocument/>
            <PDFDownloadLink document={<MyDocument />} fileName="document.pdf">
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Download PDF'
                }
            </PDFDownloadLink>
        </div>
    );
}

export default Final;

