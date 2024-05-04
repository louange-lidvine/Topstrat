"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { getCookie } from "cookies-next";
import Loader from "@/app/shared/loader/page";
import PdfButton from "../../Export/PdfButton";


function Final() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
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

    return (
        <div className="border border-blue-default my-4 rounded-md mx-2 p-4 font-medium">
            <div className="flex flex-col  justify-center items-center gap-4 text-2xl ">
                <div className="text-gray-400   flex items-center justify-center border-2  p-3 rounded-md py-2  px-6">
                    {projectData && projectData.name}
                </div>
                <div className="text-yellow-500 font-bold ">Preview</div>
                <div className="text-blue-default font-bold  ">
                    Strategic Plan {projectData && projectData.name}
                </div>
            </div>
            <div className=" w-full">
                {" "}
                <div className="flex flex-col gap-6 ">
                    <div className="flex flex-col gap-4 ">
                        <h3 className="text-blue-default font-bold text-xl">
                            {" "}
                            Project Overview /{" "}
                        </h3>
                        {isLoading ? (
                            <div className="w-full">
                                {" "}
                                <Loader />
                            </div>
                        ) : (
                            <p className="">
                                {projectData && projectData.description}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xl font-bold"> Vision</h3>
                        {isLoading ? (
                            <div className="w-full">
                                {" "}
                                <Loader />
                            </div>
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
                            <div className="w-full">
                                {" "}
                                <Loader />
                            </div>
                        ) : (
                            <p>
                                {promptData &&
                                    promptData.mission &&
                                    promptData.vision.response}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xl font-bold"> Objectives</h3>
                        {isLoading ? (
                            <div className="w-full">
                                {" "}
                                <Loader />
                            </div>
                        ) : (
                            <p>
                                {promptData &&
                                    promptData.objectives &&
                                    promptData.objectives.response}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xl font-bold"> Values</h3>
                        {isLoading ? (
                            <div className="w-full">
                                {" "}
                                <Loader />
                            </div>
                        ) : (
                            <p>
                                {promptData &&
                                    promptData.values &&
                                    promptData.values.response}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xl font-bold"> Strategy</h3>
                        {isLoading ? (
                            <div className="w-full">
                                {" "}
                                <Loader />
                            </div>
                        ) : (
                            <p>
                                {promptData &&
                                    promptData.strategy &&
                                    promptData.strategy.response}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-6 mt-5 ">
                <h2 className="text-xl font-bold text-blue-default">
                    SWOT ANALYSIS
                </h2>
                <div className="w-[100%] flex justify-center items-center">
                    {isLoading ? (
                        <div className="w-full">
                            {" "}
                            <Loader />
                        </div>
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
            </div>

            {loading ? (
                <Loader />
            ) : (
                <div>
                    <div className="flex flex-col gap-3">
                        <div className="text-blue-default font-bold text-2xl py-5">
                            PESTLE Analysis
                        </div>
                        <div className="grid grid-cols-2  border border-1 w-full overflow-x-auto m-auto h-full ">
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
                                                <ul className=" md:h-[50vw]  lg:h-[15vw] ">
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
                    </div>
                </div>
            )}

            {loading ? (
                <Loader />
            ) : (
                <div>
                    <div className="flex flex-col gap-3">
                        <div className="text-blue-default font-bold text-2xl py-5">
                            Logframe
                        </div>
                        <table className="border border-1 w-full overflow-x-auto m-auto">
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
                </div>
            )}

            {/* <button
                className="bg-[#FBBC05] text-white font-bold  rounded-md py-3 px-6 flex items-center justify-center my-5 mx-auto "
                onClick={() => {
                    console.log("Fasdfas");
                    router.push("/components/Export");
                }}
            >
                Export as PDF
            </button> */}
            <PdfButton />
        </div>
    );
}

export default Final;
