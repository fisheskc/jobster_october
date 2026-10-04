'use client';

import { Button } from "@/components/ui/button";
import { FaRegHeart } from "react-icons/fa";
import { cn } from "@/lib/utils";

type btnSize = 'default' | 'lg' | 'sm' | 'icon' | 'icon-sm' | 'icon-lg';

interface SubmitButtonProps {
  className?: string;
  text?: string;
  size?: btnSize;
}

export const CardSignInButton = () => {
  return (
    <Button
      size="icon"
      variant="outline"
      className="p-2 cursor-pointer"
      onClick={() => window.location.href = "/sign-in"}
    >
      <FaRegHeart />
    </Button>
  );
};

export function SubmitButton({
  className = "",
  text = "submit",
  size = "lg",
}: SubmitButtonProps) {
  return (
    <Button
      className={cn("capitalize", className)}
      size={size}
    >
      {text}
    </Button>
  );
}