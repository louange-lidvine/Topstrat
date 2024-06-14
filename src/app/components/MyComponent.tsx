
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import {
    PDFDownloadLink,
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";
import Loader from "@/app/shared/loader/page";
import { useParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
interface LogframeItem {
    description: string;
    indicators: string[];
    mov: string[];
    assump: string[];
}

interface LogframeData {
    goal: LogframeItem;
    outcome: LogframeItem;
    outputs: LogframeItem[];
    activities: LogframeItem[];
}


function Final() {
    const { id } = useParams();
    // const [isLoading, setIsLoading] = useState(false);
    const [promptData, setPromptData] = useState<any>();
    const [projectData, setProjectData] = useState<any>();
    const [pestleData, setPestleData] = useState<any>();
    // const [logframeData, setLogframeData] = useState<any>();
    const [error, setError] = useState<string | null>(null);
    const [logframeData, setLogframeData] = React.useState<LogframeData | null>(
        null
    );
    const [isLoading, setIsLoading] = React.useState(true);

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
                        Authorization: `Bearer ${
                            JSON.parse(token ?? "").access_token
                        }`,
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
                        Authorization: `Bearer ${
                            JSON.parse(token ?? "").access_token
                        }`,
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

    // Styles for the PDF document
    const styles = StyleSheet.create({
        page: {
            padding: 30,
            fontSize: 12,
            fontFamily: "Helvetica",
        },
        section: {
            margin: 10,
            padding: 10,
            border: "1px solid #E4E4E4",
            borderRadius: 4,
        },
        title: {
            fontSize: 18,
            marginBottom: 10,
            color: "#0B6C79",
            textAlign: "center",
            fontWeight: "bold",
        },
        subtitle: {
            fontSize: 16,
            marginBottom: 6,
            color: "#0B6C79",
            fontWeight: "bold",
        },
        text: {
            fontSize: 12,
            marginBottom: 6,
        },
        listItem: {
            marginBottom: 4,
        },
    });

    // PDF document component
    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>{projectData?.name}</Text>
                    <Text style={styles.subtitle}>Project Overview</Text>
                    <Text style={styles.text}>{projectData?.description}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Vision</Text>
                    <Text style={styles.text}>
                        {promptData?.vision?.response}
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Mission</Text>
                    <Text style={styles.text}>
                        {promptData?.mission?.response}
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Objectives</Text>
                    {promptData?.objectives && (
                        <View>
                            {renderList(promptData.objectives.response).map(
                                (item, index) => (
                                    <Text key={index} style={styles.listItem}>
                                        {item}
                                    </Text>
                                )
                            )}
                        </View>
                    )}
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Values</Text>
                    {promptData?.values && (
                        <View>
                            {renderList(promptData.values.response).map(
                                (item, index) => (
                                    <Text key={index} style={styles.listItem}>
                                        {item}
                                    </Text>
                                )
                            )}
                        </View>
                    )}
                </View>

                <Text
                    style={{
                        fontSize: 24,
                        textAlign: "center",
                        color: "#0B6C79",
                        marginBottom: 20,
                    }}
                >
                    {projectData && projectData.name}
                </Text>
                <Text
                    style={{
                        fontSize: 20,
                        textAlign: "center",
                        color: "#FFA500",
                        fontWeight: "bold",
                        marginBottom: 10,
                    }}
                >
                    Preview
                </Text>
                <Text
                    style={{
                        fontSize: 20,
                        textAlign: "center",
                        color: "#0B6C79",
                        fontWeight: "bold",
                        marginBottom: 20,
                    }}
                >
                    Strategic Plan {projectData && projectData.name}
                </Text>

                <Text
                    style={{
                        fontSize: 18,
                        color: "#0B6C79",
                        fontWeight: "bold",
                        marginBottom: 10,
                    }}
                >
                    Project Overview
                </Text>
                <Text style={{ fontSize: 14, marginBottom: 20 }}>
                    {projectData && projectData.description}
                </Text>

                <Text
                    style={{
                        fontSize: 18,
                        color: "#0B6C79",
                        fontWeight: "bold",
                        marginBottom: 10,
                    }}
                >
                    Vision
                </Text>
                <Text style={{ fontSize: 14, marginBottom: 20 }}>
                    {promptData &&
                        promptData.vision &&
                        promptData.vision.response}
                </Text>

                <Text
                    style={{
                        fontSize: 18,
                        color: "#0B6C79",
                        fontWeight: "bold",
                        marginBottom: 10,
                    }}
                >
                    Mission
                </Text>
                <Text style={{ fontSize: 14, marginBottom: 20 }}>
                    {promptData &&
                        promptData.mission &&
                        promptData.mission.response}
                </Text>

                <Text
                    style={{
                        fontSize: 18,
                        color: "#0B6C79",
                        fontWeight: "bold",
                        marginBottom: 10,
                    }}
                >
                    Objectives
                </Text>
                <Text style={{ fontSize: 14, marginBottom: 20 }}>
                    {promptData && promptData.objectives && (
                        <ul>{renderList(promptData.objectives.response)}</ul>
                    )}
                </Text>

                <Text
                    style={{
                        fontSize: 18,
                        color: "#0B6C79",
                        fontWeight: "bold",
                        marginBottom: 10,
                    }}
                >
                    Values
                </Text>
                <Text style={{ fontSize: 14, marginBottom: 20 }}>
                    {promptData && promptData.values && (
                        <ul>{renderList(promptData.values.response)}</ul>
                    )}
                </Text>

                <Text
                    style={{
                        fontSize: 18,
                        color: "#0B6C79",
                        fontWeight: "bold",
                        marginBottom: 10,
                    }}
                >
                    Strategy
                </Text>
                <Text style={{ fontSize: 14, marginBottom: 20 }}>
                    {promptData && promptData.strategy && (
                        <ul>{renderList(promptData.strategy.response)}</ul>
                    )}
                </Text>

                <Text
                    style={{
                        fontSize: 20,
                        color: "#0B6C79",
                        fontWeight: "bold",
                        marginBottom: 10,
                        textAlign: "center",
                    }}
                >
                    SWOT Analysis
                </Text>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginBottom: 20,
                    }}
                >
                    <thead>
                        <tr style={{ backgroundColor: "#D3D3D3" }}>
                            <th
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                Strengths (S)
                            </th>
                            <th
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                Weaknesses (W)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                {promptData &&
                                    promptData.swot &&
                                    promptData.swot.response &&
                                    JSON.parse(promptData.swot.response)
                                        .strengths[0]}
                            </td>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                {promptData &&
                                    promptData.swot &&
                                    promptData.swot.response &&
                                    JSON.parse(promptData.swot.response)
                                        .weaknesses[0]}
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                {promptData &&
                                    promptData.swot &&
                                    promptData.swot.response &&
                                    JSON.parse(promptData.swot.response)
                                        .strengths[1]}
                            </td>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                {promptData &&
                                    promptData.swot &&
                                    promptData.swot.response &&
                                    JSON.parse(promptData.swot.response)
                                        .weaknesses[1]}
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                {promptData &&
                                    promptData.swot &&
                                    promptData.swot.response &&
                                    JSON.parse(promptData.swot.response)
                                        .strengths[2]}
                            </td>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                {promptData &&
                                    promptData.swot &&
                                    promptData.swot.response &&
                                    JSON.parse(promptData.swot.response)
                                        .weaknesses[2]}
                            </td>
                        </tr>
                        <tr style={{ backgroundColor: "#D3D3D3" }}>
                            <th
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                Opportunities (O)
                            </th>
                            <th
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                Threats (T)
                            </th>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                {promptData &&
                                    promptData.swot &&
                                    promptData.swot.response &&
                                    JSON.parse(promptData.swot.response)
                                        .opportunities[0]}
                            </td>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                {promptData &&
                                    promptData.swot &&
                                    promptData.swot.response &&
                                    JSON.parse(promptData.swot.response)
                                        .threats[0]}
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                {promptData &&
                                    promptData.swot &&
                                    promptData.swot.response &&
                                    JSON.parse(promptData.swot.response)
                                        .opportunities[1]}
                            </td>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                {promptData &&
                                    promptData.swot &&
                                    promptData.swot.response &&
                                    JSON.parse(promptData.swot.response)
                                        .threats[1]}
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                {promptData &&
                                    promptData.swot &&
                                    promptData.swot.response &&
                                    JSON.parse(promptData.swot.response)
                                        .opportunities[2]}
                            </td>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                {promptData &&
                                    promptData.swot &&
                                    promptData.swot.response &&
                                    JSON.parse(promptData.swot.response)
                                        .threats[2]}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <Text
                    style={{
                        fontSize: 20,
                        color: "#0B6C79",
                        fontWeight: "bold",
                        marginBottom: 10,
                        textAlign: "center",
                    }}
                >
                    PESTLE Analysis
                </Text>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#D3D3D3" }}>
                            <th
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                    textAlign: "center",
                                }}
                            >
                                Category
                            </th>
                            <th
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                    textAlign: "center",
                                }}
                            >
                                Influence
                            </th>
                            <th
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                    textAlign: "center",
                                }}
                            >
                                Impact
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pestleData && (
                            <>
                                <tr>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                            backgroundColor: "#D3D3D3",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Political
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {pestleData.political.inf}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {pestleData.political.imp}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                            backgroundColor: "#D3D3D3",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Economic
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {pestleData.economic.inf}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {pestleData.economic.imp}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                            backgroundColor: "#D3D3D3",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Social
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {pestleData.social.inf}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {pestleData.social.imp}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                            backgroundColor: "#D3D3D3",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Technological
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {pestleData.technological.inf}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {pestleData.technological.imp}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                            backgroundColor: "#D3D3D3",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Legal
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {pestleData.legal.inf}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {pestleData.legal.imp}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                            backgroundColor: "#D3D3D3",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Environmental
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {pestleData.environmental.inf}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {pestleData.environmental.imp}
                                    </td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>

                <Text
                    style={{
                        fontSize: 24,
                        textAlign: "center",
                        color: "#0B6C79",
                        marginBottom: 20,
                    }}
                >
                    {projectData && projectData.name}
                </Text>
                <Text
                    style={{
                        fontSize: 20,
                        textAlign: "center",
                        color: "#FFA500",
                        fontWeight: "bold",
                        marginBottom: 10,
                    }}
                >
                    Preview
                </Text>
                <Text
                    style={{
                        fontSize: 20,
                        textAlign: "center",
                        color: "#0B6C79",
                        fontWeight: "bold",
                        marginBottom: 20,
                    }}
                >
                    Strategic Plan {projectData && projectData.name}
                </Text>

                <Text
                    style={{
                        fontSize: 18,
                        color: "#0B6C79",
                        fontWeight: "bold",
                        marginBottom: 10,
                    }}
                >
                    Project Overview
                </Text>
                <Text style={{ fontSize: 14, marginBottom: 20 }}>
                    {projectData && projectData.description}
                </Text>

                <Text
                    style={{
                        fontSize: 18,
                        color: "#0B6C79",
                        fontWeight: "bold",
                        marginBottom: 10,
                    }}
                >
                    Vision
                </Text>
                <Text style={{ fontSize: 14, marginBottom: 20 }}>
                    {promptData &&
                        promptData.vision &&
                        promptData.vision.response}
                </Text>

                <Text
                    style={{
                        fontSize: 18,
                        color: "#0B6C79",
                        fontWeight: "bold",
                        marginBottom: 10,
                    }}
                >
                    Mission
                </Text>
                <Text style={{ fontSize: 14, marginBottom: 20 }}>
                    {promptData &&
                        promptData.mission &&
                        promptData.mission.response}
                </Text>

                <Text
                    style={{
                        fontSize: 18,
                        color: "#0B6C79",
                        fontWeight: "bold",
                        marginBottom: 10,
                    }}
                >
                    Objectives
                </Text>
                <Text style={{ fontSize: 14, marginBottom: 20 }}>
                    {promptData && promptData.objectives && (
                        <ul>{renderList(promptData.objectives.response)}</ul>
                    )}
                </Text>

                <Text
                    style={{
                        fontSize: 18,
                        color: "#0B6C79",
                        fontWeight: "bold",
                        marginBottom: 10,
                    }}
                >
                    Values
                </Text>
                <Text style={{ fontSize: 14, marginBottom: 20 }}>
                    {promptData && promptData.values && (
                        <ul>{renderList(promptData.values.response)}</ul>
                    )}
                </Text>

                <Text
                    style={{
                        fontSize: 18,
                        color: "#0B6C79",
                        fontWeight: "bold",
                        marginBottom: 10,
                    }}
                >
                    Strategy
                </Text>
                <Text style={{ fontSize: 14, marginBottom: 20 }}>
                    {promptData && promptData.strategy && (
                        <ul>{renderList(promptData.strategy.response)}</ul>
                    )}
                </Text>

                <Text
                    style={{
                        fontSize: 20,
                        color: "#0B6C79",
                        fontWeight: "bold",
                        marginBottom: 10,
                        textAlign: "center",
                    }}
                >
                    SWOT Analysis
                </Text>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginBottom: 20,
                    }}
                >
                    <thead>
                        <tr style={{ backgroundColor: "#D3D3D3" }}>
                            <th
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                Strengths (S)
                            </th>
                            <th
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                Weaknesses (W)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                {promptData &&
                                    promptData.swot &&
                                    promptData.swot.response &&
                                    JSON.parse(promptData.swot.response)
                                        .strengths[0]}
                            </td>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                {promptData &&
                                    promptData.swot &&
                                    promptData.swot.response &&
                                    JSON.parse(promptData.swot.response)
                                        .weaknesses[0]}
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                {promptData &&
                                    promptData.swot &&
                                    promptData.swot.response &&
                                    JSON.parse(promptData.swot.response)
                                        .strengths[1]}
                            </td>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                {promptData &&
                                    promptData.swot &&
                                    promptData.swot.response &&
                                    JSON.parse(promptData.swot.response)
                                        .weaknesses[1]}
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                {promptData &&
                                    promptData.swot &&
                                    promptData.swot.response &&
                                    JSON.parse(promptData.swot.response)
                                        .strengths[2]}
                            </td>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                {promptData &&
                                    promptData.swot &&
                                    promptData.swot.response &&
                                    JSON.parse(promptData.swot.response)
                                        .weaknesses[2]}
                            </td>
                        </tr>
                        <tr style={{ backgroundColor: "#D3D3D3" }}>
                            <th
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                Opportunities (O)
                            </th>
                            <th
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                Threats (T)
                            </th>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                {promptData &&
                                    promptData.swot &&
                                    promptData.swot.response &&
                                    JSON.parse(promptData.swot.response)
                                        .opportunities[0]}
                            </td>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                {promptData &&
                                    promptData.swot &&
                                    promptData.swot.response &&
                                    JSON.parse(promptData.swot.response)
                                        .threats[0]}
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                {promptData &&
                                    promptData.swot &&
                                    promptData.swot.response &&
                                    JSON.parse(promptData.swot.response)
                                        .opportunities[1]}
                            </td>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                {promptData &&
                                    promptData.swot &&
                                    promptData.swot.response &&
                                    JSON.parse(promptData.swot.response)
                                        .threats[1]}
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                {promptData &&
                                    promptData.swot &&
                                    promptData.swot.response &&
                                    JSON.parse(promptData.swot.response)
                                        .opportunities[2]}
                            </td>
                            <td
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                }}
                            >
                                {promptData &&
                                    promptData.swot &&
                                    promptData.swot.response &&
                                    JSON.parse(promptData.swot.response)
                                        .threats[2]}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <Text
                    style={{
                        fontSize: 20,
                        color: "#0B6C79",
                        fontWeight: "bold",
                        marginBottom: 10,
                        textAlign: "center",
                    }}
                >
                    PESTLE Analysis
                </Text>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginBottom: 20,
                    }}
                >
                    <thead>
                        <tr style={{ backgroundColor: "#D3D3D3" }}>
                            <th
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                    textAlign: "center",
                                }}
                            >
                                Category
                            </th>
                            <th
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                    textAlign: "center",
                                }}
                            >
                                Influence
                            </th>
                            <th
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                    textAlign: "center",
                                }}
                            >
                                Impact
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pestleData && (
                            <>
                                <tr>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                            backgroundColor: "#D3D3D3",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Political
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {pestleData.political.inf}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {pestleData.political.imp}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                            backgroundColor: "#D3D3D3",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Economic
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {pestleData.economic.inf}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {pestleData.economic.imp}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                            backgroundColor: "#D3D3D3",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Social
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {pestleData.social.inf}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {pestleData.social.imp}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                            backgroundColor: "#D3D3D3",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Technological
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {pestleData.technological.inf}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {pestleData.technological.imp}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                            backgroundColor: "#D3D3D3",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Legal
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {pestleData.legal.inf}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {pestleData.legal.imp}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                            backgroundColor: "#D3D3D3",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Environmental
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {pestleData.environmental.inf}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {pestleData.environmental.imp}
                                    </td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>

                <Text
                    style={{
                        fontSize: 20,
                        color: "#0B6C79",
                        fontWeight: "bold",
                        marginBottom: 10,
                        textAlign: "center",
                    }}
                >
                    Logframe
                </Text>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginBottom: 20,
                    }}
                >
                    <thead>
                        <tr style={{ backgroundColor: "#D3D3D3" }}>
                            <th
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                    textAlign: "center",
                                }}
                            >
                                Results Chain
                            </th>
                            <th
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                    textAlign: "center",
                                }}
                            >
                                Project Summary
                            </th>
                            <th
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                    textAlign: "center",
                                }}
                            >
                                Indicators
                            </th>
                            <th
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                    textAlign: "center",
                                }}
                            >
                                Means of Verification
                            </th>
                            <th
                                style={{
                                    border: "1px solid #000",
                                    padding: "6px",
                                    textAlign: "center",
                                }}
                            >
                                Assumptions/Risks
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {logframeData && (
                            <>
                                <tr>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                            backgroundColor: "#D3D3D3",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Goal
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {logframeData.goal.description}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {logframeData.goal.indicators.join(
                                            ", "
                                        )}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {logframeData.goal.mov.join(", ")}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {logframeData.goal.assump.join(", ")}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                            backgroundColor: "#D3D3D3",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Outcome
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {logframeData.outcome.description}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {logframeData.outcome.indicators.join(
                                            ", "
                                        )}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {logframeData.outcome.mov.join(", ")}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #000",
                                            padding: "6px",
                                        }}
                                    >
                                        {logframeData.outcome.assump.join(", ")}
                                    </td>
                                </tr>
                                {logframeData.outputs.map((output, index) => (
                                    <tr
                                        key={index}
                                        style={{
                                            backgroundColor:
                                                index % 2 === 0
                                                    ? "#F9F9F9"
                                                    : "#FFFFFF",
                                        }}
                                    >
                                        <td
                                            style={{
                                                border: "1px solid #000",
                                                padding: "6px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Output {index + 1}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #000",
                                                padding: "6px",
                                            }}
                                        >
                                            {output.description}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #000",
                                                padding: "6px",
                                            }}
                                        >
                                            {output.indicators.join(", ")}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #000",
                                                padding: "6px",
                                            }}
                                        >
                                            {output.mov.join(", ")}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #000",
                                                padding: "6px",
                                            }}
                                        >
                                            {output.assump.join(", ")}
                                        </td>
                                    </tr>
                                ))}
                                {logframeData.activities.map(
                                    (activity, index) => (
                                        <tr
                                            key={index}
                                            style={{
                                                backgroundColor:
                                                    index % 2 === 0
                                                        ? "#F9F9F9"
                                                        : "#FFFFFF",
                                            }}
                                        >
                                            <td
                                                style={{
                                                    border: "1px solid #000",
                                                    padding: "6px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Activity {index + 1}
                                            </td>
                                            <td
                                                style={{
                                                    border: "1px solid #000",
                                                    padding: "6px",
                                                }}
                                            >
                                                {activity.description}
                                            </td>
                                            <td
                                                style={{
                                                    border: "1px solid #000",
                                                    padding: "6px",
                                                }}
                                            >
                                                {activity.indicators.join(", ")}
                                            </td>
                                            <td
                                                style={{
                                                    border: "1px solid #000",
                                                    padding: "6px",
                                                }}
                                            >
                                                {activity.mov.join(", ")}
                                            </td>
                                            <td
                                                style={{
                                                    border: "1px solid #000",
                                                    padding: "6px",
                                                }}
                                            >
                                                {activity.assump.join(", ")}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </>
                        )}
                    </tbody>
                </table>
            </Page>
        </Document>
    );

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <div>{error}</div>
            ) : (
                <PDFDownloadLink
                    document={<MyDocument />}
                    fileName="strategic_plan.pdf"
                >
                    {({ loading }) =>
                        loading ? "Loading document..." : "Download PDF"
                    }
                </PDFDownloadLink>
            )}
        </div>
    );
}

export default Final;
