
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import {
    PDFDownloadLink,
    Document,
    Page,
    Text,
    PDFViewer 
} from "@react-pdf/renderer";
import Loader from "@/app/shared/loader/page";
import { useParams } from "next/navigation";

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
                `https://topstrat-backend.onrender.com/projects/prompts/latest/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${
                            JSON.parse(token ?? "").access_token
                        }`,
                    },
                }
            );
            setPromptData(promptResponse.data);

            // Fetch project data
            const projectResponse = await axios.get(
                `https://topstrat-backend.onrender.com/projects/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${
                            JSON.parse(token ?? "").access_token
                        }`,
                    },
                }
            );
            setProjectData(projectResponse.data);

            // Fetch pestle and logframe data
            const dataResponse = await axios.post(
                `https://topstrat-backend.onrender.com/projects/projects/generate-analysis/${id}`,
                { projectId: id },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${
                            JSON.parse(token ?? "").access_token
                        }`,
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

    // PDF document component
    const MyDocument = () => (
        <Document pageMode="fullScreen">

            <Page size="A4" style={{padding:"20px",margin:"auto"}}>
                <div className="border border-blue-default my-4 rounded-md mx-2 p-4 font-medium">
                    <div className="flex flex-col  justify-center items-center gap-4 text-2xl ">
                        <div className="text-gray-400   flex items-center justify-center border-2  p-3 rounded-md py-2  px-6">
                            {" "}
                            <Text>{projectData && projectData.name}</Text>
                        </div>
                        <div className="text-yellow-500 font-bold ">
                            <Text>Preview</Text>
                        </div>
                        <div className="text-blue-default font-bold  ">
                            <Text>
                                Strategic Plan {projectData && projectData.name}
                            </Text>{" "}
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
                                        <Loader />
                                    </div>
                                ) : (
                                    <p className="">
                                        <Text>
                                            {" "}
                                            {projectData &&
                                                projectData.description}
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
                                        {" "}
                                        Vision
                                    </Text>
                                </h3>
                                {isLoading ? (
                                    <div className="w-full">
                                        {" "}
                                        <Loader />
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
                                        <Loader />
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
                                        <Loader />
                                    </div>
                                ) : (
                                    <p>
                                        <Text>
                                            {promptData &&
                                                promptData.objectives &&
                                                promptData.objectives.response}
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
                                        Values
                                    </Text>
                                </h3>
                                {isLoading ? (
                                    <div className="w-full">
                                        {" "}
                                        <Loader />
                                    </div>
                                ) : (
                                    <p>
                                        <Text>
                                            {promptData &&
                                                promptData.values &&
                                                promptData.values.response}
                                        </Text>
                                    </p>
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
                                        <Loader />
                                    </div>
                                ) : (
                                    <p>
                                        <Text>
                                            {promptData &&
                                                promptData.strategy &&
                                                promptData.strategy.response}
                                        </Text>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 mt-5 ">
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
                        <div className="w-[100%] flex justify-center items-center">
                            {isLoading ? (
                                <div className="w-full">
                                    <Loader />
                                </div>
                            ) : (
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
                                                JSON.parse(
                                                    promptData.swot.response
                                                ).strengths[0]}
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
                                                JSON.parse(
                                                    promptData.swot.response
                                                ).weaknesses[0]}
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
                                                JSON.parse(
                                                    promptData.swot.response
                                                ).strengths[1]}
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
                                                JSON.parse(
                                                    promptData.swot.response
                                                ).weaknesses[1]}   
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
                                                JSON.parse(
                                                    promptData.swot.response
                                                ).strengths[2]}
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
                                                JSON.parse(
                                                    promptData.swot.response
                                                ).weaknesses[2]}   
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
                                        <Text>  Threats (T)</Text>  
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
                                                JSON.parse(
                                                    promptData.swot.response
                                                ).opportunities[0]}  
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
                                                JSON.parse(
                                                    promptData.swot.response
                                                ).threats[0]}
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
                                                JSON.parse(
                                                    promptData.swot.response
                                                ).opportunities[1]}
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
                                                JSON.parse(
                                                    promptData.swot.response
                                                ).threats[1]} 
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
                                                JSON.parse(
                                                    promptData.swot.response
                                                ).opportunities[2]}
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
                                                JSON.parse(
                                                    promptData.swot.response
                                                ).threats[2]}
                                            </Text>
                                            
                                        </td>
                                    </tr>
                                </table>
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
                            {isLoading ? (
                                <div className="w-full">
                                    <Loader />
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 border border-1 w-full overflow-x-auto m-auto h-full">
                                    {Object.keys(pestleData || {}).map(
                                        (category, index) => (
                                            <React.Fragment key={index}>
                                                <div
                                                    className={`col-span-1 border border-1 ${
                                                        index % 2 === 0
                                                            ? "bg-slate-300"
                                                            : ""
                                                    }`}
                                                >
                                                    <div className="p-4 text-blue-default font-bold text-1xl text-start text-xl">
                                                        <Text>
                                                            {category
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                category.slice(
                                                                    1
                                                                )}{" "}
                                                            (
                                                            {category
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                            )
                                                        </Text>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`col-span-1 ${
                                                        index % 2 === 0
                                                            ? "bg-slate-300"
                                                            : ""
                                                    }`}
                                                >
                                                    <div className="p-4">
                                                        <ul className=" md:h-[50vw]  lg:h-[15vw] ">
                                                            {(
                                                                pestleData[
                                                                    category
                                                                ] || []
                                                            ).map(
                                                                (
                                                                    item: any,
                                                                    i: any
                                                                ) => (
                                                                    <li key={i}>
                                                                        <Text>
                                                                            {
                                                                                item
                                                                            }
                                                                        </Text>
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col  my-6">
                            <Text
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    color: "#0B6C79",
                                }}
                            >
                                Logframe
                            </Text>
                            <table className="border border-1 w-full overflow-x-auto m-auto">
                                {isLoading ? (
                                    <div className="w-full">{/* Loader */}</div>
                                ) : (
                                    <tbody>
                                        {logframeData &&
                                            Object.entries(logframeData).map(
                                                ([category, items], index) =>
                                                    Array.isArray(items) &&
                                                    items.length > 0 && (
                                                        <tr
                                                            key={index}
                                                            className={
                                                                index % 2 === 0
                                                                    ? "bg-slate-300"
                                                                    : ""
                                                            }
                                                        >
                                                            <td className="border border-1 p-4 text-blue-default font-bold text-1xl text-center text-xl">
                                                                <Text>
                                                                    {category
                                                                        .charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase() +
                                                                        category.slice(
                                                                            1
                                                                        )}{" "}
                                                                    (
                                                                    {category
                                                                        .charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase()}
                                                                    )
                                                                </Text>
                                                            </td>
                                                            <td className="border border-1 p-4">
                                                                <ul className="md:h-[50vw]  lg:h-[15vw]">
                                                                    {items.map(
                                                                        (
                                                                            item,
                                                                            i
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    i
                                                                                }
                                                                            >
                                                                                <Text>
                                                                                    {
                                                                                        item
                                                                                    }
                                                                                </Text>
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    )
                                            )}
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </Page>
        </Document>
    );

    return (
      <div>
        <MyDocument />

        {typeof window !== "undefined" && (
          <PDFDownloadLink document={<MyDocument />} fileName="document.pdf">
            {({ loading }) =>
              loading ? "Loading document..." : "Download PDF"
            }
          </PDFDownloadLink>
        )}
        <button onClick={regenerateData}>Regenerate</button>
      </div>
    );
}

export default Final;
