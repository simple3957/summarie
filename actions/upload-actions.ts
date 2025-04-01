"use server";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAi } from "@/lib/openai";
export async function generatePdfSummary(
  uploadResponse: Array<{
    serverData: {
      userId: string;
      file: {
        ufsUrl: string;
        name: string;
      };
    };
  }>
) {
  if (!uploadResponse || uploadResponse.length === 0) {
    return {
      success: false,
      message: "File Upload failed",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { ufsUrl: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "File URL missing",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log({ pdfText });

    let summary;
    try {
      summary = await generateSummaryFromOpenAi(pdfText);
      console.log({ summary });
    } catch (error) {
      console.log(error);
    }

    if (!summary) {
      return {
        success: false,
        message: "Error processing PDF",
        data: null,
      };
    }
  } catch (err) {
    console.error("Error extracting PDF:", err);
    return {
      success: false,
      message: "Error processing PDF",
      data: null,
    };
  }
}
