"use client"
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import axios from "axios";
import Loader from "../../../shared/loader/page";
import { redirect } from "next/navigation";

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
                    `https://topstrat-backend.onrender.com/projects/${id}`,
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
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const token = getCookie("token");
            setLoading(true);
            try {
                const response = await axios.post(
                    `https://topstrat-backend.onrender.com/projects/projects/generate-analysis/${id}`,
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
                console.log(JSON.parse(response.data.logframe.response));
                setLogframeData(JSON.parse(response.data.logframe.response));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, []);

    return (
        <div className="border border-blue-default my-4 rounded-md mx-2 p-4 font-medium flex flex-col gap-8 ">
            {loading ? (
                <Loader />
            ) : (
                <div>
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
                        <table className="border border-1 w-[90%] m-auto">
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
            <button
                className="bg-blue-default text-white font-bold  rounded-md m-auto py-3 px-6 "
                onClick={() => router.push(`../../components/Final/${id}`)}
            >
                <div
                    className="flex  items-center justify-center cursor-pointer  "
                    onClick={() => redirect(`/components/Final/${id}`)}
                >
                    next
                </div>
            </button>
        </div>
    );
}

export default Preview;
