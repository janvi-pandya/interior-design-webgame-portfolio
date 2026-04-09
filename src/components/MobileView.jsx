// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useGame } from "../context/GameContext";
import { portfolioData, objectOrder } from "../data/portfolio";
import Scene from "./Scene";

const objectLabels = {
  laptop: { emoji: "💻", name: "Laptop" },
  bookshelf: { emoji: "📚", name: "Bookshelf" },
  coffeeTable: { emoji: "☕", name: "Coffee Table" },
  wardrobe: { emoji: "🗄️", name: "Wardrobe" },
  plant: { emoji: "🌿", name: "Plant" },
  window: { emoji: "🪟", name: "Window" },
  diwanBed: { emoji: "🛏️", name: "Diwan Bed" },
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
    <div className="w-full h-screen flex flex-col">
      {/* 3D Room (responsive) */}
      <div className="flex-1 w-full">
        <Scene variant="mobile" />
      </div>

      {/* Bottom sheet controls */}
      <div
        className="w-full px-4 pt-3 pb-6 overflow-y-auto"
        style={{
          background: "rgba(255, 244, 230, 0.92)",
          backdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(74, 63, 92, 0.12)",
          maxHeight: "42vh",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-sm font-extrabold" style={{ color: "#4a3f5c" }}>
              Build the room
            </div>
            <div className="text-xs font-semibold" style={{ color: "#7a6b8a" }}>
              Unbox → drag items onto the shadow to place • {Math.round(progress)}%
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {objectOrder.map((id, i) => (
            <MobileCard key={id} id={id} index={i} />
          ))}
        </div>

        {isComplete && (
          <motion.div className="text-center mt-5 p-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-base font-extrabold" style={{ color: "#4a3f5c" }}>
              ✨ Finished! Thanks for exploring. ✨
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
