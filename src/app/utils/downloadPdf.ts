"use client";

import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
const htmlDocx = require("html-docx-js/dist/html-docx");

// Function to download PDF using html2pdf
export const downloadPdf = async (
    elementId: string,
    filename: string,
    p0: { showCover: boolean }
) => {
    if (typeof window !== "undefined") {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(
                `Element with id ${elementId} not found for download`
            );
            console.log("Current DOM:", document.body.innerHTML);
            return;
        }

        try {
            const html2pdf = (await import("html2pdf.js")).default;
            const opt = {
                margin: 1,
                filename: `${filename}.pdf`,
                html2canvas: { scale: 2 },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            };

            // Generate and save the PDF
            html2pdf().from(element).set(opt).save();
        } catch (error) {
            console.error("Error importing html2pdf or generating PDF:", error);
        }
    } else {
        console.error(
            "Window is not defined, downloadPdf can only be used client-side."
        );
    }
};
export const downloadWord = async (
    elementId: string,
    filename: string,
    p0: { showCover: boolean }
) => {
    if (typeof window !== "undefined") {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(
                `Element with id ${elementId} not found for download`
            );
            console.log("Current DOM:", document.body.innerHTML);
            return;
        }

        // Clone the element
        const clone = element.cloneNode(true) as HTMLElement; // Ensure it's cast to HTMLElement
        const cover = clone.firstElementChild; // Get the first child as an element

        // Remove the cover if showCover is false
        if (!p0.showCover && cover) {
            clone.removeChild(cover);
        }

        // Ensure clone.outerHTML is properly accessed
        const outerHTML = clone.outerHTML;
        console.log("Outer HTML of cloned element:", outerHTML);

        try {
            const fileBuffer = await htmlDocx.asBlob(
                `<!DOCTYPE html><html><body>${outerHTML}</body></html>`
            );
            saveAs(fileBuffer, `${filename}.docx`);
        } catch (error) {
            console.error("Error generating Word document:", error);
        }
    } else {
        console.error(
            "Window is not defined, downloadWord can only be used client-side."
        );
    }
};


// Function to download a Word document
