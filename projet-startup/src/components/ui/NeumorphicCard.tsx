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
        "bg-gray-100 rounded-2xl transition-all duration-300 ease-out",

        "shadow-[8px_8px_16px_#b8b8b8,-8px_-8px_16px_#ffffff]",
        hover &&
          "hover:shadow-[12px_12px_24px_#b8b8b8,-12px_-12px_24px_#ffffff] hover:-translate-y-1",
        padding && paddingClasses[padding],
        className,
      )}
    >
      {children}
    </div>
  );
};
