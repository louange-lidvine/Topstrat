"use client";
import React, { useState, useEffect } from "react";
import { BiMenu } from "react-icons/bi";
import axios from "axios";
import Link from "next/link";
import ChooseMethod from "../chooseMethod/page";
import { getCookie, setCookie } from "cookies-next";
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import Profile from "../profile/page";
import EditProj from "../EditProj/page";
import SbLoad from "../../shared/loader/sbload";

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

  const closeSidebar = () => {
    setMenuVisible(false);
};

  const logout = () => {
    setIsLoading(true);
    setCookie("token", undefined);
    toast.success(" See you again 👋");
    navigate.push("../../Pages/signIn/page.tsx");
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleButtonClick = () => {
    setMenuVisible(!menuVisible)
    setIsModalOpen(true);
  };
  const handleButtonClick2 = () => {
    setMenuVisible(!menuVisible)
  };
  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const token = getCookie("token");
      const id = localStorage.getItem("userId");
      const response = await axios.get(
        `http://157.245.121.185:5000/projects/user/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(token ?? "").access_token}`,
          },
        }
      );
      // Set the projects state with the fetched data
      setProjects(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProjects(); // Fetch projects when the component mounts
  }, []);

  return (
    <>
      <div
        className={`hidden z-[9999] lg:flex flex-col  text-white max-w-[20vw]  bg-blue-default m-2 rounded-md`}
      >
        <div className="flex flex-col justify-between gap-40 ">
          <div className="user-part ">
            <Profile />
          </div>
          <div className="middle-part flex flex-col gap-3 w-64">
            <hr className=" ml-3 w-[16vw]" />

            <div className="projects">
              <div className="title grid grid-cols-2 space-x-16 ">
                <div
                  className="title grid grid-cols-2 space-x-40
        "
                >
                  <h1 className="mt-2 ml-10 text-xl font-bold flex-[0.8]">
                    Projects
                  </h1>
                  <ChooseMethod refetchProject={fetchProjects} closeSidebar={closeSidebar} />
                </div>
              </div>
              {isLoading ? (
                <div className="m-12">
                  {" "}
                  <SbLoad />
                </div>
              ) : (
                projects.map((project: any, index) => (
                  <EditProj
                    key={index}
                    project={project}
                    selected={id === project._id}
                    remove={() => {
                      setProjects(
                        projects.filter((proj: any) => proj._id === project._id)
                      );
                
                      fetchProjects();
                      navigate.push("/components/Landingpage");
                      handleButtonClick2()
                    }}
                  />
                ))
              )}
            </div>
          </div>
          <div className="py-10">
            <h2 className=" font-bold  hover:bg-white hover:bg-opacity-20  px-10  w-[auto] py-3 h-12 rounded-sm">
              Settings
            </h2>
            <h2
              className=" font-bold  hover:bg-red-400 px-10 w-[auto] py-3 h-12 rounded-sm"
              onClick={handleButtonClick}
            >
              Logout
            </h2>
          </div>
          <ReactModal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            className="w-[600px] z-[9999]  p-10 mt-20 bg-white shadow-lg lg:ml-[500px] "
          >
            <h1 className="font-bold text-center">
              Are you sure you want to logout?
            </h1>
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
      <div className="relative w-full lg:hidden z text-white bg-blue-default gap-10">
        <div className="flex justify-between items-center px-4 py-2">
          <BiMenu className="text-2xl" onClick={toggleMenu} />
          <h1 className="text-xl font-bold">Topstrat</h1>
        </div>
        <div
          className={` absolute z-10  bg-blue-default h-screen max-w-[40vw] top-[100%] transition-all duration-700 ${
            menuVisible ? "left-0" : "-left-[200%]"
          }`}
        >
          <div className="projects flex flex-col gap-40">
            <div className="user-part ">
              <Profile />
            </div>
            <div className="middle-part flex flex-col gap-3">
              <hr className="max-w-[40vw]" />

              <div className="projects">
                <div className="title grid grid-cols-2 space-x-16 ">
                  <div
                    className="title grid grid-cols-2 space-x-40
        "
                  >
                    <h1 className="mt-2 ml-10 text-xl font-bold flex-[0.8]">
                      Projects
                    </h1>
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
                      remove={() => {
                        setProjects(
                          projects.filter(
                            (proj: any) => proj._id === project._id
                          )
                        );
                        fetchProjects();
                        navigate.push("../Landingpage");
                      }}
                    />
                  ))
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <h2 className=" font-bold  hover:bg-gray-300 px-10 hover:bg-opacity-80 py-3 h-12 rounded-sm" onClick={handleButtonClick2}>
                Settings
              </h2>
              <h2
                className=" font-bold  hover:bg-red-400 px-10  py-3 h-12 rounded-sm"
                onClick={handleButtonClick}
              >
                Logout
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
