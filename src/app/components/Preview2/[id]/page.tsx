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
    const [editablePestleData, setEditablePestleData] = useState<any>(null);

    useEffect(() => {
        const getProject = async (id: string) => {
            try {
                const token = getCookie("token");
                const response = await axios.get(
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
                            Authorization: `Bearer ${
                                JSON.parse(token ?? "").access_token
                            }`,
                        },
                    }
                );
                const data = JSON.parse(response.data.pestle.response);
                setPestleData(data);
                setEditablePestleData(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (
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
  };
  

//     const saveChanges = async () => {
//         const token = getCookie("token");
//         setLoading(true);
//         try {
//             await axios.put(
//                 `http://157.245.121.185:5000/projects/${id}/update-analysis`,
//                 { pestleData: editablePestleData },
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${
//                             JSON.parse(token ?? "").access_token
//                         }`,
//                     },
//                 }
//             );
//             setPestleData(editablePestleData); // Update displayed data with edited data
//         } catch (error) {
//             console.log(error);
//         } finally {
//             setLoading(false);
//         }
//   };
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
                      Authorization: `Bearer ${
                          JSON.parse(token ?? "").access_token
                      }`,
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
        <div className="border border-blue-default my-4 rounded-md mx-2 p-4 font-medium flex flex-col gap-8 h-full w-full ">
            {loading ? (
                <Loader />
            ) : (
                <div className="w-full h-full">
                    <div className="flex flex-col gap-3 h-full">
                        <table
                            className="border border-1 m-auto"
                            style={{
                                width: "100%",
                                maxWidth: "800px",
                                height: "100%",
                            }}
                        >
                            {/* <table
                            className="border border-1 m-auto"
                            // style={{ width: "100%", maxWidth: "800px",height: "100%" }}
                        > */}
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
                                                    style={{
                                                        wordWrap: "break-word",
                                                    }}
                                                >
                                                    <input
                                                        type="text"
                                                        value={
                                                            editablePestleData[
                                                                category
                                                            ]?.inf || ""
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                category,
                                                                "inf",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full border-none px-2 h-full" // Adjust size as needed
                                                        style={{
                                                            // height: "100px",
                                                            fontSize: "16px",
                                                        }} // Increase height and font size
                                                    />
                                                </td>
                                                <td
                                                    className="border border-1 p-2"
                                                    style={{
                                                        wordWrap: "break-word",
                                                    }}
                                                >
                                                    <input
                                                        type="text"
                                                        value={
                                                            editablePestleData[
                                                                category
                                                            ]?.imp || ""
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                category,
                                                                "imp",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full border-none p-2 h-full"
                                                        style={{
                                                            // height: "100px",
                                                            fontSize: "16px",
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
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
                    onClick={() =>
                        router.push(`../../components/Preview/${id}`)
                    }
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
                    className="bg-green-default text-white font-bold rounded-md m-auto py-3 px-6"
                    // onClick={saveChanges}
                >
                    Save
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
