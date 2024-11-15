/* eslint-disable react-hooks/exhaustive-deps */
import { cn } from "@/src/lib/utilities";
import { useEffect, useState } from "react";
import { StaggerContainerProps } from "./types";

export default function StaggerContainer({
  children,
  staggerDelay = 50,
  randomFactor = 300,
}: StaggerContainerProps) {
  const [display, setDisplay] = useState<boolean>(false);

  useEffect(() => {
    const timeout = Math.floor(Math.random() * randomFactor) + staggerDelay;
    setTimeout(() => {
      setDisplay(true);
    }, timeout);
  }, []);

  return (
    <div
      className={cn("transition-all duration-300 ease-out relative h-full w-full", display ? "opacity-100 right-0" : "opacity-0 right-1")}
    >
      {children}
    </div>
  );
}