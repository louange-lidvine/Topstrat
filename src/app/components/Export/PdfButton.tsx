<<<<<<< HEAD


=======
"use client";
>>>>>>> 1b3c4c3330ac51aa74f9c30c778e7ed2385fe776
import React from "react";
import Final from "../Final/[id]/page";
import { PDFDownloadLink } from "@react-pdf/renderer";

const PdfButton = () => {
  // Receive id as props
  return (
    <>
      {typeof window !== "undefined" && (
        <PDFDownloadLink document={<Final />} fileName="document.pdf">
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
      )}
    </>
  );
};

export default PdfButton;
