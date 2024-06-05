"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import axios from "axios";
import Loader from "../../../shared/loader/page";

function Preview() {
    const router = useRouter();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [projectData, setProjectData] = useState<any>();
    const [logframeData, setLogframeData] = useState<any>();

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
        setLoading(false);
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            const token = getCookie("token");
            setLoading(true);
            try {
                const response = await axios.post(
                    `http://157.245.121.185:5000/projects/projects/generate-analysis/${id}`,
                    {
                        projectId: id
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${JSON.parse(token ?? "").access_token}`,
                        },
                    }
                );
                setLogframeData(JSON.parse(response.data.logframe.response));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const refetchData = async () => {
        const token = getCookie("token");
        setLoading(true);
        try {
            const response = await axios.post(
                `http://157.245.121.185:5000/projects/projects/generate-analysis/${id}`,
                {
                    projectId: id
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${JSON.parse(token ?? "").access_token}`,
                    },
                }
            );
            setLogframeData(JSON.parse(response.data.logframe.response));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border border-blue-default mt-4 lg:mb-4 mb-32 rounded-md mx-2 p-4 font-medium flex flex-col gap-8 ">
            {loading ? (
                <Loader />
            ) : (
                <div className="">
                    <div className="flex flex-col justify-center items-center gap-4 text-2xl">
                        <div className="text-gray-400 flex items-center justify-center border-2 p-3 rounded-md py-2 px-6">
                            {projectData && projectData.name}
                        </div>
                        <div className="text-yellow-500 font-bold">Preview</div>
                        <div className="text-blue-default font-bold">
                            Strategic Plan {projectData && projectData.name}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="text-blue-default font-bold text-2xl py-5">
                            Logframe
                        </div>
                        <table className="border border-1 m-auto  overflow-x-scroll">
                            <thead>
                                <tr className="bg-slate-300">
                                    <th className="border border-1 p-2 text-blue-default font-bold text-center">Results Chain</th>
                                    <th className="border border-1 p-2 text-blue-default font-bold text-center">Indicator</th>
                                    <th className="border border-1 p-2 text-blue-default font-bold text-center">Baseline</th>
                                    <th className="border border-1 p-2 text-blue-default font-bold text-center">Target</th>
                                    <th className="border border-1 p-2 text-blue-default font-bold text-center">Timeline</th>
                                    <th className="border border-1 p-2 text-blue-default font-bold text-center">Assumptions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logframeData && (
                                    <>
                                        <tr>
                                            <td className="border border-1 p-2 text-center font-bold bg-slate-300">Goal</td>
                                                <td className="border border-1 p-2">{logframeData.goal.indicators.join(", ")}</td>
                                                <td className="border border-1 p-2">{logframeData.goal.mov.join(", ")}</td>
                                                <td className="border border-1 p-2">{logframeData.goal.description}</td>
                                                <td className="border border-1 p-2">{logframeData.goal.description}</td>
                                                <td className="border border-1 p-2">{logframeData.goal.assump.join(", ")}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-1 p-2 text-center font-bold bg-slate-300">Outcome</td>
                                                <td className="border border-1 p-2">{logframeData.outcome.indicators.join(", ")}</td>
                                                <td className="border border-1 p-2">{logframeData.outcome.mov.join(", ")}</td>
                                                <td className="border border-1 p-2">{logframeData.outcome.description}</td>
                                                <td className="border border-1 p-2">{logframeData.outcome.description}</td>
                                                <td className="border border-1 p-2">{logframeData.outcome.assump.join(", ")}</td>
                                        </tr>
                                        {logframeData.outputs.map((output:any, index:any) => (
                                            <tr key={index} >
                                                <td className="border border-1 p-2 text-center font-bold  bg-slate-300">Output {index + 1}</td>
                                                <td className="border border-1 p-2">{output.indicators.join(", ")}</td>
                                                <td className="border border-1 p-2">{output.mov.join(", ")}</td>
                                                <td className="border border-1 p-2">{output.description}</td>
                                                <td className="border border-1 p-2">{output.description}</td>
                                                <td className="border border-1 p-2">{output.assump.join(", ")}</td>
                                            </tr>
                                        ))}
                                        {logframeData.activities.map((activity:any, index:any) => (
                                            <tr key={index}>
                                                <td className="border border-1 p-2 text-center font-bold  bg-slate-300">Activity {index + 1}</td>
                                                <td className="border border-1 p-2">{activity.indicators.join(", ")}</td>
                                                <td className="border border-1 p-2">{activity.mov.join(", ")}</td>
                                                <td className="border border-1 p-2">{activity.description}</td>
                                                <td className="border border-1 p-2">{activity.description}</td>
                                                <td className="border border-1 p-2">{activity.assump.join(", ")}</td>
                                            </tr>
                                        ))}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            <div className="flex justify-center gap-8 mx-auto">
                <button
                    className="bg-[#ED0C0C] text-white font-bold rounded-md m-auto py-3 px-6"
                    onClick={() => router.push(`../../components/Preview2/${id}`)}
                >
                    Back
                </button>
                <button
                    className="bg-orange-default text-white font-bold rounded-md m-auto py-3 px-6"
                    onClick={refetchData}
                >
                    Regenerate
                </button>
                <div
                    className="flex bg-blue-default text-white font-bold rounded-md m-auto py-3 px-6 cursor-pointer"
                    onClick={() => router.push(`/components/Final/${id}`)}
                >
                    Next
                </div>
            </div>
        </div>
    );
}

export default Preview;
