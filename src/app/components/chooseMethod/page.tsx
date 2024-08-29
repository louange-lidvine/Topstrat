'use client';
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import ReactModal from "react-modal";
import SbLoad from "@/app/shared/loader/sbload";
import Loader from "@/app/shared/loader/page";
import { baseURL } from "@/app/constants";

function ChooseMethod({ refetchProject, closeSidebar }: { refetchProject: () => void ,closeSidebar: () => void}) {
    const router = useRouter();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        method: "", // Add method field
    });

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleRadioChange = async (value: string) => {
        closeSidebar();  // Close the sidebar
        setIsPopoverOpen(false);
        setIsModalOpen(true);
        setFormData((prevState) => ({
            ...prevState,
            method: value,
        }));
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const token = getCookie("token");

            const response = await axios.post(
                `${baseURL}/projects/create`,
                { ...formData, autoGenerate: formData.method === "quick" },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${
                            JSON.parse(token ?? "").access_token
                        }`,
                    },
                }
            );

            const projectId = response.data._id;
            console.log(projectId);
            refetchProject();
            if (formData.method === "quick") {
                router.push(`/components/Preview/${projectId}`);
            } else if (formData.method === "step") {

                
                router.push(`/components/step/${projectId}`);
            }
        } catch (error) {
            console.error("Error creating project:", error);
            router.push("/Pages/signup");
        } finally {
            setIsLoading(false);
            setIsModalOpen(false);
        }
    };

    return (
        <div className="absolute">
            <FaPlus
                className="mt-4 lg:ml-10"
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                style={{ cursor: "pointer" }}
            />

            {isPopoverOpen && (
                <div
                    className="popover w-[250px] absolute left-0 text-black bg-[#fff] p-[10px]"
                    style={{
                        zIndex: "50",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                        borderRadius: "4px",
                    }}
                >
                    <label className="text-center my-1 font-bold block">
                        Choose method
                    </label>
                    <div className="mb-[10px]">
                        <input
                            type="radio"
                            name="method"
                            value="quick"
                            onChange={() => handleRadioChange("quick")}
                            className="mr-[5px]"
                        />
                        <label>Quick generation</label>
                    </div>
                    <div className="mb-[10px]">
                        <input
                            type="radio"
                            name="method"
                            value="step"
                            onChange={() => handleRadioChange("step")}
                            className="mr-[5px]"
                        />
                        <label>Step by step</label>
                    </div>
                </div>
            )}
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                className="w-[600px]  p-10 mt-20 bg-white shadow-lg lg:ml-[500px] "
            >
                <form
                    className="flex flex-col justify-center items-center gap-5"
                    onSubmit={handleSubmit}
                >
                    <h2>Enter project information</h2>
                    <input
                        type="text"
                        placeholder="Enter name"
                        className=" w-[400px] border  lg:py-2  p-2 outline-none  text-start rounded-md"
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                    />
                    <textarea
                        placeholder="Enter description"
                        rows={4}
                        onChange={handleChange}
                        className=" w-[400px] border lg:py-2  p-2 outline-none  text-start rounded-md"
                        name="description"
                        value={formData.description}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#0F872F] py-2 px-4 rounded-md"
                    >
                        {isLoading ? <SbLoad /> : "Submit"}
                    </button>
                </form>
                <button onClick={handleCloseModal}>Cancel</button>
            </ReactModal>
        </div>
    );
}

export default ChooseMethod;
