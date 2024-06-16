import { cn } from "@/lib/utils";
import React from "react";

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const H1 = ({ className, ...props }: HeadingProps) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl",
        className
      )}
      {...props}
    />
  );
};

export const H2 = ({ className, ...props }: HeadingProps) => {
  return (
    <h2
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
    <h3
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
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
};

export const H5 = ({ className, ...props }: HeadingProps) => {
  return (
    <h5
      className={cn(
        "scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
};
export const H6 = ({ className, ...props }: HeadingProps) => {
  return (
    <h6
      className={cn(
        "scroll-m-20 text-md font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
};
export const Para = ({ className, ...props }: ParagraphProps) => {
  return (
    <p
      className={cn(
        "leading-7 [&:not(:first-child)]:mt-0 text-muted-foreground",
        className
      )}
      {...props}
    />
  );
};
