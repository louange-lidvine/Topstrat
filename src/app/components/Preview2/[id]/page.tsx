"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import axios from "axios";
import Loader from "../../../shared/loader/page";

function Preview() {
    const router = useRouter();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [projectData, setProjectData] = useState<any>();
    const [pestleData, setPestleData] = useState<any>(null);

    useEffect(() => {
        const getProject = async (id: string) => {
            try {
                const token = getCookie("token");
                const response = await axios.get(
                    `http://157.245.121.185:5000/projects/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${JSON.parse(token ?? "").access_token}`,
                        },
                    }
                );
                setProjectData(response.data);
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };
        getProject(id as string);
        setLoading(false);
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            const token = getCookie("token");
            setLoading(true);
            try {
                const response = await axios.post(
                    `http://157.245.121.185:5000/projects/projects/generate-analysis/${id}`,
                    { projectId: id },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${JSON.parse(token ?? "").access_token}`,
                        },
                    }
                );
                setPestleData(JSON.parse(response.data.pestle.response));
            } catch (error) {
                console.log(error);
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
                `http://157.245.121.185:5000/projects/projects/generate-analysis/${id}`,
                { projectId: id },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${JSON.parse(token ?? "").access_token}`,
                    },
                }
            );
            setPestleData(JSON.parse(response.data.pestle.response));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border border-blue-default my-4 rounded-md mx-2 p-4 font-medium flex flex-col gap-8 ">
            {loading ? (
                <Loader />
            ) : (
                <div className="w-full">
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
            <div className="flex justify-center mx-auto gap-5">
                <button
                    className="bg-[#ED0C0C] text-white font-bold rounded-md m-auto py-3 px-6"
                    onClick={() => router.push(`../../components/Preview/${id}`)}
                >
                    Back
                </button>
                <button
                    className="bg-orange-default text-white font-bold rounded-md m-auto py-3 px-6"
                    onClick={refetchData}
                >
                    Regenerate
                </button>
                <button
                    className="bg-blue-default text-white m-auto font-bold rounded-md py-3 px-6 cursor-pointer"
                    onClick={() => router.push(`/components/Preview3/${id}`)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Preview;
