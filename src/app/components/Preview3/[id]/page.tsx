"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LogFrameSkeleton from "../../skeletons/LogFrameSkeleton";
import { Loader } from "@mantine/core";
import { baseURL } from "@/app/constants";

function Preview() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [projectData, setProjectData] = useState<any>();
  const [logframeData, setLogframeData] = useState<any>([]);

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
    setLoading(false);
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
        setLogframeData(data.logframe); 
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
      setLogframeData(data.logframe);
    } catch (error) {
      console.log("Error refetching logframe data:", error);
    } finally {
      setLoading(false);
    }
  };

  

  const handleSave = async () => {
    console.log("Changes saved:", logframeData);
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
                        <td className="border border-1 p-2">{item.Assumptions}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
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
      )}
    </div>
  );
}

export default Preview;
