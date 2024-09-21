import React, { useState } from "react";
import ReactModal from "react-modal";
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";
import Finals from "../Finals";

interface PrintModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectData: any; 
    promptData: any;
    pestleData: any;
    id: string;
    logframeData: any;
}

const PrintModal: React.FC<PrintModalProps> = ({
    isOpen,
    id,
    onClose,
    projectData,
    promptData,
    pestleData,
    logframeData,
}) => {
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [selectedPrinter, setSelectedPrinter] = useState("");
    const [layout, setLayout] = useState("portrait"); // Default layout

    const printers = ["Printer1", "Printer2", "Printer3"];

    const handlePrint = async () => {
        if (!selectedPrinter) {
            alert("Please select a printer.");
            return;
        }

        if (!layout) {
            alert("Please select a layout (portrait or landscape).");
            return;
        }

        const element = document.getElementById("pdf-content_" + id);
        const scaleValue = 2;
        const marginValue = 1;

        const opt = {
            margin: marginValue,
            filename: `generated_${selectedPrinter}_${layout}.pdf`,
            html2canvas: { scale: scaleValue },
            jsPDF: { unit: "mm", format: "a4", orientation: layout }, // Explicitly set orientation
        };

        await html2pdf()
            .from(element)
            .set(opt)
            .toPdf()
            .get("pdf")
            .then(function (pdf: {
                internal: { getNumberOfPages: () => any };
                deletePage: (arg0: any) => void;
                addPage: () => void;
            }) {
                const totalPages = pdf.internal.getNumberOfPages();
                console.log(`Total pages before adjustment: ${totalPages}`);

            
                if (totalPages > numberOfPages) {
                    for (let i = totalPages; i > numberOfPages; i--) {
                        pdf.deletePage(i);
                    }
                } else if (totalPages < numberOfPages) {
                    for (let i = totalPages; i < numberOfPages; i++) {
                        pdf.addPage();
                    }
                }

                console.log(
                    `Total pages after adjustment: ${pdf.internal.getNumberOfPages()}`
                );
            })
            .save();

        console.log(`Selected Printer: ${selectedPrinter}`);
        console.log(`Selected Layout: ${layout}`);
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="lg:w-[80%] w-[90%] h-[90%] max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-md flex"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
            <div className="flex flex-col w-full h-full">
                <h2 className="text-2xl font-semibold text-center mb-4">
                    Print Options
                </h2>
                <div className="flex h-full ">
                  
                    <div className=" h-full flex-1 overflow-y-auto p-4 border-r border-gray-300">
                        <Finals id={id} />
                    </div>

                    <div className="w-1/3 p-4">
                        <div className="mb-4">
                            <label className="block mb-2 font-semibold">
                                Select Printer:
                            </label>
                            <select
                                value={selectedPrinter}
                                onChange={(e) =>
                                    setSelectedPrinter(e.target.value)
                                }
                                className="border rounded-md p-2 w-full"
                            >
                                <option value="">Select Printer</option>
                                {printers.map((printer, index) => (
                                    <option key={index} value={printer}>
                                        {printer}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4 border">
                            <label className="block mb-2 font-semibold">
                                Select Layout:
                            </label>
                            <select
                                value={layout}
                                onChange={(e) => setLayout(e.target.value)}
                                className="border rounded-md p-2 w-full"
                            >
                                <option value="portrait">Portrait</option>
                                <option value="landscape">Landscape</option>
                            </select>
                        </div>

                        
                        <div className="mb-4">
                            <label className="block mb-2 font-semibold">
                                Number of Pages:
                            </label>
                            <input
                                type="number"
                                value={numberOfPages}
                                onChange={(e) =>
                                    setNumberOfPages(Number(e.target.value))
                                }
                                min={1}
                                className="border rounded-md p-2 w-full"
                            />
                        </div>

                        <div className="flex justify-end mt-auto">
                            <button
                                onClick={handlePrint}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Print
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-gray-300 text-black px-4 py-2 rounded ml-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};

export default PrintModal;