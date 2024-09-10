"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
import Loader from "@/app/shared/loader/page";
import { useParams } from "next/navigation";
import SwotSkeleton from "../../skeletons/SwotSkeleton";
import LogFrameSkeleton from "../../skeletons/LogFrameSkeleton";
import PestleSkeleton from "../../skeletons/PestleSkeleton";
import Skeleton from "react-loading-skeleton";
import ExportPage from "../../Export/page";
import { baseURL } from "@/app/constants";


function Final() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [promptData, setPromptData] = useState<any>();
    const [projectData, setProjectData] = useState<any>();
    const [pestleData, setPestleData] = useState<any>();
    const [logframeData, setLogframeData] = useState<any>([]);
    const [Data, setData] = useState<any>([]);
    const [error, setError] = useState<string | null>(null);

useEffect(() => {
 
  const fetchData = async () => {
    try {
      const token = getCookie("token");
      setIsLoading(true);

      const promptResponse = await axios.get(
        `${baseURL}/projects/prompts/latest/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPromptData(promptResponse.data);

      const projectResponse = await axios.get(
        `${baseURL}/projects/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProjectData(projectResponse.data);

      const response = await axios.get(
        `${baseURL}/projects/prompts/latest/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPestleData(JSON.parse(response.data.pestle.response));

      const logframeData = JSON.parse(response.data.logframe.response);
        setData(logframeData)
        setLogframeData(logframeData);
        setIsLoading(false)
        return logframeData
  

      setIsLoading(false);
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  fetchData();
}, [id]);

const regenerateData = async () => {
  try {
    const token = getCookie("token");
    setIsLoading(true);

    const promptResponse = await axios.get(
      `${baseURL}/projects/projects/generate-analysis/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setPromptData(promptResponse.data);

    const projectResponse = await axios.get(
      `${baseURL}/projects/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setProjectData(projectResponse.data);

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

    setPestleData(JSON.parse(response.data.pestle.response));

    const logframeData = JSON.parse(response.data.logframe.response);
      setLogframeData(logframeData);
        setData(logframeData)
        return logframeData

  } catch (error) {
    setError("Error fetching data");
    console.error("Error fetching data:", error);
    setIsLoading(false);
  }
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



  const MyDocument = () => (
    <Document pageMode="fullScreen">
      <Page size="A4" style={{ margin: "auto" }}>
        <div className="border border-blue-default my-4 rounded-md mx-2 p-4 font-medium">
          <div className="flex flex-col  justify-center items-center gap-4 text-xl ">
            <div className="text-gray-400   flex items-center justify-center border-2  p-3 rounded-md py-2  px-6">
              {" "}
              <Text>{projectData && projectData.name}</Text>
            </div>
            <div className="text-yellow-500 font-bold ">
              <Text>Preview</Text>
            </div>
            <div className="text-blue-default font-bold  ">
              <Text>Strategic Plan {projectData && projectData.name}</Text>{" "}
            </div>
          </div>
          <div className=" w-full">
            {" "}
            <div className="flex flex-col gap-6 ">
              <div className="flex flex-col gap-4 ">
                {" "}
             
                {isLoading ? (
               <div className="w-full">
                   <Skeleton width={80} />
                <Skeleton />
                </div>
                ) : (
                  <div>
                       <h3 className="text-blue-default font-bold text-xl">
                  {" "}
                  <Text> Project Overview </Text>
                </h3>
                       <p className="">
                    <Text> {projectData && projectData.description}</Text>
                  </p>
                  </div>
             
                )}
              </div>
              <div className="flex flex-col gap-3">
       
                {isLoading ? (
                  <div className="w-full">
                    {" "}
                    <div className="w-full">  
                      <Skeleton width={80} />
                      <Skeleton  height={30} />
                      </div>
                  </div>
                ) : (
                  <div>
                             <h3 className="text-xl font-bold">
                  {" "}
                  <Text
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#0B6C79",
                    }}
                  >
                    {" "}
                    Vision
                  </Text>
                </h3>
                             <p>
                    <Text>
                      {promptData &&
                        promptData.vision &&
                        promptData.vision.response}
                    </Text>
                  </p>
                  </div>
         
                )}
              </div>
              <div className="flex flex-col gap-3">
             
                {isLoading ? (
                  <div className="w-full">
                    {" "}
                    <div className="w-full">
                      <Skeleton width={80} />
                      <Skeleton  height={30} />
                      </div>
                  </div>
                ) : (
                  <div>
                      <h3 className="text-xl font-bold">
                  {" "}
                  <Text
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#0B6C79",
                    }}
                  >
                    Mission
                  </Text>{" "}
                </h3>
                        <p>
                    <Text>
                      {promptData &&
                        promptData.mission &&
                        promptData.mission.response}
                    </Text>
                  </p>  
                  </div>
           
                )}
              </div>
              <div className="flex flex-col gap-3">
               
                {isLoading ? (
                <div className="w-full">
                <Skeleton width={80} />
                <Skeleton  height={80} />
                </div>
                ) : (
                  <div>
                     <h3 className="text-xl font-bold">
                  {" "}
                  <Text
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#0B6C79",
                    }}
                  >
                    Objectives
                  </Text>{" "}
                </h3>
                    {promptData && promptData.objectives && (
                      <ul>{renderList(promptData.objectives.response)}</ul>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3">
           
                {isLoading ? (
                   <div className="w-full">
                   <Skeleton width={80} />
                   <Skeleton  height={80} />
                   </div>
                ) : (
                  <div>
                        <h3 className="text-xl font-bold">
                  {" "}
                  <Text
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#0B6C79",
                    }}
                  >
                    Values
                  </Text>
                </h3>
                    {promptData && promptData.values && (
                      <ul>{renderList(promptData.values.response)}</ul>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3">
               
                {isLoading ? (
                <div className="w-full">
                <Skeleton width={80} />
                <Skeleton  height={80} />
                </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-bold">
                  <Text
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#0B6C79",
                    }}
                  >
                    Strategy
                  </Text>{" "}
                </h3>
                    {promptData && promptData.strategy && (
                      <ul>{renderList(promptData.strategy.response)}</ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 mt-5 ">
            <div className="w-[100%] flex justify-center items-center">
              {isLoading ? (
                <div className="w-full">
                  <Skeleton  width={100} />
                  <SwotSkeleton />
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-bold text-blue-default">
                    <Text
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#0B6C79",
                      }}
                    >
                      SWOT ANALYSIS
                    </Text>
                  </h2>
                  <table
                    style={{
                      borderCollapse: "collapse",
                      width: "100%",
                      overflowX: "auto",
                    }}
                  >
                    <tr style={{ color: "#0B6C79" }}>
                      <td
                        style={{
                          border: "2px solid black",
                          padding: "6px",
                          textAlign: "left",
                          paddingLeft: "6px",
                          paddingTop: "3px",
                        }}
                      >
                        <Text> Strengths(S)</Text>
                      </td>
                      <td
                        style={{
                          border: "2px solid black",
                          padding: "6px",
                          textAlign: "left",
                          paddingLeft: "6px",
                        }}
                      >
                        <Text>Weaknesses(W)</Text>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: "2px solid black",
                          padding: "6px",
                          textAlign: "left",
                          paddingLeft: "6px",
                        }}
                      >
                        <Text>
                          {promptData &&
                            promptData.swot &&
                            promptData.swot.response &&
                            JSON.parse(promptData.swot.response).strengths[0]}
                        </Text>
                      </td>
                      <td
                        style={{
                          border: "2px solid black",
                          padding: "6px",
                          textAlign: "left",
                          paddingLeft: "6px",
                        }}
                      >
                        <Text>
                          {promptData &&
                            promptData.swot &&
                            promptData.swot.response &&
                            JSON.parse(promptData.swot.response).weaknesses[0]}
                        </Text>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: "2px solid black",
                          padding: "6px",
                          textAlign: "left",
                          paddingLeft: "6px",
                        }}
                      >
                        <Text>
                          {promptData &&
                            promptData.swot &&
                            promptData.swot.response &&
                            JSON.parse(promptData.swot.response).strengths[1]}
                        </Text>
                      </td>
                      <td
                        style={{
                          border: "2px solid black",
                          padding: "6px",
                          textAlign: "left",
                          paddingLeft: "6px",
                        }}
                      >
                        <Text>
                          {promptData &&
                            promptData.swot &&
                            promptData.swot.response &&
                            JSON.parse(promptData.swot.response).weaknesses[1]}
                        </Text>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: "2px solid black",
                          padding: "6px",
                          textAlign: "left",
                          paddingLeft: "6px",
                        }}
                      >
                        <Text>
                          {promptData &&
                            promptData.swot &&
                            promptData.swot.response &&
                            JSON.parse(promptData.swot.response).strengths[2]}
                        </Text>
                      </td>
                      <td
                        style={{
                          border: "2px solid black",
                          padding: "6px",
                          textAlign: "left",
                          paddingLeft: "6px",
                        }}
                      >
                        <Text>
                          {promptData &&
                            promptData.swot &&
                            promptData.swot.response &&
                            JSON.parse(promptData.swot.response).weaknesses[2]}
                        </Text>
                      </td>
                    </tr>
                    <tr style={{ color: "#0B6C79" }}>
                      <td
                        style={{
                          border: "2px solid black",
                          padding: "6px",
                          textAlign: "left",
                          paddingLeft: "6px",
                          paddingTop: "3px",
                        }}
                      >
                        <Text>Opportunities (O)</Text>
                      </td>
                      <td
                        style={{
                          border: "2px solid black",
                          padding: "6px",
                          textAlign: "left",
                          paddingLeft: "6px",
                        }}
                      >
                        <Text> Threats (T)</Text>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: "2px solid black",
                          padding: "6px",
                          textAlign: "left",
                          paddingLeft: "6px",
                        }}
                      >
                        <Text>
                          {promptData &&
                            promptData.swot &&
                            promptData.swot.response &&
                            JSON.parse(promptData.swot.response)
                              .opportunities[0]}
                        </Text>
                      </td>
                      <td
                        style={{
                          border: "2px solid black",
                          padding: "6px",
                          textAlign: "left",
                          paddingLeft: "6px",
                        }}
                      >
                        <Text>
                          {promptData &&
                            promptData.swot &&
                            promptData.swot.response &&
                            JSON.parse(promptData.swot.response).threats[0]}
                        </Text>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: "2px solid black",
                          padding: "6px",
                          textAlign: "left",
                          paddingLeft: "6px",
                        }}
                      >
                        <Text>
                          {promptData &&
                            promptData.swot &&
                            promptData.swot.response &&
                            JSON.parse(promptData.swot.response)
                              .opportunities[1]}
                        </Text>
                      </td>
                      <td
                        style={{
                          border: "2px solid black",
                          padding: "6px",
                          textAlign: "left",
                          paddingLeft: "6px",
                        }}
                      >
                        <Text>
                          {promptData &&
                            promptData.swot &&
                            promptData.swot.response &&
                            JSON.parse(promptData.swot.response).threats[1]}
                        </Text>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: "2px solid black",
                          padding: "6px",
                          textAlign: "left",
                          paddingLeft: "6px",
                        }}
                      >
                        <Text>
                          {promptData &&
                            promptData.swot &&
                            promptData.swot.response &&
                            JSON.parse(promptData.swot.response)
                              .opportunities[2]}
                        </Text>
                      </td>
                      <td
                        style={{
                          border: "2px solid black",
                          padding: "6px",
                          textAlign: "left",
                          paddingLeft: "6px",
                        }}
                      >
                        <Text>
                          {promptData &&
                            promptData.swot &&
                            promptData.swot.response &&
                            JSON.parse(promptData.swot.response).threats[2]}
                        </Text>
                      </td>
                    </tr>
                  </table>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="flex flex-col my-6">
           
            </div>
            {isLoading ? (
              <div className="w-full">
                 <Skeleton  width={100} />
                <PestleSkeleton />
              </div>
            ) : (
              <div className="w-full">
                  <Text
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#0B6C79",
                }}
              >
                PESTLE Analysis
              </Text>
                <div className="flex flex-col gap-3">
                  <table className="border border-1 m-auto">
                    <thead>
                      <tr className="bg-slate-300">
                        <th className="border border-1 p-2 text-blue-default font-bold text-center">  
                        </th>
                        <th className="border border-1 p-2 text-blue-default font-bold text-center">
                          Influence on organization
                        </th>
                        <th className="border border-1 p-2 text-blue-default font-bold text-center">
                          Impact of organization's activities
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pestleData && (
                        <>
                          <tr>
                            <td className="border border-1 p-2 text-center font-bold bg-slate-300">
                              Political
                            </td>
                            <td className="border border-1 p-2">
                              {pestleData.political.inf}
                            </td>
                            <td className="border border-1 p-2">
                              {pestleData.political.imp}
                            </td>
                     
                          </tr>
                          <tr>
                            <td className="border border-1 p-2 text-center font-bold bg-slate-300">
                              Economic
                            </td>
                            <td className="border border-1 p-2">
                              {pestleData.economic.inf}
                            </td>
                            <td className="border border-1 p-2">
                              {pestleData.economic.imp}
                            </td>
                     
                          </tr>
                          <tr>
                            <td className="border border-1 p-2 text-center font-bold bg-slate-300">
                              Social
                            </td>
                            <td className="border border-1 p-2">
                              {pestleData.social.inf}
                            </td>
                            <td className="border border-1 p-2">
                              {pestleData.social.imp}
                            </td>
                     
                          </tr>
                          <tr>
                            <td className="border border-1 p-2 text-center font-bold bg-slate-300">
                              Technological
                            </td>
                            <td className="border border-1 p-2">
                              {pestleData.technological.inf}
                            </td>
                            <td className="border border-1 p-2">
                              {pestleData.technological.imp}
                            </td>
                     
                          </tr>
                          <tr>
                            <td className="border border-1 p-2 text-center font-bold bg-slate-300">
                              Legal
                            </td>
                            <td className="border border-1 p-2">
                              {pestleData.legal.inf}
                            </td>
                            <td className="border border-1 p-2">
                              {pestleData.legal.imp}
                            </td>
                     
                          </tr>
                          <tr>
                            <td className="border border-1 p-2 text-center font-bold bg-slate-300">
                              Environmental
                            </td>
                            <td className="border border-1 p-2">
                              {pestleData.environmental.inf}
                            </td>
                            <td className="border border-1 p-2">
                              {pestleData.environmental.imp}
                            </td>
                     
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              )}
          </div>
          <div>
         
             
                {isLoading ? (
                  <div className="w-full">
                     <Skeleton  width={100} />
                    <LogFrameSkeleton />
                  </div>
                ) : (
                 <div className="w-full">
       <div className="flex flex-col gap-3">
            <div className="text-blue-default font-bold text-2xl py-5">
              Logframe
            </div>
            <h1>Goal : {logframeData?.goal?.description}</h1>
            <div className="overflow-x-auto">
            <table className="border border-1 m-auto">
                <thead>
                  <tr className="bg-slate-300">
                    <th className="border border-1 p-2  text-blue-default font-bold text-center" colSpan={2}>
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
        <td className="border border-1 p-2 text-center font-bold">Impact</td>
        <td className="border border-1 p-2 text-center">{logframeData.goal.impact?.description || "-"}</td>
        <td className="border border-1 p-2">
          {logframeData.goal.impact?.indicators &&
            Object.keys(logframeData.goal.impact.indicators).map((key, idx) => {
              const indicator = logframeData.goal.impact.indicators[key];
              return (
                <div key={idx}>
                  <p>{key}:</p> {indicator.indicator || "-"}, 
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
                  <p>Baseline:</p> {indicator.baseline || "-"}, 
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
                  <p>Target:</p> {indicator.target || "-"}
                </div>
              );
            })}
        </td>
        <td className="border border-1 p-2">{logframeData.goal.impact?.timeline || "-"}</td>
        <td className="border border-1 p-2">{logframeData.goal.impact?.assumptions || "-"}</td>
      </tr>

      {/* Outcome Level */}
      {logframeData.goal.impact?.outcomes?.map((outcomeItem:any, outcomeIndex:any) => (
        <React.Fragment key={`outcome-${outcomeIndex}`}>
          <tr className={outcomeIndex % 2 === 0 ? "bg-slate-100" : "-"}>
            <td className="border border-1 p-2 text-center font-bold">Outcome</td>
            <td className="border border-1 p-2 text-center">{outcomeItem.description || "-"}</td>
            <td className="border border-1 p-2">{outcomeItem.indicator || "-"}</td>
            <td className="border border-1 p-2">{outcomeItem.baseline || "-"}</td>
            <td className="border border-1 p-2">{outcomeItem.target || "-"}</td>
            <td className="border border-1 p-2">{outcomeItem.timeline || "-"}</td>
            <td className="border border-1 p-2">{outcomeItem.assumptions || "-"}</td>
          </tr>

          {/* Output Level */}
          {outcomeItem.outputs?.map((outputItem:any, outputIndex:any) => (
            <React.Fragment key={`output-${outputIndex}`}>
              <tr className={outputIndex % 2 === 0 ? "bg-slate-100" : "-"}>
                <td className="border border-1 p-2 text-center font-bold">Output</td>
                <td className="border border-1 p-2 text-center">{outputItem.description || "-"}</td>
                <td className="border border-1 p-2">{outputItem.indicator || "-"}</td>
                <td className="border border-1 p-2">{outputItem.baseline || "-"}</td>
                <td className="border border-1 p-2">{outputItem.target || "-"}</td>
                <td className="border border-1 p-2">{outputItem.timeline || "-"}</td>
                <td className="border border-1 p-2">{outputItem.assumptions || "-"}</td>
              </tr>

              {/* Activity Level */}
              {outputItem.activities?.map((activityItem:any, activityIndex:any) => (
                <React.Fragment key={`activity-${activityIndex}`}>
                  <tr className={activityIndex % 2 === 0 ? "bg-slate-100" : "-"}>
                    <td className="border border-1 p-2 text-center font-bold">Activity</td>
                    <td className="border border-1 p-2 text-center">{activityItem.description || "-"}</td>
                    <td className="border border-1 p-2">{activityItem.indicator || "-"}</td>
                    <td className="border border-1 p-2">{activityItem.baseline || "-"}</td>
                    <td className="border border-1 p-2">{activityItem.target || "-"}</td>
                    <td className="border border-1 p-2">{activityItem.timeline || "-"}</td>
                    <td className="border border-1 p-2">{activityItem.assumptions || "-"}</td>
                  </tr>

                  {/* Inputs Level */}
                  {activityItem.inputs && (
                    <tr className="bg-slate-100">
                      <td className="border border-1 p-2 text-center font-bold">Input</td>
                      <td className="border border-1 p-2 text-center">
                        {activityItem.inputs.join(", ")}
                      </td>
                      <td className="border border-1 p-2">-</td>
                      <td className="border border-1 p-2">-</td>
                      <td className="border border-1 p-2">-</td>
                      <td className="border border-1 p-2">-</td>
                      <td className="border border-1 p-2">Funding is 
secured, and all 
necessary 
resources are available</td>
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
          </div>
          <div className="flex justify-center gap-8 my-5">
            <button className="bg-blue-default text-white font-bold rounded-md py-3 px-6">
            {typeof window !== "undefined" && (
        <PDFDownloadLink document={<ExportPage projectData={projectData} promptData={promptData} pestleData={pestleData} logframeData={logframeData} isLoading={false}/>} fileName="document.pdf">
          {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
        </PDFDownloadLink>
      )}
            </button>
        
      <button onClick={regenerateData} className="bg-orange-default text-white font-bold rounded-md py-3 px-6">Regenerate</button>
          </div>
        </div>
      </Page>
    </Document>
  );


  return (
    <div>
      <MyDocument />
    </div>
  );
}


export default Final;


