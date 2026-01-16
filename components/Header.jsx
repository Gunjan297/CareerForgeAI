import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { checkUser } from '@/lib/checkUser.js'
import { ChevronDown } from 'lucide-react'

const Header = async() => {
  await checkUser();
  return (
    <header
  className="
    fixed top-0 w-full z-50
    border-b border-white/10
    bg-black
    backdrop-blur-xl
    shadow-md
    h-18
    transition-colors duration-300
  "
>
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
           <Link
              href="/"
              className="text-3xl md:text-4xl font-black italic tracking-tight text-white leading-none"
            >
              CareerForge
              <span className="text-orange-500 ml-1">AI</span>
            </Link>


              <div className="flex items-center gap-6">
              <SignedIn>
                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                  <Link
                    href="/dashboard"
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    Industry Overview
                  </Link>

                  <DropdownMenu>
                  <DropdownMenuTrigger className="text-gray-300 hover:text-orange-400 transition-colors outline-none">
                    <div className='flex mt-1.5'>
                    Resume 
                    <ChevronDown/>
                    </div>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="start"
                    className="bg-zinc-900 border border-zinc-800 text-gray-300"
                  >
                    <DropdownMenuItem asChild>
                      <Link
                        href="/resume"
                        className="cursor-pointer hover:text-orange-400"
                      >
                        Build Resume
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link
                        href="/resume-score-check"
                        className="cursor-pointer hover:text-orange-400"
                      >
                        Resume Score Checker 
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                  <Link
                    href="/ai-cover-letter"
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    Cover Letter
                  </Link>

                  <Link
                    href="/interview"
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    Interview Prep
                  </Link>

                  <Link
                    href="/jobs"
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    Jobs
                  </Link>
                </div>

                {/* User Button (shifted left) */}
                <div className="ml-100">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 ring-2 ring-orange-400/40",
                      userButtonPopoverCard: "shadow-xl border border-white/10",
                      userPreviewMainIdentifier: "font-semibold",
                    },
                  }}
                  afterSignOutUrl="/"
                />
                </div>
              </SignedIn>
            </div>



             <div className="flex items-center space-x-2 md:space-x-4">
            <SignedOut>
              <SignInButton>
                <Button variant="outline" className="md:inline-flex items-center gap-2">Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button className="bg-orange-400 hover:bg-orange-600 md:inline-flex items-center gap-2">Sign Up</Button>
              </SignUpButton>
            </SignedOut>
            </div>
            </nav>
            </header>
  )
}

export default Header