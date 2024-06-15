"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React from "react";

const MobileNav = () => {
  return (
    <div className="flex items-center lg:hidden">
      <Sheet>
        <SheetTrigger>
          {/* <Button> */}
          <Menu />
          {/* </Button> */}
        </SheetTrigger>
        <SheetContent>
          <div className="flex flex-col gap-4">
            <Button variant="ghost">Home</Button>
            <Button variant="ghost">Shop</Button>
            <Button variant="ghost">About</Button>
            <Button variant="ghost">Contact</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
