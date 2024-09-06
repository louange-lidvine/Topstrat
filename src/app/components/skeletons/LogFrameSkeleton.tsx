import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function LogFrameSkeleton() {
  const rows = 6;  
  const columns = 6;  

  return (
    <div className="overflow-x-auto">
      <table className="border border-1 m-auto w-full">
        <thead>
          <tr className="bg-slate-300">
            <th className="border border-1 p-2 text-blue-default font-bold text-center">
              <Skeleton width={150} height={40} />
            </th>
            <th className="border border-1 p-2 text-blue-default font-bold text-center">
              <Skeleton width={150} height={40} />
            </th>
            <th className="border border-1 p-2 text-blue-default font-bold text-center">
              <Skeleton width={150} height={40} />
            </th>
            <th className="border border-1 p-2 text-blue-default font-bold text-center">
              <Skeleton width={150} height={40} />
            </th>
            <th className="border border-1 p-2 text-blue-default font-bold text-center">
              <Skeleton width={150} height={40} />
            </th>
            <th className="border border-1 p-2 text-blue-default font-bold text-center">
              <Skeleton width={150} height={40} />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array(rows).fill(rows).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array(columns).fill(rows).map((_, colIndex) => (
                <td className="border border-1 p-2" key={colIndex}>
                  <Skeleton height={40} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LogFrameSkeleton;