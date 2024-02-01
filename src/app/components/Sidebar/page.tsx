"use client"
import React, { useState} from "react";
import user from '../../../../public/assets/user.png'
import Profile from "../profile/page";
import { FaPlus } from "react-icons/fa";
import Choose from "../chooseMethod/page";



function Sidebar() {
  const [chooseVisible,setChooseVisible]=useState(false)

  const handleClick =()=>{
    setChooseVisible(!chooseVisible)
  }
  
  return (
      <body className="flex items-center   overflow-hidden fixed">
          <div className="flex h-screen text-white  fixed">
              <div className="flex-shrink-0 w-64 bg-blue-default m-4 rounded-md">
                  <div className="user-part h-56">
                      <Profile pic={user} name="Lauren Spencer" />
                  </div>
                  <hr className="w-56 ml-3" />
                  <div className="lower-part">
                      <div className="projects">
                          <div className="title grid grid-cols-2 space-x-16 h-56">
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
      </body>
  );
}

export default Sidebar;
