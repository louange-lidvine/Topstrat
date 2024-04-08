import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";

function Choose({ onStepByStepChoose }: { onStepByStepChoose: () => void }) {
    const router = useRouter();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [projectId, setProjectId] = useState("Untitled");

    const handleRadioChange = async (value: string) => {
        setIsPopoverOpen(false);
        if (value === "quick") {
            try {
                const response = await axios.post(
                    `https://topstrat-backend.onrender.com/projects/create}`,
                    {
                        name: "string",
                        description: {},
                    }
                );
                //   router.push("/components/Landingpage/response.data.id.toString()");
                router.push("/components/Landingpage/response.data.userId");

            } catch (error) {
                console.error("Error fetching prompts:", error);
            }

      
        } else if (value === "step") {
            // Call the onStepByStepChoose function here
            try {
                const response = await axios.post(
                    `https://topstrat-backend.onrender.com/projects/create}`,
                    {
                        name: "string",
                        description: {},
                    }
                );
                //   router.push("/components/Landingpage/response.data.id.toString()");
                router.push("/components/step/response.data.userId");
            } catch (error) {
                console.error("Error fetching prompts:", error);
            }
            onStepByStepChoose();
        }
    };

    const handleProjectNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setProjectId(event.target.value);
        window.location.pathname=event.target.value
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

            <div className="mt-2">
                <input
                    type="text"
                    placeholder="untitled"
                    value={projectId}
                    onChange={handleProjectNameChange}
                    className="border border-gray-300 rounded-md px-2 py-1 text-white bg-transparent border-none"
                />
            </div>
        </div>
    );
}

export default Choose;
