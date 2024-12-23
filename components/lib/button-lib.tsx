import { cn } from "@/lib/utils";
import { ReactNode } from "react";
interface ButtonProps {
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "secondary" | "success" | "danger";
  onclickFunc: () => void;
  //   className :
  //   startIcon?: any;
  //   endIcon?: any;
}

const ButtonUI = (props: ButtonProps) => {
  return (
    <button
      className={cn(
        " rounded-md font-sans",
        {
          " bg-black border border-white text-white":
            props.variant === "primary",
          " bg-white text-black": props.variant === "secondary",
          " bg-green-400 text-black": props.variant === "success",
          " text-black bg-red-500": props.variant === "danger",
          default: "primary",
        },
        {
          " text-sm py-1 px-2": props.size === "sm",
          " px-2 py-1 text-base": props.size === "md",
          " px-3 py-2 text-lg": props.size === "lg",
          default: "md",
        }
      )}
    >
      {props.children}
    </button>
  );
};
export default ButtonUI;
