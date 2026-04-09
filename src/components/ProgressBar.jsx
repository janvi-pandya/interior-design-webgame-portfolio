// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useGame } from "../context/GameContext";
import { useMemo, useState } from "react";

export default function ProgressBar() {
  const {
    progress,
    isComplete,
    placedItems,
    resetLayout,
    themePresets,
    setRoomTheme,
    roomTheme,
    totalItems,
    objectTheme,
    setObjectTheme,
  } =
    useGame();
  const [themeOpen, setThemeOpen] = useState(false);
  const [objectOpen, setObjectOpen] = useState(false);

  const presets = useMemo(() => themePresets || [], [themePresets]);

  return (
    <motion.div
      className="fixed top-4 left-1/2 z-40 -translate-x-1/2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="relative">
        <div
          className="rounded-full px-6 py-3 flex items-center gap-4 min-w-64"
          style={{
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 24px rgba(207, 200, 255, 0.3)",
          }}
        >
          <span className="text-sm font-semibold" style={{ color: "#4a3f5c" }}>
            Room: {Math.round(progress)}%
          </span>
          <div
            className="flex-1 h-3 rounded-full overflow-hidden"
            style={{ background: "rgba(207, 200, 255, 0.3)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #CFC8FF, #F6C9D6, #CDE7FF)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <span className="text-sm" style={{ color: "#7a6b8a" }}>
            {placedItems.size}/{totalItems}
          </span>
          <button
            onClick={resetLayout}
            className="ml-1 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer border-none"
            style={{
              background: "rgba(246, 201, 214, 0.35)",
              color: "#4a3f5c",
            }}
            title="Reset furniture layout"
          >
            Reset
          </button>
          <button
            onClick={() => setThemeOpen((v) => !v)}
            className="px-3 py-1 rounded-full text-xs font-semibold cursor-pointer border-none"
            style={{
              background: "rgba(207, 200, 255, 0.35)",
              color: "#4a3f5c",
            }}
            title="Change wall colors"
          >
            Theme
          </button>
          <button
            onClick={() => setObjectOpen((v) => !v)}
            className="px-3 py-1 rounded-full text-xs font-semibold cursor-pointer border-none"
            style={{
              background: "rgba(205, 231, 255, 0.35)",
              color: "#4a3f5c",
            }}
            title="Customize furniture colors"
          >
            Objects
          </button>
        </div>

        {themeOpen && (
          <div
            className="absolute left-1/2 -translate-x-1/2 mt-2 w-[340px] rounded-2xl p-3"
            style={{
              zIndex: 60,
              pointerEvents: "auto",
              background: "rgba(255, 244, 230, 0.92)",
              border: "1px solid rgba(74, 63, 92, 0.14)",
              backdropFilter: "blur(18px)",
              boxShadow: "0 18px 50px rgba(74, 63, 92, 0.18)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-extrabold" style={{ color: "#4a3f5c" }}>
                Wall colors
              </div>
              <button
                onClick={() => setThemeOpen(false)}
                className="w-8 h-8 rounded-full border-none cursor-pointer text-lg"
                style={{ background: "rgba(207, 200, 255, 0.25)", color: "#4a3f5c" }}
                title="Close"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {presets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setRoomTheme(p.theme)}
                  className="w-full text-left rounded-xl px-3 py-2 border-none cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    boxShadow: "0 6px 18px rgba(207, 200, 255, 0.18)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[p.theme.backWall, p.theme.leftWall, p.theme.floor, p.theme.accent].map((c) => (
                        <span
                          key={c}
                          style={{
                            width: 14,
                            height: 14,
                            borderRadius: 999,
                            background: c,
                            border: "1px solid rgba(74, 63, 92, 0.14)",
                            display: "inline-block",
                          }}
                        />
                      ))}
                    </div>
                    <div className="text-xs font-extrabold" style={{ color: "#4a3f5c" }}>
                      {p.name}
                    </div>
                    {roomTheme?.backWall === p.theme.backWall && (
                      <div className="ml-auto text-xs font-extrabold" style={{ color: "#7a6b8a" }}>
                        Active
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-3 rounded-xl p-3" style={{ background: "rgba(255,255,255,0.55)" }}>
              <div className="text-xs font-extrabold mb-2" style={{ color: "#4a3f5c" }}>
                Tweak colors
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: "backWall", label: "Back" },
                  { key: "leftWall", label: "Left" },
                  { key: "floor", label: "Floor" },
                ].map((c) => (
                  <label key={c.key} className="flex flex-col gap-1">
                    <span className="text-[11px] font-extrabold" style={{ color: "#7a6b8a" }}>
                      {c.label}
                    </span>
                    <input
                      type="color"
                      value={roomTheme?.[c.key] || "#ffffff"}
                      onChange={(e) =>
                        setRoomTheme((prev) => ({
                          ...(prev || {}),
                          [c.key]: e.target.value,
                        }))
                      }
                      style={{
                        width: "100%",
                        height: 36,
                        padding: 0,
                        borderRadius: 10,
                        border: "1px solid rgba(74, 63, 92, 0.18)",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                      title={`Pick ${c.label} color`}
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {objectOpen && (
          <div
            className="absolute left-1/2 -translate-x-1/2 mt-2 w-[360px] rounded-2xl p-3"
            style={{
              zIndex: 60,
              pointerEvents: "auto",
              background: "rgba(255, 244, 230, 0.92)",
              border: "1px solid rgba(74, 63, 92, 0.14)",
              backdropFilter: "blur(18px)",
              boxShadow: "0 18px 50px rgba(74, 63, 92, 0.18)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-extrabold" style={{ color: "#4a3f5c" }}>
                Object colors
              </div>
              <button
                onClick={() => setObjectOpen(false)}
                className="w-8 h-8 rounded-full border-none cursor-pointer text-lg"
                style={{ background: "rgba(205, 231, 255, 0.25)", color: "#4a3f5c" }}
                title="Close"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.55)" }}>
                <div className="text-xs font-extrabold mb-2" style={{ color: "#4a3f5c" }}>
                  Laptop
                </div>
                {[
                  { key: "laptopBase", label: "Body" },
                  { key: "laptopScreen", label: "Screen" },
                  { key: "keycaps", label: "Keys" },
                ].map((c) => (
                  <label key={c.key} className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-extrabold" style={{ color: "#7a6b8a" }}>
                      {c.label}
                    </span>
                    <input
                      type="color"
                      value={objectTheme?.laptop?.[c.key] || "#ffffff"}
                      onChange={(e) =>
                        setObjectTheme((prev) => ({
                          ...(prev || {}),
                          laptop: { ...(prev?.laptop || {}), [c.key]: e.target.value },
                        }))
                      }
                      style={{
                        width: 46,
                        height: 30,
                        padding: 0,
                        borderRadius: 10,
                        border: "1px solid rgba(74, 63, 92, 0.18)",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                      title={`Pick laptop ${c.label} color`}
                    />
                  </label>
                ))}
              </div>

              <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.55)" }}>
                <div className="text-xs font-extrabold mb-2" style={{ color: "#4a3f5c" }}>
                  Mirror
                </div>
                {[
                  { key: "frame", label: "Frame" },
                  { key: "accents", label: "Accents" },
                ].map((c) => (
                  <label key={c.key} className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-extrabold" style={{ color: "#7a6b8a" }}>
                      {c.label}
                    </span>
                    <input
                      type="color"
                      value={objectTheme?.mirror?.[c.key] || "#ffffff"}
                      onChange={(e) =>
                        setObjectTheme((prev) => ({
                          ...(prev || {}),
                          mirror: { ...(prev?.mirror || {}), [c.key]: e.target.value },
                        }))
                      }
                      style={{
                        width: 46,
                        height: 30,
                        padding: 0,
                        borderRadius: 10,
                        border: "1px solid rgba(74, 63, 92, 0.18)",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                      title={`Pick mirror ${c.label} color`}
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {isComplete && (
        <motion.div
          className="text-center mt-2 text-sm font-semibold"
          style={{ color: "#4a3f5c" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ✨ Thanks for exploring my world! ✨
        </motion.div>
      )}
    </motion.div>
  );
}
