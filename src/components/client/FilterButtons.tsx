import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";

export default function FilterButtons() {
  const filterNames = ["Status", "Date"];
  return (
    <div className="flex gap-2">
      {filterNames.map((name) => (
        <Button key={name} variant="outline" size="sm" className="pr-2">
          {name} <ChevronDown className="ml-1" size={16} />
        </Button>
      ))}
    </div>
  );
}
