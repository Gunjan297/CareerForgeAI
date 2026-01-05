import {Section } from 'lucide-react'
import React from 'react'
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section>
    <div>
        <div className="flex overflow-hidden">
      {/* LEFT SECTION */}
      <div className="w-1/2 relative flex flex-col justify-center px-20 bg-gradient-to-br from-black via-neutral-900 to-black">
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
    
        {/* Content */}
        <div className="relative animate-fade-up pt-20 ">
          
          <h2 className="text-white text-5xl xl:text-6xl font-black leading-tight mb-8">
            TURN POTENTIAL <br />
            INTO PROGRESS <br />
            <span className="text-orange-400">CareerForge AI</span>
          </h2>
    
          <p className="text-gray-400 text-lg max-w-xl">
            Advance your career with personalized guidance,interview preparation, and AI-powered tools for job success.
          </p>

            <div className='pt-2'>
          < Link href="/dashboard">
            <Button  className="bg-orange-400 hover:bg-orange-600 md:inline-flex items-center gap-2 ">
              Get Started
            </Button>
          </Link>
            </div>
        </div>
      </div>
    
      {/* RIGHT SECTION */}
      <div className="w-1/2 relative">
        <Image
          src="/homepage.jpg"
          alt="CareerForge AI"
          fill
          className="object-cover scale-105"
          priority
        />
    
        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/10 to-transparent" />
      </div>
    
    </div>
    </div>
  </section>
  )
}

export default HeroSection