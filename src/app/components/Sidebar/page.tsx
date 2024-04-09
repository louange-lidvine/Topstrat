// "use client"
// import React, { useState, useEffect } from "react";
// import user from "../../../../public/assets/user.png";
// import Profile from "../profile/page";
// import { BiMenu } from "react-icons/bi";
// import Choose from "../chooseMethod/page";
// import axios from "axios";
// import Link from "next/link";

// function Sidebar() {
//     const [menuVisible, setMenuVisible] = useState(false);
//     const [projects, setProjects] = useState([]);
//     const [projectId, setProjectId] = useState("Untitled");

//     const handleProjectNameChange = (
//         event: React.ChangeEvent<HTMLInputElement>
//     ) => {
//         setProjectId(event.target.value);
//         window.location.pathname=event.target.value
//     };

//     const toggleMenu = () => {
//         setMenuVisible(!menuVisible);
//     };

//     // Define fetchProjects function to retrieve projects from the backend
//     const fetchProjects = async () => {
//         try {
//             const response = await axios.get(
//                 "https://topstrat-backend.onrender.com/projects"
//             );
//             setProjects(response.data);
//         } catch (error) {
//             console.error("Error fetching projects:", error);
//         }
//     };

//     useEffect(() => {
//         fetchProjects(); // Fetch projects when the component mounts
//     }, []);

//     const handleStepByStepChoose = async () => {
//         try {
//             // Make a POST request to create a new project
//             const response = await axios.post(
//                 "https://topstrat-backend.onrender.com/projects",
//                 {}
//             );
//             // Refresh projects after creating a new one
//             fetchProjects();
//         } catch (error) {
//             // If there's an error with the API request, handle it here
//             console.error("Error creating project:", error);
//         }
//     };

//     return (
//         <div className="fixed top-0 left-0 h-screen w-full overflow-hidden">
//             <div className="lg:hidden fixed top-0 left-0 w-full bg-blue-default text-white">
//                 <div className="flex justify-between items-center px-4 py-2">
//                     <h1 className="text-xl font-bold">Topstrat</h1>
//                     <BiMenu className="text-2xl" onClick={toggleMenu} />
//                 </div>
//                 {menuVisible && (
//                     <div className="px-4 py-2">
//                         <h2 className="font-bold">Dashboard</h2>
//                         <h2 className="mt-2 font-bold">Settings</h2>
//                         <h2 className="mt-2 font-bold">Logout</h2>
//                     </div>
//                 )}
//             </div>

//             <div className="hidden lg:flex flex-col h-[710px] lg:bg-fixed text-white w-72 bg-blue-default m-4 rounded-md">
//                 <div className="user-part h-56">
//                     <Profile pic={user} name="Lauren Spencer" />
//                 </div>
//                 <hr className="w-64 ml-3" />
//                 <div className="lower-part">
//                     <div className="projects">
//                         <div className="title grid grid-cols-2 space-x-16 h-80">
//                             <div className="title grid grid-cols-2 space-x-40 h-56">
//                                 <h1 className="mt-2 ml-10 text-xl font-bold flex-[0.8]">
//                                     Projects
//                                 </h1>
            
//                                 <Choose
//                                     onStepByStepChoose={handleStepByStepChoose}
//                                 />
//                             </div>
//                         </div>
//                         <div className="mt-2">
//                             <input
//                              type="text"
//                              placeholder="untitled"
//                              value={projectId}
//                              onChange={handleProjectNameChange}
//                              className="border border-gray-300 rounded-md px-2 py-1 text-black bg-white border-none"
//                             />
//                          </div>
//                         {projects.map((projectId, index) => (
//                             <div key={index} className="ml-10 font-bold">
//                                 <Link href={`/projects/${projectId}`}>
//                                     <a>{projectId}</a>
//                                 </Link>
//                             </div>
//                         ))}
                        
//                     </div>
                    
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Sidebar;


"use client"
import React, { useState, useEffect } from "react";
import user from "../../../../public/assets/user.png";
import Profile from "../profile/page";
import { BiMenu } from "react-icons/bi";
import Choose from "../chooseMethod/page";
import axios from "axios";
import Link from "next/link";

function Sidebar() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [projects, setProjects] = useState([]);
    const [projectId, setProjectId] = useState("Untitled");

    const handleProjectNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setProjectId(event.target.value);
        window.location.pathname = event.target.value;
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    // Define fetchProjects function to retrieve projects from the backend
    const fetchProjects = async () => {
        try {
            const response = await axios.get(
                "https://topstrat-backend.onrender.com/projects"
            );
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    useEffect(() => {
        fetchProjects(); 
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
                        <h2 className="font-bold">Dashboard</h2>
                        <h2 className="mt-2 font-bold">Settings</h2>
                        <h2 className="mt-2 font-bold">Logout</h2>
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
                        <div className="title grid grid-cols-2 space-x-16 h-80">
                            <div className="title grid grid-cols-2 space-x-40 h-56">
                                <h1 className="mt-2 ml-10 text-xl font-bold flex-[0.8]">
                                    Projects
                                </h1>
                                <Choose/>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                type="text"
                                placeholder="Untitled"
                                value={projectId}
                                onChange={handleProjectNameChange}
                                className="border border-gray-300 rounded-md px-2 py-1 text-black bg-white border-none"
                            />
                        </div>
                        {projects.map((project: any, index: number) => (
                            <div key={index} className="ml-10 font-bold">
                                <Link href={`/projects/${project._id}`}>
                                    <a>{project.name}</a>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
