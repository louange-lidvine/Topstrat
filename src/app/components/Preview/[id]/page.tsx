"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";


import Loader from "@/app/shared/loader/page";

import { getCookie } from "cookies-next";

function Preview() {
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [promptData, setPromptData] = useState<any>();
    const [error, setError] = useState<string | null>(null);
    // const [loading, setLoading] = useState<boolean>(true);
    const [projectData, setProjectData] = useState<any>();


  
    
   
       useEffect(() => {
           const getProject = async (id: string) => {
               try {
                   const token = getCookie("token");
                   const response = await axios.get(
                       ` https://topstrat-backend.onrender.com/projects/${id}`,
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
                   console.log("this is the name and desc"+response.data);
               } catch (error) {
                   console.error("Error fetching project data:", error);
               }
           };
           getProject(id as string);
        //    setLoading(false);
           setIsLoading(false);
       }, []);

     useEffect(() => {
       const fetchData = async () => {
           try {
               const token = getCookie("token");
               setIsLoading(true);
               const response = await axios.get(
                   `https://topstrat-backend.onrender.com/projects/prompts/latest/${id}`,
                //    {
                //        projectId: id,
                //    },
                   {
                       headers: {
                           "Content-Type": "application/json",
                           Authorization: `Bearer ${
                               JSON.parse(token ?? "").access_token
                           }`,
                       },
                   }
               );
                    console.log(response.data);
               setIsLoading(false);
          
               // Check if response.data exists and update states accordingly
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
     }, [])
    
 

    return (
        <div className="border border-blue-default my-4 rounded-md mx-2  float-right p-4 font-medium ">
            <div className="flex flex-col  justify-center items-center gap-4 text-2xl ">
                <div className="text-gray-400   flex items-center justify-center border-2  p-3 rounded-md py-2  px-6">
                    {projectData && projectData.name}
                </div>
                <div className="text-yellow-500 font-bold ">Preview</div>
                <div className="text-blue-default font-bold  ">
                    Strategic Plan {projectData && projectData.name}
                </div>
            </div>
            <div>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4 ">
                        <h3 className="text-blue-default font-bold text-xl">
                            {" "}
                            Project Overview
                        </h3>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <p className="">
                                {projectData && projectData.description}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xl font-bold"> Vision</h3>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <p>
                                {promptData &&
                                    promptData.vision &&
                                    promptData.mission.response}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xl font-bold"> Mission</h3>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <p>
                                {promptData &&
                                    promptData.mission &&
                                    promptData.mission.response}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xl font-bold"> Objectives</h3>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <p>
                                {promptData &&
                                    promptData.objectives &&
                                    promptData.mission.response}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xl font-bold"> Values</h3>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <p>
                                {promptData &&
                                    promptData.values &&
                                    promptData.mission.response}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xl font-bold"> Strategy</h3>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <p>
                                {promptData &&
                                    promptData.strategy &&
                                    promptData.mission.response}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 ">
                <h2 className="text-xl font-bold text-blue-default">
                    SWOT ANALYSIS
                </h2>
                <div className="w-[100%] flex justify-center items-center">
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <table className="border border-collapse w-full overflow-x-auto  ">
                            <tr className="text-blue-default">
                                <td className="border-2 border-solid border-black p-[6px] text-left px-6 py-3">
                                    Strengths(S)
                                </td>
                                <td className="border-2 border-solid border-black p-[6px] text-left px-6 ">
                                    Weaknesses(W)
                                </td>
                            </tr>
                            <tr>
                                <td className="border-2 border-solid border-black p-[6px] text-left px-6 ">
                                    {promptData &&
                                        promptData.swot &&
                                        promptData.swot.response &&
                                        JSON.parse(promptData.swot.response)
                                            .strengths[0]}
                                </td>
                                <td className="border-2 border-solid border-black p-[6px] text-left px-6 ">
                                    {" "}
                                    {promptData &&
                                        promptData.swot &&
                                        promptData.swot.response &&
                                        JSON.parse(promptData.swot.response)
                                            .strengths[1]}
                                </td>
                            </tr>
                            <tr>
                                <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                                    Low Space Requirements
                                </td>
                                <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                                    {promptData &&
                                        promptData.swot &&
                                        promptData.swot.response &&
                                        JSON.parse(promptData.swot.response)
                                            .weaknesses[1]}
                                </td>
                            </tr>
                            <tr>
                                <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                                    {promptData &&
                                        promptData.swot &&
                                        promptData.swot.response &&
                                        JSON.parse(promptData.swot.response)
                                            .strengths[2]}
                                </td>
                                <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                                    {promptData &&
                                        promptData.swot &&
                                        promptData.swot.response &&
                                        JSON.parse(promptData.swot.response)
                                            .weaknesses[2]}
                                </td>
                            </tr>
                            <tr className="text-blue-default ">
                                <td className="border-2 border-solid border-black p-[6px] text-left px-6 py-3">
                                    Opportunities (O)
                                </td>
                                <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                                    Threats (T)
                                </td>
                            </tr>

                            <tr>
                                <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                                    {promptData &&
                                        promptData.swot &&
                                        promptData.swot.response &&
                                        JSON.parse(promptData.swot.response)
                                            .opportunities[0]}
                                </td>
                                <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                                    {promptData &&
                                        promptData.swot &&
                                        promptData.swot.response &&
                                        JSON.parse(promptData.swot.response)
                                            .threats[0]}
                                </td>
                            </tr>
                            <tr>
                                <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                                    {promptData &&
                                        promptData.swot &&
                                        promptData.swot.response &&
                                        JSON.parse(promptData.swot.response)
                                            .opportunities[1]}
                                </td>
                                <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                                    {promptData &&
                                        promptData.swot &&
                                        promptData.swot.response &&
                                        JSON.parse(promptData.swot.response)
                                            .threats[1]}
                                </td>
                            </tr>
                            <tr>
                                <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                                    {promptData &&
                                        promptData.swot &&
                                        promptData.swot.response &&
                                        JSON.parse(promptData.swot.response)
                                            .opportunities[2]}
                                </td>
                                <td className="border-2 border-solid border-black p-[6px] text-left px-6">
                                    {promptData &&
                                        promptData.swot &&
                                        promptData.swot.response &&
                                        JSON.parse(promptData.swot.response)
                                            .threats[2]}
                                </td>
                            </tr>
                        </table>
                    )}
                </div>
                {/* <Link href="/signup">Sign Up</Link> */}
                <div
                    className="bg-blue-default text-white  m-auto font-bold  rounded-md py-3 w-1/2"
                    onClick={() => router.push("../../components/Preview2")}
                >
                    <div className="flex  items-center justify-center ">
                        next
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Preview;
