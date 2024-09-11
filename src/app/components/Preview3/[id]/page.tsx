"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LogFrameSkeleton from "../../skeletons/LogFrameSkeleton";
import { baseURL } from "@/app/constants";
import { toast } from "react-toastify";

function Preview() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [projectData, setProjectData] = useState<any>();
  const [logframeData, setLogframeData] = useState<any>({});
  const [editableLogData, setEditableLogData] = useState<any>(null);
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
        setProjectData(response.data);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    getProject(id as string);
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const token = getCookie("token");
      setLoading(true);
      try {
        const response = await axios.get(
          `${baseURL}/projects/prompts/latest/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = JSON.parse(response.data.logframe.response);
        setLogframeData(data);
        setEditableLogData(data);
        setPromptId(response.data.logframe._id);
      } catch (error) {
        console.log("Error fetching logframe data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const refetchData = async () => {
    const token = getCookie("token");
    setLoading(true);
    try {
      const response = await axios.post(
        `${baseURL}/projects/projects/generate-analysis/${id}`,
        {
          projectId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = JSON.parse(response.data.logframe.response);
      setLogframeData(data);
      setEditableLogData(data);
      setPromptId(response.data.logframe._id);
    } catch (error) {
      console.log("Error refetching logframe data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const token = getCookie("token");
    if (!promptId) {
      console.error("Prompt ID is not available");
      return;
    }
    if (!editableLogData) {
      console.error("Editable log data is missing");
      toast.error("No data to save. Please try again.");
      return;
    }
    try {
      const result = await axios.put(
        `${baseURL}/projects/prompts/${promptId}`,
        { response: JSON.stringify(editableLogData) },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response from the API:", result.data);
      toast.success("Data saved successfully!");
    } catch (error: any) {
      console.error("Error saving data:", error.response ? error.response.data : error.message);
      toast.error("Failed to save data. Please try again.");
    }
  };

  const handleCellChange = (
    category: string,
    field: string,
    value: string,
    index: number,
    level: string
  ) => {
    setEditableLogData((prevData: any) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [field]: value,
      },
    }));
  };

return (
  <div className="border border-blue-default my-4 rounded-md mx-2 p-4 font-medium flex flex-col gap-8">
    {loading ? (
      <div>
        <div className="flex flex-col justify-center items-center gap-4 text-2xl">
          <Skeleton width={200} height={30} />
          <div className="text-yellow-500 font-bold">
            <Skeleton width={100} height={30} />
          </div>
          <div className="text-blue-default font-bold">
            <Skeleton width={200} height={30} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-blue-default font-bold text-2xl py-5">
            <Skeleton width={100} height={30} />
          </div>
          <LogFrameSkeleton />
        </div>
      </div>
    ) : (
      <div>
        <div className="flex flex-col justify-center items-center gap-4 text-xl">
          <div className="text-gray-400 flex items-center justify-center border-2 p-3 rounded-md py-2 px-6">
            {projectData && projectData.name}
          </div>
          <div className="text-yellow-500 font-bold">Preview</div>
          <div className="text-blue-default font-bold">
            Strategic Plan {projectData && projectData.name}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-blue-default font-bold text-2xl py-5">
            Logframe
          </div>
          <h1>Goal : {logframeData?.goal?.description}</h1>
          <div className="overflow-x-auto">
            <table className="border border-1 m-auto">
              <thead>
                <tr className="bg-slate-300">
                  <th className="border border-1 p-2 text-blue-default font-bold text-center" colSpan={2}>
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
  {logframeData && logframeData.goal && (
    <>
      {/* Impact Level */}
      <tr className="bg-slate-100">
        <td className="border border-1 p-2 font-bold text-center">Impact</td>
        <td className="border border-1 p-2">
          <div
            contentEditable
            onBlur={(e) => handleCellChange('goal', 'impact', e.currentTarget.textContent || '', -1, 'description')}
            suppressContentEditableWarning
          >
            {logframeData.goal.impact?.description || "-"}
          </div>
        </td>
        <td className="border border-1 p-2">
          {logframeData.goal.impact?.indicators &&
            Object.keys(logframeData.goal.impact.indicators).map((key, idx) => {
              const indicator = logframeData.goal.impact.indicators[key];
              return (
                <div key={idx}>
                  <div
                    contentEditable
                    onBlur={(e) => handleCellChange('goal', 'impact', e.currentTarget.textContent || '', idx, 'indicator')}
                    suppressContentEditableWarning
                  >
                    {key || ""}
                  </div>
                </div>
              );
            })}
        </td>
        <td className="border border-1 p-2">
          {logframeData.goal.impact?.indicators &&
            Object.keys(logframeData.goal.impact.indicators).map((key, idx) => {
              const indicator = logframeData.goal.impact.indicators[key];
              return (
                <div key={idx}>
                  <div
                    contentEditable
                    onBlur={(e) => handleCellChange('goal', 'impact', e.currentTarget.textContent || '', idx, 'baseline')}
                    suppressContentEditableWarning
                  >
                    {indicator.baseline || ""}
                  </div>
                </div>
              );
            })}
        </td>
        <td className="border border-1 p-2">
          {logframeData.goal.impact?.indicators &&
            Object.keys(logframeData.goal.impact.indicators).map((key, idx) => {
              const indicator = logframeData.goal.impact.indicators[key];
              return (
                <div key={idx}>
                  <div
                    contentEditable
                    onBlur={(e) => handleCellChange('goal', 'impact', e.currentTarget.textContent || '', idx, 'target')}
                    suppressContentEditableWarning
                  >
                    {indicator.target || "-"}
                  </div>
                </div>
              );
            })}
        </td>
        <td className="border border-1 p-2">
          <div
            contentEditable
            onBlur={(e) => handleCellChange('goal', 'impact', e.currentTarget.textContent || '', -1, 'timeline')}
            suppressContentEditableWarning
          >
            {logframeData.goal.impact?.timeline || "-"}
          </div>
        </td>
        <td className="border border-1 p-2">
          <div
            contentEditable
            onBlur={(e) => handleCellChange('goal', 'impact', e.currentTarget.textContent || '', -1, 'assumptions')}
            suppressContentEditableWarning
          >
            {logframeData.goal.impact?.assumptions || "-"}
          </div>
        </td>
      </tr>

      {/* Outcome Level */}
      {logframeData.goal.impact?.outcomes?.map((outcomeItem: any, outcomeIndex: any) => (
        <React.Fragment key={`outcome-${outcomeIndex}`}>
          <tr className={outcomeIndex % 2 === 0 ? "bg-slate-100" : "bg-slate-50"}>
            <td className="border border-1 p-2 font-bold text-center">
              Outcome {outcomeIndex + 1}
            </td>
            <td className="border border-1 p-2">
              <div
                contentEditable
                onBlur={(e) => handleCellChange('goal', 'outcomes', e.currentTarget.textContent || '', outcomeIndex, 'description')}
                suppressContentEditableWarning
              >
                {outcomeItem.description || "-"}
              </div>
            </td>
            <td className="border border-1 p-2">
              <div
                contentEditable
                onBlur={(e) => handleCellChange('goal', 'outcomes', e.currentTarget.textContent || '', outcomeIndex, 'indicator')}
                suppressContentEditableWarning
              >
                {outcomeItem.indicator || "-"}
              </div>
            </td>
            <td className="border border-1 p-2">
              <div
                contentEditable
                onBlur={(e) => handleCellChange('goal', 'outcomes', e.currentTarget.textContent || '', outcomeIndex, 'baseline')}
                suppressContentEditableWarning
              >
                {outcomeItem.baseline || "-"}
              </div>
            </td>
            <td className="border border-1 p-2">
              <div
                contentEditable
                onBlur={(e) => handleCellChange('goal', 'outcomes', e.currentTarget.textContent || '', outcomeIndex, 'target')}
                suppressContentEditableWarning
              >
                {outcomeItem.target || "-"}
              </div>
            </td>
            <td className="border border-1 p-2">
              <div
                contentEditable
                onBlur={(e) => handleCellChange('goal', 'outcomes', e.currentTarget.textContent || '', outcomeIndex, 'timeline')}
                suppressContentEditableWarning
              >
                {outcomeItem.timeline || "-"}
              </div>
            </td>
            <td className="border border-1 p-2">
              <div
                contentEditable
                onBlur={(e) => handleCellChange('goal', 'outcomes', e.currentTarget.textContent || '', outcomeIndex, 'assumptions')}
                suppressContentEditableWarning
              >
                {outcomeItem.assumptions || "-"}
              </div>
            </td>
          </tr>

          {/* Output Level */}
          {outcomeItem.outputs?.map((outputItem: any, outputIndex: any) => (
            <React.Fragment key={`output-${outputIndex}`}>
              <tr className={outputIndex % 2 === 0 ? "bg-slate-100" : "bg-slate-50"}>
                <td className="border border-1 p-2 font-bold text-center">
                  Output {outcomeIndex + 1}.{outputIndex + 1}
                </td>
                <td className="border border-1 p-2">
                  <div
                    contentEditable
                    onBlur={(e) => handleCellChange('goal', 'outputs', e.currentTarget.textContent || '', outputIndex, 'description')}
                    suppressContentEditableWarning
                  >
                    {outputItem.description || "-"}
                  </div>
                </td>
                <td className="border border-1 p-2">
                  <div
                    contentEditable
                    onBlur={(e) => handleCellChange('goal', 'outputs', e.currentTarget.textContent || '', outputIndex, 'indicator')}
                    suppressContentEditableWarning
                  >
                    {outputItem.indicator || "-"}
                  </div>
                </td>
                <td className="border border-1 p-2">
                  <div
                    contentEditable
                    onBlur={(e) => handleCellChange('goal', 'outputs', e.currentTarget.textContent || '', outputIndex, 'baseline')}
                    suppressContentEditableWarning
                  >
                    {outputItem.baseline || "0"}
                  </div>
                </td>
                <td className="border border-1 p-2">
                  <div
                    contentEditable
                    onBlur={(e) => handleCellChange('goal', 'outputs', e.currentTarget.textContent || '', outputIndex, 'target')}
                    suppressContentEditableWarning
                  >
                    {outputItem.target || "-"}
                  </div>
                </td>
                <td className="border border-1 p-2">
                  <div
                    contentEditable
                    onBlur={(e) => handleCellChange('goal', 'outputs', e.currentTarget.textContent || '', outputIndex, 'timeline')}
                    suppressContentEditableWarning
                  >
                    {outputItem.timeline || "-"}
                  </div>
                </td>
                <td className="border border-1 p-2">
                  <div
                    contentEditable
                    onBlur={(e) => handleCellChange('goal', 'outputs', e.currentTarget.textContent || '', outputIndex, 'assumptions')}
                    suppressContentEditableWarning
                  >
                    {outputItem.assumptions || "-"}
                  </div>
                </td>
              </tr>

              {/* Activity Level */}
              {outputItem.activities?.map((activityItem: any, activityIndex: any) => (
                <React.Fragment key={`activity-${activityIndex}`}>
                  <tr className={activityIndex % 2 === 0 ? "bg-slate-100" : "bg-slate-50"}>
                    <td className="border border-1 p-2 font-bold text-center">
                      Activity {outcomeIndex + 1}.{outputIndex + 1}.{activityIndex + 1}
                    </td>
                    <td className="border border-1 p-2">
                      <div
                        contentEditable
                        onBlur={(e) => handleCellChange('goal', 'activities', e.currentTarget.textContent || '', activityIndex, 'description')}
                        suppressContentEditableWarning
                      >
                        {activityItem.description || "-"}
                      </div>
                    </td>
                    <td className="border border-1 p-2">
                      <div
                        contentEditable
                        onBlur={(e) => handleCellChange('goal', 'activities', e.currentTarget.textContent || '', activityIndex, 'indicator')}
                        suppressContentEditableWarning
                      >
                        {activityItem.indicator || "-"}
                      </div>
                    </td>
                    <td className="border border-1 p-2">
                      <div
                        contentEditable
                        onBlur={(e) => handleCellChange('goal', 'activities', e.currentTarget.textContent || '', activityIndex, 'baseline')}
                        suppressContentEditableWarning
                      >
                        {activityItem.baseline || "-"}
                      </div>
                    </td>
                    <td className="border border-1 p-2">
                      <div
                        contentEditable
                        onBlur={(e) => handleCellChange('goal', 'activities', e.currentTarget.textContent || '', activityIndex, 'target')}
                        suppressContentEditableWarning
                      >
                        {activityItem.target || "-"}
                      </div>
                    </td>
                    <td className="border border-1 p-2">
                      <div
                        contentEditable
                        onBlur={(e) => handleCellChange('goal', 'activities', e.currentTarget.textContent || '', activityIndex, 'timeline')}
                        suppressContentEditableWarning
                      >
                        {activityItem.timeline || "-"}
                      </div>
                    </td>
                    <td className="border border-1 p-2">
                      <div
                        contentEditable
                        onBlur={(e) => handleCellChange('goal', 'activities', e.currentTarget.textContent || '', activityIndex, 'assumptions')}
                        suppressContentEditableWarning
                      >
                        {activityItem.assumptions || "-"}
                      </div>
                    </td>
                  </tr>

                  {/* Inputs Level */}
                  {activityItem.inputs && (
                    <tr className="bg-slate-100">
                      <td className="border border-1 p-2 font-bold text-center">
                        Input
                      </td>
                      <td className="border border-1 p-2">
                        <div
                          contentEditable
                          onBlur={(e) => handleCellChange('goal', 'inputs', e.currentTarget.textContent || '', -1, 'description')}
                          suppressContentEditableWarning
                        >
                          {activityItem.inputs.join(", ")}
                        </div>
                      </td>
                      <td className="border border-1 p-2">(To be determined)</td>
                      <td className="border border-1 p-2">(To be determined)</td>
                      <td className="border border-1 p-2">(To be determined)</td>
                      <td className="border border-1 p-2">-</td>
                      <td className="border border-1 p-2">
                        Funding is secured, and all necessary resources are available
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </>
  )}
</tbody>

            </table>
          </div>
        </div>
      </div>
    )}
    <div className="flex justify-center gap-8 my-5">
      <button
        className="bg-[#ED0C0C] text-white font-bold rounded-md py-3 px-6"
        onClick={() => router.push(`../../components/Preview2/${id}`)}
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
        className="bg-green-500 text-white font-bold rounded-md py-3 px-6"
        onClick={handleSave}
      >
        Save
      </button>
      <div
        className="flex bg-blue-default text-white font-bold rounded-md py-3 px-6 cursor-pointer"
        onClick={() => router.push(`/components/Final/${id}`)}
      >
        Next
      </div>
    </div>
  </div>
);

}

export default Preview;
