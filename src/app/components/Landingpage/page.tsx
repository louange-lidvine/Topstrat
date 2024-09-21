"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";

function Page() {
    const router = useRouter();

    return (
        <div className="border border-blue-default lg:full my-2 p-6 rounded-md shadow-lg lg:mx-auto lg:w-full">
            <div className="flex items-center gap-2 cursor-pointer justify-end"  
                 onClick={() => router.push('/')}>
                <BiArrowBack className="mt-1" size={24} />
                <p className="text-md">Return to Home</p>
            </div>

            <div className="text-center my-32 ">
                <h1 className="text-4xl font-bold text-blue-default">
                    Strategic Plan
                </h1>
            </div>
        <div className="px-6 py-4 text-gray-700 leading-relaxed">
                <p className="mb-6 text-lg">
                    <strong>What is a Strategic Plan?</strong><br />
                    A strategic plan is a comprehensive roadmap that outlines the steps and decisions needed to achieve long-term goals. It helps organizations set clear objectives, understand both internal and external environments, and define actionable strategies to reach desired outcomes. 
                </p>

                <p className="mb-6 text-lg">
                    <strong>How to Use This App:</strong><br />
                    Our strategic planning tool allows you to easily create and manage your strategy. Start by creating a project on using the plus sign (+), then continue the steps and analyze your business environment through tools like SWOT or PESTLE analysis, and monitor your progress as you work towards achieving your goals. This app simplifies the process, guiding you step by step in creating a plan that aligns with your vision.
                </p>

          
                <p className="mt-10 text-center text-lg text-gray-500">
                    Powered by <span className="font-semibold text-blue-default">TopStrat</span>
                </p>
            </div>
        </div>
    );
}

export default Page;
