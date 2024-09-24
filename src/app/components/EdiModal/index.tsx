"use client";
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import ReactModal from 'react-modal';

interface EditModalProps {
    isOpen: boolean;
    id:string;
    onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose ,id}) => {
 
    const router = useRouter();

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="lg:w-[600px] w-[90%] max-w-lg mx-auto p-8 mt-20 bg-white shadow-2xl rounded-lg"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
        >
            <form className="flex flex-col justify-center items-center gap-6">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                    Choose section to edit
                </h2>
                <div className="grid lg:grid-cols-2 gap-4">
                    <div
                        className="bg-gray-100 h-16 w-full rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex items-center justify-center p-3 text-lg font-medium text-gray-700 hover:bg-gray-200"
                        onClick={() => router.push(`/components/Preview/${id}`)}
                    >
                        Section A: Mission, Vision, Values
                    </div>

                    <div
                        className="bg-gray-100 h-16 w-full rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex items-center justify-center p-3 text-lg font-medium text-gray-700 hover:bg-gray-200"
                        onClick={() => router.push(`/components/Preview1/${id}`)}
                    >
                        Section B: SWOT Analysis
                    </div>

                    <div
                        className="bg-gray-100 h-16 w-full rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex items-center justify-center p-3 text-lg font-medium text-gray-700 hover:bg-gray-200"
                        onClick={() => router.push(`/components/Preview2/${id}`)}
                    >
                        Section C: PESTLE Analysis
                    </div>
                    <div
                        className="bg-gray-100 h-16 w-full rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex items-center justify-center p-3 text-lg font-medium text-gray-700 hover:bg-gray-200"
                        onClick={() => router.push(`/components/Preview3/${id}`)}
                    >
                        Section D: Objectives and Strategies
                    </div>

                    <div
                        className="bg-gray-100 h-16 w-full rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex items-center justify-center p-3 text-lg font-medium text-gray-700 hover:bg-gray-200"
                        onClick={() => router.push(`/components/Preview4/${id}`)}
                    >
                        Section D: Logframe Analysis
                    </div>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-blue-default text-white py-2 px-8 rounded-md transition-colors duration-200"
                >
                    Cancel
                </button>
            </form>
        </ReactModal>
    );
};

export default EditModal;
