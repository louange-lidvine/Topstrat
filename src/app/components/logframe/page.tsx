"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function () {
   const router = useRouter();
   
    return (
        <div className="flex flex-col w-full border border-blue-default my-4 rounded-md mx-2  p-4 font-medium gap-4">
            <div className="flex flex-col gap-3">
                <h1 className="font-bold text-blue-default text-2xl">LogFrame</h1>
                <p>
                    A results matrix, also known as a logical framework (log
                    frame), is a planning and monitoring tool that helps in
                    structuring objectives, activities, indicators, outputs,
                    outcomes, and impacts of a project or initiative
                </p>
            </div>
            <div>
                <table className="border border-collapse w-full overflow-x-auto">
                    <tr>
                        <td className="border-black border-2 p-1 text-center ">
                            Results chain
                        </td>
                        <td className="border-black border-2 p-1  text-center  ">
                            Indicator
                        </td>
                        <td className="border-black border-2 p-1  text-center  ">
                            Baseline
                        </td>
                        <td className="border-black border-2 p-1   text-center ">
                            Target
                        </td>
                        <td className="border-black border-2 p-1  text-center  ">
                            Timeline
                        </td>
                        <td className="border-black border-2 p-1   text-center ">
                            Assumptions
                        </td>
                    </tr>
                    <tr>
                        <td className="border-black border-2 px-1  py-10 text-center ">
                            Impact
                        </td>
                        <td className="border-black border-2 px-1  py-10 text-center "></td>
                        <td className="border-black border-2 px-1  py-10 text-center"></td>
                        <td className="border-black border-2 px-1  py-10 text-center "></td>
                        <td className="border-black border-2 px-1  py-10 text-center "></td>
                        <td className="border-black border-2 px-1  py-10 text-center "></td>
                    </tr>
                    <tr>
                        <td className="border-black border-2 px-1  py-10 text-center ">
                            Outcome
                        </td>
                        <td className="border-black border-2 px-1  py-10 text-center "></td>
                        <td className="border-black border-2 px-1  py-10 text-center "></td>
                        <td className="border-black border-2 px-1  py-10 text-center "></td>
                        <td className="border-black border-2 px-1  py-10 text-center "></td>
                        <td className="border-black border-2 px-1  py-10 text-center "></td>
                    </tr>
                    <tr>
                        <td className="border-black border-2 px-1  py-10 text-center ">
                            Output
                        </td>
                        <td className="border-black border-2 px-1  py-10 text-center "></td>
                        <td className="border-black border-2 px-1  py-10 text-center "></td>
                        <td className="border-black border-2 px-1  py-10 text-center "></td>
                        <td className="border-black border-2 px-1  py-10 text-center "></td>
                        <td className="border-black border-2 px-1  py-10 text-center "></td>
                    </tr>
                    <tr>
                        <td className="border-black border-2 px-1  py-10 text-center ">
                            Activities
                        </td>
                        <td className="border-black border-2 px-1  py-10 text-center "></td>
                        <td className="border-black border-2 px-1  py-10 text-center "></td>
                        <td className="border-black border-2 px-1  py-10 text-center "></td>
                        <td className="border-black border-2 px-1  py-10 text-center "></td>
                        <td className="border-black border-2 px-1  py-10 text-center "></td>
                    </tr>
                    <tr>
                        <td className="border-black border-2 px-1  py-10 text-center ">
                            Inputs
                        </td>
                        <td className="border-black border-2 px-1  py-10 text-center "></td>
                        <td className="border-black border-2 px-1  py-10 text-center "></td>
                        <td className="border-black border-2 px-1  py-10 text-center "></td>
                        <td className="border-black border-2 px-1  py-10 text-center "></td>
                        <td className="border-black border-2 px-1  py-10 text-center "></td>
                    </tr>
                </table>
            </div>
            <div
                className="bg-blue-default text-white  m-auto font-bold  rounded-3xl text-2xl  py-3 w-1/2"
                onClick={() => router.push("../../components/Preview2")}
            >
                <div className="flex  items-center justify-center ">next</div>
            </div>
        </div>
    );
}
