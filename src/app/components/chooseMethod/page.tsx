// import React, { useState } from "react";
// import { FaPlus } from "react-icons/fa";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// function Choose() {
//     const router = useRouter();
//     const [isPopoverOpen, setIsPopoverOpen] = useState(false);
//     const [projectId, setProjectId] = useState("Untitled");

//     const handleRadioChange = async (value: string) => {
//         setIsPopoverOpen(false);
//         if (value === "quick") {
//             try {
//                 const response = await axios.post(
//                     `https://topstrat-backend.onrender.com/projects/create`,
//                     {
                        
//                         name: "project",
//                         description: "my project",
//                     }
//                 );
//                 console.log('response')
//                 //   router.push("/components/Landingpage/response.data.id.toString()");
//                 router.push("/components/Landingpage/response.data.userId");

//             } catch (error) {
//                 console.error("Error creating project:", error);
//             }

      
//         } else if (value === "step") {
//             // Call the onStepByStepChoose function here
//             try {
//                 const response = await axios.post(
//                     `https://topstrat-backend.onrender.com/projects/create`,
//                     {
//                         name: "project",
//                         description: "My project",
//                     }
//                 );
//                 //   router.push("/components/Landingpage/response.data.id.toString()");
//                 router.push("/components/step/response.data.userId");
//             } catch (error) {
//                 console.error("Error creating project:", error);
//             }
//         }
//     };


//     return (
//         <div className="relative">
//             <FaPlus
//                 className="mt-4"
//                 onClick={() => setIsPopoverOpen(!isPopoverOpen)}
//                 style={{ cursor: "pointer" }}
//             />

//             {isPopoverOpen && (
//                 <div
//                     className="popover w-[250px] absolute left-0 text-black bg-[#fff] p-[10px]"
//                     style={{
//                         zIndex: "9999",
//                         boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
//                         borderRadius: "4px",
//                     }}
//                 >
//                     <label className="text-center my-[10px] block">
//                         Choose method
//                     </label>
//                     <div className="mb-[10px]">
//                         <input
//                             type="radio"
//                             name="favoriteFramework"
//                             value="quick"
//                             onChange={() => handleRadioChange("quick")}
//                             className="mr-[5px]"
//                         />
//                         <label>Quick generation</label>
//                     </div>
//                     <div className="mb-[10px]">
//                         <input
//                             type="radio"
//                             name="favoriteFramework"
//                             value="step"
//                             onChange={() => handleRadioChange("step")}
//                             className="mr-[5px]"
//                         />
//                         <label>Step by step</label>
//                     </div>
//                 </div>
//             )}

          
//         </div>
//     );
// }

// export default Choose;


import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";

function Choose() {
    const router = useRouter();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleRadioChange = async (value: string) => {
        setIsPopoverOpen(false);
        try {
            const userId = localStorage.getItem("userId");
            console.log(userId);
            if (!userId) {
                console.error("User Id not found");
                // Handle the error or redirect to the login page
                return;
            }

            const response = await axios.post(
                "https://topstrat-backend.onrender.com/projects/create",
                {
                    userId:userId,
                    name: "project",
                    description: "My project",
                }
            );

            // Assuming the response contains the userId and projectId
            const { projectId } = response.data;

            if (value === "quick") {
                router.push(`/components/Landingpage/${userId}`);
            } else if (value === "step") {
                router.push(`/components/step/${userId}`);
            }
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };

    return (
        <div className="relative">
            <FaPlus
                className="mt-4"
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                style={{ cursor: "pointer" }}
            />

            {isPopoverOpen && (
                <div
                    className="popover w-[250px] absolute left-0 text-black bg-[#fff] p-[10px]"
                    style={{
                        zIndex: "9999",
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

export default Choose;
