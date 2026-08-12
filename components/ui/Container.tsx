import { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Shared max-width + gutter — the one place page width is defined. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-16", className)}>
      {children}
    </div>
  );
}
