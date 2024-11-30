import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";

interface IToolTipProps {
  onClick: (e: React.FormEvent) => void;
  buttonTitle: string;
  tooltipContent: string;
}

export function ToolTip({
  onClick,
  buttonTitle,
  tooltipContent,
}: IToolTipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" onClick={onClick}>
            {buttonTitle}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
