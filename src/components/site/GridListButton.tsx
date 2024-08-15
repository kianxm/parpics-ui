import { Grid, List } from "lucide-react";
import { Button } from "../ui/button";

interface GridListButtonProps {
  className?: string;
  onChange: (isGrid: boolean) => void;
}

export default function GridListButton({
  className,
  onChange,
}: GridListButtonProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        className={className}
        onClick={() => onChange(true)}
      >
        <Grid />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={className}
        onClick={() => onChange(false)}
      >
        <List />
      </Button>
    </div>
  );
}
