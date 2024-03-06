"use client"
import React, { useState } from "react";
import user from "../../../../public/assets/user.png";
import Profile from "../profile/page";
import { FaPlus } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";
import Choose from "../chooseMethod/page";

function Sidebar() {
  const [chooseVisible, setChooseVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleClick = () => {
    setChooseVisible(!chooseVisible);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

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

      <div className="hidden lg:flex flex-col h-[750px] text-white w-72 bg-blue-default m-4 rounded-md">
        <div className="user-part h-56">
          <Profile pic={user} name="Lauren Spencer" />
        </div>
        <hr className="w-56 ml-3" />
        <div className="lower-part">
          <div className="projects">
            <div className="title grid grid-cols-2 space-x-16 h-80">
              <div className="title grid grid-cols-2 space-x-32 h-56">
                <h1 className="mt-2 ml-10 text-xl font-bold flex-[0.8]">
                  Projects
                </h1>
                <FaPlus className="mt-4" onClick={handleClick} />
                {chooseVisible && <Choose />}
              </div>
            </div>








            
            <h2 className="mt-2 ml-10 font-bold">Dashboard</h2>
            <h2 className="mt-2 ml-10 font-bold">Settings</h2>
            <h2 className="mt-2 ml-10 font-bold">Logout</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

