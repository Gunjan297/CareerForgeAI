import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { ChevronDown, FileText, GraduationCap, LayoutDashboard, PenBox, StarsIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { checkUser } from '@/lib/checkUser.js'

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

                  <Link
                    href="/resume"
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    Build Resume
                  </Link>

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