import { TextClassContext } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import type { LucideIcon, LucideProps } from "lucide-react-native";
import * as React from "react";

type IconProps = LucideProps & {
  as: LucideIcon;
};

function Icon({ as: IconComponent, className, size = 14, ...props }: IconProps) {
  const textClass = React.useContext(TextClassContext);
  return (
    <IconComponent className={cn("text-foreground", textClass, className)} size={size} {...props} />
  );
}

export { Icon };
