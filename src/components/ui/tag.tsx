import { FC } from "react";
import { cn } from "../../lib/utils";
import { CLIENT_PAID, CLIENT_UNPAID } from "../../utils/constants";

interface TagProps {
  text?: string | number;
  className?: string;
  icon?: JSX.Element;
}

const FORMAT_TAGS = {
  webp: "bg-green-100 text-green-700 font-semibold uppercase",
  jpeg: "bg-blue-100 text-blue-700 font-semibold uppercase",
  jpg: "bg-blue-100 text-blue-700 font-semibold uppercase",
  png: "bg-yellow-100 text-yellow-700 font-semibold uppercase",
  gif: "bg-purple-100 text-purple-700 font-semibold uppercase",
  // Add more formats as needed
};

const Tag: FC<TagProps> = ({ text, className = "", icon }) => {
  const baseStyle = "px-1.5 py-0.5 rounded text-xs";

  const tagStyle = (): string => {
    if (typeof text === "string" && FORMAT_TAGS[text]) {
      return FORMAT_TAGS[text];
    }

    switch (text) {
      case CLIENT_PAID: //success green
        return "bg-green-100 text-green-700 font-semibold uppercase";
      case "aid": //pending
        return "bg-stone-100 text-stone-700 font-semibold uppercase";
      case "Paid": //frozen
        return "bg-amber-50 text-amber-700 font-semibold uppercase";
      case CLIENT_UNPAID: //error red
        return "bg-red-50 text-red-700 font-semibold uppercase";
      case "Awaiting": //blue
        return "bg-blue-100 text-blue-700 font-semibold uppercase";
      case Number(text):
        return "bg-white border";
      default:
        return "bg-gray-200 text-gray-800 font-normal capitalize";
    }
  };

  return (
    <div>
      {text && (
        <span className={cn(baseStyle, tagStyle(), className)}>
          {icon}
          {text}
        </span>
      )}
    </div>
  );
};

export default Tag;
