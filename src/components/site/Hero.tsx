import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import EmojiAnimation from "./HeroAnimation";
import {
  IconBrandAirbnb,
  IconBrandGoogle,
  IconBrandMeta,
  IconBrandNetflix,
  IconBrandSpotify,
  IconBrandUber,
} from "@tabler/icons-react";

export default function Hero() {
  const companies = [
    {
      name: "Uber",
      logo: <IconBrandUber />,
    },
    {
      name: "Netflix",
      logo: <IconBrandNetflix />,
    },
    {
      name: "Spotify",
      logo: <IconBrandSpotify />,
    },
    {
      name: "Airbnb",
      logo: <IconBrandAirbnb />,
    },
    {
      name: "Google",
      logo: <IconBrandGoogle />,
    },
    {
      name: "Meta",
      logo: <IconBrandMeta />,
    },
  ];

  return (
    <div className="py-4 md:py-10 px-10 flex items-center flex-col text-center min-h-[650px] md:h-full">
      <EmojiAnimation />
      <motion.h1
        className="font-semibold text-4xl md:text-6xl lg:text-7xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        Streamline your
        <br />
        photography
        <br />
        workflow today.
      </motion.h1>
      <motion.p
        className="text-lg text-stone-500 font-normal pb-8 pt-4 max-w-96"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        All the tools you need to manage and grow your photography business,
        hassle free.
      </motion.p>
      <motion.div
        className="flex gap-4 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        <Button className="rounded-full bg-black">Join for free</Button>
        <Button
          variant="custom"
          className="rounded-full bg-transparent border-gray-200 text-black border group"
        >
          See our plans
          <ArrowRight
            size={16}
            className="bg-gray-200 rounded-full text-black ml-2 group-hover:translate-x-0.5 animate transition-transform duration-300"
          />
        </Button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
      >
        <p className="text-xs font-light text-stone-500 pb-4">
          Trusted by photographers from
        </p>
        <div className="hidden md:flex gap-8 text-stone-500/80 text-lg">
          {companies.map((company, index) => (
            <div key={index} className="flex gap-2 items-center">
              {company.logo}
              {company.name}
            </div>
          ))}
        </div>
        <div className="flex md:hidden gap-8 text-stone-500/80 text-lg">
          {companies.slice(0, 3).map((company, index) => (
            <div key={index} className="flex gap-2 items-center">
              {company.logo}
              {company.name}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
