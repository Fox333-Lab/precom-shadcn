"use client";
import React from "react";
import { MaxWidthWrapper } from "../layouts";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import MobileNav from "./mobilenav";
import { UserAccountMenus } from "@/components/user";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const user = null;
  const cartCount = 0;
  return (
    // add border-b border-gray-200 to the below line to add a border bottom
    <nav className="sticky inset-x-0 top-0 z-50 h-18 w-full bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center lg:hidden">
            <MobileNav />
          </div>
          <div className="flex items-center">
            <Link href="/" className="ml-4 text-2xl font-bold lg:ml-auto">
              PremX
            </Link>
          </div>
          <div className="hidden lg:flex lg:items-center">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-96 shrink rounded-full transition-all focus:bg-slate-50 lg:block"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 lg:flex">
              {user ? (
                <UserAccountMenus />
              ) : (
                <>
                  <Link
                    href="/signin"
                    className={buttonVariants({ variant: "ghost" })}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className={buttonVariants({ variant: "ghost" })}
                  >
                    Sign Up
                  </Link>
                  <span
                    id="separator"
                    className="h-6 w-px bg-gray-200"
                    aria-hidden="true"
                  />
                </>
              )}
            </div>

            {/* <Link href="/" className="relative rounded-full">
              <ShoppingCart size="20" />
            </Link> */}
            <Link
              href="/"
              className="relative inline-flex items-center rounded-lg p-2 text-center"
            >
              <ShoppingCart size="22" />
              <div
                className={cn(
                  "absolute -end-2 -top-1 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-gray-600 text-xs font-bold text-white dark:border-gray-900",
                  { "bg-red-600": cartCount > 0 },
                )}
              >
                {cartCount.toString()}
              </div>
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
