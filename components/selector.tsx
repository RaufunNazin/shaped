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
        <SelectValue>
          {placeholder}
        </SelectValue>
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

export { Selector, SelectorLabeled };
