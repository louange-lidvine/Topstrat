// "use client";
// import React, { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { getCookie } from "cookies-next";
// import axios from "axios";
// import Loader from "../../../shared/loader/page";

// function Preview() {
//     const router = useRouter();
//     const { id } = useParams();
//     const [loading, setLoading] = useState(false);
//     const [projectData, setProjectData] = useState<any>();
//     const [logframeData, setLogframeData] = useState<any>();

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
//     }, [id]);

//     useEffect(() => {
//         const fetchData = async () => {
//             const token = getCookie("token");
//             setLoading(true);
//             try {
//                 const response = await axios.post(
//                     `http://157.245.121.185:5000/projects/projects/generate-analysis/${id}`,
//                     {
//                         projectId: id,
//                     },
//                     {
//                         headers: {
//                             "Content-Type": "application/json",
//                             Authorization: `Bearer ${
//                                 JSON.parse(token ?? "").access_token
//                             }`,
//                         },
//                     }
//                 );
//                 setLogframeData(JSON.parse(response.data.logframe.response));
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
//                 {
//                     projectId: id,
//                 },
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${
//                             JSON.parse(token ?? "").access_token
//                         }`,
//                     },
//                 }
//             );
//             setLogframeData(JSON.parse(response.data.logframe.response));
//         } catch (error) {
//             console.log(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="border border-blue-default my-4 rounded-md mx-2 p-4 font-medium flex flex-col gap-8 ">
//             {loading ? (
//                 <Loader />
//             ) : (
//                 <div>
//                     <div className="flex flex-col justify-center items-center gap-4 text-2xl">
//                         <div className="text-gray-400 flex items-center justify-center border-2 p-3 rounded-md py-2 px-6">
//                             {projectData && projectData.name}
//                         </div>
//                         <div className="text-yellow-500 font-bold">Preview</div>
//                         <div className="text-blue-default font-bold">
//                             Strategic Plan {projectData && projectData.name}
//                         </div>
//                     </div>
//                     <div className="flex flex-col gap-3">
//                         <div className="text-blue-default font-bold text-2xl py-5">
//                             Logframe
//                         </div>
//                         <table className="border border-1 m-auto">
//                             <thead>
//                                 <tr className="bg-slate-300">
//                                     <th className="border border-1 p-2 text-blue-default font-bold text-center">
//                                         Results Chain
//                                     </th>
//                                     <th className="border border-1 p-2 text-blue-default font-bold text-center">
//                                         Indicator
//                                     </th>
//                                     <th className="border border-1 p-2 text-blue-default font-bold text-center">
//                                         Baseline
//                                     </th>
//                                     <th className="border border-1 p-2 text-blue-default font-bold text-center">
//                                         Target
//                                     </th>
//                                     <th className="border border-1 p-2 text-blue-default font-bold text-center">
//                                         Timeline
//                                     </th>
//                                     <th className="border border-1 p-2 text-blue-default font-bold text-center">
//                                         Assumptions
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {logframeData && (
//                                     <>
//                                         <tr>
//                                             <td className="border border-1 p-2 text-center font-bold bg-slate-300">
//                                                 Goal
//                                             </td>
//                                             <td className="border border-1 p-2">
//                                                 {logframeData.goal.indicators.join(
//                                                     ", "
//                                                 )}
//                                             </td>
//                                             <td className="border border-1 p-2">
//                                                 {logframeData.goal.mov.join(
//                                                     ", "
//                                                 )}
//                                             </td>
//                                             <td className="border border-1 p-2">
//                                                 {logframeData.goal.description}
//                                             </td>
//                                             <td className="border border-1 p-2">
//                                                 {logframeData.goal.description}
//                                             </td>
//                                             <td className="border border-1 p-2">
//                                                 {logframeData.goal.assump.join(
//                                                     ", "
//                                                 )}
//                                             </td>
//                                         </tr>
//                                         <tr>
//                                             <td className="border border-1 p-2 text-center font-bold bg-slate-300">
//                                                 Outcome
//                                             </td>
//                                             <td className="border border-1 p-2">
//                                                 {logframeData.outcome.indicators.join(
//                                                     ", "
//                                                 )}
//                                             </td>
//                                             <td className="border border-1 p-2">
//                                                 {logframeData.outcome.mov.join(
//                                                     ", "
//                                                 )}
//                                             </td>
//                                             <td className="border border-1 p-2">
//                                                 {
//                                                     logframeData.outcome
//                                                         .description
//                                                 }
//                                             </td>
//                                             <td className="border border-1 p-2">
//                                                 {
//                                                     logframeData.outcome
//                                                         .description
//                                                 }
//                                             </td>
//                                             <td className="border border-1 p-2">
//                                                 {logframeData.outcome.assump.join(
//                                                     ", "
//                                                 )}
//                                             </td>
//                                         </tr>
//                                         {logframeData.outputs.map(
//                                             (output: any, index: any) => (
//                                                 <tr key={index}>
//                                                     <td className="border border-1 p-2 text-center font-bold  bg-slate-300">
//                                                         Output {index + 1}
//                                                     </td>
//                                                     <td className="border border-1 p-2">
//                                                         {output.indicators.join(
//                                                             ", "
//                                                         )}
//                                                     </td>
//                                                     <td className="border border-1 p-2">
//                                                         {output.mov.join(", ")}
//                                                     </td>
//                                                     <td className="border border-1 p-2">
//                                                         {output.description}
//                                                     </td>
//                                                     <td className="border border-1 p-2">
//                                                         {output.description}
//                                                     </td>
//                                                     <td className="border border-1 p-2">
//                                                         {output.assump.join(
//                                                             ", "
//                                                         )}
//                                                     </td>
//                                                 </tr>
//                                             )
//                                         )}
//                                         {logframeData.activities.map(
//                                             (activity: any, index: any) => (
//                                                 <tr key={index}>
//                                                     <td className="border border-1 p-2 text-center font-bold  bg-slate-300">
//                                                         Activity {index + 1}
//                                                     </td>
//                                                     <td className="border border-1 p-2">
//                                                         {activity.indicators.join(
//                                                             ", "
//                                                         )}
//                                                     </td>
//                                                     <td className="border border-1 p-2">
//                                                         {activity.mov.join(
//                                                             ", "
//                                                         )}
//                                                     </td>
//                                                     <td className="border border-1 p-2">
//                                                         {activity.description}
//                                                     </td>
//                                                     <td className="border border-1 p-2">
//                                                         {activity.description}
//                                                     </td>
//                                                     <td className="border border-1 p-2">
//                                                         {activity.assump.join(
//                                                             ", "
//                                                         )}
//                                                     </td>
//                                                 </tr>
//                                             )
//                                         )}
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
//                     onClick={() =>
//                         router.push(`../../components/Preview2/${id}`)
//                     }
//                 >
//                     Back
//                 </button>
//                 <button
//                     className="bg-orange-default text-white font-bold rounded-md m-auto py-3 px-6"
//                     onClick={refetchData}
//                 >
//                     Regenerate
//                 </button>
//                 <div
//                     className="flex bg-blue-default text-white font-bold rounded-md m-auto py-3 px-6 cursor-pointer"
//                     onClick={() => router.push(`/components/Final/${id}`)}
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
import Loader from "../../../shared/loader/page";

function Preview() {
    const router = useRouter();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [projectData, setProjectData] = useState<any>();
    const [logframeData, setLogframeData] = useState<any>(null);
    const [editableLogframeData, setEditableLogframeData] = useState<any>(null);

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
                const data = JSON.parse(response.data.logframe.response);
                console.log(data);
                setLogframeData(data);
                setEditableLogframeData(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (level: string, field: string, value: string) => {
        setEditableLogframeData((prevData: any) => ({
            ...prevData,
            [level]: {
                ...prevData[level],
                [field]: value,
            },
        }));
    };

    const saveChanges = async () => {
        const token = getCookie("token");
        setLoading(true);
        try {
            await axios.put(
                `http://157.245.121.185:5000/projects/${id}/update-analysis`,
                { logframeData: editableLogframeData },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${
                            JSON.parse(token ?? "").access_token
                        }`,
                    },
                }
            );
            setLogframeData(editableLogframeData); // Update displayed data with edited data
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

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
            setLogframeData(JSON.parse(response.data.logframe.response));
            console.log(JSON.parse(response.data.logframe.response));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border border-blue-default my-4 rounded-md mx-2 p-4 font-medium flex flex-col gap-8">
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
                        <table className="border border-1 m-auto">
                            <thead>
                                <tr className="bg-slate-300">
                                    <th className="border border-1 p-2 text-blue-default font-bold text-center">
                                        Results Chain
                                    </th>
                                    <th className="border border-1 p-2 text-blue-default font-bold text-center">
                                        Indicator
                                    </th>
                                    <th className="border border-1 p-2 text-blue-default font-bold text-center">
                                        Baseline
                                    </th>
                                    <th className="border border-1 p-2 text-blue-default font-bold text-center">
                                        Target
                                    </th>
                                    <th className="border border-1 p-2 text-blue-default font-bold text-center">
                                        Timeline
                                    </th>
                                    <th className="border border-1 p-2 text-blue-default font-bold text-center">
                                        Assumptions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {editableLogframeData && (
                                    <>
                                        <tr>
                                            <td className="border border-1 p-2 text-center font-bold bg-slate-300">
                                                Goal
                                            </td>
                                            <td className="border border-1 p-2">
                                                <input
                                                    type="text"
                                                    value={
                                                        editableLogframeData.goal?.indicators?.join(
                                                            ", "
                                                        ) ?? ""
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "goal",
                                                            "indicators",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border-none px-2 h-full"
                                                    style={{ fontSize: "16px" }}
                                                />
                                            </td>
                                            <td className="border border-1 p-2">
                                                <input
                                                    type="text"
                                                    value={
                                                        editableLogframeData.goal?.mov?.join(
                                                            ", "
                                                        ) ?? ""
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "goal",
                                                            "mov",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border-none px-2 h-full"
                                                    style={{ fontSize: "16px" }}
                                                />
                                            </td>
                                            <td className="border border-1 p-2">
                                                <input
                                                    type="text"
                                                    value={
                                                        editableLogframeData
                                                            .goal
                                                            ?.description ?? ""
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "goal",
                                                            "description",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border-none px-2 h-full"
                                                    style={{ fontSize: "16px" }}
                                                />
                                            </td>
                                            <td className="border border-1 p-2">
                                                <input
                                                    type="text"
                                                    value={
                                                        editableLogframeData
                                                            .goal
                                                            ?.description ?? ""
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "goal",
                                                            "timeline",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border-none px-2 h-full"
                                                    style={{ fontSize: "16px" }}
                                                />
                                            </td>
                                            <td className="border border-1 p-2">
                                                <input
                                                    type="text"
                                                    value={
                                                        editableLogframeData
                                                            .goal?.assump ?? ""
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "goal",
                                                            "assump",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border-none px-2 h-full"
                                                    style={{ fontSize: "16px" }}
                                                />
                                            </td>
                                            <td className="border border-1 p-2"></td>
                                        </tr>
                                        <tr>
                                            <td className="border border-1 p-2 text-center font-bold bg-slate-300">
                                                Outcome
                                            </td>
                                            <td className="border border-1 p-2">
                                                <input
                                                    type="text"
                                                    value={
                                                        editableLogframeData.outcome?.indicators?.join(
                                                            ", "
                                                        ) ?? ""
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "outcome",
                                                            "indicators",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border-none px-2 h-full"
                                                    style={{ fontSize: "16px" }}
                                                />
                                            </td>
                                            <td className="border border-1 p-2">
                                                <input
                                                    type="text"
                                                    value={
                                                        editableLogframeData.outcome?.mov?.join(
                                                            ", "
                                                        ) ?? ""
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "outcome",
                                                            "mov",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border-none px-2 h-full"
                                                    style={{ fontSize: "16px" }}
                                                />
                                            </td>
                                            <td className="border border-1 p-2">
                                                <input
                                                    type="text"
                                                    value={
                                                        editableLogframeData
                                                            .outcome
                                                            ?.description ?? ""
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "outcome",
                                                            "description",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border-none px-2 h-full"
                                                    style={{ fontSize: "16px" }}
                                                />
                                            </td>
                                            <td className="border border-1 p-2">
                                                <input
                                                    type="text"
                                                    value={
                                                        editableLogframeData
                                                            .outcome
                                                            ?.description ?? ""
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "outcome",
                                                            "des",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border-none px-2 h-full"
                                                    style={{ fontSize: "16px" }}
                                                />
                                            </td>
                                            <td className="border border-1 p-2">
                                                <input
                                                    type="text"
                                                    value={
                                                        editableLogframeData.outcome?.assump?.join(
                                                            ", "
                                                        ) ?? ""
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "outcome",
                                                            "assump",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border-none px-2 h-full"
                                                    style={{ fontSize: "16px" }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-1 p-2 text-center font-bold bg-slate-300">
                                                Output
                                            </td>
                                            <td className="border border-1 p-2">
                                                <input
                                                    type="text"
                                                    value={
                                                        editableLogframeData
                                                            .outputs?.indicator
                                                            ? editableLogframeData.output?.indicator?.join(
                                                                  ", "
                                                              )
                                                            : ""
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "output",
                                                            "indicators",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border-none px-2 h-full"
                                                    style={{ fontSize: "16px" }}
                                                />
                                            </td>
                                            <td className="border border-1 p-2">
                                                <input
                                                    type="text"
                                                    value={
                                                        editableLogframeData.output?.mov?.join(
                                                            ", "
                                                        ) ?? ""
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "output",
                                                            "mov",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border-none px-2 h-full"
                                                    style={{ fontSize: "16px" }}
                                                />
                                            </td>
                                            <td className="border border-1 p-2">
                                                <input
                                                    type="text"
                                                    value={
                                                        editableLogframeData
                                                            .outputs
                                                            ?.description ?? ""
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "output",
                                                            "description",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border-none px-2 h-full"
                                                    style={{ fontSize: "16px" }}
                                                />
                                            </td>
                                            <td className="border border-1 p-2">
                                                <input
                                                    type="text"
                                                    value={
                                                        editableLogframeData
                                                            .outputs
                                                            ?.description ?? ""
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "output",
                                                            "description",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border-none px-2 h-full"
                                                    style={{ fontSize: "16px" }}
                                                />
                                            </td>
                                            <td className="border border-1 p-2">
                                                <input
                                                    type="text"
                                                    value={
                                                        editableLogframeData.outputs?.assump?.join(
                                                            ", "
                                                        ) ?? ""
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "output",
                                                            "assump",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border-none px-2 h-full"
                                                    style={{ fontSize: "16px" }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-1 p-2 text-center font-bold bg-slate-300">
                                                Activity
                                            </td>
                                            <td className="border border-1 p-2">
                                                <input
                                                    type="text"
                                                    value={
                                                        editableLogframeData.activities?.indicators?.join(
                                                            ", "
                                                        ) ?? ""
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "activity",
                                                            "indicators",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border-none px-2 h-full"
                                                    style={{ fontSize: "16px" }}
                                                />
                                            </td>
                                            <td className="border border-1 p-2">
                                                <input
                                                    type="text"
                                                    value={
                                                        editableLogframeData.activities?.mov?.join(
                                                            ", "
                                                        ) ?? ""
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "activity",
                                                            "mov",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border-none px-2 h-full"
                                                    style={{ fontSize: "16px" }}
                                                />
                                            </td>
                                            <td className="border border-1 p-2">
                                                <input
                                                    type="text"
                                                    value={
                                                        editableLogframeData
                                                            .activities
                                                            ?.description ?? ""
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "activity",
                                                            "description",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border-none px-2 h-full"
                                                    style={{ fontSize: "16px" }}
                                                />
                                            </td>
                                            <td className="border border-1 p-2">
                                                <input
                                                    type="text"
                                                    value={
                                                        editableLogframeData
                                                            .activities
                                                            ?.description ?? ""
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "activity",
                                                            "description",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border-none px-2 h-full"
                                                    style={{ fontSize: "16px" }}
                                                />
                                            </td>
                                            <td className="border border-1 p-2">
                                                <input
                                                    type="text"
                                                    value={
                                                        editableLogframeData
                                                            .activities
                                                            ?.assump ?? ""
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "activity",
                                                            "assump",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border-none px-2 h-full"
                                                    style={{ fontSize: "16px" }}
                                                />
                                            </td>
                                            <td className="border border-1 p-2"></td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-blue-default text-white px-4 py-2 rounded-md"
                                onClick={saveChanges}
                            >
                                Save Changes
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2"
                                onClick={refetchData}
                            >
                                Refetch Data
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Preview;