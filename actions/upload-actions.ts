"use server";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAi } from "@/lib/openai";
import { generateSummaryFromGemini } from "@/lib/gemini";

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
      console.log("OpenAI Summary:", { summary });
    } catch (openaiError) {
      console.log("OpenAI Error:", openaiError);
      try {
        summary = await generateSummaryFromGemini(pdfText);
        console.log("Gemini Summary:", { summary });
      } catch (geminiError) {
        console.error("Gemini Error:", geminiError);
        throw new Error("Both OpenAI and Gemini failed to generate summary");
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }

    return {
      success: true,
      message: "Summary generated successfully",
      data: { summary, fileName },
    };
  } catch (err) {
    console.error("Error processing PDF:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Error processing PDF",
      data: null,
    };
  }
}
