"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import axios from "axios";
import PestleSkeleton from "../../skeletons/PestleSkeleton";
import Skeleton from "react-loading-skeleton";

function Preview() {
    const router = useRouter();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [projectData, setProjectData] = useState<any>();
    const [pestleData, setPestleData] = useState<any>(null);
    const [editablePestleData, setEditablePestleData] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const getProject = async (id: string) => {
            try {
                const token = getCookie("token");
                const response = await axios.get(
                    `http://157.245.121.185:5000/projects/${id}`,
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
        setLoading(false);
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            const token = getCookie("token");
            setLoading(true);
            try {
                const response = await axios.post(
                    `http://157.245.121.185:5000/projects/projects/generate-analysis/${id}`,
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
                const data = JSON.parse(response.data.pestle.response);
                setPestleData(data);
                setEditablePestleData(data);
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
            const data = JSON.parse(response.data.pestle.response);
            setPestleData(data);
            setEditablePestleData(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCellChange = (category: string, field: string, value: string) => {
        setEditablePestleData((prevData: any) => ({
            ...prevData,
            [category]: {
                ...prevData[category],
                [field]: value,
            },
        }));
        setIsEditing(true);
    };

    const saveData = async () => {
        const token = getCookie("token");
        try {
            await axios.put(
                `http://157.245.121.185:5000/projects/${id}/update-analysis`,
                { pestle: editablePestleData },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${
                            JSON.parse(token ?? "").access_token
                        }`,
                    },
                }
            );
            setPestleData(editablePestleData); // Update the main data with the new data
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    return (
        <div className="border border-blue-default my-4 rounded-md mx-2 p-4 font-medium flex flex-col gap-8 w-full">
            {loading ? (
                <PestleSkeleton />
           
            ) : (
                <div className="flex flex-col gap-3">
                    <div className="text-blue-default font-bold text-2xl py-5">
                        PESTLE Analysis
                    </div>
                    <div className="overflow-x-auto">
                        <table className="border border-1 m-auto">
                            <thead>
                                <tr className="bg-slate-300">
                                    <th className="border border-1 p-2 text-blue-default font-bold text-center"></th>
                                    <th className="border border-1 p-2 text-blue-default font-bold text-center">
                                        Influence on organization
                                    </th>
                                    <th className="border border-1 p-2 text-blue-default font-bold text-center">
                                        Impact on organization
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {editablePestleData && (
                                    <>
                                        {["political", "economic", "social", "technological", "legal", "environmental"].map((category) => (
                                            <tr key={category}>
                                                <td className="border border-1 p-2 text-center font-bold bg-slate-300">
                                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                                </td>
                                                <td
                                                    className="border border-1 p-2"
                                                    contentEditable
                                                    suppressContentEditableWarning
                                                    onBlur={(e) =>
                                                        handleCellChange(category, "inf", e.currentTarget.textContent || "")
                                                    }
                                                    style={{ minWidth: "200px" }}
                                                >
                                                    {editablePestleData[category].inf}
                                                </td>
                                                <td
                                                    className="border border-1 p-2"
                                                    contentEditable
                                                    suppressContentEditableWarning
                                                    onBlur={(e) =>
                                                        handleCellChange(category, "imp", e.currentTarget.textContent || "")
                                                    }
                                                    style={{ minWidth: "200px" }}
                                                >
                                                    {editablePestleData[category].imp}
                                                </td>
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
                <button
                    className="bg-green-500 text-white font-bold rounded-md m-auto py-3 px-6"
                    onClick={saveData}
                    disabled={!isEditing}
                >
                    Save
                </button>
                <div
                    className="flex bg-blue-default text-white font-bold rounded-md m-auto py-3 px-6 cursor-pointer"
                    onClick={() => router.push(`/components/Preview3/${id}`)}
                >
                    Next
                </div>
            </div>
        </div>
    );
}

export default Preview;

