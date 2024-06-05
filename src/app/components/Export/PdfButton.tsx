

import React from "react";
import Final from "../Final/[id]/page";
import { PDFDownloadLink } from "@react-pdf/renderer";


const PdfButton = () => { // Receive id as props
    return (
        <PDFDownloadLink document={<Final  />} fileName="document.pdf"> 
            {({ blob, url, loading, error }) =>
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <button className="bg-[#FBBC05] text-white font-bold rounded-md py-3 px-6 flex items-center justify-center my-5 mx-auto">
                        Export as PDF
                    </button>
                )
            }
        </PDFDownloadLink>
    );
};

export default PdfButton;
