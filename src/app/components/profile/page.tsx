"use client";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { baseURL } from "@/app/constants";

const Profile = () => {
  const [userData, setUserData] = useState<any>();
  const [gravatarUrl, setGravatarUrl] = useState<string>("");

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
      const hashedEmail = CryptoJS.SHA256(userEmail);
      const gravatarUrl = `https://www.gravatar.com/avatar/${hashedEmail}`;
      setGravatarUrl(gravatarUrl);
    };

    generateGravatar();
  }, []);
  return (
    <div className="flex ml-4 my-3">
      {userData ? (
        <>
          <img src={gravatarUrl} alt="profile" className="profile-pic w-10 h-10" />
          {userData && (
            <div className="ml-4">
              <h2 className=" font-bold">
              {userData.firstname} {userData.lastname}
            </h2>
            <h1>{userData.subscription} plan</h1> 
            </div>
           
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
