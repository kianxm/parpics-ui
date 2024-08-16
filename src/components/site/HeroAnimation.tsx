import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EmojiAnimation() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const allIngredients = ["📸", "🎥", "📹", "📷", "🤳"];

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedTabIndex(
        (prevIndex) => (prevIndex + 1) % allIngredients.length
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [allIngredients.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedTabIndex ? selectedTabIndex : "empty"}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeInOut" }}
        className="text-7xl md:text-8xl my-4 md:my-8"
      >
        {allIngredients[selectedTabIndex]}
      </motion.div>
    </AnimatePresence>
  );
}
