"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { getCookie } from "cookies-next";
import "react-loading-skeleton/dist/skeleton.css";
import SwotSkeleton from "../../skeletons/SwotSkeleton";
import { baseURL } from "@/app/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiArrowBack } from "react-icons/bi";

function Preview() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [promptData, setPromptData] = useState<any>();
  const [error, setError] = useState<string | null>(null);
  const [swotData, setSwotData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [projectData, setProjectData] = useState<any>();
  const [swotId, setSwotId] = useState<string | null>(null);
  const [editableSwotData, setEditableSwotData] = useState<any>(null);
  const [promptId, setPromptId] = useState<string | null>(null);

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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getCookie("token");
        setIsLoading(true);

        const response = await axios.get(
          `${baseURL}/projects/prompts/latest/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data) {
          console.log(response.data);
          const data =  JSON.parse(response.data.swot.response)
          setSwotData(data)
          setEditableSwotData(data);
          setSwotId(response.data.swot._id);

          setPromptData(response.data);
          setPromptId(response.data.swot._id);
        } else {
          setError("No data received");
        }
        setIsLoading(false);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const refetchData = async () => {
    try {
      const token = getCookie("token");
      setIsLoading(true);

      const response = await axios.post(
        `${baseURL}/projects/projects/generate-analysis/${id}`,
        { projectId: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data);

      if (response.data && response.data.swot?.response) {
        const parsedSwotResponse = JSON.parse(response.data.swot.response);
        setSwotData(parsedSwotResponse)
        setEditableSwotData(parsedSwotResponse)
        setSwotId(response.data.swot._id);

        setPromptData(response.data);
      } else {
        setError("No data received");
      }

      setIsLoading(false);
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

const saveData = async () => {
    const token = getCookie("token");

    // Check if swotId is available
    if (!swotId) {
        console.error("SWOT ID is not available");
        toast.error("SWOT ID is missing, cannot save data.");
        return;
    }

    // Check if editableSwotData is available
    if (!editableSwotData) {
        console.error("Editable SWOT data is missing");
        toast.error("No data to save. Please try again.");
        return;
    }

    // Prepare the response object
    const response = {
        strengths: editableSwotData.strengths || {},
        weaknesses: editableSwotData.weaknesses || {},
        opportunities: editableSwotData.opportunities ||{},
        threats: editableSwotData.threats || {},
    };

    try {
        const result = await axios.put(
            `${baseURL}/projects/prompts/${swotId}`, 
            { response: JSON.stringify(response) }, 
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
console.log(result.data)
        // Update the state with saved data
        setSwotData(editableSwotData);
        setIsEditing(false);
        toast.success("SWOT data saved successfully!");
    } catch (error) {
        console.error("Error saving SWOT data:", error);
        toast.error("Failed to save SWOT data. Please try again.");
    }
};

const handleCellChange = (category: string, index: number, value: string) => {
    setEditableSwotData((prevData: any) => {
        const updatedCategory = [...prevData[category]];
        updatedCategory[index] = value;

        return {
            ...prevData,
            [category]: updatedCategory,
        };
    });
    setIsEditing(true);
};

  return (
    <div className="border border-blue-default mt-4 mb-12 lg:mb-4 rounded-md mx-2 p-4 font-medium">
      <div
        className="justify-end flex gap-2 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <BiArrowBack className="mt-1" />
        <p className="">Return to home</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 text-xl">
        <div className="text-gray-400 flex items-center justify-center border-2 p-3 rounded-md py-2 px-6">
          {projectData && projectData.name}
        </div>
        <div className="text-yellow-500 font-bold">Preview</div>
        <div className="text-blue-default font-bold">
          Strategic Plan {projectData && projectData.name}
        </div>
      </div>
      <div className="w-full mt-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold text-blue-default">
              SWOT Analysis
            </h3>
            {isLoading ? (
              <SwotSkeleton />
            ) : (
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-3 text-blue-default font-semibold">
                      Strengths
                    </th>
                    <th className="border border-gray-300 p-3 text-blue-default font-semibold">
                      Weaknesses
                    </th>
                  </tr>
                </thead>
              <tbody>
  <tr>
    <td className="border border-gray-300 p-3 align-top">
      {editableSwotData?.strengths?.map((value: string, index: number) => (
        <div key={index} className="p-2">
          {isEditing ? (
            <textarea
              className="w-full overflow-y-hidden h-fit p-2 border border-gray-200 rounded resize-none"
              value={value}
              onChange={(e) =>
                handleCellChange("strengths", index, e.target.value)
              }
              rows={Math.max(2, value.split("\n").length)}
            />
          ) : (
            <p
              className="cursor-pointer p-2 hover:bg-gray-100 rounded"
              onDoubleClick={() => setIsEditing(true)}
            >
              {value}
            </p>
          )}
        </div>
      ))}
    </td>
    <td className="border border-gray-300 p-3 align-top">
      {editableSwotData?.weaknesses?.map((value: string, index: number) => (
        <div key={index} className="p-2">
          {isEditing ? (
            <textarea
              className="w-full overflow-y-hidden h-fit p-2 border border-gray-200 rounded resize-none"
              value={value}
              onChange={(e) =>
                handleCellChange("weaknesses", index, e.target.value)
              }
              rows={Math.max(2, value.split("\n").length)}
            />
          ) : (
            <p
              className="cursor-pointer p-2 hover:bg-gray-100 rounded"
              onDoubleClick={() => setIsEditing(true)}
            >
              {value}
            </p>
          )}
        </div>
      ))}
    </td>
  </tr>
  <tr>
    <th className="border border-gray-300 p-3 text-blue-default font-semibold">
      Opportunities
    </th>
    <th className="border border-gray-300 p-3 text-blue-default font-semibold">
      Threats
    </th>
  </tr>
  <tr>
    <td className="border border-gray-300 p-3 align-top">
      {editableSwotData?.opportunities?.map((value: string, index: number) => (
        <div key={index} className="p-2">
          {isEditing ? (
            <textarea
              className="w-full overflow-y-hidden h-fit p-2 border border-gray-200 rounded resize-none"
              value={value}
              onChange={(e) =>
                handleCellChange("opportunities", index, e.target.value)
              }
              rows={Math.max(2, value.split("\n").length)}
            />
          ) : (
            <p
              className="cursor-pointer p-2 hover:bg-gray-100 rounded"
              onDoubleClick={() => setIsEditing(true)}
            >
              {value}
            </p>
          )}
        </div>
      ))}
    </td>
    <td className="border border-gray-300 p-3 align-top">
      {editableSwotData?.threats?.map((value: string, index: number) => (
        <div key={index} className="p-2">
          {isEditing ? (
            <textarea
              className="w-full overflow-y-hidden h-fit p-2 border border-gray-200 rounded resize-none"
              value={value}
              onChange={(e) =>
                handleCellChange("threats", index, e.target.value)
              }
              rows={Math.max(2, value.split("\n").length)}
            />
          ) : (
            <p
              className="cursor-pointer p-2 hover:bg-gray-100 rounded"
              onDoubleClick={() => setIsEditing(true)}
            >
              {value}
            </p>
          )}
        </div>
      ))}
    </td>
  </tr>
</tbody>

              </table>
            )}
          </div>

          <div className="flex justify-center my-5 gap-8">
            <button
              className="bg-[#ED0C0C] text-white font-bold rounded-md py-3 px-6"
              onClick={() => router.push(`../../components/Preview/${id}`)}
            >
              Back
            </button>
            <button
              className="bg-orange-default text-white font-bold rounded-md py-3 px-6"
              onClick={refetchData}
            >
              Regenerate
            </button>
            <button
              className="bg-green-500 text-white font-bold rounded-md  py-3 px-6"
              onClick={saveData}
              disabled={!isEditing}
            >
              Save
            </button>
            <div
              className="flex bg-blue-default text-white font-bold rounded-md py-3 px-6 cursor-pointer"
              onClick={() => router.push(`/components/Preview2/${id}`)}
            >
              Next
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Preview;
