import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SwotSkeleton = () => {
    return (
        <div className="border border-collapse w-full overflow-x-auto mt-5">
            <table className="w-full">
                <thead>
                    <tr className="text-blue-default">
                        <td className="border-2 border-solid border-grey-300 p-[6px] text-left px-6 py-3">
                            <Skeleton width={100} height={40} />
                        </td>
                        <td className="border-2 border-solid border-grey-300 p-[6px] text-left px-6">
                            <Skeleton width={100} height={40} />
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {[1, 2, 3].map((_, index) => (
                        <tr key={index}>
                            <td className="border-2 border-solid border-grey-300 p-[6px] text-left px-6">
                                <Skeleton width="100%" height={40} />
                            </td>
                            <td className="border-2 border-solid border-grey-300 p-[6px] text-left px-6">
                                <Skeleton width="100%" height={40} />
                            </td>
                        </tr>
                    ))}
                    <tr className="text-blue-default">
                        <td className="border-2 border-solid border-grey-300 p-[6px] text-left px-6 py-3">
                            <Skeleton width={150} height={40} />
                        </td>
                        <td className="border-2 border-solid border-grey-300 p-[6px] text-left px-6">
                            <Skeleton width={150} height={40} />
                        </td>
                    </tr>
                    {[1, 2, 3].map((_, index) => (
                        <tr key={index}>
                            <td className="border-2 border-solid border-grey-300 p-[6px] text-left px-6">
                                <Skeleton width="100%" height={40} />
                            </td>
                            <td className="border-2 border-solid border-grey-300 p-[6px] text-left px-6">
                                <Skeleton width="100%" height={40} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SwotSkeleton;
