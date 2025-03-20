import { BrainCircuit, FileOutput, FileText, MoveRight } from "lucide-react";
import { ReactNode } from "react";
import Link from "next/link";

type Step = {
    icon: ReactNode;
    label: string;
    description: string;
};

const steps: Step[] = [
    {
        icon: <FileText size={64} strokeWidth={1.5} />,
        label: "Upload your PDF",
        description: "Upload your PDF file to our platform and we'll take care of the rest.",
    },
    {
        icon: <BrainCircuit size={64} strokeWidth={1.5} />,
        label: "AI Analysis",
        description: "Our AI will analyze the content of your PDF and generate a summary.",
    },
    {
        icon: <FileOutput size={64} strokeWidth={1.5} />,
        label: "Get Summary",
        description: "Receive a clear summary of the key points of your PDF in a matter of seconds.",
    },
];

export default function HowItWorksSection() {
    return (
        <section className="relative overflow-hidden bg-gray-50">
            <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
                >
                    <div
                        className="relative left-[calc(50%-3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-20 sm:left-[calc(50%-40rem)] sm:w-[40.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0%, 74.1% 1%, 80.7% 2%, 72.5% 32.5%, 60.5% 36.6%, 47.5% 58.3%, 45.2% 34.5%, 32.5% 76.7%, 0% 91.6%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className="text-center mb-16">
                    <h2 className="font-bold text-xl uppercase mb-4 text-rose-500">HOW IT WORKS</h2>
                    <h3 className="font-bold text-3xl max-w-2xl mx-auto">
                        Transform any pdf into an easy-to-digest summary in three simple steps
                    </h3>
<Link href="#pricing">
                       <button className="mt-6 px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition">
                            Go to Pricing
                        </button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative flex items-stretch">
                            <StepItem {...step} />
                            {idx < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                    <MoveRight size={32} strokeWidth={1} className="text-rose-400" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function StepItem({ icon, label, description }: Step) {
    return (
        <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-rose-500/50 transition-colors group w-full">
            <div className="flex flex-col gap-4 h-full">
                <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-2xl bg-gradient-to-r from-rose-500/10 to-transparent group-hover:from-rose-500/20 transition-colors">
                    <div className="text-rose-500">{icon}</div>
                </div>
                <div className="text-center">
                    <h4 className="font-bold text-lg">{label}</h4>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
            </div>
        </div>
    );
}