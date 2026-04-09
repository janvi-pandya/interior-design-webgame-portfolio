// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useGame } from "../context/GameContext";

export default function WelcomeScreen() {
  const { startGame, skipToFinished } = useGame();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #FFF4E6 0%, #CFC8FF 50%, #F6C9D6 100%)" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="text-center px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.div
          className="text-6xl mb-6"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          🏠
        </motion.div>

        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: "#4a3f5c", fontFamily: "'Quicksand', sans-serif" }}
        >
          Welcome to my dream room.
        </h1>

        <p
          className="text-lg md:text-xl mb-10 max-w-md mx-auto"
          style={{ color: "#7a6b8a" }}
        >
          Unbox furniture to discover my portfolio — or jump straight to the finished room.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <motion.button
            onClick={() => startGame({ skipUnboxing: false })}
            className="px-10 py-4 rounded-full text-lg font-semibold text-white cursor-pointer border-none"
            style={{
              background: "linear-gradient(135deg, #CFC8FF, #F6C9D6)",
              boxShadow: "0 8px 32px rgba(207, 200, 255, 0.4)",
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(207, 200, 255, 0.6)" }}
            whileTap={{ scale: 0.95 }}
          >
            ✨ Start Unboxing
          </motion.button>

          <motion.button
            onClick={skipToFinished}
            className="px-10 py-4 rounded-full text-lg font-semibold cursor-pointer"
            style={{
              background: "rgba(255, 244, 230, 0.65)",
              color: "#4a3f5c",
              border: "1px solid rgba(74, 63, 92, 0.18)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 26px rgba(74, 63, 92, 0.12)",
            }}
            whileHover={{ scale: 1.03, boxShadow: "0 12px 36px rgba(74, 63, 92, 0.16)" }}
            whileTap={{ scale: 0.97 }}
          >
            🏁 Finished Room
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
