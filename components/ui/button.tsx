import * as React from "react";
import Link from "next/link";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

/* the is-enabled pseudo class is for anchor tags */
const buttonVariants = cva(
  "flex justify-center py-[11px] items-center rounded-2xl font-bold text-[13px] text-white border-2 border-b-4 border-solid disabled:text-disabled-grey disabled:bg-light-grey disabled:border-0",
  {
    variants: {
      variant: {
        default:
          "border-[#58CC02] border-b-[#58A700] bg-[#58CC02] tracking-wider enabled:hover:brightness-110 is-enabled:hover:brightness-110 active:mb-1 enabled:active:border-b-0 is-enabled:active:border-b-0 enabled:active:translate-y-1 is-enabled:active:translate-y-1",
        secondary:
          "border-[#042C60] bg-transparent enabled:hover:brightness-90 is-enabled:hover:brightness-90 enabled:active:border-b-2 active:mb-0.5 is-enabled:active:border-b-2 enabled:active:translate-y-0.5 is-enabled:active:translate-y-0.5",
        noStyling: "reset ",
      },
      size: {
        default: "w-[320px]",
        fit: "w-fit",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, href, variant, size, ...props }, ref) => {
    if (href) {
      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size, className }))}
        >
          {children}
        </Link>
      );
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
