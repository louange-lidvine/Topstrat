// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import SbLoad from "../../shared/loader/sbload";
// import { baseURL } from "@/app/constants";
// import { getCookie } from "cookies-next";
// import EditProj from "../EditProj/page";
// import { useRouter } from "next/navigation";
// import { useParams } from "next/navigation";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { BiArrowBack } from "react-icons/bi";


// const AllProjectsPage: React.FC = () => {
//     const { id } = useParams();
//     const [projects, setProjects] = useState<any[]>([]);
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);
//     const navigate = useRouter();

//     const fetchProjects = async () => {
//         setIsLoading(true);
//         try {
//             const token = getCookie("token");
//             const userId = localStorage.getItem("userId");
//             const response = await axios.get(`${baseURL}/projects/user/${userId}`, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             setProjects(response.data);
//         } catch (error) {
//             console.error("Error fetching projects:", error);
//             setError("Failed to fetch projects.");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchProjects();
//     }, []);

//     return (
//         <div className="border border-blue-default h-screen mt-4 mb-12 lg:mb-4 rounded-lg mx-2 p-4 font-medium bg-white shadow-md">
//       <div className="justify-end flex gap-2 cursor-pointer"  
//                 onClick={() =>
//                                 navigate.push('/')
//                             }>
//                                 <BiArrowBack className="mt-1"/>
//                                 <p className="">Return to home</p>
//                                 </div>
//             <h1 className="text-2xl font-bold mb-6 text-gray-800">All Projects</h1>
//             {isLoading ? (
//                 <div className="">
//                 <Skeleton width={950} height={100}/>
//                 <Skeleton width={950} height={100}/>
//                 <Skeleton width={950} height={100}/>
//                 <Skeleton width={950} height={100}/>
//                 </div>
//             ) : error ? (
//                 <p className="text-red-500 text-center">{error}</p>
//             ) : (
//                 <div>
//                     {projects.length > 0 ? (
//                         <ul className="space-y-4">
//                             {projects.map((project: any, index:any) => (
//                                 <li key={project._id} className="p-3 border border-gray-200 hover:bg-gray-300 rounded-md shadow-sm bg-gray-50">
//                                     <EditProj 
//                                         project={project}
//                                         selected={id === project._id}
//                                         remove={() => {
//                                             setProjects(projects.filter((proj: any) => proj._id !== project._id));
//                                             fetchProjects();
//                                             navigate.push("/components/Landingpage");
//                                         }} 
//                                     />
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p className="text-center text-gray-600">No projects found.</p>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AllProjectsPage;


"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "@/app/constants";
import { getCookie } from "cookies-next";
import EditProj from "../EditProj/page";
import { useRouter, useParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BiArrowBack } from "react-icons/bi";

const AllProjectsPage: React.FC = () => {
    const { id } = useParams();
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useRouter();

    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const token = getCookie("token");
            const userId = localStorage.getItem("userId");
            const response = await axios.get(`${baseURL}/projects/user/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
            setError("Failed to fetch projects.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="border border-blue-default min-h-screen mx-auto my-2 rounded-md flex flex-col items-center py-8 px-4 ">
         
            <div className="w-full max-w-4xl flex justify-end items-center mb-6">
          
                <button 
                    className="flex items-center gap-2 transition duration-150 ease-in-out"
                    onClick={() => navigate.push('/')}
                >
                    <BiArrowBack className="text-xl" />
                    <span className="text-md">Return to Home</span>
                </button>
            </div>

            <div className="w-full max-w-4xl text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Your Projects</h1>
                <p className="text-gray-600 mt-2">View, edit, and manage all your ongoing projects.</p>
            </div>

        
            <div className="w-full max-w-4xl rounded-lg shadow-lg p-6">
                {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton height={100} />
                        <Skeleton height={100} />
                        <Skeleton height={100} />
                    </div>
                ) : error ? (
                    <div className="text-center">
                        <p className="text-red-500 font-semibold">{error}</p>
                        <button 
                            className="mt-4 px-4 py-2rounded-lg  transition duration-150"
                            onClick={fetchProjects}
                        >
                            Retry
                        </button>
                    </div>
                ) : projects.length > 0 ? (
                    <ul className="space-y-4">
                        {projects.map((project: any, index: any) => (
                            <li key={project._id} className="bg-blue-default text-white rounded-md">
                                <EditProj 
                                    project={project}
                                    selected={id === project._id}
                                    selectedId={project._id}
                                    remove={() => {
                                        setProjects(projects.filter((proj: any) => proj._id !== project._id));
                                        fetchProjects();
                                        navigate.push("/components/Landingpage");
                                    }} 
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center text-gray-600">
                        <p>No projects found. Start by creating a new project!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllProjectsPage;
