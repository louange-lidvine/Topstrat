"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { getCookie } from "cookies-next";
import Loader from "@/app/shared/loader/page";
import { baseURL } from "../../constants/index";

interface PromptGetProps {
  title: string;
  query: any;
  handelNext: (object: any) => void;
  projectId: string;
}

const PromptGet: React.FC<PromptGetProps> = ({
  title,
  projectId,
  query,
  handelNext,
}) => {
     const [isEditing, setIsEditing] = useState(false);

  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSwot, setIsSwot] = useState<boolean>(false);
  const [isLogframe, setIsLogframe] = useState<boolean>(false);
  const [isPestle, setIsPestle] = useState<boolean>(false);
  const [logframeData, setLogframeData] = useState<any>();
  const [editablePestleData, setEditablePestleData] = useState<any>(null);
      const [promptId, setPromptId] = useState<string | null>(null);
  const [swotData, setSwotData] = useState<{
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  } | null>(null);

  const [pestleData, setPestleData] = useState<
    | {
        political: string[];
        economic: string[];
        social: string[];
        technological: string[];
        logical: string[];
        environmental: string[];
      }
    | null
    | any
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = getCookie("token");
      const userId = localStorage.getItem("userId");
      setLoading(true);
      try {
        const response = await axios.post(
          `${baseURL}/projects/${projectId}/${title.toLowerCase()}`,
          {
            query: query,
            projectId: projectId,
            promptType: title.toLowerCase(),
            enhance: true,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        if (title.toLowerCase() === "swot") {
          setIsSwot(true);
          const responseData = JSON.parse(response.data.response);
          setSwotData(responseData);
        } else if (title.toLowerCase() === "pestle") {
          setIsPestle(true);
          const responseData = JSON.parse(response.data.response);
          setPestleData(responseData);
         setEditablePestleData(responseData);
           setPromptId(response.data._id);
        } else if (title.toLowerCase() === "logframe") {
          setIsLogframe(true);
          const data = JSON.parse(response.data.response);
          setLogframeData(data.logframe);
        } else {
          setPrompt(response.data.response);
        }
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

const renderList = (data: string) => {
  return (
    <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
      {data
        .split(/\d+\.\s*/)
        .filter((item) => item.trim() !== "")
        .map((item, index) => (
          <li key={index} style={{ marginBottom: "8px", fontSize: "16px", color: "#333" }}>
            {item.trim()}
          </li>
        ))}
    </ul>
  );
};


  const refetchData = async () => {
    const token = getCookie("token");
    const userId = localStorage.getItem("userId");
    setLoading(true);
    try {
      const response = await axios.post(
        `${baseURL}/projects/${projectId}/${title.toLowerCase()}`,
        {
          query: query,
          projectId: projectId,
          promptType: title.toLowerCase(),
          enhance: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (title.toLowerCase() === "swot") {
        setIsSwot(true);
        const responseData = JSON.parse(response.data.response);
        setSwotData(responseData);
      } else if (title.toLowerCase() === "pestle") {
        setIsPestle(true);
        const responseData = JSON.parse(response.data.response);
        setPestleData(responseData);
        setEditablePestleData(responseData);
          setPromptId(response.data._id);
      } else if (title.toLowerCase() === "logframe") {
        setIsLogframe(true);
        const responseData = JSON.parse(response.data.response);
        setLogframeData(responseData.logframe);
      } else {
        setPrompt(response.data.response);
      }
    } catch (error) {
      console.error("Error fetching prompts:", error);
    } finally {
      setLoading(false);
    }
  };

      const handleCellChange = (
        category: string,
        field: string,
        value: string
    ) => {
        setEditablePestleData((prevData: any) => ({
            ...prevData,
            [category]: {
                ...prevData[category],
                [field]: value,
            },
        }));
        setIsEditing(true);
    };

    const saveData = async () => {
        const token = getCookie("token");
        if (!promptId) {
            console.error("Prompt ID is not available");
            return;
        }

        // Map the response to the expected format
        const response = {
            political: editablePestleData.political,
            economic: editablePestleData.economic,
            social: editablePestleData.social,
            technological: editablePestleData.technological,
            legal: editablePestleData.legal,
            environmental: editablePestleData.environmental,
        };

        try {
            await axios.put(
                `${baseURL}/projects/${projectId}/prompts/${promptId}`,
                { response }, // Use the mapped response object
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${
                          token
                        }`,
                    },
                }
            );
            setPestleData(editablePestleData); // Update the main data with the new data
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };


  return (
    <div>
      <h1 className="text-xl pb-3 font-bold text-center text-blue-default">
        {title} Prompts
      </h1>
      {loading ? (
        <Loader />
      ) : isSwot ? (
        <div>
          <table className="w-full  border-2 border-collapse border-gray-300">
            <tbody>
              <tr>
                <td className="px-4 border border-gray-300">
                  <h3 className="font-bold">Strengths</h3>
                  <ul className="list-disc list-inside ">
                    {swotData?.strengths &&
                      swotData.strengths.map((strength, index) => (
                        <li key={index} className="py-2">{strength}</li>
                      ))}
                  </ul>
                </td>
                <td className="px-4 border border-gray-300">
                  <h3 className="font-bold">Weaknesses</h3>
                  <ul className="list-disc list-inside ">
                    {swotData?.weaknesses &&
                      swotData.weaknesses.map((weakness, index) => (
                        <li key={index} className="py-2">{weakness}</li>
                      ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="px-4 border border-gray-300">
                  <h3 className="font-bold">Opportunities</h3>
                  <ul className="list-disc list-inside ">
                    {swotData?.opportunities &&
                      swotData.opportunities.map((opportunity, index) => (
                        <li key={index} className="py-2">{opportunity}</li>
                      ))}
                  </ul>
                </td>
                <td className="px-4 border border-gray-300">
                  <h3 className="font-bold">Threats</h3>
                  <ul className="list-disc list-inside ">
                    {swotData?.threats &&
                      swotData.threats.map((threat, index) => (
                        <li key={index} className="py-2">{threat}</li>
                      ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : isPestle ? (
        <div className="overflow-x-auto">
                            <table className="border border-1 m-auto">
                                <thead>
                                    <tr className="bg-slate-300">
                                        <th className="border border-1 p-2 text-blue-default font-bold text-center"></th>
                                        <th className="border border-1 p-2 text-blue-default font-bold text-center">
                                            Influence on organization
                                        </th>
                                        <th className="border border-1 p-2 text-blue-default font-bold text-center">
                                            Impact on organization
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {editablePestleData && (
                                        <>
                                            {[
                                                "political",
                                                "economic",
                                                "social",
                                                "technological",
                                                "legal",
                                                "environmental",
                                            ].map((category) => (
                                                <tr key={category}>
                                                    <td className="border border-1 p-2 text-center font-bold bg-slate-300">
                                                        {category
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            category.slice(1)}
                                                    </td>
                                                    <td
                                                        className="border border-1 p-2"
                                                        contentEditable
                                                        suppressContentEditableWarning
                                                        onBlur={(e) =>
                                                            handleCellChange(
                                                                category,
                                                                "inf",
                                                                e.currentTarget
                                                                    .textContent || ""
                                                            )
                                                        }
                                                        style={{
                                                            minWidth: "200px",
                                                        }}
                                                    >
                                                        {
                                                            editablePestleData[
                                                                category
                                                            ].inf
                                                        }
                                                    </td>
                                                    <td
                                                        className="border border-1 p-2"
                                                        contentEditable
                                                        suppressContentEditableWarning
                                                        onBlur={(e) =>
                                                            handleCellChange(
                                                                category,
                                                                "imp",
                                                                e.currentTarget
                                                                    .textContent || ""
                                                            )
                                                        }
                                                        style={{
                                                            minWidth: "200px",
                                                        }}
                                                    >
                                                        {
                                                            editablePestleData[
                                                                category
                                                            ].imp
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
      ) : isLogframe ? (
        <div className="flex flex-col gap-3">
          <div className="text-blue-default font-bold text-2xl py-5">
            Logframe
          </div>
          <div className="overflow-x-auto">
            <table className="border border-1 m-auto">
              <thead>
                <tr className="bg-slate-300">
                  <th className="border border-1 p-2 text-blue-default font-bold text-center">
                    Results Chain
                  </th>
                  <th className="border border-1 p-2 text-blue-default font-bold text-center">
                    Indicator
                  </th>
                  <th className="border border-1 p-2 text-blue-default font-bold text-center">
                    Baseline
                  </th>
                  <th className="border border-1 p-2 text-blue-default font-bold text-center">
                    Target
                  </th>
                  <th className="border border-1 p-2 text-blue-default font-bold text-center">
                    Timeline
                  </th>
                  <th className="border border-1 p-2 text-blue-default font-bold text-center">
                    Assumptions
                  </th>
                </tr>
              </thead>
              <tbody>
                {logframeData &&
                  logframeData.map((item: any, index: number) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-slate-100" : ""}
                    >
                      <td className="border border-1 p-2 text-center font-bold">
                        {item["Results chain"]}
                      </td>
                      <td className="border border-1 p-2">{item.Indicator}</td>
                      <td className="border border-1 p-2">{item.Baseline}</td>
                      <td className="border border-1 p-2">{item.Target}</td>
                      <td className="border border-1 p-2">{item.Timeline}</td>
                      <td className="border border-1 p-2">
                        {item.Assumptions}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p> {prompt && renderList(prompt)}</p>
      )}
      <div className="buttons flex space-x-5 mt-10 ">
      <button
                            className="bg-green-500 text-white font-bold rounded-md  py-3 px-6"
                            onClick={saveData}
                            disabled={!isEditing}
                        >
                            Save
                        </button>
        <button
          type="submit"
          className="bg-[#ED0C0C] py-2 px-4 rounded-md"
          onClick={refetchData}
        >
          Re-generate
        </button>
        <button
          type="submit"
          className="bg-[#0F872F] py-2 px-4 rounded-md"
          onClick={() => handelNext(title)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PromptGet;
