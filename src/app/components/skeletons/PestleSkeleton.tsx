import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PestleSkeleton = () => {
    return (
        <div className="border border-collapse w-full overflow-x-auto">
            <table className="w-full border border-1 m-auto">
                <thead>
                    <tr className="bg-slate-300">
                        <th className="border border-1 p-2 text-blue-default font-bold text-center">
                            <Skeleton width={50} height={20} />
                        </th>
                        <th className="border border-1 p-2 text-blue-default font-bold text-center">
                            <Skeleton width={200} height={20} />
                        </th>
                        <th className="border border-1 p-2 text-blue-default font-bold text-center">
                            <Skeleton width={200} height={20} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {[1, 2, 3, 4, 5, 6].map((_, index) => (
                        <tr key={index}>
                            <td className="border border-1 p-2 text-center font-bold bg-slate-300">
                                <Skeleton width={100} height={20} />
                            </td>
                            <td className="border border-1 p-2">
                                <Skeleton width="100%" height={20} />
                            </td>
                            <td className="border border-1 p-2">
                                <Skeleton width="100%" height={20} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PestleSkeleton;
