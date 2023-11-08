"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-md bg-slate-100 p-1 dark:bg-slate-800",
      className
    )}
    {...props}
  >
    {React.Children.map(props.children, (child, index) => {
      const isFirst = index === 0
      const isLast = index === React.Children.count(props.children) - 1

      return React.cloneElement(child as React.ReactElement, {
        className: cn(
          child,
          isFirst && "rounded-l-md",
          isLast && "rounded-r-md"
        ),
      })
    })}
  </TabsPrimitive.List>
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    className={cn(
      "inline-flex min-w-[100px] items-center justify-center rounded-[0.185rem] px-3 py-1.5  text-sm font-medium text-slate-700 transition-all  disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm dark:text-slate-200 dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-slate-100",
      className
    )}
    {...props}
    ref={ref}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const tabVariants = cva("", {
  variants: {
    variant: {
      active: "border border-indigo-600 bg-indigo-50 text-indigo-500",
      inactive: "border border-gray-300 bg-white text-gray-600",
    },
  },
  defaultVariants: {
    variant: "inactive",
  },
})

const CustomTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    activeValue: string
  }
>(({ className, value, activeValue, ...props }, ref) => (
  <TabsPrimitive.Trigger
    className={cn(
      "inline-flex min-w-[100px] items-center justify-center  px-3 py-1.5  text-sm font-medium text-slate-700 transition-all  disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-500 data-[state=active]:shadow-sm dark:text-slate-200 dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-slate-100",
      value === activeValue
        ? tabVariants({ variant: "active" })
        : tabVariants({ variant: "inactive" }),
      className
    )}
    {...props}
    value={value}
    ref={ref}
  />
))
CustomTabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    className={cn(
      "mt-2 rounded-md border border-slate-200 p-6 dark:border-slate-700",
      className
    )}
    {...props}
    ref={ref}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, CustomTabsTrigger, TabsContent }
