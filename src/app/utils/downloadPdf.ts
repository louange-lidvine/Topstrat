export const downloadPdf = async (elementId: string, filename: string) => {
  if (typeof window !== "undefined") {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with id ${elementId} not found for download`);
      console.log("Current DOM:", document.body.innerHTML); 
      return;
    }

    const html2pdf = (await import("html2pdf.js")).default;
    const opt = {
      margin: 1,
      filename: `${filename}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(element).set(opt).save();
  } else {
    console.error(
      "Window is not defined, downloadPdf can only be used client-side."
    );
  }
};
