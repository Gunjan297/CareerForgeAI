import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { faqs } from "@/data/faq";
import { features } from "@/data/features";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/prisma";

export default async function Home() {
  const user = await currentUser();

  if(user){
    redirect("/onboarding");
  }

  return (
    <div>
      <HeroSection />

      {/* FEATURES SECTION */}
      <section className="w-full py-16 md:py-28 bg-gradient-to-b from-white via-gray-50 to-white">
  <div className="container mx-auto px-4 md:px-6">

    {/* Heading */}
    <h1 className="tracking-tight mb-14 text-5xl md:text-6xl font-extrabold text-center text-black">
      KEY <span className="text-orange-500">FEATURES</span>
    </h1>

    {/* Cards Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {features.map((feature, index) => (
        <Card
          key={index}
          className="
            group relative border border-gray-200 bg-white
            rounded-2xl shadow-sm
            hover:shadow-xl hover:-translate-y-2
            transition-all duration-300 ease-out
          "
        >
          <CardContent className="pt-8 pb-10 px-6 text-center flex flex-col items-center">

            {/* Icon Badge */}
            <div className="
              mb-6 flex items-center justify-center
              h-14 w-14 rounded-full
              bg-orange-300 text-orange-500
              group-hover:bg-orange-500 group-hover:text-white
              transition-colors duration-300
            ">
              {feature.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.description}
            </p>

          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

      <section className="w-full py-16 md:py-24 bg-gradient-to-b from-muted/60 to-muted">
  <div className="container mx-auto px-4 md:px-6">
    
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
      
      {/* Card 1 */}
      <div className="group rounded-2xl bg-background/70 backdrop-blur-md border border-border p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300">
        <h3 className="text-5xl font-extrabold text-orange-500 mb-2 group-hover:scale-105 transition-transform">
          50+
        </h3>
        <p className="text-sm uppercase tracking-wide text-muted-foreground">
          Industries Covered
        </p>
      </div>

      {/* Card 2 */}
      <div className="group rounded-2xl bg-background/70 backdrop-blur-md border border-border p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300">
        <h3 className="text-5xl font-extrabold text-orange-500 mb-2 group-hover:scale-105 transition-transform">
          1000+
        </h3>
        <p className="text-sm uppercase tracking-wide text-muted-foreground">
          Interview Questions
        </p>
      </div>

      {/* Card 3 */}
      <div className="group rounded-2xl bg-background/70 backdrop-blur-md border border-border p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300">
        <h3 className="text-5xl font-extrabold text-orange-500 mb-2 group-hover:scale-105 transition-transform">
          24/7
        </h3>
        <p className="text-sm uppercase tracking-wide text-muted-foreground">
          AI Support
        </p>
      </div>

    </div>
  </div>
</section>

 {/* FAQ Section */}
    <section className="w-full py-16 md:py-28 bg-gradient-to-b from-background to-muted/40">
  <div className="container mx-auto px-4 md:px-6">

    {/* Header */}
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
        Frequently Asked <span className="text-orange-500">Questions</span>
      </h2>
      <p className="text-muted-foreground text-lg">
        Everything you need to know about CareerForge AI
      </p>
    </div>

    {/* FAQ Accordion */}
    <div className="max-w-3xl mx-auto">
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="rounded-xl border bg-background shadow-sm transition-all hover:shadow-md"
          >
            <AccordionTrigger
              className="
                flex items-center justify-between
                px-6 py-4 text-left
                text-base md:text-lg font-semibold
                hover:no-underline
                [&>svg]:h-5
                [&>svg]:w-5
                [&>svg]:text-orange-500
                [&[data-state=open]>svg]:rotate-180
                [&>svg]:transition-transform
              "
            >
              {faq.question}
            </AccordionTrigger>

            <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>

  </div>
</section>

<section className="w-full">
  <div
    className="
      relative w-full overflow-hidden
      bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400
      py-12 md:py-16
    "
  >
    {/* Subtle depth overlay */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_65%)]" />

    <div className="relative flex flex-col items-center justify-center text-center px-6 space-y-4">
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-black">
        Ready to Accelerate Your Career?
      </h2>

      <p className="text-base md:text-lg text-black/80 max-w-2xl">
        Join thousands of professionals advancing faster with AI-powered guidance.
      </p>

      <Link href="/dashboard">
        <Button
          size="lg"
          variant="secondary"
          className="
            mt-4 h-11 px-8
            rounded-full font-semibold
            transition-all
            hover:scale-105 hover:shadow-lg
          "
        >
          Start Your Journey Today
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  </div>
</section>
    </div>
  );
}
