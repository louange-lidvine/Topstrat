// import React from 'react';
// // import Image, { StaticImageData } from 'next/image';

// interface ProfileProps {
//   pic: string;
//   name: string;
// }

// const Profile: React.FC<ProfileProps> = ({ pic, name }) => {
//   return (
//       <div className="flex ml-4 my-3">
//           {/* <Image
//         src={pic}
//         alt="user-profile"
//         width={50}
//         height={50}
//       /> */}
//           <img src={pic} alt={name} className="profile-pic w-9" />
//           <h2 className="mt-2 ml-4 font-bold">{name}</h2>
//       </div>
//   );
// };

// export default Profile;
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
// import Image, { StaticImageData } from 'next/image';


const Profile = () => {
    const [userData, setUserData] = useState<any>()
    const [gravatarUrl, setGravatarUrl] = useState<string>("");
  


    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem("userId");
            const token = getCookie("token");
            try {
                // Assuming you have an API endpoint to fetch user data by ID
                const response = await fetch(
                    `https://topstrat-backend.onrender.com/users/${userId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${
                                JSON.parse(token ?? "").access_token
                            }`,
                        },
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                  setUserData(data);
                  console.log(userData)
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
          const userEmail = userData?.email; // Replace this with the email of the signed-up user
          const hashedEmail =CryptoJS.SHA256(userEmail);
          const gravatarUrl = `https://www.gravatar.com/avatar/${hashedEmail}`;
          setGravatarUrl(gravatarUrl);
      };

      generateGravatar();
  }, []);
    return (
        <div className="flex ml-4 my-3">
            {userData ? (
                <>
                    <img
                        src={gravatarUrl}
                        alt="profile"
                        className="profile-pic w-9"
                    />
                    {userData && (
                        <h2 className="mt-2 ml-4 font-bold">
                            {userData.firstname} {userData.lastname}
                        </h2>
                    )}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
