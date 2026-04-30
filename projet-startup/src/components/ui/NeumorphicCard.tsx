import { clsx } from "clsx";

interface NeumorphicCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

export const NeumorphicCard: React.FC<NeumorphicCardProps> = ({
  children,
  className,
  hover = false,
  padding,
}) => {
  const paddingClasses: Record<string, string> = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };
  return (
    <div
      className={clsx(
        "rounded-2xl transition-all duration-300 ease-out",
        "bg-(--card-bg)",
        "shadow-[8px_8px_16px_var(--neu-dark),-8px_-8px_16px_var(--neu-light)]",
        hover &&
          "hover:shadow-[12px_12px_24px_var(--neu-dark),-12px_-12px_24px_var(--neu-light)] hover:-translate-y-1",
        padding && paddingClasses[padding],
        className,
      )}
    >
      {children}
    </div>
  );
};
