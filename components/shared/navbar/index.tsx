import React from "react";
import { MaxWidthWrapper } from "../layouts";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky inset-x-0 top-0 z-[100] h-18 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center">
            <Link href="#" className="text-2xl font-bold">
              Ecommerce
            </Link>
          </div>
          <div className="flex items-center">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-96 rounded-full transition-all focus:bg-slate-50"
            />
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">Login</Link>
            {/* <Link
              href="/register"
              className={buttonVariants({ variant: "outline" })}
            >
              Register
            </Link> */}
            <Button variant="outline" className="rounded-full" size="icon">
              <ShoppingCart size="20" />
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
