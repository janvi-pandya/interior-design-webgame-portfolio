// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useGame } from "../context/GameContext";

export default function ProgressBar() {
  const { progress, isComplete, unboxedItems } = useGame();

  return (
    <motion.div
      className="fixed top-4 left-1/2 z-40 -translate-x-1/2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div
        className="rounded-full px-6 py-3 flex items-center gap-4 min-w-64"
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 24px rgba(207, 200, 255, 0.3)",
        }}
      >
        <span className="text-sm font-semibold" style={{ color: "#4a3f5c" }}>
          Room: {Math.round(progress)}%
        </span>
        <div
          className="flex-1 h-3 rounded-full overflow-hidden"
          style={{ background: "rgba(207, 200, 255, 0.3)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #CFC8FF, #F6C9D6, #CDE7FF)",
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <span className="text-sm" style={{ color: "#7a6b8a" }}>
          {unboxedItems.size}/6
        </span>
      </div>
      {isComplete && (
        <motion.div
          className="text-center mt-2 text-sm font-semibold"
          style={{ color: "#4a3f5c" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ✨ Thanks for exploring my world! ✨
        </motion.div>
      )}
    </motion.div>
  );
}
