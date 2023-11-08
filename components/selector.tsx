import {
  Select,
  SelectIcon,
  SelectPortal,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { SelectContent, SelectItem } from "./ui/select";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useEffect } from "react";

interface SelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder: string;
  items: string[];
  onValueChange: (value: string) => void;
}

const Selector = ({
  placeholder,
  items,
  onValueChange,
  className,
}: SelectorProps) => {
  const ChevronDownIcon = Icons["chevronDown"];

  return (
    <Select onValueChange={onValueChange} value={placeholder}>
      <SelectTrigger
        className={cn(
          "select--trigger flex justify-between items-center gap-x-2 px-1 drop-shadow-none outline-none",
          className
        )}
      >
        <SelectValue>{placeholder}</SelectValue>
        <SelectIcon>
          <ChevronDownIcon className="h-4 w-4 rounded-md font-bold text-slate-400" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

interface SelectorLabeledProps extends SelectorProps {
  label: string;
  tooltipText?: string;
}
const SelectorLabeled = ({
  label,
  tooltipText,
  ...props
}: SelectorLabeledProps) => {
  const Info = Icons["infoSolid"];

  return (
    <div className="flex flex-row items-center">
      <div className="font-bold">{label}</div>
      {tooltipText && (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="hover:cursor-pointer">
                <Info className="h-4 w-4 text-gray-400 " />
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      <Selector {...props} />
    </div>
  );
};

interface DistributedSelectorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  placeholder: string;
  onValueChange: (value: string) => void;
  features: any;
}

const DistributedSelector = ({
  placeholder,
  onValueChange,
  className,
  features,
}: DistributedSelectorProps) => {
  const ChevronDownIcon = Icons["chevronDown"];

  return (
    <Select onValueChange={onValueChange} value={placeholder}>
      <SelectTrigger
        className={cn(
          "select--trigger flex justify-between items-center gap-x-2 px-1 drop-shadow-none outline-none",
          className
        )}
      >
        <SelectValue>{placeholder}</SelectValue>
        <SelectIcon>
          <ChevronDownIcon className="h-4 w-4 rounded-md font-bold text-slate-400" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          <div className="p-2">
            <div className="mb-4">
              <p className="pl-8 text-sm font-bold mb-1">Item features</p>
              {features[0]?.map((item: string, index: number) => {
                return (
                  <SelectItem key={index} value={item} className="py-0.5">
                    {item}
                  </SelectItem>
                );
              })}
            </div>
            <div>
              <p className="pl-8 text-sm font-bold mb-1">Event features</p>
              {features[1]?.map((item: string, index: number) => {
                return (
                  <SelectItem key={index} value={item} className="py-0.5">
                    {item}
                  </SelectItem>
                );
              })}
            </div>
          </div>
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export { Selector, SelectorLabeled, DistributedSelector };
