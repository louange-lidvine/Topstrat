// "use client";
// import React, { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { getCookie } from "cookies-next";
// import axios from "axios";
// import PestleSkeleton from "../../skeletons/PestleSkeleton";
// import Skeleton from "react-loading-skeleton";

// function Preview() {
//     const router = useRouter();
//     const { id } = useParams();
//     const [loading, setLoading] = useState(false);
//     const [projectData, setProjectData] = useState<any>();
//     const [pestleData, setPestleData] = useState<any>(null);
//     const [editablePestleData, setEditablePestleData] = useState<any>(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [promptId, setPromptId] = useState<string | null>(null);

//     useEffect(() => {
//         const getProject = async (id: string) => {
//             try {
//                 const token = getCookie("token");
//                 const response = await axios.get(
//                     `http://157.245.121.185:5000/projects/${id}`,
//                     {
//                         headers: {
//                             "Content-Type": "application/json",
//                             Authorization: `Bearer ${
//                                 JSON.parse(token ?? "").access_token
//                             }`,
//                         },
//                     }
//                 );
//                 setProjectData(response.data);
//             } catch (error) {
//                 console.error("Error fetching project data:", error);
//             }
//         };
//         getProject(id as string);
//         setLoading(false);
//     }, []);

//     useEffect(() => {
//         const fetchData = async () => {
//             const token = getCookie("token");
//             setLoading(true);
//             try {
//                 const response = await axios.post(
//                     `http://157.245.121.185:5000/projects/projects/generate-analysis/${id}`,
//                     { projectId: id },
//                     {
//                         headers: {
//                             "Content-Type": "application/json",
//                             Authorization: `Bearer ${
//                                 JSON.parse(token ?? "").access_token
//                             }`,
//                         },
//                     }
//                 );
//                 const data = JSON.parse(response.data.pestle.response);
//                 setPestleData(data);
//                 setEditablePestleData(data);
//                 setPromptId(response.data.pestle._id); // Extracting and setting the prompt ID
//             } catch (error) {
//                 console.log(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [id]);

