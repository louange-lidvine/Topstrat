"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import ReactModal from "react-modal";
import SbLoad from "@/app/shared/loader/sbload";
import { baseURL } from "@/app/constants";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ChooseMethod({ refetchProject, closeSidebar }: { refetchProject: () => void, closeSidebar: () => void }) {
    const router = useRouter();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        name: "",
        Logo: null as File | null,
        description: "",
        method: "",
        phone: "", // New Input
        email: "", // New Input
        physicalAddress: "", // New Input
        poBox: "", // New Input
        webURL: "",
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null; // Safely access the first file or set null
        if (file) {
            setFormData((prevState) => ({
                ...prevState,
                Logo: file,
            }));
        }
    };



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);

      const formDataToSubmit = new FormData();
      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("description", formData.description);
      formDataToSubmit.append("logo", formData.Logo as Blob);
      formDataToSubmit.append(
          "autoGenerate",
          formData.method === "quick" ? "true" : "false"
      );
      // New fields added to form data for later integration
      formDataToSubmit.append("phone", formData.phone);
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("physicalAddress", formData.physicalAddress);
      formDataToSubmit.append("poBox", formData.poBox);
      formDataToSubmit.append("webURL", formData.webURL);

      // Log the form data to debug using Array.from
      console.log(
          "Form Data Submitted:",
          Array.from(formDataToSubmit.entries())
      );

      try {
          const token = getCookie("token");

          const response = await axios.post(
              `${baseURL}/projects/create`,
              formDataToSubmit,
              {
                  headers: {
                      "Content-Type": "multipart/form-data",
                      Authorization: `Bearer ${token}`,
                  },
              }
          );

          const projectId = response.data._id;
          refetchProject();
          if (formData.method === "quick") {
              router.push(`/components/cover/${projectId}`);
          } else if (formData.method === "step") {
              router.push(`/components/step/${projectId}`);
          }
      } catch (error: any) {
          console.error("Error creating project:", error);

          if (error.response) {
              const {
                  message,
                  error: errorType,
                  statusCode,
              } = error.response.data;

              if (statusCode === 403 && errorType === "Forbidden") {
                  toast.error(message);
              } else if (error.response.data && error.response.data.message) {
                  toast.error(error.response.data.message);
              } else {
                  toast.error(
                      "An unexpected error occurred during project creation."
                  );
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
                className="lg:w-[600px] w-[90%] max-h-screen max-w-lg mx-auto p-6 mt-10 bg-white shadow-xl rounded-md"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
            >
                <form
                    className="flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-2xl font-semibold text-center mb-6">
                        Project Information
                    </h2>

                    <div className="flex flex-col">
                        <label className="text-start mb-2 font-medium text-gray-700">
                            Project Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter project name"
                            className="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-default transition"
                            name="name"
                            onChange={handleChange}
                            value={formData.name}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-start mb-2 font-medium text-gray-700">
                            Project Description
                        </label>
                        <textarea
                            placeholder="Enter description"
                            rows={2}
                            className="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-default transition"
                            name="description"
                            onChange={handleChange}
                            value={formData.description}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-start mb-2 font-medium text-gray-700">
                            Organization Logo
                        </label>
                        <div className="flex flex-col items-center justify-center p-4 w-full h-[6rem] border-dashed border-2 border-blue-default bg-gray-50 rounded-lg shadow-sm">
                            <label
                                htmlFor="file-upload"
                                className="flex flex-col items-center justify-center cursor-pointer space-y-1"
                            >
                                {formData.Logo ? (
                                    <div className="text-center">
                                        <p className="text-gray-500">
                                            Logo uploaded: {formData.Logo.name}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <p className="text-gray-500">
                                            Upload logo
                                        </p>
                                        <p className="text-gray-400">
                                            or drag and drop
                                        </p>
                                    </div>
                                )}
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                name="Logo"
                                accept="image/*" // Only accept image files (you can change this to specific formats like .png, .jpg if needed)
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    
                    <div className="flex flex-col">
    <label className="text-start mb-2 font-medium text-gray-700">
        Phone
    </label>
    <input
        type="tel"
        placeholder="Enter phone number"
        className="w-full border border-gray-300 py-2 px-3 rounded-md"
        name="phone"
        onChange={handleChange}
        value={formData.phone}
    />
</div>


                    <div className="flex flex-col">
                        <label className="text-start mb-2 font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="text"
                            placeholder="Enter phone number"
                            className="w-full border border-gray-300 py-2 px-3 rounded-md"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-start mb-2 font-medium text-gray-700">
                            Physical Address
                        </label>
                        <input
                            type="text"
                            placeholder="Enter physical address"
                            className="w-full border border-gray-300 py-2 px-3 rounded-md"
                            name="physicalAddress"
                            onChange={handleChange}
                            value={formData.physicalAddress}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-start mb-2 font-medium text-gray-700">
                            PO Box
                        </label>
                        <input
                            type="text"
                            placeholder="Enter PO Box (optional)"
                            className="w-full border border-gray-300 py-2 px-3 rounded-md"
                            name="poBox"
                            onChange={handleChange}
                            value={formData.poBox}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-start mb-2 font-medium text-gray-700">
                            Web URL
                        </label>
                        <input
                            type="url"
                            placeholder="Enter web URL (optional)"
                            className="w-full border border-gray-300 py-2 px-3 rounded-md"
                            name="webURL"
                            onChange={handleChange}
                            value={formData.webURL}
                        />
                    </div>

                    <div className="flex gap-4 w-full mt-2 justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`bg-blue-default text-white py-2 px-6 rounded-md transition ${
                                isLoading
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-blue-default"
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
            <ToastContainer />
        </div>
    );
}

export default ChooseMethod;
