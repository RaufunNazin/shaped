"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const DoubleSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-blue-600 peer inline-flex h-[16px] w-[36px] shrink-0 cursor-pointer items-center rounded-full border-0 border-transparent transition-colors focus:outline-none focus:ring-0 focus:ring-slate-400 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 pointer-events-none block h-5 w-5 rounded-full border bg-white shadow-lg ring-0 transition-transform"
      )}
    />
  </SwitchPrimitives.Root>
));
DoubleSwitch.displayName = SwitchPrimitives.Root.displayName;

export { DoubleSwitch };