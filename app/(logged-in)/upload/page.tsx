import UploadHeader from "@/components/upload/upload-header";
import UploadForm from "@/components/upload/upload-form";
import BgGradient from "@/components/common/bg-gradient";

export default function UploadPage() {
  return <section className="min-h-screen">
    <BgGradient/>
    <div className="mx-auto max-w-7xl px-6 py-12 sm:py-32 lg:px-8">
        <div className="flex flex-col gap-6 justify-center items-center text-center">
          <UploadHeader />
          <UploadForm />
        </div>

    </div>
    
  </section>
}
