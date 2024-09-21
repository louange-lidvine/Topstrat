"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import cover from "../../../../../public/assets/cover3.svg";
import logo from '../../../../../public/assets/logo.png'
import { baseURL } from "@/app/constants";
import axios from "axios";
import { getCookie } from "cookies-next";
import Skeleton from "react-loading-skeleton";

function Page() {
  const router = useRouter();
    const [userData, setUserData] = useState<any>();

  const {id} = useParams()
  const [projectData, setProjectData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const getProject = async (id: string) => {
            try {
                const token = getCookie("token");
                const response = await axios.get(`${baseURL}/projects/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                setProjectData(response.data);
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };
        getProject(id as string);
        console.log("projects");
        setIsLoading(false);
        fetchUserData();
    }, []);

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

  return (
<div className="relative w-full border border-blue-default bg-white lg:max-w-6xl my-6 lg:rounded-lg shadow-lg h-screen overflow-hidden ">
      <div className="relative w-full overflow-hidden">
        <Image
          src={cover}
          alt="Cover page image"
          className="w-full h-screen  object-cover"
        />
      </div>

      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-8 text-white">
        <div className="flex justify-between">
      <div className="flex flex-col items-start">
   <div className="bg-white p-2 rounded-md">
              <Image
                src={projectData?.logo ? projectData.logo : logo}
                alt="organization logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          <h2 className="text-xl font-bold mt-2 text-black">   {projectData && projectData.name}</h2>
          </div>
      
          <h1 onClick={()=> router.push(`/components/Preview/${id}`)} className="text-black cursor-pointer">Continue to project</h1>
        </div>

  
        <div className="flex flex-col items-start mt-20">
          <h1 className="text-5xl font-bold text-black">STRATEGIC PLAN</h1>
          <h2 className="text-2xl font-semibold text-black  mt-2">2024-2028</h2>
        </div>

        <div className="flex flex-col items-start mt-8 text-black">
           <div className="flex flex-col gap-4">
                        {isLoading ? (
                            <div className="w-full">
                                <Skeleton width={100} />
                                <Skeleton />
                            </div>
                        ) : (
                            <div className="w-[50%]">
                                <p>{projectData && projectData.description}</p>
                            </div>
                        )}
                    </div>
        </div>

        <div className="text-yellow-500 mt-8">
<h3 className="text-xl font-semibold">
  {projectData && new Date(projectData.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  })}
</h3>
          <p className="text-sm text-black mt-2">
            +250-792-531-980<br />
            {userData?.email}<br />
            www.cooky.com<br />
            BP 3451 KIGALI-RWANDA
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
