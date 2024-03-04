"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme } = useTheme();
  return (
    <Button variant="outline" size="icon" onClick={() => setTheme("light")}>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