//     const refetchData = async () => {
//         const token = getCookie("token");
//         setLoading(true);
//         try {
//             const response = await axios.post(
//                 `http://157.245.121.185:5000/projects/projects/generate-analysis/${id}`,
//                 { projectId: id },
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${
//                             JSON.parse(token ?? "").access_token
//                         }`,
//                     },
//                 }
//             );
//             const data = JSON.parse(response.data.pestle.response);
//             setPestleData(data);
//             setEditablePestleData(data);
//             setPromptId(response.data.pestle._id);
//             console.log("updated successfully");
//             // Extracting and setting the prompt ID
//         } catch (error) {
//             console.log(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCellChange = (
//         category: string,
//         field: string,
//         value: string
//     ) => {
//         setEditablePestleData((prevData: any) => ({
//             ...prevData,
//             [category]: {
//                 ...prevData[category],
//                 [field]: value,
//             },
//         }));
//         setIsEditing(true);
//     };

//     const saveData = async () => {
//         const token = getCookie("token");
//         if (!promptId) {
//             console.error("Prompt ID is not available");
//             return;
//         }

//         // Map the response to the expected format
//         const response = {
//             political: editablePestleData.political,
//             economic: editablePestleData.economic,
//             social: editablePestleData.social,
//             technological: editablePestleData.technological,
//             legal: editablePestleData.legal,
//             environmental: editablePestleData.environmental,
//         };

//         try {
//             await axios.put(
//                 `http://157.245.121.185:5000/projects/${id}/prompts/${promptId}`,
//                 { response }, // Use the mapped response object
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${
//                             JSON.parse(token ?? "").access_token
//                         }`,
//                     },
//                 }
//             );
//             setPestleData(editablePestleData); // Update the main data with the new data
//             setIsEditing(false);
//         } catch (error) {
//             console.error("Error saving data:", error);
//         }
//     };

//     return (
//         <div className="border border-blue-default my-4 rounded-md mx-2 p-4 font-medium flex flex-col gap-8 w-full">
//             {loading ? (
//                 <PestleSkeleton />
           
//             ) : (
//                 <div className="flex flex-col gap-3">
//                 <div className="flex flex-col justify-center items-center gap-4 text-xl">
//                 <div className="text-gray-400 flex items-center justify-center border-2 p-3 rounded-md py-2 px-6">
//                     {projectData && projectData.name}
//                 </div>
//                 <div className="text-yellow-500 font-bold">Preview</div>
//                 <div className="text-blue-default font-bold">
//                     Strategic Plan {projectData && projectData.name}
//                 </div>
//             </div>
//                     <div className="text-blue-default font-bold text-2xl py-5">
//                         PESTLE Analysis
//                     </div>
//                     <div className="overflow-x-auto">
//                         <table className="border border-1 m-auto">
//                             <thead>
//                                 <tr className="bg-slate-300">
//                                     <th className="border border-1 p-2 text-blue-default font-bold text-center"></th>
//                                     <th className="border border-1 p-2 text-blue-default font-bold text-center">
//                                         Influence on organization
//                                     </th>
//                                     <th className="border border-1 p-2 text-blue-default font-bold text-center">
//                                         Impact on organization
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {editablePestleData && (
//                                     <>
//                                         {[
//                                             "political",
//                                             "economic",
//                                             "social",
//                                             "technological",
//                                             "legal",
//                                             "environmental",
//                                         ].map((category) => (
//                                             <tr key={category}>
//                                                 <td className="border border-1 p-2 text-center font-bold bg-slate-300">
//                                                     {category
//                                                         .charAt(0)
//                                                         .toUpperCase() +
//                                                         category.slice(1)}
//                                                 </td>
//                                                 <td
//                                                     className="border border-1 p-2"
//                                                     contentEditable
//                                                     suppressContentEditableWarning
//                                                     onBlur={(e) =>
//                                                         handleCellChange(
//                                                             category,
//                                                             "inf",
//                                                             e.currentTarget
//                                                                 .textContent ||
//                                                                 ""
//                                                         )
//                                                     }
//                                                     style={{
//                                                         minWidth: "200px",
//                                                     }}
//                                                 >
//                                                     {
//                                                         editablePestleData[
//                                                             category
//                                                         ].inf
//                                                     }
//                                                 </td>
//                                                 <td
//                                                     className="border border-1 p-2"
//                                                     contentEditable
//                                                     suppressContentEditableWarning
//                                                     onBlur={(e) =>
//                                                         handleCellChange(
//                                                             category,
//                                                             "imp",
//                                                             e.currentTarget
//                                                                 .textContent ||
//                                                                 ""
//                                                         )
//                                                     }
//                                                     style={{
//                                                         minWidth: "200px",
//                                                     }}
//                                                 >
//                                                     {
//                                                         editablePestleData[
//                                                             category
//                                                         ].imp
//                                                     }
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             )}
//             <div className="flex justify-center gap-8 mx-auto">
//                 <button
//                     className="bg-[#ED0C0C] text-white font-bold rounded-md m-auto py-3 px-6"
//                     onClick={() => router.push(`../../components/Preview/${id}`)}
//                 >
//                     Back
//                 </button>
//                 <button
//                     className="bg-orange-default text-white font-bold rounded-md m-auto py-3 px-6"
//                     onClick={refetchData}
//                 >
//                     Regenerate
//                 </button>
//                 <button
//                     className="bg-green-500 text-white font-bold rounded-md m-auto py-3 px-6"
//                     onClick={saveData}
//                     disabled={!isEditing}
//                 >
//                     Save
//                 </button>
//                 <div
//                     className="flex bg-blue-default text-white font-bold rounded-md m-auto py-3 px-6 cursor-pointer"
//                     onClick={() => router.push(`/components/Preview3/${id}`)}
//                 >
//                     Next
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Preview;



"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PestleSkeleton from "../../skeletons/PestleSkeleton";

function Preview() {
    const router = useRouter();
    const { id } = useParams();
    const [projectLoading, setProjectLoading] = useState(false);
    const [pestleLoading, setPestleLoading] = useState(false);
    const [projectData, setProjectData] = useState<any>();
    const [pestleData, setPestleData] = useState<any>(null);
    const [editablePestleData, setEditablePestleData] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [promptId, setPromptId] = useState<string | null>(null);

    useEffect(() => {
        const getProject = async (id: string) => {
            try {
                const token = getCookie("token");
                setProjectLoading(true);
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
            } finally {
                setProjectLoading(false);
            }
        };
        getProject(id as string);
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            const token = getCookie("token");
            setPestleLoading(true);
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
                setPromptId(response.data.pestle._id); // Extracting and setting the prompt ID
            } catch (error) {
                console.log(error);
            } finally {
                setPestleLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const refetchData = async () => {
        const token = getCookie("token");
        setPestleLoading(true);
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
            setPromptId(response.data.pestle._id);
            console.log("updated successfully");
        } catch (error) {
            console.log(error);
        } finally {
            setPestleLoading(false);
        }
    };

    const handleCellChange = (
        category: string,
        field: string,
        value: string
    ) => {
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
        if (!promptId) {
            console.error("Prompt ID is not available");
            return;
        }

        // Map the response to the expected format
        const response = {
            political: editablePestleData.political,
            economic: editablePestleData.economic,
            social: editablePestleData.social,
            technological: editablePestleData.technological,
            legal: editablePestleData.legal,
            environmental: editablePestleData.environmental,
        };

        try {
            await axios.put(
                `http://157.245.121.185:5000/projects/${id}/prompts/${promptId}`,
                { response }, // Use the mapped response object
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
            {projectLoading ? (
                <div>
                    <div className="flex flex-col justify-center items-center gap-4 text-2xl">
                        <Skeleton width={200} height={30} />
                        <div className="text-yellow-500 font-bold">
                            <Skeleton width={100} height={30} />
                        </div>
                        <div className="text-blue-default font-bold">
                            <Skeleton width={200} height={30} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="text-blue-default font-bold text-2xl py-5">
                            <Skeleton width={100} height={30} />
                        </div>
                        <PestleSkeleton />
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex flex-col justify-center items-center gap-4 text-xl">
                        <div className="text-gray-400 flex items-center justify-center border-2 p-3 rounded-md py-2 px-6">
                            {projectData && projectData.name}
                        </div>
                        <div className="text-yellow-500 font-bold">Preview</div>
                        <div className="text-blue-default font-bold">
                            Strategic Plan {projectData && projectData.name}
                        </div>
                    </div>
                    <div className="text-blue-default font-bold text-2xl py-5">
                        PESTLE Analysis
                    </div>
                    {pestleLoading ? (
                        <PestleSkeleton />
                    ) : (
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
                                            {[
                                                "political",
                                                "economic",
                                                "social",
                                                "technological",
                                                "legal",
                                                "environmental",
                                            ].map((category) => (
                                                <tr key={category}>
                                                    <td className="border border-1 p-2 text-center font-bold bg-slate-300">
                                                        {category
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            category.slice(1)}
                                                    </td>
                                                    <td
                                                        className="border border-1 p-2"
                                                        contentEditable
                                                        suppressContentEditableWarning
                                                        onBlur={(e) =>
                                                            handleCellChange(
                                                                category,
                                                                "inf",
                                                                e.currentTarget
                                                                    .textContent || ""
                                                            )
                                                        }
                                                        style={{
                                                            minWidth: "200px",
                                                        }}
                                                    >
                                                        {
                                                            editablePestleData[
                                                                category
                                                            ].inf
                                                        }
                                                    </td>
                                                    <td
                                                        className="border border-1 p-2"
                                                        contentEditable
                                                        suppressContentEditableWarning
                                                        onBlur={(e) =>
                                                            handleCellChange(
                                                                category,
                                                                "imp",
                                                                e.currentTarget
                                                                    .textContent || ""
                                                            )
                                                        }
                                                        style={{
                                                            minWidth: "200px",
                                                        }}
                                                    >
                                                        {
                                                            editablePestleData[
                                                                category
                                                            ].imp
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className="flex justify-center my-5 gap-8">
                        <button
                            className="bg-[#ED0C0C] text-white font-bold rounded-md  py-3 px-6"
                            onClick={() =>
                                router.push(`../../components/Preview2/${id}`)
                            }
                        >
                            Back
                        </button>
                        <button
                            className="bg-orange-default text-white font-bold rounded-md py-3 px-6"
                            onClick={refetchData}
                        >
                            Regenerate
                        </button>
                        <button
                            className="bg-green-500 text-white font-bold rounded-md  py-3 px-6"
                            onClick={saveData}
                            disabled={!isEditing}
                        >
                            Save
                        </button>
                        <div
                            className="flex bg-blue-default text-white font-bold rounded-md py-3 px-6 cursor-pointer"
                            onClick={() =>
                                router.push(`/components/Final/${id}`)
                            }
                        >
                            Next
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Preview;
