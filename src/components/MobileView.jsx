// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useGame } from "../context/GameContext";
import { portfolioData, objectOrder } from "../data/portfolio";

const objectLabels = {
  laptop: { emoji: "💻", name: "Laptop" },
  bookshelf: { emoji: "📚", name: "Bookshelf" },
  coffeeTable: { emoji: "☕", name: "Coffee Table" },
  wardrobe: { emoji: "🗄️", name: "Wardrobe" },
  plant: { emoji: "🌿", name: "Plant" },
  window: { emoji: "🪟", name: "Window" },
};

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
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 20px rgba(207, 200, 255, 0.2)",
            border: "1px solid rgba(207, 200, 255, 0.3)",
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">{label.emoji}</span>
            <div>
              <h3 className="text-base font-bold" style={{ color: "#4a3f5c", fontFamily: "'Quicksand', sans-serif" }}>
                {data.title}
              </h3>
              <p className="text-xs" style={{ color: "#7a6b8a" }}>
                {data.subtitle}
              </p>
            </div>
            <span className="ml-auto text-lg" style={{ color: "#CFC8FF" }}>→</span>
          </div>
        </motion.button>
      ) : (
        <motion.button
          onClick={() => unboxItem(id)}
          className="w-full p-5 rounded-2xl text-center cursor-pointer border-none"
          style={{
            background: "linear-gradient(135deg, rgba(207, 200, 255, 0.3), rgba(246, 201, 214, 0.3))",
            border: "2px dashed rgba(207, 200, 255, 0.5)",
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          animate={{ boxShadow: ["0 0 20px rgba(207, 200, 255, 0.2)", "0 0 30px rgba(207, 200, 255, 0.4)", "0 0 20px rgba(207, 200, 255, 0.2)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">📦</span>
            <span className="font-semibold" style={{ color: "#4a3f5c", fontFamily: "'Quicksand', sans-serif" }}>
              Unbox {label.name}
            </span>
          </div>
        </motion.button>
      )}
    </motion.div>
  );
}

export default function MobileView() {
  const { progress, isComplete } = useGame();

  return (
    <div
      className="min-h-screen p-4 pb-20 overflow-y-auto"
      style={{ background: "linear-gradient(180deg, #FFF4E6 0%, #E8E0FF 100%)" }}
    >
      {/* Header */}
      <div className="text-center mb-6 pt-2">
        <h1
          className="text-2xl font-bold mb-1"
          style={{ color: "#4a3f5c", fontFamily: "'Quicksand', sans-serif" }}
        >
          🏠 My Dream Room
        </h1>
        <p className="text-sm" style={{ color: "#7a6b8a" }}>
          Tap to unbox and explore
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6 px-2">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold" style={{ color: "#4a3f5c" }}>
            {Math.round(progress)}%
          </span>
          <div
            className="flex-1 h-2 rounded-full overflow-hidden"
            style={{ background: "rgba(207, 200, 255, 0.3)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #CFC8FF, #F6C9D6)" }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

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
          <p className="text-lg font-bold" style={{ color: "#4a3f5c" }}>
            ✨ Thanks for exploring my world! ✨
          </p>
        </motion.div>
      )}
    </div>
  );
}
