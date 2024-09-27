"use client";
import React, { useState, useEffect } from "react";
import { BiMenu } from "react-icons/bi";
import axios from "axios";
import Link from "next/link";
import ChooseMethod from "../chooseMethod/page";
import { getCookie, setCookie } from "cookies-next";
import ReactModal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import Profile from "../profile/page";
import EditProj from "../EditProj/page";
import SbLoad from "../../shared/loader/sbload";
import { baseURL } from "@/app/constants";
import CryptoJS from "crypto-js";

interface SidebarProps {
    isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    const { id } = useParams();
    const navigate = useRouter();
    const [menuVisible, setMenuVisible] = useState(false);
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
    const [userData, setUserData] = useState<any>();
    const [gravatarUrl, setGravatarUrl] = useState<string>("");

    const closeSidebar = () => {
        setMenuVisible(false);
    };

    const logout = () => {
        setIsLoading(true);
        setCookie("token", undefined);
        toast.success("See you again 👋");
        navigate.push("../../Pages/signIn");
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCloseProfile = () => {
        setIsProfileOpen(false);
    };
    const handleClose=()=>{
        setIsProfileOpen(false);
       navigate.push('/components/ProjectPage')
    }

    const handleProfileClick = () => {
        setMenuVisible(!menuVisible);
        setIsProfileOpen(true);
    };

    const handleButtonClick = () => {
        setMenuVisible(!menuVisible);
        setIsModalOpen(true);
    };

    const handleButtonClick2 = () => {
        setMenuVisible(!menuVisible);
    };

    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const token = getCookie("token");
            const id = localStorage.getItem("userId");
            const response = await axios.get(`${baseURL}/projects/user/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const limitedProjects = response.data.slice(0, 5);
            setProjects(limitedProjects);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching projects:", error);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects(); 
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem("userId");
            const token = getCookie("token");
            try {
                const response = await fetch(`${baseURL}/users/${userId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const generateGravatar = () => {
            const userEmail = userData?.email; 
            const hashedEmail = CryptoJS.SHA256(userEmail).toString();
            const gravatarUrl = `https://www.gravatar.com/avatar/${hashedEmail}`;
            setGravatarUrl(gravatarUrl);
        };

        if (userData?.email) {
            generateGravatar();
        }
    }, [userData]);

    return (
        <>
            <div className={`hidden lg:flex flex-col text-white max-w-[20vw] bg-blue-default m-2 rounded-md`}>
                <div className="flex flex-col justify-between gap-32">
                    <div className="user-part">
                        <Profile />
                    </div>
                    <div className="middle-part flex flex-col gap-3 w-64">
                        <hr className="ml-3 max-w-[90%] justify-center items-center" />
                        <div className="projects">
                            <div className="title grid grid-cols-2 space-x-16">
                                <div className="title grid grid-cols-2 space-x-40">
                                    <h1 className="mt-2 ml-10 text-xl font-bold flex-[0.8]">Projects</h1>
                                    <ChooseMethod refetchProject={fetchProjects} closeSidebar={closeSidebar} />
                                </div>
                            </div>
                            {isLoading ? (
                                <div className="m-12">
                                    <SbLoad />
                                </div>
                            ) : (
                                projects.map((project: any, index) => (
                                    <EditProj
                                        
                                        key={index}
                                        project={project}
                                        selected={id === project._id}
                                        selectedId={project._id}
                                        remove={() => {
                                            setProjects(projects.filter((proj: any) => proj._id !== project._id));
                                            fetchProjects();
                                            navigate.push("/components/Landingpage");
                                            handleButtonClick2();
                                        }}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                    <div className="py-10 fixed bottom-0">
                        <h2 className="font-bold hover:bg-white hover:bg-opacity-20 pl-10 w-[255px] py-3 h-12 rounded-sm" onClick={handleProfileClick}>
                            Settings
                        </h2>
                        <h2 className="font-bold hover:bg-white hover:bg-opacity-20 pl-10 py-3 h-12 rounded-sm w-[255x]" onClick={handleButtonClick}>
                            Logout
                        </h2>
                    </div>
                    <ReactModal
                        isOpen={isModalOpen}
                        onRequestClose={handleCloseModal}
                        className="w-[600px] z-[9999] p-6 bg-white shadow-lg mx-auto my-20"
                        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
                    >
                        <h1 className="font-bold text-center">Are you sure you want to logout?</h1>
                        <div className="buttons flex space-x-5 mt-10 justify-center">
                            <button
                                type="button"
                                className="bg-[#0F872F] py-2 text-white px-4 rounded-md"
                                onClick={handleCloseModal}
                            >
                                Return
                            </button>
                            <button
                                type="button"
                                className="bg-[#ED0C0C] text-white py-2 px-4 rounded-md"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </div>
                    </ReactModal>

                    <ReactModal
                        isOpen={isProfileOpen}
                        onRequestClose={handleCloseProfile}
                        className="w-[600px] z-[9999] p-6 bg-white shadow-lg mx-auto my-20"
                        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
                    >
                        <h1 className="text-xl font-bold text-center mb-4">User Profile</h1>
                        <div className="flex items-center mb-4">
                            {userData ? (
                                <>
                                    <img src={gravatarUrl} alt="profile" className="w-16 h-16 rounded-full border-2 border-gray-300" />
                                    <div className="ml-4">
                                        <h2 className="text-lg font-semibold">
                                            {userData.firstname} {userData.lastname}
                                        </h2>
                                        <p className="text-sm text-gray-600">Email: {userData.email}</p>
                                        <p className="text-sm text-gray-600">Role: {userData.role}</p>
                                        <p className="text-sm text-gray-600">Subscription: {userData.subscription} plan</p>
                                    </div>
                                </>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                        <div className="flex justify-center gap-4">
                            <button
                                type="button"
                                className="bg-[#0F872F] py-2 px-6 text-white rounded-md hover:bg-[#0d6a34]"
                                onClick={handleCloseProfile}
                            >
                                Return
                            </button>
                            <button
                                type="button"
                                className="bg-orange-default py-2 px-6 text-white rounded-md hover:bg-orange-400"
                         onClick={handleClose}

                            >
                                View all projects
                            </button>
                        </div>
                    </ReactModal>
                </div>
            </div>

            <div className="relative w-full lg:hidden text-white bg-blue-default gap-10">
                <div className="flex justify-between items-center px-4 py-2">
                    <BiMenu className="text-2xl" onClick={toggleMenu} />
                    <h1 className="text-xl font-bold">Topstrat</h1>
                </div>
                <div className={`absolute z-10 bg-blue-default h-screen max-w-[40vw] top-[100%] transition-all duration-700 ${menuVisible ? "left-0" : "-left-[200%]"}`}>
                    <div className="projects flex flex-col gap-40">
                        <div className="user-part">
                            <Profile />
                        </div>
                        <div className="middle-part flex flex-col gap-3">
                            <hr className="lg:max-w-[40vw] justify-center items-center" />
                            <div className="projects">
                                <div className="title grid grid-cols-2 space-x-16">
                                    <div className="title grid grid-cols-2 space-x-40">
                                        <h1 className="mt-2 ml-10 text-xl font-bold flex-[0.8]">Projects</h1>
                                        <ChooseMethod refetchProject={fetchProjects} closeSidebar={closeSidebar} />
                                    </div>
                                </div>
                                {isLoading ? (
                                    <SbLoad />
                                ) : (
                                    projects.map((project: any, index) => (
                                        <EditProj
                                            key={index}
                                            project={project}
                                            selected={id === project._id}
                                            selectedId={project._id}
                                            remove={() => {
                                                setProjects(projects.filter((proj: any) => proj._id !== project._id));
                                                fetchProjects();
                                                navigate.push("../Landingpage");
                                            }}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col fixed bottom-0">
                             <h2 className="font-bold hover:bg-white hover:bg-opacity-20 pl-10 w-[235px] py-3 h-12 rounded-sm" onClick={handleProfileClick}>
                            Settings
                        </h2>
                        <h2 className="font-bold hover:bg-white hover:bg-opacity-20 pl-10 py-3 h-12 rounded-sm w-[235px]" onClick={handleButtonClick}>
                            Logout
                        </h2>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default Sidebar;