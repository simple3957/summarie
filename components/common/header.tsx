import NavLink from "@/components/common/nav-link";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <nav className="container flex flex-row justify-between items-center py-2 lg:px-7 mx-auto">
      {/* Left Section: Logo */}
      <div className="flex items-center space-x-2 lg:space-x-4 lg:flex-1">
        <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-grey-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="text-lg lg:text-2xl font-bold">Summaire</span>
        </NavLink>
      </div>

      {/* Center Section: Links */}
      <div className="flex gap-4 lg:gap-12 lg:flex-1 lg:justify-center space-x-4 lg:space-x-6">
        <NavLink href="/#pricing">Pricing</NavLink>
        <SignedIn>
          <NavLink href="/dashboard">Your Summaries</NavLink>
        </SignedIn>
      </div>

      {/* Right Section: User Actions */}
      <div className="flex lg:justify-end lg:flex-1 lg:space-x-4">
        <SignedIn>
          <div className="flex items-center space-x-4">
            <NavLink href="/upload">Upload a PDF</NavLink>
            <div>Pro</div>
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <NavLink href="/sign-in">Sign-in</NavLink>
        </SignedOut>
      </div>
    </nav>
  );
}
