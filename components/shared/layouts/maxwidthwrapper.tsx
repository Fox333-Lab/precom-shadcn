import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "container mx-auto h-full w-full md:px-8 2xl:px-16",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
