import * as React from "react";
import Link from "next/link";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "bg-[#F7F7F7] rounded-2xl border-solid border-2 border-light-grey placeholder:text-disabled-grey text-dark-grey font-medium px-5 focus:border-blue-sky focus:outline-none",
  {
    variants: {
      variant: {
        default: "",
      },
      size: {
        default: "w-full h-[50px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <input
        className={cn(inputVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
