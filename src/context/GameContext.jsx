import { createContext, useContext, useState, useCallback } from "react";
import { objectOrder } from "../data/portfolio";

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [unboxedItems, setUnboxedItems] = useState(new Set());
  const [activePanel, setActivePanel] = useState(null);
  const [currentBoxIndex, setCurrentBoxIndex] = useState(0);

  const progress = (unboxedItems.size / objectOrder.length) * 100;
  const isComplete = unboxedItems.size === objectOrder.length;
  const nextItem = objectOrder[currentBoxIndex] || null;

  const startGame = useCallback(() => {
    setGameStarted(true);
  }, []);

  const unboxItem = useCallback(
    (itemId) => {
      setUnboxedItems((prev) => {
        const next = new Set(prev);
        next.add(itemId);
        return next;
      });
      setActivePanel(itemId);
      const idx = objectOrder.indexOf(itemId);
      if (idx >= currentBoxIndex) {
        setCurrentBoxIndex(idx + 1);
      }
    },
    [currentBoxIndex]
  );

  const closePanel = useCallback(() => {
    setActivePanel(null);
  }, []);

  const isUnboxed = useCallback(
    (itemId) => unboxedItems.has(itemId),
    [unboxedItems]
  );

  return (
    <GameContext.Provider
      value={{
        gameStarted,
        startGame,
        unboxedItems,
        unboxItem,
        activePanel,
        setActivePanel,
        closePanel,
        progress,
        isComplete,
        isUnboxed,
        nextItem,
        currentBoxIndex,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within a GameProvider");
  return ctx;
}
