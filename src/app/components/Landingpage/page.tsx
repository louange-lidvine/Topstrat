"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Background from "../../../../public/assets/bg.png";
import Image from "next/image";
import Prompt from "../prompt/page";

function page() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isSecModalOpen, setIsSecModalOpen] = useState<boolean>(false);
    const [prompts, setPrompts] = useState<string[]>([]);

    const [title, setTitle] = useState("untitled");
    const handleInputChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setTitle(event.target.value);
    };

    const handleButtonClick = () => {
        setIsModalOpen(false);
        setIsSecModalOpen(true);
    };

    return (
        <div className=" border border-blue-default lg:full my-4 rounded-md lg:mx-2 float-right lg:z-[9999]">
            <div className="input flex justify-center">
                {/* <input
                    type="text"
                    placeholder="untitled"
                    className="border m-4 lg:py-2 mt-10 p-2 outline-none lg:px-10 text-center rounded-md"
                /> */}
            </div>
            <div>
                <h1 className="text-3xl my-40 font-bold text-center text-blue-default">
                    Strategic plan
                </h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 lg:w-full lg:py-20 lg:px-20 mt-6">
                <Prompt content="Generate a strategic plan for a rabbit rearing project and provide clear objectives" />
                <Prompt content="Generate a strategic plan for a rabbit rearing project and provide clear objectives" />
                <Prompt content="Generate a strategic plan for a rabbit rearing project and provide clear objectives" />
                <Prompt content="Generate a strategic plan for a rabbit rearing project and provide clear objectives" />
            </div>
            <div className="input flex justify-between lg:mx-auto lg:w-[90%] border m-4 py-3 px-6 rounded-md space-x-5">
                <div>
                    <input
                        type="text"
                        placeholder="Add a short description"
                        className="outline-none bg-transparent lg:w-full"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="text-blue-default font-bold"
                    >
                        Generate
                    </button>
                </div>
            </div>
        </div>
    );
}

export default page;
