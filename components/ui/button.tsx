import * as React from "react";
import Link from "next/link";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

/* the is-enabled pseudo class is for anchor tags */
const buttonVariants = cva(
  "flex justify-center py-[11px] items-center rounded-2xl font-bold text-[13px] border-2 border-b-4 border-solid disabled:bg-light-grey",
  {
    variants: {
      variant: {
        default:
          "text-white disabled:text-disabled-grey border-[#58CC02] border-b-[#58A700] bg-[#58CC02] tracking-wider enabled:hover:brightness-110 is-enabled:hover:brightness-110 active:mb-1 enabled:active:border-b-0 is-enabled:active:border-b-0 enabled:active:translate-y-1 is-enabled:active:translate-y-1 disabled:border-0",
        secondary:
          "border-light-grey text-disabled-grey bg-transparent enabled:hover:brightness-90 is-enabled:hover:brightness-90 enabled:active:border-b-2 active:mb-0.5 is-enabled:active:border-b-2 enabled:active:translate-y-0.5 is-enabled:active:translate-y-0.5 disabled:border-0",
        tertiary:
          "text-white border-[#042C60] bg-transparent enabled:hover:brightness-90 is-enabled:hover:brightness-90 enabled:active:border-b-2 active:mb-0.5 is-enabled:active:border-b-2 enabled:active:translate-y-0.5 is-enabled:active:translate-y-0.5 disabled:border-0",
        noStyling: "reset",
        tab: "bg-[#DDF4FF] py-2 px-4 border-[#84D8FF] border-b-2 disabled:border-0 gap-4 justify-start font-bold text-[14px] text-dark-blue-sky",
        level:
          "py-[13.5px] rounded-[31px] enabled:border-[#58CC02] is-enabled:border-[#58CC02] enabled:border-b-[#58A700] is-enabled:border-b-[#58A700] enabled:bg-[#58CC02] is-enabled:bg-[#58CC02] tracking-wider enabled:hover:brightness-110 is-enabled:hover:brightness-110 enabled:active:border-b-0 is-enabled:active:border-b-0 enabled:active:translate-y-1 is-enabled:active:translate-y-1 disabled:border-light-grey disabled:border-b-[#B7B7B7] border-b-8",
      },
      size: {
        default: "w-[90vw] sm:w-[320px]",
        fit: "w-fit",
        level: "w-[70px]",
        full: "w-full",
        arbitrary: "w-auto",
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
