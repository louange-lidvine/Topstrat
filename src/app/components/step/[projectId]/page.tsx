"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Background from "../../../../../public/assets/bg.png";
import Image from "next/image";
import Prompt from "../../prompt/page";

function page() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isSecModalOpen, setIsSecModalOpen] = useState<boolean>(false);
    const [prompts, setPrompts] = useState<string[]>([]);
    const create = () => {
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(
                        `https://topstrat-backend.onrender.com/projects}`
                    );
                    setPrompts(response.data);
                } catch (error) {
                    console.error("Error fetching prompts:", error);
                }
            };

            fetchData();
        }, []);
    };

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
        <div className=" flex lg:w-[1150px] lg:mt-0 mt-10 lg:absolute lg:top-[-1px] lg:left-[320px]">
            <Image
                src={Background}
                className="w-full h-full fixed left-0 top-0 -z-10"
                alt="background-img"
            />
            <div className="">
                {/* opacity of 25 */}
                <div className="border my-4 rounded-md mx-2 lg:w-[1150px float-right">
                    <div className="input flex justify-center">
                        <input
                            type="text"
                            className="border m-4 py-2 outline-none lg:px-10 text-center rounded-md "
                            value={title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl my-40 font-bold text-center text-blue-default">
                            Strategic plan
                        </h1>
                    </div>
                    <div className="prompt grid lg:grid-cols-2 grid-cols-1">
                        <Prompt
                            content="Generate a strategic plan for a rabbit rearing
project and provide clear objectives"
                        />
                        <Prompt
                            content="Generate a strategic plan for a rabbit rearing
project and provide clear objectives"
                        />
                        <Prompt
                            content="Generate a strategic plan for a rabbit rearing
project and provide clear objectives"
                        />
                        <Prompt
                            content="Generate a strategic plan for a rabbit rearing
project and provide clear objectives"
                        />
                    </div>
                    <div className="input flex justify-between ml-6 lg:w-[1100px] border  m-4 py-3 px-6 rounded-md space-x-5 ">
                        <div>
                            <input
                                type="text"
                                placeholder="Add a short description"
                                className="outline-none bg-transparent lg:w-[900px]"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="text-blue-default font-bold"
                                onClick={handleButtonClick}
                            >
                                Generate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default page;
