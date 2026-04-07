import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { GameProvider, useGame } from "./context/GameContext";
import WelcomeScreen from "./components/WelcomeScreen";
import Scene from "./components/Scene";
import ProgressBar from "./components/ProgressBar";
import ContentPanel from "./components/ContentPanel";
import MobileView from "./components/MobileView";

function GameContent() {
  const { gameStarted } = useGame();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <AnimatePresence>{!gameStarted && <WelcomeScreen />}</AnimatePresence>

      {gameStarted && (
        <>
          {isMobile ? (
            <MobileView />
          ) : (
            <div className="w-full h-screen">
              <Scene />
            </div>
          )}
          <ProgressBar />
          <ContentPanel />
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}
