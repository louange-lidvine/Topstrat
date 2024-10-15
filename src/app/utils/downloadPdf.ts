import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export const downloadPdf = async (elementId: string, filename: string) => {
  if (typeof window !== "undefined") {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with id ${elementId} not found for download`);
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

export const downloadWord = async (elementId: string, filename: string) => {
  if (typeof window !== "undefined") {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with id ${elementId} not found for download`);
      console.log("Current DOM:", document.body.innerHTML);
      return;
    }

    try {
      const content = element.innerText;

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [new TextRun(content)],
              }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${filename}.docx`);
    } catch (error) {
      console.error("Error generating Word document:", error);
    }
  } else {
    console.error(
      "Window is not defined, downloadWord can only be used client-side."
    );
  }
};


