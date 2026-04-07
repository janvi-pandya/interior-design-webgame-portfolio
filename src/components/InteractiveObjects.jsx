import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGame } from "../context/GameContext";
import Sparkles from "./Sparkles";
import UnboxButton from "./UnboxButton";

function FloatingObject({ children, speed = 1, amplitude = 0.1 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.001 * amplitude;
    }
  });
  return <group ref={ref}>{children}</group>;
}

function Box({ position, color, onClick, label }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={ref} position={position}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        castShadow
      >
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial
          color={hovered ? "#FFD6C9" : color}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>
      {/* Ribbon */}
      <mesh position={[0, 0.41, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.82, 0.82, 0.02]} />
        <meshStandardMaterial color="#FFD6C9" opacity={0.6} transparent />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.82, 0.82]} />
        <meshStandardMaterial color="#FFD6C9" opacity={0.6} transparent />
      </mesh>
      {/* Bow */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#F6C9D6" />
      </mesh>
      <UnboxButton position={[0, 1.2, 0]} onClick={onClick} label={label} />
    </group>
  );
}

/* ── Laptop on Desk ── */
function Laptop({ position }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
    }
  });
  return (
    <FloatingObject speed={1.5} amplitude={0.5}>
      <group ref={ref} position={position}>
        {/* Desk */}
        <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.4, 0.1, 1.4]} />
          <meshStandardMaterial color="#E8D5C0" />
        </mesh>
        {/* Desk legs */}
        {[[-1, -1.35, -0.5], [1, -1.35, -0.5], [-1, -1.35, 0.5], [1, -1.35, 0.5]].map((p, i) => (
          <mesh key={i} position={p} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 1.4]} />
            <meshStandardMaterial color="#D4C0A8" />
          </mesh>
        ))}
        {/* Laptop base */}
        <mesh position={[0, -0.45, 0]} castShadow>
          <boxGeometry args={[1.2, 0.06, 0.8]} />
          <meshStandardMaterial color="#9B8EC4" />
        </mesh>
        {/* Laptop screen */}
        <mesh position={[0, 0.05, -0.35]} rotation={[-0.2, 0, 0]} castShadow>
          <boxGeometry args={[1.2, 0.8, 0.04]} />
          <meshStandardMaterial color="#7B6EA4" />
        </mesh>
        {/* Screen glow */}
        <mesh position={[0, 0.05, -0.33]} rotation={[-0.2, 0, 0]}>
          <planeGeometry args={[1.05, 0.65]} />
          <meshStandardMaterial color="#CDE7FF" emissive="#CDE7FF" emissiveIntensity={0.5} />
        </mesh>
        {/* Coffee mug */}
        <mesh position={[1.5, -0.4, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.1, 0.25, 16]} />
          <meshStandardMaterial color="#F6C9D6" />
        </mesh>
      </group>
    </FloatingObject>
  );
}

/* ── Bookshelf ── */
function Bookshelf({ position }) {
  const bookColors = ["#F6C9D6", "#CFC8FF", "#CDE7FF", "#FFD6C9", "#D8F3E3"];
  return (
    <FloatingObject speed={1.2} amplitude={0.3}>
      <group position={position}>
        {/* Shelf frame */}
        <mesh castShadow>
          <boxGeometry args={[2, 3, 0.4]} />
          <meshStandardMaterial color="#E8D5C0" />
        </mesh>
        {/* Shelves */}
        {[-0.8, 0, 0.8].map((y, i) => (
          <mesh key={i} position={[0, y, 0.05]}>
            <boxGeometry args={[1.9, 0.06, 0.38]} />
            <meshStandardMaterial color="#D4C0A8" />
          </mesh>
        ))}
        {/* Books */}
        {bookColors.map((color, i) => (
          <mesh key={i} position={[-0.6 + i * 0.3, 1.15, 0.05]} castShadow>
            <boxGeometry args={[0.15, 0.5, 0.3]} />
            <meshStandardMaterial color={color} />
          </mesh>
        ))}
        {bookColors.slice(0, 4).map((color, i) => (
          <mesh key={`mid-${i}`} position={[-0.5 + i * 0.35, 0.3, 0.05]} castShadow>
            <boxGeometry args={[0.18, 0.45, 0.3]} />
            <meshStandardMaterial color={color} />
          </mesh>
        ))}
        {bookColors.slice(0, 3).map((color, i) => (
          <mesh key={`bot-${i}`} position={[-0.3 + i * 0.35, -0.55, 0.05]} castShadow>
            <boxGeometry args={[0.2, 0.4, 0.3]} />
            <meshStandardMaterial color={color} />
          </mesh>
        ))}
      </group>
    </FloatingObject>
  );
}

