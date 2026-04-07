// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useGame } from "../context/GameContext";

export default function WelcomeScreen() {
  const { startGame, skipToFinished } = useGame();

  const handleSkip = () => {
    skipToFinished();
    startGame();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #0D4F4F 0%, #1A7A7A 30%, #D4488E 70%, #E8A838 100%)" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Decorative mandala circles */}
      <motion.div
        className="absolute"
        style={{
          width: "400px", height: "400px", borderRadius: "50%",
          border: "1px solid rgba(196, 132, 45, 0.2)",
          top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute"
        style={{
          width: "500px", height: "500px", borderRadius: "50%",
          border: "1px solid rgba(245, 214, 138, 0.15)",
          top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="text-center px-8 relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {/* Decorative top flourish */}
        <motion.div
          className="mb-2 text-sm tracking-widest"
          style={{ color: "#F5D68A", fontFamily: "'Quicksand', sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          — PORTFOLIO —
        </motion.div>

        <motion.div
          className="text-5xl mb-4"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          🪷
        </motion.div>

        <h1
          className="text-4xl md:text-5xl font-bold mb-2"
          style={{ color: "#FFF8F0", fontFamily: "'Quicksand', sans-serif", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
        >
          Welcome to Janvi&apos;s Room
        </h1>

        <p
          className="text-lg md:text-xl mb-10 max-w-md mx-auto"
          style={{ color: "#F5D68A" }}
        >
          Unbox objects to discover my world.
        </p>

        <div className="flex flex-col items-center gap-3">
          <motion.button
            onClick={startGame}
            className="px-10 py-4 rounded-full text-lg font-semibold text-white cursor-pointer border-none"
            style={{
              background: "linear-gradient(135deg, #C4842D, #E8A838)",
              boxShadow: "0 8px 32px rgba(196, 132, 45, 0.5)",
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(196, 132, 45, 0.7)" }}
            whileTap={{ scale: 0.95 }}
          >
            Start Exploring
          </motion.button>

          <motion.button
            onClick={handleSkip}
            className="px-6 py-2 rounded-full text-sm font-semibold cursor-pointer"
            style={{
              background: "rgba(255, 248, 240, 0.15)",
              border: "1px solid rgba(245, 214, 138, 0.4)",
              color: "#F5D68A",
              fontFamily: "'Quicksand', sans-serif",
              backdropFilter: "blur(4px)",
            }}
            whileHover={{ scale: 1.03, background: "rgba(255, 248, 240, 0.25)" }}
            whileTap={{ scale: 0.97 }}
          >
            Skip to Finished Room →
          </motion.button>
        </div>

        {/* Small decorative dots */}
        <motion.div
          className="mt-6 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {["#C4842D", "#D4488E", "#1A7A7A", "#E8A838", "#B22234"].map((c, i) => (
            <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: c, opacity: 0.7 }} />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
