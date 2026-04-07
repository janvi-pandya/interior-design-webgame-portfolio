// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useGame } from "../context/GameContext";
import { portfolioData, objectOrder, objectLabels } from "../data/portfolio";

function MobileCard({ id, index }) {
  const { isUnboxed, unboxItem, setActivePanel, nextItem } = useGame();
  const unboxed = isUnboxed(id);
  const isNext = nextItem === id;
  const data = portfolioData[id];
  const label = objectLabels[id];

  if (!isNext && !unboxed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="w-full"
    >
      {unboxed ? (
        <motion.button
          onClick={() => setActivePanel(id)}
          className="w-full p-5 rounded-2xl text-left cursor-pointer border-none"
          style={{
            background: "rgba(255, 248, 240, 0.9)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 20px rgba(26, 122, 122, 0.1)",
            border: "1px solid rgba(196, 132, 45, 0.2)",
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">{label.emoji}</span>
            <div>
              <h3 className="text-base font-bold" style={{ color: "#1A7A7A", fontFamily: "'Quicksand', sans-serif" }}>
                {data.title}
              </h3>
              <p className="text-xs" style={{ color: "#C4842D" }}>
                {data.subtitle}
              </p>
            </div>
            <span className="ml-auto text-lg" style={{ color: "#C4842D" }}>→</span>
          </div>
        </motion.button>
      ) : (
        <motion.button
          onClick={() => unboxItem(id)}
          className="w-full p-5 rounded-2xl text-center cursor-pointer border-none"
          style={{
            background: "linear-gradient(135deg, rgba(26, 122, 122, 0.15), rgba(196, 132, 45, 0.15))",
            border: "2px dashed rgba(196, 132, 45, 0.4)",
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          animate={{ boxShadow: ["0 0 20px rgba(196, 132, 45, 0.1)", "0 0 30px rgba(196, 132, 45, 0.3)", "0 0 20px rgba(196, 132, 45, 0.1)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">🎁</span>
            <span className="font-semibold" style={{ color: "#1A7A7A", fontFamily: "'Quicksand', sans-serif" }}>
              Unbox {label.name}
            </span>
          </div>
        </motion.button>
      )}
    </motion.div>
  );
}

export default function MobileView() {
  const { progress, isComplete, skipToFinished } = useGame();

  return (
    <div
      className="min-h-screen p-4 pb-20 overflow-y-auto"
      style={{ background: "linear-gradient(180deg, #0D4F4F 0%, #1A5555 50%, #2A4A5A 100%)" }}
    >
      {/* Header */}
      <div className="text-center mb-6 pt-2">
        <h1
          className="text-2xl font-bold mb-1"
          style={{ color: "#F5D68A", fontFamily: "'Quicksand', sans-serif" }}
        >
          🪷 Janvi&apos;s Room
        </h1>
        <p className="text-sm" style={{ color: "#FFD699" }}>
          Tap to unbox and explore
        </p>
      </div>

      {/* Progress */}
      <div className="mb-4 px-2">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold" style={{ color: "#F5D68A" }}>
            {Math.round(progress)}%
          </span>
          <div
            className="flex-1 h-2 rounded-full overflow-hidden"
            style={{ background: "rgba(26, 122, 122, 0.3)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #1A7A7A, #C4842D, #D4488E)" }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Skip button */}
      {!isComplete && (
        <div className="text-center mb-4">
          <button
            onClick={skipToFinished}
            className="text-xs px-4 py-1.5 rounded-full cursor-pointer font-semibold"
            style={{
              background: "rgba(196, 132, 45, 0.2)",
              border: "1px solid rgba(196, 132, 45, 0.4)",
              color: "#F5D68A",
            }}
          >
            Skip to Finished Room →
          </button>
        </div>
      )}

      {/* Cards */}
      <div className="space-y-3">
        {objectOrder.map((id, i) => (
          <MobileCard key={id} id={id} index={i} />
        ))}
      </div>

      {isComplete && (
        <motion.div
          className="text-center mt-8 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-lg font-bold" style={{ color: "#F5D68A" }}>
            Thanks for exploring my world!
          </p>
        </motion.div>
      )}
    </div>
  );
}
