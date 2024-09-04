import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const tips = [
  {
    text: "Navigate with",
    keys: ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"],
    icons: ["←", "→", "↑", "↓"],
  },
  {
    text: "Zoom with",
    keys: ["w", "s"],
    icons: ["W", "S"],
  },
];

const KeyIcon = ({ icon, pressed }: { icon: string; pressed: boolean }) => (
  <span
    className={`w-[2.8vw] h-[2.8vw] flex justify-center items-center rounded-md ${
      pressed ? "bg-green-500 text-white" : "bg-gray-600 text-gray-200"
    } text-[1.4vw] font-bold`}
  >
    {icon}
  </span>
);

const KeyGrid = ({
  keys,
  icons,
  pressedKeys,
}: {
  keys: string[];
  icons: string[];
  pressedKeys: Set<string>;
}) => {
  if (keys.length === 2) {
    // Layout for 'w' and 's' keys
    return (
      <div className="grid grid-cols-1 gap-2 w-10">
        <KeyIcon icon={icons[0]} pressed={pressedKeys.has(keys[0])} />
        <KeyIcon icon={icons[1]} pressed={pressedKeys.has(keys[1])} />
      </div>
    );
  }
  // Layout for arrow keys
  return (
    <div className="grid grid-cols-3 gap-[0.5vw] w-[10vw]">
      <div className="col-span-1 gap-[0.5vw]"></div>
      <KeyIcon icon={icons[2]} pressed={pressedKeys.has(keys[2])} />
      <div className="cols-span-1"></div>
      <KeyIcon icon={icons[0]} pressed={pressedKeys.has(keys[0])} />
      <KeyIcon icon={icons[3]} pressed={pressedKeys.has(keys[3])} />
      <KeyIcon icon={icons[1]} pressed={pressedKeys.has(keys[1])} />
    </div>
  );
};

const NavigationTips = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [showTips, setShowTips] = useState(true);
  const [pressedKeys, setPressedKeys] = useState(new Set<string>());
  const [allTipsCompleted, setAllTipsCompleted] = useState(false);

  useEffect(() => {
    // Check if the user has completed the tips before
    const tipsCompleted = localStorage.getItem("navigationTipsCompleted");
    if (tipsCompleted === "true") {
      setShowTips(false);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      if (tips[currentTip].keys.includes(key)) {
        setPressedKeys((prevKeys) => new Set(prevKeys).add(key));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentTip]);

  useEffect(() => {
    if (pressedKeys.size === tips[currentTip].keys.length) {
      const timer = setTimeout(() => {
        if (currentTip === tips.length - 1) {
          setAllTipsCompleted(true);
          // Mark the tips as completed in localStorage
          localStorage.setItem("navigationTipsCompleted", "true");
          setTimeout(() => setShowTips(false), 2000);
        } else {
          setCurrentTip((prevTip) => prevTip + 1);
          setPressedKeys(new Set());
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [pressedKeys, currentTip]);

  if (!showTips) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="tips-container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="fixed flex bottom-4 right-4 bg-gray-800 text-white p-[1.8vw] rounded-lg shadow-lg w-fit gap-8"
      >
        <button
          onClick={() => {
            setShowTips(false);
            localStorage.setItem("navigationTipsCompleted", "true");
          }}
          className="absolute top-0 right-0 py-[1vh] text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-[1vw] w-[1vw]" />
        </button>
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTip}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-[1.4vw] flex items-center h-full leading-relaxed "
            >
              {tips[currentTip].text}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center">
          <KeyGrid
            keys={tips[currentTip].keys}
            icons={tips[currentTip].icons}
            pressedKeys={pressedKeys}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NavigationTips;
