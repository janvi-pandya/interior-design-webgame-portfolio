// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useGame } from "../context/GameContext";

export default function ProgressBar() {
  const { progress, isComplete, unboxedItems, skipToFinished } = useGame();

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
          background: "rgba(26, 42, 68, 0.85)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 24px rgba(26, 122, 122, 0.2)",
          border: "1px solid rgba(196, 132, 45, 0.3)",
        }}
      >
        <span className="text-sm font-semibold" style={{ color: "#F5D68A" }}>
          Room: {Math.round(progress)}%
        </span>
        <div
          className="flex-1 h-3 rounded-full overflow-hidden"
          style={{ background: "rgba(26, 122, 122, 0.3)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #1A7A7A, #C4842D, #D4488E)",
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <span className="text-sm" style={{ color: "#FFD699" }}>
          {unboxedItems.size}/6
        </span>
        {!isComplete && (
          <button
            onClick={skipToFinished}
            className="text-xs px-3 py-1 rounded-full cursor-pointer border-none font-semibold"
            style={{
              background: "rgba(196, 132, 45, 0.3)",
              color: "#F5D68A",
              border: "1px solid rgba(196, 132, 45, 0.5)",
            }}
          >
            Skip
          </button>
        )}
      </div>
      {isComplete && (
        <motion.div
          className="text-center mt-2 text-sm font-semibold"
          style={{ color: "#F5D68A", textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Thanks for exploring my world!
        </motion.div>
      )}
    </motion.div>
  );
}
