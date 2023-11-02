import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface TitleInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  tooltipText?: string;
}

export default function TitleInfo({
  title,
  tooltipText,
  className,
}: TitleInfoProps) {
  const Info = Icons["infoSolid"];
  return (
    <div
      className={cn("flex flex-row items-center justify-between", className)}
    >
      <span className="text-xl font-bold">{title}</span>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="hover:cursor-pointer">
              <Info className="ml-4 h-4 w-4 text-gray-400 " />
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>{tooltipText ? tooltipText : title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
