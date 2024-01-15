import { cn } from "@/lib/utils";
import React from "react";

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export const H1 = ({ className, ...props }: HeadingProps) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
      {...props}
    />
  );
};

export const H2 = ({ className, ...props }: HeadingProps) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  );
};

export const H3 = ({ className, ...props }: HeadingProps) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
};

export const H4 = ({ className, ...props }: HeadingProps) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
};

export const Para = ({ className, ...props }: HeadingProps) => {
  return <h1 className={cn("leading-7", className)} {...props} />;
};
