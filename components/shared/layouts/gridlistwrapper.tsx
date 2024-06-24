import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const GridListWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-3 md:gap-x-5 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-7 xl:gap-y-5 2xl:grid-cols-5 2xl:gap-y-8",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default GridListWrapper;
