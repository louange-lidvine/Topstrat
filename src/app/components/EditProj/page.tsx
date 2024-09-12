"use client";
import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useParams, useRouter } from "next/navigation";
import { FaEllipsisH } from "react-icons/fa";
import { baseURL } from "@/app/constants";
import ReactModal from "react-modal";

interface Project {
    name: string;
    _id: string;
}

export default function ({
    project = { name: "", _id: "" },
    remove,
    selected,
}: {
    project: Project;
    selected: boolean;
    remove: () => void;
}) {
    const { id } = useParams();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [openInput, setOpenInput] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [newName, setNewName] = useState(project.name);
    const navigate = useRouter();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


      const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

    const checkResponseFormat = (response: any) => {
        const requiredFields = [
            "mission",
            "vision",
            "swot",
            "objectives",
            "values",
            "strategy",
            "logframe",
            "pestle",
        ];

        // Check if all required fields exist in the response
        for (const field of requiredFields) {
            if (!(field in response)) {
                return false;
            }
        }
        return true;
    };

    const handleProjectClick = async (projectId: string) => {
        try {
            const token = getCookie("token");
            const response = await axios.get(
                `${baseURL}/projects/prompts/latest/${projectId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${
                         token
                        }`,
                    },
                }
            );
            if (checkResponseFormat(response.data)) {
                navigate.push(`/components/Preview/${projectId}`);
            } else {
                navigate.push(`/components/step/${projectId}`);
            }
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching project data:", error);
        }
    };

    const handleDelete = async (projectId: string) => {
        try {
            const token = getCookie("token");
            await axios.delete(`${baseURL}/projects/${projectId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${
                       token
                    }`,
                },
            });
            console.log("Delete API called");
            remove();
        } catch (error) {
            console.error("Error deleting:", error);
            console.log("proj id" + projectId);
        }
    };

    // const rename = async () => {
    //     axios
    //         .put(
    //             `http://157.245.121.185:5000/projects/${project.id}`,
    //             {
    //                 name: newNames,
    //             }
    //         )
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // };

    return (
        <div
            className={`relative hover:bg-white hover:bg-opacity-20  px-10 py-3 mt-3  rounded-sm ${
                selected && "bg-transparent"
            }`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => {
                setIsHover(false);
                // rename();
                setOpenInput(false);
                setIsPopoverOpen(false);
            }}
        >
            <div
                className="  w-[auto] "
                onClick={() =>
                    isPopoverOpen === false && handleProjectClick(project._id)
                }
            >
                {openInput ? (
                    <input
                        className="bg-white text-white w-full"
                        type="text"
                        placeholder={project.name}
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                ) : (
                    <p>
                        {" "}
                        {project.name.length > 20
                            ? project.name.slice(20) + "..."
                            : project.name}
                            
                    </p>
                )}
            </div>
            {isHover && (
                <div
                    className="absolute z-index items-center justify-end bg-blue-default rounded  text-white top-2 translate-y-1/2 right-5"
                    onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                >
                    <FaEllipsisH />
                    {isPopoverOpen && (
                        <div
                            className="popover w-[200px] absolute left-0 text-black bg-[#fff] p-[10px]"
                            style={{
                                zIndex: "50",
                                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                                borderRadius: "4px",
                            }}
                        >
                            <ul className=" flex flex-col gap-3">
                                {/* <li
                                    className=" hover:bg-slate-500 hover:cursor-pointer"
                                    onClick={() => {
                                        setIsPopoverOpen(false);
                                        setOpenInput(true);
                                    }}
                                >
                                    Rename
                                </li> */}
                                <li onClick={handleOpenModal}   className=" hover:bg-gray-100  hover:cursor-pointer p-2">
                                    Edit
                                </li>
                                <li
                                    className=" hover:bg-gray-100  hover:cursor-pointer p-2"
                                    onClick={() => {
                                        setIsPopoverOpen(false);
                                        handleDelete(project._id); 
                                    }}
                                >
                                    Delete
                                </li>
                             
                            </ul>
                        </div>
                    )}
                </div>
            )}
             <ReactModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className="lg:w-[600px] w-[90%] max-w-lg mx-auto p-8 mt-20 bg-white shadow-2xl rounded-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
      >
        <form className="flex flex-col justify-center items-center gap-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Choose section to edit
          </h2>

          <div
            className="bg-gray-100 h-20 w-full rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex items-center justify-center p-3 text-lg font-medium text-gray-700 hover:bg-gray-200"
            onClick={() => navigate.push(`/components/Preview/${id}`)}
          >
            Section A: Mission, Vision, Values, Strategies, SWOT
          </div>

          <div
            className="bg-gray-100 h-20 w-full rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex items-center justify-center p-3 text-lg font-medium text-gray-700 hover:bg-gray-200"
            onClick={() => navigate.push(`/components/Preview2/${id}`)}
          >
            Section B: PESTLE Analysis
          </div>

          <div
            className="bg-gray-100 h-20 w-full rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex items-center justify-center p-3 text-lg font-medium text-gray-700 hover:bg-gray-200"
            onClick={() => navigate.push(`/components/Preview3/${id}`)}
          >
            Section C: Logframe Analysis
          </div>

          <button
            type="button"
            onClick={handleCloseModal}
            className="bg-blue-default text-white py-2 px-8 rounded-md  transition-colors duration-200"
          >
            Cancel
          </button>
        </form>
      </ReactModal>
        </div>
    );
}
