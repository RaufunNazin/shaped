import { cn } from "@/lib/utils"
import { EmptyPlaceholder } from "./empty-placeholder"

interface MessageBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
}

export function MessageBox({
  title,
  subtitle,
  children,
  className,
}: MessageBoxProps) {
  return (
    <EmptyPlaceholder
      className={cn("min-h-[200px] border-none p-4", className)}
    >
      <EmptyPlaceholder.Title className="mt-1 text-lg">
        {title}
      </EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description className="mb-1">
        {subtitle ?? children}
      </EmptyPlaceholder.Description>
    </EmptyPlaceholder>
  )
}
