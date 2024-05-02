import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

function ChooseMethod() {
    const router = useRouter();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleRadioChange = async (value: string) => {
        setIsPopoverOpen(false);
        try {
            const userId = localStorage.getItem("userId");
            const token = getCookie("token");
            console.log(userId);
            console.log(token);
            if (!userId) {
                console.error("User Id not found");
                // Handle the error or redirect to the login page
                return;
            }

           
            // // Assuming the response contains the userId and projectId
            // const projectId = response.data._id;
            // console.log(projectId);

            if (value === "quick") {
               const response= await axios.post(
                      "https://topstrat-backend.onrender.com/projects/create",
                      {
                          userId: userId,
                          name: "",
                          description: "",
                          autoGenerate: true,
                      },
                      {
                          headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${
                                  JSON.parse(token ?? "").access_token
                              }`,
                          },
                      }
                  );    
                          const projectId = response.data._id;
                          console.log(projectId);

                router.push(`/components/Landingpage/${projectId}`);
            } else if (value === "step") {
                  const response = await axios.post(
                      "https://topstrat-backend.onrender.com/projects/create",
                      {
                          userId: userId,
                          name: "Project 2",
                          description: "test test project",
                          autoGenerate: false,
                      },
                      {
                          headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${
                                  JSON.parse(token ?? "").access_token
                              }`,
                          },
                      }
                );
                         const projectId = response.data._id;
                         console.log(projectId);

                router.push(`/components/step/${projectId}`);
            }
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };

    return (
        <div className="absolute">
            <FaPlus
                className="mt-4"
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                style={{ cursor: "pointer" }}
            />

            {isPopoverOpen && (
                <div
                    className="popover w-[250px] absolute left-0 text-black bg-[#fff] p-[10px]"
                    style={{
                        zIndex: "50",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                        borderRadius: "4px",
                    }}
                >
                    <label className="text-center my-[10px] block">
                        Choose method
                    </label>
                    <div className="mb-[10px]">
                        <input
                            type="radio"
                            name="favoriteFramework"
                            value="quick"
                            onChange={() => handleRadioChange("quick")}
                            className="mr-[5px]"
                        />
                        <label>Quick generation</label>
                    </div>
                    <div className="mb-[10px]">
                        <input
                            type="radio"
                            name="favoriteFramework"
                            value="step"
                            onChange={() => handleRadioChange("step")}
                            className="mr-[5px]"
                        />
                        <label>Step by step</label>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChooseMethod;
