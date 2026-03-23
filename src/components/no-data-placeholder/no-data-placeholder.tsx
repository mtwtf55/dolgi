import { Empty, EmptyDescription, EmptyHeader, EmptyMedia } from "@ui/empty";
import type { NoDataPlaceholderProps } from "./no-data-placeholder.types";
import { Info } from "lucide-react";

export const NoDataPlaceholder = ({
  title,
  description,
  className,
  noIcon = false,
}: NoDataPlaceholderProps) => {
  return (
    <Empty className={className}>
      {!noIcon && (
        <EmptyMedia variant="icon">
          <Info />
        </EmptyMedia>
      )}
      <EmptyHeader className="font-medium">{title}</EmptyHeader>
      {description && <EmptyDescription>{description}</EmptyDescription>}
    </Empty>
  );
};
