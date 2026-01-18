import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

// IMPORTANT: disable worker for serverless
pdfjs.GlobalWorkerOptions.disableWorker = true;
/**
 * Extract text from uploaded resume PDF
 * Next.js App Router + Turbopack compatible
 */
export async function extractResumeText(file) {
  try {
    if (!file) {
      throw new Error("No resume file provided");
    }

    if (file.type !== "application/pdf") {
      throw new Error("Only PDF resumes are supported");
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const pdf = await pdfjs.getDocument({
      data: uint8Array,
      verbosity: 0,
    }).promise;

    let extractedText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item) => (item.str ? item.str : ""))
        .join(" ");

      extractedText += pageText + "\n";
    }

    const cleanedText = extractedText
      .replace(/\s+/g, " ")
      .replace(/\n{2,}/g, "\n")
      .trim();

    if (!cleanedText) {
      throw new Error("Extracted resume text is empty");
    }

    return cleanedText;
  } catch (err) {
    console.error("Resume parsing error:", err);
    throw new Error("Failed to extract resume text");
  }
}
