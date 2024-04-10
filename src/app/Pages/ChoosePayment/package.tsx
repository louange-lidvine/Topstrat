import React from "react";

interface PackageProps {
    title: string;
    onClick: () => void; // Specify the type of onClick as a function that takes no arguments and returns void
}

const Package: React.FC<PackageProps> = ({ title, onClick }) => {
    return (
        <div
            className="border border-blue-default rounded-md my-6 lg:w-[300px] lg:h-[200px] py-2 px-4"
            onClick={onClick}
        >
            <h2 className="text-lg font-bold">{title}</h2>
        </div>
    );
};

export default Package;
