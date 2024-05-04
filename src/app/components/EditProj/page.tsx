import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { FaEllipsisH } from "react-icons/fa";

export default function ({
    project,
    remove,
    selected,
}: {
    project: any;
    selected: boolean;
    remove: () => void;
}) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [openInput, setOpenInput] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [newName, setNewName] = useState(project.name);
    const navigate = useRouter();

    const checkResponseFormat = (response: any) => {
        const requiredFields = [
            "mission",
            "vision",
            "swot",
            "objective",
            "values",
            "strategy",
            "logframe",
            "PESTLE",
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
                `https://topstrat-backend.onrender.com/projects/prompts/latest/${projectId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${
                            JSON.parse(token ?? "").access_token
                        }`,
                    },
                }
            );
            if (checkResponseFormat(response.data)) {
                navigate.push(`/components/Preview/${projectId}`);
            } else {
                navigate.push(`/components/step/${projectId}`);
            }
            // Do something with the response data from the second Axios call
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching project data:", error);
        }
    };

    const handleDelete = async (projectId: string) => {
        try {
            const token = getCookie("token");
            await axios.delete(
                `https://topstrat-backend.onrender.com/projects/${projectId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${
                            JSON.parse(token ?? "").access_token
                        }`,
                    },
                }
            );
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
    //             `https://topstrat-backend.onrender.com/projects/${project.id}`,
    //             {
    //                 name: newName,
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
            className={`relative hover:bg-white hover:bg-opacity-80  px-10 py-3  rounded-sm ${
                selected && "bg-white bg-opacity-80"
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
                    <FaEllipsisH/>
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
                                <li
                                    className=" hover:bg-gray-100  hover:cursor-pointer p-2"
                                    onClick={() => {
                                        setIsPopoverOpen(false);
                                        handleDelete(project._id); // Pass projectId to handleDelete
                                    }}
                                >
                                    Delete
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}