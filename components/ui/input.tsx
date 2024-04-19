import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "bg-[#F7F7F7] rounded-2xl border-solid border-2 border-light-grey placeholder:text-disabled-grey text-dark-grey font-medium px-5 focus:border-blue-sky focus:outline-none",
  {
    variants: {
      variant: {
        default: "",
      },
      SIZE: {
        default: "w-full h-[50px]",
      },
    },
    defaultVariants: {
      variant: "default",
      SIZE: "default",
    },
  }
);

// SIZE should be all caps because the input element already has a size attribute

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface InputProps extends VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, SIZE, ...props }, ref) => {
    return (
      <input
        className={cn(inputVariants({ variant, SIZE, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
