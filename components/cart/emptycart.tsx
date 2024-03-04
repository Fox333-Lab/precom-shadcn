"use client";
import { Plus, ShoppingBasket } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { H2, H3, Para } from "../ui/textui";
import { Button } from "../ui/button";
const EmptyCart = () => {
  // const { data: session } = useSession();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col gap-3 justify-center items-center">
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
        <div className="flex flex-col gap-2 w-full md:w-1/2">
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
          <Button variant="outline" className="w-full flex gap-1">
            <Plus size="18" />
            <span>Shop Now</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
