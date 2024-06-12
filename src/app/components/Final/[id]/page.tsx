"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
import Loader from "@/app/shared/loader/page";
import { useParams } from "next/navigation";
// import SwotSkeleton from "../../skeletons/SwotSkeleton";
// import LogFrameSkeleton from "../../skeletons/LogFrameSkeleton";
// import PestleSkeleton from "../../skeletons/PestleSkeleton";
import Skeleton from "react-loading-skeleton";

function Final() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [promptData, setPromptData] = useState<any>();
  const [projectData, setProjectData] = useState<any>();
  const [pestleData, setPestleData] = useState<any>();
  const [logframeData, setLogframeData] = useState<any>();
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const token = getCookie("token");
      setIsLoading(true);

      // Fetch prompt data
      const promptResponse = await axios.get(
        `http://157.245.121.185:5000/projects/prompts/latest/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(token ?? "").access_token}`,
          },
        }
      );
      setPromptData(promptResponse.data);

      // Fetch project data
      const projectResponse = await axios.get(
        `http://157.245.121.185:5000/projects/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(token ?? "").access_token}`,
          },
        }
      );
      setProjectData(projectResponse.data);

      // Fetch pestle and logframe data
      const dataResponse = await axios.post(
        `http://157.245.121.185:5000/projects/projects/generate-analysis/${id}`,
        { projectId: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(token ?? "").access_token}`,
          },
        }
      );
      setPestleData(JSON.parse(dataResponse.data.pestle.response));
      setLogframeData(JSON.parse(dataResponse.data.logframe.response));

      setIsLoading(false);
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const regenerateData = () => {
    fetchData();
  };

  const renderList = (data: string) => {
    return data
      .split(/\d+\.\s*/)
      .filter((item) => item.trim() !== "")
      .map((item, index) => (
        <li key={index}>
          {index + 1}. {item.trim()}
        </li>
      ));
  };


  const MyDocument = () => (
    <Document pageMode="fullScreen">
      <Page size="A4" style={{ margin: "auto" }}>
        <div className="">
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
                <h3 className="text-blue-default font-bold text-xl">
                  {" "}
                  <Text> Project Overview </Text>
                </h3>
                {isLoading ? (
                  <div className="w-full">
                    {" "}
                    <Skeleton width="full" height={30} />
                  </div>
                ) : (
                  <p className="">
                    <Text> {projectData && projectData.description}</Text>
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-3">
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
                {isLoading ? (
                  <div className="w-full">
                    {" "}
                    <Skeleton width="full" height={30} />
                  </div>
                ) : (
                  <p>
                    <Text>
                      {promptData &&
                        promptData.vision &&
                        promptData.mission.response}
                    </Text>
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-3">
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
                {isLoading ? (
                  <div className="w-full">
                    {" "}
                    <Skeleton width="full" height={30} />
                  </div>
                ) : (
                  <p>
                    <Text>
                      {promptData &&
                        promptData.mission &&
                        promptData.vision.response}
                    </Text>
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-3">
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
                {isLoading ? (
                  <div className="w-full">
                    {" "}
                    <Skeleton width="full" height={80} />
                  </div>
                ) : (
                  <div>
                    {promptData && promptData.objectives && (
                      <ul>{renderList(promptData.objectives.response)}</ul>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3">
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
                {isLoading ? (
                  <div className="w-full">
                    {" "}
                    <Skeleton width="full" height={80} />
                  </div>
                ) : (
                  <div>
                    {promptData && promptData.values && (
                      <ul>{renderList(promptData.values.response)}</ul>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3">
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
                {isLoading ? (
                  <div className="w-full">
                    {" "}
                    <Skeleton width="full" height={80} />
                  </div>
                ) : (
                  <div>
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
                  <Skeleton width={100} height={30} />
                  {/* <SwotSkeleton /> */}
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
              <Text
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#0B6C79",
                }}
              >
                PESTLE Analysis
              </Text>
            </div>
            {isLoading ? (
              <div className="w-full">
                {/* <PestleSkeleton /> */}
              </div>
            ) : (
              <div className="w-full">
                <div className="flex flex-col gap-3">
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
            <div className="flex flex-col my-6">
              <Text
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#0B6C79",
                }}
              >
                Logframe
              </Text>
            </div>
            <div className="overflow-x-auto">
              <table className="border border-1 w-full overflow-x-auto m-auto">
                {isLoading ? (
                  <div className="w-full">
                    {/* <LogFrameSkeleton /> */}
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="flex flex-col gap-3">
                      <table className="border border-1 m-auto">
                        <thead>
                          <tr className="bg-slate-300">
                            <th className="border border-1 p-2 text-blue-default font-bold text-center">
                              Results Chain
                            </th>
                            <th className="border border-1 p-2 text-blue-default font-bold text-center">
                              Project Summary
                            </th>
                            <th className="border border-1 p-2 text-blue-default font-bold text-center">
                              Indicators
                            </th>
                            <th className="border border-1 p-2 text-blue-default font-bold text-center">
                              Means of Verification
                            </th>
                            <th className="border border-1 p-2 text-blue-default font-bold text-center">
                              Assumptions/Risks
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {logframeData && (
                            <>
                              <tr>
                                <td className="border border-1 p-2 text-center font-bold bg-slate-300">
                                  Goal
                                </td>
                                <td className="border border-1 p-2">
                                  {logframeData.goal.description}
                                </td>
                                <td className="border border-1 p-2">
                                  {logframeData.goal.indicators.join(", ")}
                                </td>
                                <td className="border border-1 p-2">
                                  {logframeData.goal.mov.join(", ")}
                                </td>
                                <td className="border border-1 p-2">
                                  {logframeData.goal.assump.join(", ")}
                                </td>
                              </tr>
                              <tr>
                                <td className="border border-1 p-2 text-center font-bold bg-slate-300">
                                  Outcome
                                </td>
                                <td className="border border-1 p-2">
                                  {logframeData.outcome.description}
                                </td>
                                <td className="border border-1 p-2">
                                  {logframeData.outcome.indicators.join(", ")}
                                </td>
                                <td className="border border-1 p-2">
                                  {logframeData.outcome.mov.join(", ")}
                                </td>
                                <td className="border border-1 p-2">
                                  {logframeData.outcome.assump.join(", ")}
                                </td>
                              </tr>
                              {logframeData.outputs.map(
                                (output: any, index: any) => (
                                  <tr
                                    key={index}
                                    className={
                                      index % 2 === 0 ? "bg-slate-100" : ""
                                    }
                                  >
                                    <td className="border border-1 p-2 text-center font-bold">
                                      Output {index + 1}
                                    </td>
                                    <td className="border border-1 p-2">
                                      {output.description}
                                    </td>
                                    <td className="border border-1 p-2">
                                      {output.indicators.join(", ")}
                                    </td>
                                    <td className="border border-1 p-2">
                                      {output.mov.join(", ")}
                                    </td>
                                    <td className="border border-1 p-2">
                                      {output.assump.join(", ")}
                                    </td>
                                  </tr>
                                )
                              )}
                              {logframeData.activities.map(
                                (activity: any, index: any) => (
                                  <tr
                                    key={index}
                                    className={
                                      index % 2 === 0 ? "bg-slate-100" : ""
                                    }
                                  >
                                    <td className="border border-1 p-2 text-center font-bold">
                                      Activity {index + 1}
                                    </td>
                                    <td className="border border-1 p-2">
                                      {activity.description}
                                    </td>
                                    <td className="border border-1 p-2">
                                      {activity.indicators.join(", ")}
                                    </td>
                                    <td className="border border-1 p-2">
                                      {activity.mov.join(", ")}
                                    </td>
                                    <td className="border border-1 p-2">
                                      {activity.assump.join(", ")}
                                    </td>
                                  </tr>
                                )
                              )}
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </table>
            </div>
          </div>
        </div>
      </Page>
    </Document>
  );

  return (
    <div className="border border-blue-default my-4 rounded-md mx-2 p-4 font-medium">
      <MyDocument />
      <div className="flex justify-center gap-4 my-5">
        {typeof window !== "undefined" && (
          <PDFDownloadLink
            document={<MyDocument />}
            fileName="document.pdf"
            className="bg-green-500 text-white font-bold rounded-md m-auto py-3 px-6"
          >
            {({ loading }) =>
              loading ? "Loading document..." : "Download PDF"
            }
          </PDFDownloadLink>
        )}
        <button
          className="bg-orange-default text-white font-bold rounded-md m-auto py-3 px-6"
          onClick={regenerateData}
        >
          Regenerate
        </button>
      </div>
    </div>
  );
}

export default Final;
