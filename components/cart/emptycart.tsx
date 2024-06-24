"use client";
import { Plus, ShoppingBasket } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { H2, H3, Para } from "../ui/textui";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
const EmptyCart = () => {
  // const { data: session } = useSession();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center justify-center gap-3">
          <ShoppingBasket size="120" strokeWidth="1" />
          <div className="flex flex-col gap-1 md:gap-2">
            <H2 className="text-center text-xl md:text-3xl">
              Your Cart is Empty
            </H2>
            <Para className="text-center text-lg text-gray-400 md:text-2xl">
              Add something to make me lively :)
            </Para>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 md:w-1/2">
          {/* {!session && (
            <Button
              size="3"
              className="w-full"
              onClick={() => signIn()}
              highContrast
            >
              Sign In
            </Button>
          )} */}
          <Link
            href="/products"
            className={cn(
              "flex w-full gap-1",
              buttonVariants({ variant: "outline" }),
            )}
          >
            <Plus size="18" />
            <span>Shop Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
