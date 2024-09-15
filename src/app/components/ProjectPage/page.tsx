// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import SbLoad from "../../shared/loader/sbload"; 
// import { baseURL } from "@/app/constants"; 
// import { getCookie } from "cookies-next";
// import EditProj from "../EditProj/page";
// import { useRouter } from "next/navigation";
// import { useParams } from "next/navigation";

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
//         <div className="border border-blue-default mt-4 mb-12 lg:mb-4 rounded-md mx-2 p-4 font-medium">
//             <h1 className="text-2xl font-bold mb-4">All Projects</h1>
//             {isLoading ? (
//                 <div className="flex justify-center items-center h-screen">
//                     <SbLoad />
//                 </div>
//             ) : error ? (
//                 <p className="text-red-500">{error}</p>
//             ) : (
//                 <div>
//                     {projects.length > 0 ? (
//                         <ul>
//                             {projects.map((project: any,index) => (
//                                 <li key={project._id} className="mb-4">
//                                     <EditProj 
//                                      key={index}
//                                         project={project}
//                                         selected={id === project._id}
//                                         remove={() => {
//                                             setProjects(projects.filter((proj: any) => proj._id !== project._id));
//                                             fetchProjects();
//                                             navigate.push("/components/Landingpage");
//                                         }} />
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p>No projects found.</p>
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
import SbLoad from "../../shared/loader/sbload";
import { baseURL } from "@/app/constants";
import { getCookie } from "cookies-next";
import EditProj from "../EditProj/page";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
        <div className="border border-blue-default mt-4 mb-12 lg:mb-4 rounded-lg mx-2 p-4 font-medium bg-white shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">All Projects</h1>
            {isLoading ? (
                <div className="">
                <Skeleton width={950} height={100}/>
                <Skeleton width={950} height={100}/>
                <Skeleton width={950} height={100}/>
                <Skeleton width={950} height={100}/>
                </div>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <div>
                    {projects.length > 0 ? (
                        <ul className="space-y-4">
                            {projects.map((project: any, index:any) => (
                                <li key={project._id} className="p-3 border border-gray-200 hover:bg-gray-300 rounded-md shadow-sm bg-gray-50">
                                    <EditProj 
                                        project={project}
                                        selected={id === project._id}
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
                        <p className="text-center text-gray-600">No projects found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AllProjectsPage;

