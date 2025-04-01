"use client";
import UploadFormInput from "@/components/upload/upload-form-input";
import { generatePdfSummary } from "@/actions/upload-actions";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { z } from "zod";

export default function UploadForm() {
  const schema = z.object({
    file: z
      .instanceof(File, { message: "Invalid File" })
      .refine((file) => file.size <= 20 * 1024 * 1024, {
        message: "File size must be less than 20MB",
      })
      .refine((file) => file.type === "application/pdf", {
        message: "File must be a PDF",
      }),
  });

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("Uploaded successfully!");
      toast.success("File uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("Error occurred while uploading:", err);
      toast.error("Error occurred while uploading.");
    },
    onUploadBegin: (file) => {
      console.log("Upload has begun for", file);
      toast.info("Uploading started...");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    const validatedFields = schema.safeParse({ file });

    if (!validatedFields.success) {
      validatedFields.error.errors.forEach((err) => {
        console.error(err.message);
        toast.error(err.message);
      });
      return;
    }

    toast("📄 Hang in there! Our AI is reading through your document ✨");

    // Upload the PDF to UploadThing
    const resp = await startUpload([file]);

    if (!resp || resp.length === 0) {
      toast.error("Upload failed. Please try again.");
      return;
    }

    console.log("Upload response:", resp);

    try {
      // Call generatePdfSummary with the upload response
      const summary = await generatePdfSummary(resp);
      console.log("Generated PDF summary:", summary);
      toast.success("PDF summary generated successfully!");
    } catch (err) {
      console.error("Error generating PDF summary:", err);
      toast.error("Failed to process the PDF. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
