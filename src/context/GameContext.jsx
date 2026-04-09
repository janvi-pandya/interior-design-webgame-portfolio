import { createContext, useContext, useMemo, useState, useCallback } from "react";
import { objectOrder } from "../data/portfolio";

const GameContext = createContext(null);

const defaultPositions = {
  // NOTE: Y values are set so each model sits on the floor (y≈0).
  laptop: [-1.5, 2.05, -2],
  bookshelf: [-4.5, 1.5, -4],
  coffeeTable: [0, 0.98, 1],
  wardrobe: [4, 1.4, -4.5],
  plant: [3, 0.5, 1.5],
  window: [-4, 3.5, -5.85],
  diwanBed: [1.8, 0.75, -1.2],
};

export function GameProvider({ children }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [unboxedItems, setUnboxedItems] = useState(new Set());
  const [placedItems, setPlacedItems] = useState(new Set());
  const [activePanel, setActivePanel] = useState(null);
  const [currentBoxIndex, setCurrentBoxIndex] = useState(0);
  const [positions, setPositions] = useState(defaultPositions);
  const [isDragging, setIsDragging] = useState(false);
  const [roomTheme, setRoomTheme] = useState({
    floor: "#FFF4E6",
    backWall: "#E8E0FF",
    leftWall: "#FFF0E8",
    trim: "#E8D5C0",
    accent: "#F6C9D6",
  });

  const [objectTheme, setObjectTheme] = useState({
    laptop: {
      deskTop: "#E8D5C0",
      laptopBase: "#CFC8FF",
      laptopScreen: "#7B6EA4",
      keycaps: "#FFF4E6",
      metal: "#E2B04A",
    },
    mirror: {
      frame: "#E2B04A",
      glass: "#CDE7FF",
      accents: "#FFD6C9",
    },
  });

  const themePresets = useMemo(
    () => [
      {
        id: "lavender-lilac",
        name: "Lavender Lilac (default)",
        theme: {
          floor: "#FFF4E6",
          backWall: "#E8E0FF",
          leftWall: "#FFF0E8",
          trim: "#E8D5C0",
          accent: "#F6C9D6",
        },
      },
      {
        id: "soft-lilac",
        name: "Soft Lilac",
        theme: {
          floor: "#FFF7EE",
          backWall: "#EEE9FF",
          leftWall: "#FDECF2",
          trim: "#E6D2C2",
          accent: "#CFC8FF",
        },
      },
      {
        id: "mint-rose",
        name: "Mint + Rose",
        theme: {
          floor: "#FFF4E6",
          backWall: "#EAF7F3",
          leftWall: "#FFE9F1",
          trim: "#E8D5C0",
          accent: "#F6C9D6",
        },
      },
    ],
    []
  );

  const progress = (placedItems.size / objectOrder.length) * 100;
  const isComplete = placedItems.size === objectOrder.length;
  const nextItem = objectOrder[currentBoxIndex] || null;

  const startGame = useCallback((opts) => {
    const skip = Boolean(opts?.skipUnboxing);
    setGameStarted(true);
    if (skip) {
      setUnboxedItems(new Set(objectOrder));
      setPlacedItems(new Set(objectOrder));
      setActivePanel(null);
      setCurrentBoxIndex(objectOrder.length);
    }
  }, []);

  const skipToFinished = useCallback(() => {
    setGameStarted(true);
    setUnboxedItems(new Set(objectOrder));
    setPlacedItems(new Set(objectOrder));
    setActivePanel(null);
    setCurrentBoxIndex(objectOrder.length);
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

  const isPlaced = useCallback((itemId) => placedItems.has(itemId), [placedItems]);

  const markPlaced = useCallback((itemId) => {
    setPlacedItems((prev) => {
      const next = new Set(prev);
      next.add(itemId);
      return next;
    });
  }, []);

  const setItemPosition = useCallback((itemId, nextPos) => {
    setPositions((prev) => ({ ...prev, [itemId]: nextPos }));
  }, []);

  const resetLayout = useCallback(() => {
    setPositions(defaultPositions);
  }, []);

  const snapTargets = useMemo(
    () => ({
      laptop: [
        { pos: [-1.5, 2.05, -2], hint: "Desk looks great near the wall." },
        { pos: [-2.6, 2.05, -3.1], hint: "Try an angle for a cozy work corner." },
      ],
      bookshelf: [
        { pos: [-4.5, 1.5, -4], hint: "Bookshelves feel natural against the wall." },
        { pos: [-5.2, 1.5, -2.6], hint: "Tuck it into the corner for symmetry." },
      ],
      coffeeTable: [
        { pos: [0, 0.98, 1], hint: "Center it on the rug." },
        { pos: [1.2, 0.98, 0.2], hint: "Offset slightly for a lounge vibe." },
      ],
      wardrobe: [
        { pos: [4, 1.4, -4.5], hint: "Wardrobe works best by the back wall." },
        { pos: [4.8, 1.4, -3.2], hint: "Try placing it closer for accessibility." },
      ],
      plant: [
        { pos: [3, 0.5, 1.5], hint: "Plants brighten corners." },
        { pos: [-2.8, 0.5, 0.8], hint: "Near the window is a classic." },
      ],
      window: [{ pos: [-4, 3.5, -5.85], hint: "Keep the window on the wall." }],
      diwanBed: [
        { pos: [1.8, 0.75, -1.2], hint: "A cozy daybed looks great near the rug." },
        { pos: [2.8, 0.75, -2.0], hint: "Try placing it closer to the bed for balance." },
      ],
    }),
    []
  );

  return (
    <GameContext.Provider
      value={{
        gameStarted,
        startGame,
        skipToFinished,
        unboxedItems,
        placedItems,
        unboxItem,
        activePanel,
        setActivePanel,
        closePanel,
        progress,
        isComplete,
        isUnboxed,
        isPlaced,
        markPlaced,
        nextItem,
        currentBoxIndex,
        positions,
        setItemPosition,
        resetLayout,
        snapTargets,
        isDragging,
        setIsDragging,
        roomTheme,
        setRoomTheme,
        themePresets,
        totalItems: objectOrder.length,
        objectTheme,
        setObjectTheme,
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
