import React, { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

interface props {
  placeholder: string;
  items: string[];
  onValueChange: (option: string) => void;
  className?: string;
}

const SelectorLight = ({ placeholder, items, onValueChange, className }: props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<any>(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: string) => {
    setIsOpen(false);
    onValueChange(option);
  };

  const handleClickOutside = (event: any) => {
    if (selectorRef.current && !selectorRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectorRef} className={`relative ${className}`}>
      <button
        className="flex w-full px-3 py-2 items-center justify-between rounded-md bg-transparent placeholder:text-slate-400 focus:outline-none focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50"
        onClick={handleToggle}
      >
        {placeholder}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>

      {isOpen && (
        <div className="absolute top-0 left-0 z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-100 bg-white text-slate-700 shadow-md animate-in fade-in-80 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400">
          {items.map((option) => (
            <div
              key={option}
              className="relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 font-medium outline-none hover:bg-slate-100 m-1 focus:bg-slate-100 dark:focus:bg-slate-700"
              onClick={() => handleSelect(option)}
            >
              {placeholder === option && (
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                  <Check className="h-4 w-4" />
                </span>
              )}
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectorLight;
