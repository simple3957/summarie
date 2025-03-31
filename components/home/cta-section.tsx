import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-gray-50 py-12">
      <div
        className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 
        lg:px-8 lg:pt-12"
      >
        <div
          className="flex flex-col items-center  text-center 
            justify-center space-y-4 "
        >
          <div className="space-y-2">
            <h2
              className="text-2xl text-black font-bold tracking-tight
                    sm:text-3xl md:text-4xl "
            >
              Ready to Save hours of Reading Time?
            </h2>
            <p
              className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed 
                    lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
            >
              Transform lengthy documents into clear, actionable insights with
              our AI-powered summarizer.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <div className="flex">
              <Button
                size={"lg"}
                variant={"link"}
                className="w-full min-[400px]:w-auto bg-linear-to-r
                         from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900
                         hover:text-white hover:no-underline  text-white transition-all duration-300 "
              >
                <Link
                  href="#pricing"
                  className="flex items-center justify-center "
                >
                  Get Started
                  <ArrowRight
                    className="ml-2 h-4 w-4
                                animate-pulse"
                  ></ArrowRight>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
