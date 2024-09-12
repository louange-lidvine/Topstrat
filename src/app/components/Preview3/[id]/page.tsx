"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LogFrameSkeleton from "../../skeletons/LogFrameSkeleton";
import { baseURL } from "@/app/constants";

function Preview() {
    const router = useRouter();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [projectData, setProjectData] = useState<any>();
    const [logframeData, setLogframeData] = useState<any>({});
    const [Data, setData] = useState<any>([]);

    useEffect(() => {
        const getProject = async (id: string) => {
            try {
                const token = getCookie("token");
                const response = await axios.get(`${baseURL}/projects/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
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
                const response = await axios.get(
                    `${baseURL}/projects/prompts/latest/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = JSON.parse(response.data.logframe.response);
                setLogframeData(data);
                console.log(data);
                return data;
            } catch (error) {
                console.log("Error fetching logframe data:", error);
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
                `${baseURL}/projects/projects/generate-analysis/${id}`,
                {
                    projectId: id,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = JSON.parse(response.data.logframe.response);
            setLogframeData(data);
            setData(data);
        } catch (error) {
            console.log("Error refetching logframe data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        console.log("Changes saved:", logframeData);
    };

    return (
        <div className="border border-blue-default my-4 rounded-md mx-2 p-4 font-medium flex flex-col gap-8">
            {loading ? (
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
                        <LogFrameSkeleton />
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
                    <div className="flex flex-col gap-3">
                        <div className="text-blue-default font-bold text-2xl py-5">
                            Logframe
                        </div>
                        <h1>Goal : {logframeData?.goal?.description}</h1>
                        <div className="overflow-x-auto">
                            <table className="border border-1 m-auto">
                                <thead>
                                    <tr className="bg-slate-300">
                                        <th
                                            className="border border-1 p-2  text-blue-default font-bold text-center"
                                            colSpan={2}
                                        >
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
                                    {logframeData && logframeData.goal && (
                                        <>
                                            {/* Impact Level */}
                                            <tr className="bg-slate-100">
                                                <td className="border border-1 p-2 text-center font-bold">
                                                    Impact
                                                </td>
                                                <td className="border border-1 p-2 text-center">
                                                    {logframeData.goal.impact
                                                        ?.description || "-"}
                                                </td>
                                                <td className="border border-1 p-2">
                                                    {logframeData.goal.impact
                                                        ?.indicators &&
                                                        Object.keys(
                                                            logframeData.goal
                                                                .impact
                                                                .indicators
                                                        ).map((key, idx) => {
                                                            const indicator =
                                                                logframeData
                                                                    .goal.impact
                                                                    .indicators[
                                                                    key
                                                                ];
                                                            return (
                                                              <div key={idx} contentEditable onChange={(e) => {
                                                                const text = e.currentTarget.textContent
                                                                logframeData.goal.impact.indicators[key].indicator = text;
                                                                }} >
                                                                    <p>
                                                                        {key}:
                                                                    </p>{" "}
                                                                    {indicator.indicator ||
                                                                        ""}
                                                                    ,
                                                                </div>
                                                            );
                                                        })}
                                                </td>
                                                <td className="border border-1 p-2">
                                                    {logframeData.goal.impact
                                                        ?.indicators &&
                                                        Object.keys(
                                                            logframeData.goal
                                                                .impact
                                                                .indicators
                                                        ).map((key, idx) => {
                                                            const indicator =
                                                                logframeData
                                                                    .goal.impact
                                                                    .indicators[
                                                                    key
                                                                ];
                                                            return (
                                                                <div key={idx}>
                                                                    <p>
                                                                        Baseline:
                                                                    </p>{" "}
                                                                    {indicator.baseline ||
                                                                        ""}
                                                                    ,
                                                                </div>
                                                            );
                                                        })}
                                                </td>
                                                <td className="border border-1 p-2">
                                                    {logframeData.goal.impact
                                                        ?.indicators &&
                                                        Object.keys(
                                                            logframeData.goal
                                                                .impact
                                                                .indicators
                                                        ).map((key, idx) => {
                                                            const indicator =
                                                                logframeData
                                                                    .goal.impact
                                                                    .indicators[
                                                                    key
                                                                ];
                                                            return (
                                                                <div key={idx}>
                                                                    <p>
                                                                        Target:
                                                                    </p>{" "}
                                                                    {indicator.target ||
                                                                        "-"}
                                                                </div>
                                                            );
                                                        })}
                                                </td>
                                                <td className="border border-1 p-2">
                                                    {logframeData.goal.impact
                                                        ?.timeline || "-"}
                                                </td>
                                                <td className="border border-1 p-2">
                                                    {logframeData.goal.impact
                                                        ?.assumptions || "-"}
                                                </td>
                                            </tr>

                                            {/* Outcome Level */}
                                            {logframeData.goal.impact?.outcomes?.map(
                                                (
                                                    outcomeItem: any,
                                                    outcomeIndex: any
                                                ) => (
                                                    <React.Fragment
                                                        key={`outcome-${outcomeIndex}`}
                                                    >
                                                        <tr
                                                            className={
                                                                outcomeIndex %
                                                                    2 ===
                                                                0
                                                                    ? "bg-slate-100"
                                                                    : "-"
                                                            }
                                                        >
                                                            <td className="border border-1 p-2 text-center font-bold">
                                                                Outcome{" "}
                                                                {outcomeIndex +
                                                                    1}{" "}
                                                            </td>
                                                            <td className="border border-1 p-2 text-center">
                                                                {outcomeItem.description ||
                                                                    "-"}
                                                            </td>
                                                            <td className="border border-1 p-2">
                                                                {outcomeItem.indicator ||
                                                                    "-"}
                                                            </td>
                                                            <td className="border border-1 p-2">
                                                                {outcomeItem.baseline ||
                                                                    "-"}
                                                            </td>
                                                            <td className="border border-1 p-2">
                                                                {outcomeItem.target ||
                                                                    "-"}
                                                            </td>
                                                            <td className="border border-1 p-2">
                                                                {outcomeItem.timeline ||
                                                                    "-"}
                                                            </td>
                                                            <td className="border border-1 p-2">
                                                                {outcomeItem.assumptions ||
                                                                    "-"}
                                                            </td>
                                                        </tr>

                                                        {/* Output Level */}
                                                        {outcomeItem.outputs?.map(
                                                            (
                                                                outputItem: any,
                                                                outputIndex: any
                                                            ) => (
                                                                <React.Fragment
                                                                    key={`output-${outputIndex}`}
                                                                >
                                                                    <tr
                                                                        className={
                                                                            outputIndex %
                                                                                2 ===
                                                                            0
                                                                                ? "bg-slate-100"
                                                                                : "-"
                                                                        }
                                                                    >
                                                                        <td className="border border-1 p-2 text-center font-bold">
                                                                            Output{" "}
                                                                            {outcomeIndex +
                                                                                1}
                                                                            .
                                                                            {outputIndex +
                                                                                1}
                                                                        </td>
                                                                        <td className="border border-1 p-2 text-center">
                                                                            {outputItem.description ||
                                                                                "-"}
                                                                        </td>
                                                                        <td className="border border-1 p-2">
                                                                            {outputItem.indicator ||
                                                                                "-"}
                                                                        </td>
                                                                        <td className="border border-1 p-2">
                                                                            {outputItem.baseline ||
                                                                                "0"}
                                                                        </td>
                                                                        <td className="border border-1 p-2">
                                                                            {outputItem.target ||
                                                                                "-"}
                                                                        </td>
                                                                        <td className="border border-1 p-2">
                                                                            {outputItem.timeline ||
                                                                                "-"}
                                                                        </td>
                                                                        <td className="border border-1 p-2">
                                                                            {outputItem.assumptions ||
                                                                                "-"}
                                                                        </td>
                                                                    </tr>

                                                                    {/* Activity Level */}
                                                                    {outputItem.activities?.map(
                                                                        (
                                                                            activityItem: any,
                                                                            activityIndex: any
                                                                        ) => (
                                                                            <React.Fragment
                                                                                key={`activity-${activityIndex}`}
                                                                            >
                                                                                <tr
                                                                                    className={
                                                                                        activityIndex %
                                                                                            2 ===
                                                                                        0
                                                                                            ? "bg-slate-100"
                                                                                            : "-"
                                                                                    }
                                                                                >
                                                                                    <td className="border border-1 p-2 text-center font-bold">
                                                                                        Activity{" "}
                                                                                        {outcomeIndex +
                                                                                            1}
                                                                                        .
                                                                                        {outputIndex +
                                                                                            1}
                                                                                        .
                                                                                        {activityIndex +
                                                                                            1}
                                                                                    </td>
                                                                                    <td className="border border-1 p-2 text-center">
                                                                                        {activityItem.description ||
                                                                                            "-"}
                                                                                    </td>
                                                                                    <td className="border border-1 p-2">
                                                                                        {activityItem.indicator ||
                                                                                            "-"}
                                                                                    </td>
                                                                                    <td className="border border-1 p-2">
                                                                                        {activityItem.baseline ||
                                                                                            "-"}
                                                                                    </td>
                                                                                    <td className="border border-1 p-2">
                                                                                        {activityItem.target ||
                                                                                            "-"}
                                                                                    </td>
                                                                                    <td className="border border-1 p-2">
                                                                                        {activityItem.timeline ||
                                                                                            "-"}
                                                                                    </td>
                                                                                    <td className="border border-1 p-2">
                                                                                        {activityItem.assumptions ||
                                                                                            "-"}
                                                                                    </td>
                                                                                </tr>

                                                                                {/* Inputs Level */}
                                                                                {activityItem.inputs && (
                                                                                    <tr className="bg-slate-100">
                                                                                        <td className="border border-1 p-2 text-center font-bold">
                                                                                            Input
                                                                                        </td>
                                                                                        <td className="border border-1 p-2 text-center">
                                                                                            {activityItem.inputs.join(
                                                                                                ", "
                                                                                            )}
                                                                                        </td>
                                                                                        <td className="border border-1 p-2">
                                                                                            (To
                                                                                            be
                                                                                            determined)
                                                                                        </td>
                                                                                        <td className="border border-1 p-2">
                                                                                            (To
                                                                                            be
                                                                                            determined)
                                                                                        </td>
                                                                                        <td className="border border-1 p-2">
                                                                                            (To
                                                                                            be
                                                                                            determined)
                                                                                        </td>
                                                                                        <td className="border border-1 p-2">
                                                                                            -
                                                                                        </td>
                                                                                        <td className="border border-1 p-2">
                                                                                            Funding
                                                                                            is
                                                                                            secured,
                                                                                            and
                                                                                            all
                                                                                            necessary
                                                                                            resources
                                                                                            are
                                                                                            available
                                                                                        </td>
                                                                                    </tr>
                                                                                )}
                                                                            </React.Fragment>
                                                                        )
                                                                    )}
                                                                </React.Fragment>
                                                            )
                                                        )}
                                                    </React.Fragment>
                                                )
                                            )}
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex justify-center gap-8 my-5">
                        <button
                            className="bg-[#ED0C0C] text-white font-bold rounded-md py-3 px-6"
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
                            className="bg-green-500 text-white font-bold rounded-md py-3 px-6"
                            onClick={handleSave}
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
