import { createContext, useContext, useState, useCallback } from "react";
import { objectOrder } from "../data/portfolio";

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [unboxedItems, setUnboxedItems] = useState(new Set());
  const [activePanel, setActivePanel] = useState(null);
  const [currentBoxIndex, setCurrentBoxIndex] = useState(0);
  const [furniturePositions, setFurniturePositions] = useState({});
  const [showPlacementHint, setShowPlacementHint] = useState(null);

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

  const skipToFinished = useCallback(() => {
    const allItems = new Set(objectOrder);
    setUnboxedItems(allItems);
    setCurrentBoxIndex(objectOrder.length);
  }, []);

  const closePanel = useCallback(() => {
    setActivePanel(null);
  }, []);

  const isUnboxed = useCallback(
    (itemId) => unboxedItems.has(itemId),
    [unboxedItems]
  );

  const moveFurniture = useCallback((itemId, newPosition) => {
    setFurniturePositions((prev) => ({ ...prev, [itemId]: newPosition }));
    setShowPlacementHint(itemId);
    setTimeout(() => setShowPlacementHint(null), 2000);
  }, []);

  const getFurniturePosition = useCallback(
    (itemId) => furniturePositions[itemId] || null,
    [furniturePositions]
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
        skipToFinished,
        moveFurniture,
        getFurniturePosition,
        showPlacementHint,
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