/* ── Coffee Table ── */
function CoffeeTable({ position }) {
  return (
    <FloatingObject speed={1} amplitude={0.4}>
      <group position={position}>
        {/* Table top */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 0.8, 0.08, 32]} />
          <meshStandardMaterial color="#E8D5C0" />
        </mesh>
        {/* Table leg */}
        <mesh position={[0, -0.5, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.9]} />
          <meshStandardMaterial color="#D4C0A8" />
        </mesh>
        {/* Table base */}
        <mesh position={[0, -0.95, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
          <meshStandardMaterial color="#D4C0A8" />
        </mesh>
        {/* Sketchbook */}
        <mesh position={[0.1, 0.07, 0]} rotation={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[0.5, 0.04, 0.35]} />
          <meshStandardMaterial color="#FFF4E6" />
        </mesh>
        {/* Pencil */}
        <mesh position={[0.35, 0.1, 0.1]} rotation={[0, 0, 0.5]}>
          <cylinderGeometry args={[0.015, 0.015, 0.3]} />
          <meshStandardMaterial color="#FFD6C9" />
        </mesh>
      </group>
    </FloatingObject>
  );
}

/* ── Wardrobe ── */
function Wardrobe({ position }) {
  return (
    <FloatingObject speed={0.8} amplitude={0.2}>
      <group position={position}>
        {/* Main body */}
        <mesh castShadow>
          <boxGeometry args={[1.6, 2.8, 0.6]} />
          <meshStandardMaterial color="#E8D5C0" />
        </mesh>
        {/* Door line */}
        <mesh position={[0, 0, 0.31]}>
          <boxGeometry args={[0.02, 2.6, 0.02]} />
          <meshStandardMaterial color="#D4C0A8" />
        </mesh>
        {/* Handles */}
        <mesh position={[-0.15, 0, 0.35]} castShadow>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#CFC8FF" />
        </mesh>
        <mesh position={[0.15, 0, 0.35]} castShadow>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#CFC8FF" />
        </mesh>
        {/* Drawers at bottom */}
        <mesh position={[0, -1.1, 0.31]}>
          <boxGeometry args={[1.5, 0.02, 0.02]} />
          <meshStandardMaterial color="#D4C0A8" />
        </mesh>
        <mesh position={[0, -0.8, 0.31]}>
          <boxGeometry args={[1.5, 0.02, 0.02]} />
          <meshStandardMaterial color="#D4C0A8" />
        </mesh>
      </group>
    </FloatingObject>
  );
}

/* ── Plant ── */
function Plant({ position }) {
  return (
    <FloatingObject speed={1.8} amplitude={0.6}>
      <group position={position}>
        {/* Pot */}
        <mesh position={[0, -0.3, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.2, 0.4, 16]} />
          <meshStandardMaterial color="#F6C9D6" />
        </mesh>
        {/* Soil */}
        <mesh position={[0, -0.08, 0]}>
          <cylinderGeometry args={[0.23, 0.23, 0.05, 16]} />
          <meshStandardMaterial color="#8B7355" />
        </mesh>
        {/* Stems & leaves */}
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial color="#D8F3E3" />
        </mesh>
        <mesh position={[0.15, 0.5, 0.1]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#A8E6CF" />
        </mesh>
        <mesh position={[-0.1, 0.55, -0.05]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#C5F0D6" />
        </mesh>
      </group>
    </FloatingObject>
  );
}

/* ── Window ── */
function Window({ position }) {
  return (
    <group position={position}>
      {/* Window frame */}
      <mesh castShadow>
        <boxGeometry args={[2, 2.2, 0.1]} />
        <meshStandardMaterial color="#E8D5C0" />
      </mesh>
      {/* Glass panes */}
      <mesh position={[-0.45, 0.3, 0.06]}>
        <boxGeometry args={[0.85, 0.8, 0.02]} />
        <meshStandardMaterial color="#CDE7FF" opacity={0.5} transparent />
      </mesh>
      <mesh position={[0.45, 0.3, 0.06]}>
        <boxGeometry args={[0.85, 0.8, 0.02]} />
        <meshStandardMaterial color="#CDE7FF" opacity={0.5} transparent />
      </mesh>
      <mesh position={[-0.45, -0.55, 0.06]}>
        <boxGeometry args={[0.85, 0.8, 0.02]} />
        <meshStandardMaterial color="#CDE7FF" opacity={0.5} transparent />
      </mesh>
      <mesh position={[0.45, -0.55, 0.06]}>
        <boxGeometry args={[0.85, 0.8, 0.02]} />
        <meshStandardMaterial color="#CDE7FF" opacity={0.5} transparent />
      </mesh>
      {/* Cross frame */}
      <mesh position={[0, 0, 0.07]}>
        <boxGeometry args={[0.08, 2.2, 0.04]} />
        <meshStandardMaterial color="#D4C0A8" />
      </mesh>
      <mesh position={[0, -0.1, 0.07]}>
        <boxGeometry args={[2, 0.08, 0.04]} />
        <meshStandardMaterial color="#D4C0A8" />
      </mesh>
      {/* Curtain left */}
      <mesh position={[-1.15, 0.2, 0.1]}>
        <boxGeometry args={[0.3, 2.6, 0.04]} />
        <meshStandardMaterial color="#CFC8FF" opacity={0.7} transparent />
      </mesh>
      {/* Curtain right */}
      <mesh position={[1.15, 0.2, 0.1]}>
        <boxGeometry args={[0.3, 2.6, 0.04]} />
        <meshStandardMaterial color="#CFC8FF" opacity={0.7} transparent />
      </mesh>
      {/* Curtain rod */}
      <mesh position={[0, 1.4, 0.1]}>
        <cylinderGeometry args={[0.03, 0.03, 2.8, 8]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#D4C0A8" />
      </mesh>
    </group>
  );
}

/* ── Main exported component ── */
export default function InteractiveObjects() {
  const { isUnboxed, unboxItem, setActivePanel, nextItem } = useGame();

  const objectConfigs = [
    { id: "laptop",      label: "Unbox Laptop",    pos: [-1.5, 1.5, -2],   boxColor: "#CFC8FF", Component: Laptop,      itemPos: [-1.5, 1.5, -2]    },
    { id: "bookshelf",   label: "Unbox Bookshelf", pos: [-4.5, 1.5, -3],   boxColor: "#F6C9D6", Component: Bookshelf,   itemPos: [-4.5, 1.5, -4]    },
    { id: "coffeeTable", label: "Unbox Table",     pos: [0, 1.2, 1],       boxColor: "#CDE7FF", Component: CoffeeTable, itemPos: [0, 1, 1]           },
    { id: "wardrobe",    label: "Unbox Wardrobe",  pos: [4, 1.5, -3],      boxColor: "#FFD6C9", Component: Wardrobe,    itemPos: [4, 1.4, -4.5]      },
    { id: "plant",       label: "Unbox Plant",     pos: [3, 0.8, 1.5],     boxColor: "#D8F3E3", Component: Plant,       itemPos: [3, 0.5, 1.5]       },
    { id: "window",      label: "Unbox Window",    pos: [-4, 3.5, -5.5],   boxColor: "#CDE7FF", Component: Window,      itemPos: [-4, 3.5, -5.85]    },
  ];

  return (
    <group>
      {objectConfigs.map((config) => {
        const { id, label, pos, boxColor, itemPos } = config;
        const ItemComponent = config.Component;
        const unboxed = isUnboxed(id);
        const isNext = nextItem === id;
        return (
          <group key={id}>
            {unboxed ? (
              <group
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePanel(id);
                }}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={() => {
                  document.body.style.cursor = "default";
                }}
              >
                <ItemComponent position={itemPos} />
              </group>
            ) : isNext ? (
              <Box
                position={pos}
                color={boxColor}
                onClick={() => unboxItem(id)}
                label={label}
              />
            ) : null}
            <Sparkles position={pos} active={unboxed && isUnboxed(id)} count={15} />
          </group>
        );
      })}
    </group>
  );
}
