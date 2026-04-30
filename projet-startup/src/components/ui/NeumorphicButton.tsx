import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary";
type Color =
  | "violet"
  | "red"
  | "blue"
  | "green"
  | "orange"
  | "indigo"
  | "white";

interface NeumorphicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  color?: Color;
  icon?: ReactNode;
  children: ReactNode;
}

const colorClasses: Record<Color, { gradient: string; text: string }> = {
  violet: {
    gradient:
      "from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700",
    text: "text-white",
  },
  red: {
    gradient: "from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700",
    text: "text-white",
  },
  blue: {
    gradient:
      "from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700",
    text: "text-white",
  },
  green: {
    gradient:
      "from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
    text: "text-white",
  },
  orange: {
    gradient:
      "from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700",
    text: "text-white",
  },
  indigo: {
    gradient:
      "from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700",
    text: "text-white",
  },
  white: {
    gradient: "from-gray-50 to-white hover:from-white hover:to-gray-50",
    text: "text-gray-800",
  },
};

export function NeumorphicButton({
  variant = "primary",
  color = "violet",
  icon,
  children,
  className = "",
  ...props
}: NeumorphicButtonProps) {
  const base =
    "flex flex-row items-center justify-center space-x-2 rounded-xl transition-all duration-300 ease-out active:scale-95 transform";

  const primaryClasses =
    "py-3 px-6 bg-linear-to-r " +
    colorClasses[color].text +
    " shadow-[4px_4px_8px_var(--neu-sm-dark),-4px_-4px_8px_var(--neu-sm-light)]" +
    " hover:shadow-[6px_6px_12px_var(--neu-sm-dark),-6px_-6px_12px_var(--neu-sm-light)]" +
    " hover:-translate-y-0.5 group relative overflow-hidden " +
    colorClasses[color].gradient;

  const secondaryClasses =
    "px-4 py-2 text-(--text-muted)" +
    " shadow-[4px_4px_8px_var(--neu-sm-dark),-4px_-4px_8px_var(--neu-sm-light)]" +
    " hover:shadow-[6px_6px_12px_var(--neu-sm-dark),-6px_-6px_12px_var(--neu-sm-light)]";

  const variantClasses =
    variant === "primary" ? primaryClasses : secondaryClasses;

  return (
    <button className={`${base} ${variantClasses} ${className}`} {...props}>
      {variant === "primary" && (
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700" />
      )}
      {icon && <span className="w-4 h-4">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
