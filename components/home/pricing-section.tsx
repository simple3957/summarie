import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckIcon, ArrowRight } from "lucide-react";

type PriceType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
  priceId: string;
};

const plans: PriceType[] = [
  {
    name: "Basic",
    price: 9,
    description: "Perfect for occasional use",
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    id: "basic",
    paymentLink: "",
    priceId: "",
  },
  {
    name: "Pro",
    price: 19,
    description: "For professionals and teams",
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    id: "pro",
    paymentLink: "",
    priceId: "",
  },
];

const PricingCard = ({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
  priceId,
}: PriceType) => {
  return (
    <div className="relative  w-full max-w-lg hover:scale-105 hover:transition-all duration-300">
      <div
        className={cn(
          "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 rounded-2xl border",
          id === "pro" && "border-rose-500 gap-5 border-2"
        )}
      >
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-gray-600 mt-2">{description}</p>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <p className="text-5xl tracking-tight font-extrabold mb-4">
            ${price}
          </p>
          <div className="flex flex-col mt-1.5">
            <p className="text-xs uppercase font-semibold">Usd</p>
            <p className="text-xs">/month</p>
          </div>
        </div>
        <div className="space-y-2.5 leading-relaxed text-base flex-1">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckIcon size={18} />
              <span>{item}</span>
            </li>
          ))}
        </div>
        <div className="space-y-2 flex justify-center w-full ">
          <Link
            href="/pricing"
            className={cn(
              "w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2",
              id === "pro"
                ? "border-rose-900"
                : "border-rose-100 from-rose-400 to-rose-500"
            )}
          >
            Buy Now
            <ArrowRight size={18}></ArrowRight>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function PricingSection() {
  return (
    <section className='relative overflow-hidden id="pricing" '>
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12 ">
        <div className="text-center mb-16 pb-12 w-full">
          <h2 className="font-bold text-xl uppercase mb-8 text-rose-500">
            PRICING
          </h2>
        </div>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
