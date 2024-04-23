import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import Loader from "@/app/shared/loader/page";

interface PromptGetProps {
    title: string;
    query: any;
    projectId: string;
}

const PromptGet: React.FC<PromptGetProps> = ({ title, projectId, query }) => {
    const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); 

    useEffect(() => {
        const fetchData = async () => {
            const token = getCookie("token");
            const userId = localStorage.getItem("userId");
            setLoading(true); // Step 2: Set loading to true before making the API call
            try {
                const response = await axios.post(
                    `https://topstrat-backend.onrender.com/projects/${projectId}/${title.toLowerCase()}`,
                    {
                        query: query,
                        projectId: projectId,
                        promptType: title.toLowerCase(),
                        enhance: true,
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
                console.log(response);
                setPrompt(response.data.response);
            } catch (error) {
                console.error("Error fetching prompts:", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, [projectId, title]);

    const handlePromptClick = (prompt: string) => {
        setSelectedPrompt(prompt);
    };

    const handleBackButtonClick = () => {
        setSelectedPrompt(null);
    };

    return (
        <div>
            <h1 className="text-xl font-bold text-center text-blue-default">
                {title} Prompts
            </h1>
            {loading ? ( 
                <Loader />
            ) : (
                <p>{prompt}</p>
            )}
        </div>
    );
};

export default PromptGet;

