   "use client"
    import React, { useState, useEffect } from "react";
    import user from "../../../../public/assets/user.png";
    import Profile from "../profile/page";
    import { BiMenu } from "react-icons/bi";
    import axios from "axios";
    import Link from "next/link";
    import ChooseMethod from "../chooseMethod/page";
    import { getCookie, setCookie } from "cookies-next";
    import SbLoad from "@/app/shared/loader/sbload";
    import ReactModal from "react-modal";
    import { toast } from "react-toastify";
    import { useRouter } from "next/navigation";



    function Sidebar() {
        const navigate =useRouter();
        const [menuVisible, setMenuVisible] = useState(false);
        const [projects, setProjects] = useState([]);
        const [isLoading,setIsLoading]=useState(false);
        const[isModalOpen,setIsModalOpen]=useState<boolean>(false)
        
        const logout = () => {
            setIsLoading(true);
            setCookie("token", undefined);
            toast.success(" See you again 👋");
            navigate.push("/");
          };
    
        const toggleMenu = () => {
            setMenuVisible(!menuVisible);
        };
    
        const handleCloseModal = () => {
            setIsModalOpen(false);
        };
        const handleButtonClick = () => {
            setIsModalOpen(true);
        };
    
        useEffect(() => {
            // Fetch projects from the backend
            const fetchProjects = async () => {
                setIsLoading(true)
                try {
                    const token = getCookie("token");
                    const response = await axios.get(
                        "https://topstrat-backend.onrender.com/projects",
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${JSON.parse(token ?? "").access_token}`
                            },
                        }
                    );
                    // Set the projects state with the fetched data
                    setProjects(response.data);
                    setIsLoading(false);
                } catch (error) {
                    console.error("Error fetching projects:", error);
                    setIsLoading(false)
                }finally{
                    setIsLoading(false)
                }
            };
    
            fetchProjects(); // Fetch projects when the component mounts
        }, []);
    
        return (
            <div className="fixed top-0 left-0 h-screen w-full overflow-hidden">
                <div className="lg:hidden fixed top-0 left-0 w-full bg-blue-default text-white">
                    <div className="flex justify-between items-center px-4 py-2">
                        <h1 className="text-xl font-bold">Topstrat</h1>
                        <BiMenu className="text-2xl" onClick={toggleMenu} />
                    </div>
                    {menuVisible && (
                    <div className="px-4 py-2">
                    <h2 className=" font-bold  hover:bg-gray-300 px-10 hover:bg-opacity-80 py-3 h-12 rounded-sm">Settings</h2>
                    <h2 className=" font-bold  hover:bg-red-400 px-10  py-3 h-12 rounded-sm" onClick={handleButtonClick}>Logout</h2>
                </div>
                    )}
                </div>
    
                <div className="hidden lg:flex flex-col h-[710px] lg:bg-fixed text-white w-72 bg-blue-default m-4 rounded-md">
                    <div className="user-part h-56">
                        <Profile pic={user} name="Lauren Spencer" />
                    </div>
                    <hr className="w-64 ml-3" />
                    <div className="lower-part">
                        <div className="projects">
                            <div className="title grid grid-cols-2 space-x-16 ">
                                <div className="title grid grid-cols-2 space-x-40 ">
                                    <h1 className="mt-2 ml-10 text-xl font-bold flex-[0.8]">
                                        Projects
                                    </h1>
                                    <ChooseMethod />
                                </div>
                            </div>
                            {isLoading ? (     
                    <SbLoad/>
                            ) : (projects.map((project, index) => (
                                <div key={index} className="mt-4 h-60">
                                    <Link href={`/components/step/${project._id}`}>
                                        <h1 className=" hover:bg-gray-300 hover:bg-opacity-80 w-[288px] px-10 py-3 h-12 rounded-sm">{project.name}</h1>
                                    </Link>
                                    {/* <Link href={`/components/step/${project._id}`}>
                                        <h1 className=" hover:bg-gray-300 hover:bg-opacity-80 w-[288px] px-10 py-3 h-12 rounded-sm">{project.name}</h1>
                                    </Link>
                                    <Link href={`/components/step/${project._id}`}>
                                        <h1 className=" hover:bg-gray-300 hover:bg-opacity-80 w-[288px] px-10 py-3 h-12 rounded-sm">{project.name}</h1>
                                    </Link> */}
                                </div>
                            )))}
                        </div>
                        <div className="py-10">
                            <h2 className=" font-bold  hover:bg-gray-300 px-10 hover:bg-opacity-80 w-[288px] py-3 h-12 rounded-sm">Settings</h2>
                            <h2 className=" font-bold  hover:bg-red-400 px-10 w-[288px] py-3 h-12 rounded-sm" onClick={handleButtonClick}>Logout</h2>
                        </div>
                        <ReactModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                className="w-[600px]  p-10 mt-20 bg-white shadow-lg ml-[500px] "
            >
                <h1 className="font-bold text-center">Are you sure you want to logout?</h1>
                <div className="buttons flex space-x-5 mt-10 justify-center ">
                    <button
                        type="submit"
                        className="bg-[#0F872F] py-2 text-white px-4 rounded-md"
                        onClick={handleCloseModal}
                    >
                        Return
                    </button>
                    <button
                        type="submit"
                        className="bg-[#ED0C0C] text-white py-2 px-4 rounded-md"
                        onClick={logout}
                    >
                    Logout
                    </button>
                </div>
            </ReactModal>
                    </div>
                </div>
            </div>
        );
    }
    
    export default Sidebar;
    