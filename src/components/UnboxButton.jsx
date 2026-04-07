import { Html } from "@react-three/drei";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function UnboxButton({ position, onClick, label }) {
  return (
    <Html position={position} center>
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="px-4 py-2 rounded-full text-sm font-semibold cursor-pointer border-none whitespace-nowrap"
        style={{
          background: "linear-gradient(135deg, #C4842D, #E8A838)",
          color: "#FFF8F0",
          boxShadow: "0 4px 16px rgba(196, 132, 45, 0.5)",
          fontFamily: "'Quicksand', sans-serif",
          border: "1px solid rgba(245, 214, 138, 0.4)",
        }}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.1, 1] }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🎁 {label}
      </motion.button>
    </Html>
  );
}
