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
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ChooseMethod({ refetchProject, closeSidebar }: { refetchProject: () => void ,closeSidebar: () => void}) {
    const router = useRouter();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        method: "", 
    });

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleRadioChange = async (value: string) => {
        closeSidebar();  
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
          Authorization: `Bearer ${token}`,
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
  } catch (error: any) {
    console.error("Error creating project:", error);
    
    if (error.response) {
      const { message, error: errorType, statusCode } = error.response.data;

      if (statusCode === 403 && errorType === "Forbidden") {
        toast.error(message);
      } else if (error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred during project creation.");
      }
    } else {
      toast.error("Network error or server is not reachable.");
    }
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
  className="lg:w-[600px] w-[90%] max-w-lg mx-auto p-8 mt-20 bg-white shadow-2xl rounded-lg"
  overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
>
  <form
    className="flex flex-col justify-center items-center gap-4"
    onSubmit={handleSubmit}
  >
    <h2 className="text-xl font-semibold mb-4">Enter Project Information</h2>

    <input
      type="text"
      placeholder="Enter name"
      className="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-default transition"
      name="name"
      onChange={handleChange}
      value={formData.name}
    />

    <textarea
      placeholder="Enter description"
      rows={4}
      onChange={handleChange}
      className="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-default transition"
      name="description"
      value={formData.description}
    />

    <div className="flex gap-4 mt-4">
      <button
        type="submit"
        disabled={isLoading}
        className={`bg-blue-default hover:bg-blue-default text-white py-2 px-6 rounded-md transition ${isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
      >
        {isLoading ? <SbLoad /> : "Submit"}
      </button>
      <button
        type="button"
        onClick={handleCloseModal}
        className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-6 rounded-md transition"
      >
        Cancel
      </button>
    </div>
  </form>
</ReactModal>

        </div>
    );
}

export default ChooseMethod;
