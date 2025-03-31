"use client";
import UploadFormInput from "@/components/upload/upload-form-input";
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
      console.log("uploaded successfully!");
      toast.success("File uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("Error occurred while uploading:", err);
      toast.error("Error occurred while uploading.");
    },
    onUploadBegin: ({ file }) => {
      console.log("Upload has begun for", file);
      toast.info("Uploading started...");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    const validatedFields = schema.safeParse({ file });

    if (!validatedFields.success) {
      validatedFields.error.errors.forEach((err) => {
        console.error(err.message);
      });
      toast.error("Invalid file. Please check the errors and try again.");
      return;
    }

    toast("📄Hang in there ! Our AI is reading through your document ✨");

    // Upload the PDF to UploadThing
    const resp = await startUpload([file]);
    if (!resp) {
      toast.error("Upload failed. Please try again.");
      return;
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
