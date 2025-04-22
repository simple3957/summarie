"use server";

import { getDbConnection } from "@/lib/db";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAi } from "@/lib/openai";
import { generateSummaryFromGemini } from "@/lib/gemini";
import { auth } from "@clerk/nextjs/server";

interface PdfSummaryTypes {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

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

async function savePdfSummary({userId , fileUrl , summary , title, fileName} : {userId:string; fileUrl: string;
   summary:string; title:string; fileName:string;}){
  try{
    const sql = await getDbConnection( );
    await sql
    `
      INSERT INTO pdf_summaries (
      user_id,
      original_file_url,
      summary_text,
      title,
      file_name
      ) VALUES (
        ${userId},
        ${fileUrl},
        ${summary},
        ${title},
        ${fileName}
      );
    `
  }catch(error){
    console.error('Error saving PDF summary', error);
    throw error;
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}:PdfSummaryTypes){
  // user is logged in and has a userId
  //  savePdfSummary
  // savedPdfSummary()
  let savedSummary;
  try{
    const { userId } = await auth();

    if(!userId){
      return {
        success: false,
        message: 'User not found',
      };
    }
    
    savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if(savedSummary === undefined){
      return{
        success: false,
        message: 'Failed to save PDF Summary',
      }
    }
    return {
      success: true,
      message: 'PDF Summary saved successfully',
    }
  }catch(error){
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error storing PDF summary',
    };
  }
}