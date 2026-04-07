import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
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

/* ── Label that floats above furniture ── */
function FurnitureLabel({ text, section }) {
  return (
    <Html center distanceFactor={12}>
      <div style={{
        background: "rgba(26, 122, 122, 0.9)",
        backdropFilter: "blur(8px)",
        color: "#F5D68A",
        padding: "4px 12px",
        borderRadius: "20px",
        fontSize: "11px",
        fontFamily: "'Quicksand', sans-serif",
        fontWeight: "700",
        whiteSpace: "nowrap",
        border: "1px solid rgba(196, 132, 45, 0.5)",
        textAlign: "center",
        pointerEvents: "none",
        boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
        lineHeight: "1.3",
      }}>
        <div>{text}</div>
        <div style={{ fontSize: "9px", color: "#FFD699", fontWeight: "500" }}>{section}</div>
      </div>
    </Html>
  );
}

/* ── Gift Box — Indian style with gold ribbon ── */
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
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial
          color={hovered ? "#E8A838" : color}
          emissive={hovered ? "#E8A838" : "#000000"}
          emissiveIntensity={hovered ? 0.4 : 0}
        />
      </mesh>
      {/* Gold ribbon horizontal */}
      <mesh position={[0, 0.46, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.92, 0.92, 0.02]} />
        <meshStandardMaterial color="#C4842D" emissive="#C4842D" emissiveIntensity={0.2} />
      </mesh>
      {/* Gold ribbon vertical */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.12, 0.92, 0.92]} />
        <meshStandardMaterial color="#C4842D" emissive="#C4842D" emissiveIntensity={0.2} />
      </mesh>
      {/* Bow — gold */}
      <mesh position={[0, 0.55, 0]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#E8A838" emissive="#E8A838" emissiveIntensity={0.3} />
      </mesh>
      {/* Decorative dot pattern */}
      {[[-0.25, 0.25, 0.46], [0.25, -0.25, 0.46], [-0.25, -0.25, 0.46], [0.25, 0.25, 0.46]].map((p, i) => (
        <mesh key={`dot-${i}`} position={p}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshStandardMaterial color="#F5D68A" emissive="#F5D68A" emissiveIntensity={0.3} />
        </mesh>
      ))}
      <UnboxButton position={[0, 1.3, 0]} onClick={onClick} label={label} />
    </group>
  );
}

/* ── Laptop on ornate desk (About Me) ── */
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
        {/* Ornate desk with carved legs */}
        <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.12, 1.5]} />
          <meshStandardMaterial color="#5A3D2B" />
        </mesh>
        {/* Gold desk trim */}
        <mesh position={[0, -0.55, 0.76]}>
          <boxGeometry args={[2.6, 0.06, 0.02]} />
          <meshStandardMaterial color="#C4842D" emissive="#C4842D" emissiveIntensity={0.15} />
        </mesh>
        {/* Carved desk legs */}
        {[[-1.1, -1.35, -0.55], [1.1, -1.35, -0.55], [-1.1, -1.35, 0.55], [1.1, -1.35, 0.55]].map((p, i) => (
          <mesh key={i} position={p} castShadow>
            <cylinderGeometry args={[0.06, 0.04, 1.4]} />
            <meshStandardMaterial color="#5A3D2B" />
          </mesh>
        ))}
        {/* Laptop base */}
        <mesh position={[0, -0.44, 0]} castShadow>
          <boxGeometry args={[1.3, 0.06, 0.85]} />
          <meshStandardMaterial color="#2D2D3D" />
        </mesh>
        {/* Laptop screen */}
        <mesh position={[0, 0.08, -0.38]} rotation={[-0.2, 0, 0]} castShadow>
          <boxGeometry args={[1.3, 0.85, 0.04]} />
          <meshStandardMaterial color="#1E1E2E" />
        </mesh>
        {/* Screen glow — teal */}
        <mesh position={[0, 0.08, -0.36]} rotation={[-0.2, 0, 0]}>
          <planeGeometry args={[1.15, 0.7]} />
          <meshStandardMaterial color="#1A7A7A" emissive="#1A7A7A" emissiveIntensity={0.6} />
        </mesh>
        {/* Brass chai cup */}
        <mesh position={[1.6, -0.38, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.08, 0.2, 16]} />
          <meshStandardMaterial color="#B87333" metalness={0.5} roughness={0.4} />
        </mesh>
        {/* Desk lamp */}
        <mesh position={[-1.4, -0.1, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.9]} />
          <meshStandardMaterial color="#C4842D" />
        </mesh>
        <mesh position={[-1.4, 0.35, 0]}>
          <coneGeometry args={[0.2, 0.25, 8]} />
          <meshStandardMaterial color="#E8A838" emissive="#FFD699" emissiveIntensity={0.3} />
        </mesh>
        <FurnitureLabel text="Laptop" section="About Me" />
      </group>
    </FloatingObject>
  );
}

/* ── Ornate Bookshelf (Projects) ── */
function Bookshelf({ position }) {
  const bookColors = ["#D4488E", "#1A7A7A", "#E8A838", "#B22234", "#2D6B4E"];
  return (
    <FloatingObject speed={1.2} amplitude={0.3}>
      <group position={position}>
        {/* Dark wood shelf frame */}
        <mesh castShadow>
          <boxGeometry args={[2.2, 3.2, 0.45]} />
          <meshStandardMaterial color="#3D2B1F" />
        </mesh>
        {/* Gold trim top */}
        <mesh position={[0, 1.65, 0.05]}>
          <boxGeometry args={[2.3, 0.08, 0.5]} />
          <meshStandardMaterial color="#C4842D" emissive="#C4842D" emissiveIntensity={0.15} />
        </mesh>
        {/* Shelves */}
        {[-0.8, 0, 0.8].map((y, i) => (
          <mesh key={i} position={[0, y, 0.05]}>
            <boxGeometry args={[2.1, 0.06, 0.43]} />
            <meshStandardMaterial color="#5A3D2B" />
          </mesh>
        ))}
        {/* Colorful books — top shelf */}
        {bookColors.map((color, i) => (
          <mesh key={`top-${i}`} position={[-0.7 + i * 0.35, 1.18, 0.05]} castShadow>
            <boxGeometry args={[0.18, 0.55, 0.32]} />
            <meshStandardMaterial color={color} />
          </mesh>
        ))}
        {/* Middle shelf books */}
        {bookColors.slice(0, 4).map((color, i) => (
          <mesh key={`mid-${i}`} position={[-0.5 + i * 0.38, 0.32, 0.05]} castShadow>
            <boxGeometry args={[0.2, 0.5, 0.32]} />
            <meshStandardMaterial color={color} />
          </mesh>
        ))}
        {/* Bottom shelf — decorative items */}
        <mesh position={[-0.3, -0.55, 0.1]} castShadow>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshStandardMaterial color="#B87333" metalness={0.4} roughness={0.5} />
        </mesh>
        <mesh position={[0.3, -0.55, 0.1]} castShadow>
          <cylinderGeometry args={[0.1, 0.08, 0.25, 8]} />
          <meshStandardMaterial color="#E8A838" />
        </mesh>
        <FurnitureLabel text="Bookshelf" section="Projects" />
      </group>
    </FloatingObject>
  );
}

/* ── Ornate Coffee Table (Experience) ── */
function CoffeeTable({ position }) {
  return (
    <FloatingObject speed={1} amplitude={0.4}>
      <group position={position}>
        {/* Dark carved table top */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.08, 1]} />
          <meshStandardMaterial color="#3D2B1F" />
        </mesh>
        {/* Gold inlay on table */}
        <mesh position={[0, 0.045, 0]}>
          <boxGeometry args={[1.5, 0.01, 0.7]} />
          <meshStandardMaterial color="#C4842D" emissive="#C4842D" emissiveIntensity={0.1} />
        </mesh>
        {/* Carved legs */}
        {[[-0.7, -0.45, -0.35], [0.7, -0.45, -0.35], [-0.7, -0.45, 0.35], [0.7, -0.45, 0.35]].map((p, i) => (
          <mesh key={i} position={p} castShadow>
            <cylinderGeometry args={[0.06, 0.04, 0.8]} />
            <meshStandardMaterial color="#3D2B1F" />
          </mesh>
        ))}
        {/* Fruit bowl */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <sphereGeometry args={[0.25, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#B87333" metalness={0.3} roughness={0.5} side={2} />
        </mesh>
        {/* Fruits */}
        <mesh position={[-0.08, 0.22, 0.05]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#E85858" />
        </mesh>
        <mesh position={[0.08, 0.2, -0.05]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial color="#E8A838" />
        </mesh>
        <FurnitureLabel text="Coffee Table" section="Experience" />
      </group>
    </FloatingObject>
  );
}

/* ── Ornate Wardrobe / Armoire (Skills) ── */
function Wardrobe({ position }) {
  return (
    <FloatingObject speed={0.8} amplitude={0.2}>
      <group position={position}>
        {/* Main carved body */}
        <mesh castShadow>
          <boxGeometry args={[1.8, 3, 0.7]} />
          <meshStandardMaterial color="#3D2B1F" />
        </mesh>
        {/* Gold crown top */}
        <mesh position={[0, 1.55, 0]}>
          <boxGeometry args={[1.9, 0.1, 0.75]} />
          <meshStandardMaterial color="#C4842D" emissive="#C4842D" emissiveIntensity={0.2} />
        </mesh>
        {/* Door panels — left */}
        <mesh position={[-0.42, 0.2, 0.36]}>
          <boxGeometry args={[0.82, 2.2, 0.02]} />
          <meshStandardMaterial color="#4A3526" />
        </mesh>
        {/* Door panels — right */}
        <mesh position={[0.42, 0.2, 0.36]}>
          <boxGeometry args={[0.82, 2.2, 0.02]} />
          <meshStandardMaterial color="#4A3526" />
        </mesh>
        {/* Door line */}
        <mesh position={[0, 0.2, 0.37]}>
          <boxGeometry args={[0.02, 2.2, 0.02]} />
          <meshStandardMaterial color="#C4842D" />
        </mesh>
        {/* Brass handles */}
        <mesh position={[-0.12, 0.2, 0.4]} castShadow>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#B87333" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0.12, 0.2, 0.4]} castShadow>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#B87333" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Bottom drawers */}
        <mesh position={[0, -1.15, 0.36]}>
          <boxGeometry args={[1.7, 0.5, 0.02]} />
          <meshStandardMaterial color="#4A3526" />
        </mesh>
        <mesh position={[0, -1.0, 0.36]}>
          <boxGeometry args={[1.7, 0.02, 0.02]} />
          <meshStandardMaterial color="#C4842D" />
        </mesh>
        {/* Drawer handle */}
        <mesh position={[0, -1.15, 0.4]}>
          <boxGeometry args={[0.2, 0.04, 0.04]} />
          <meshStandardMaterial color="#B87333" metalness={0.5} roughness={0.3} />
        </mesh>
        <FurnitureLabel text="Wardrobe" section="Skills" />
      </group>
    </FloatingObject>
  );
}

/* ── Decorative Plant (Education & Achievements) ── */
function Plant({ position }) {
  return (
    <FloatingObject speed={1.8} amplitude={0.6}>
      <group position={position}>
        {/* Brass/terracotta pot */}
        <mesh position={[0, -0.3, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.22, 0.5, 16]} />
          <meshStandardMaterial color="#C06030" />
        </mesh>
        {/* Gold rim on pot */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.31, 0.31, 0.04, 16]} />
          <meshStandardMaterial color="#C4842D" emissive="#C4842D" emissiveIntensity={0.15} />
        </mesh>
        {/* Decorative band on pot */}
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.26, 0.24, 0.06, 16]} />
          <meshStandardMaterial color="#E8A838" />
        </mesh>
        {/* Soil */}
        <mesh position={[0, -0.04, 0]}>
          <cylinderGeometry args={[0.28, 0.28, 0.04, 16]} />
          <meshStandardMaterial color="#5A3D2B" />
        </mesh>
        {/* Lush green canopy */}
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#2D6B4E" />
        </mesh>
        <mesh position={[0.2, 0.6, 0.1]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#38835F" />
        </mesh>
        <mesh position={[-0.15, 0.65, -0.08]}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color="#2D8B57" />
        </mesh>
        <mesh position={[0, 0.75, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#3D9B6E" />
        </mesh>
        <FurnitureLabel text="Plant" section="Education" />
      </group>
    </FloatingObject>
  );
}

/* ── Ornate Window with arched frame (Contact) ── */
function Window({ position }) {
  return (
    <group position={position}>
      {/* Ornate window frame — dark wood with gold */}
      <mesh castShadow>
        <boxGeometry args={[2.4, 2.6, 0.12]} />
        <meshStandardMaterial color="#3D2B1F" />
      </mesh>
      {/* Gold frame border */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[2.2, 2.4, 0.02]} />
        <meshStandardMaterial color="#C4842D" emissive="#C4842D" emissiveIntensity={0.15} />
      </mesh>
      {/* Arched glass — upper section */}
      <mesh position={[0, 0.3, 0.07]}>
        <boxGeometry args={[1.9, 1.2, 0.02]} />
        <meshStandardMaterial color="#1A2A44" opacity={0.7} transparent />
      </mesh>
      {/* Lower glass panes */}
      <mesh position={[-0.5, -0.6, 0.07]}>
        <boxGeometry args={[0.85, 0.9, 0.02]} />
        <meshStandardMaterial color="#1A2A44" opacity={0.6} transparent />
      </mesh>
      <mesh position={[0.5, -0.6, 0.07]}>
        <boxGeometry args={[0.85, 0.9, 0.02]} />
        <meshStandardMaterial color="#1A2A44" opacity={0.6} transparent />
      </mesh>
      {/* Window dividers */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[0.06, 2.4, 0.04]} />
        <meshStandardMaterial color="#3D2B1F" />
      </mesh>
      <mesh position={[0, -0.15, 0.08]}>
        <boxGeometry args={[2, 0.06, 0.04]} />
        <meshStandardMaterial color="#3D2B1F" />
      </mesh>
      {/* Stars visible through window */}
      {[[0.3, 0.6, 0.06], [-0.4, 0.8, 0.06], [0.6, 0.5, 0.06], [-0.7, 0.4, 0.06], [0, 0.9, 0.06]].map((p, i) => (
        <mesh key={`star-${i}`} position={p}>
          <sphereGeometry args={[0.03, 6, 6]} />
          <meshStandardMaterial color="#F5D68A" emissive="#F5D68A" emissiveIntensity={1.5} />
        </mesh>
      ))}
      {/* Curtain — rich magenta with gold tie */}
      <mesh position={[-1.35, 0.1, 0.12]}>
        <boxGeometry args={[0.35, 2.8, 0.04]} />
        <meshStandardMaterial color="#D4488E" opacity={0.8} transparent />
      </mesh>
      <mesh position={[1.35, 0.1, 0.12]}>
        <boxGeometry args={[0.35, 2.8, 0.04]} />
        <meshStandardMaterial color="#D4488E" opacity={0.8} transparent />
      </mesh>
      {/* Gold curtain ties */}
      <mesh position={[-1.25, -0.3, 0.15]}>
        <torusGeometry args={[0.08, 0.02, 8, 16]} />
        <meshStandardMaterial color="#C4842D" emissive="#C4842D" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[1.25, -0.3, 0.15]}>
        <torusGeometry args={[0.08, 0.02, 8, 16]} />
        <meshStandardMaterial color="#C4842D" emissive="#C4842D" emissiveIntensity={0.2} />
      </mesh>
      {/* Brass curtain rod */}
      <mesh position={[0, 1.5, 0.12]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.035, 3, 8]} />
        <meshStandardMaterial color="#B87333" metalness={0.5} roughness={0.4} />
      </mesh>
      <FurnitureLabel text="Window" section="Contact" />
    </group>
  );
}

/* ── Ornate Sofa (decorative, non-interactive) ── */
function OrnateSofa() {
  return (
    <group position={[-3, 0.6, 2]}>
      {/* Seat cushion */}
      <mesh castShadow>
        <boxGeometry args={[2.8, 0.4, 1]} />
        <meshStandardMaterial color="#E8885C" />
      </mesh>
      {/* Back rest */}
      <mesh position={[0, 0.6, -0.4]} castShadow>
        <boxGeometry args={[2.8, 0.8, 0.2]} />
        <meshStandardMaterial color="#D4488E" />
      </mesh>
      {/* Arm rests */}
      <mesh position={[-1.3, 0.3, 0]} castShadow>
        <boxGeometry args={[0.2, 0.6, 1]} />
        <meshStandardMaterial color="#3D2B1F" />
      </mesh>
      <mesh position={[1.3, 0.3, 0]} castShadow>
        <boxGeometry args={[0.2, 0.6, 1]} />
        <meshStandardMaterial color="#3D2B1F" />
      </mesh>
      {/* Decorative throw pillows */}
      <mesh position={[-0.7, 0.45, 0]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.15]} />
        <meshStandardMaterial color="#E8A838" />
      </mesh>
      <mesh position={[0.7, 0.45, 0]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.15]} />
        <meshStandardMaterial color="#1A7A7A" />
      </mesh>
      <mesh position={[0, 0.45, 0.1]} castShadow>
        <boxGeometry args={[0.35, 0.35, 0.12]} />
        <meshStandardMaterial color="#D4488E" />
      </mesh>
      {/* Carved legs */}
      {[[-1.2, -0.35, -0.35], [1.2, -0.35, -0.35], [-1.2, -0.35, 0.35], [1.2, -0.35, 0.35]].map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <cylinderGeometry args={[0.05, 0.03, 0.5]} />
          <meshStandardMaterial color="#3D2B1F" />
        </mesh>
      ))}
    </group>
  );
}

/* ── Main exported component ── */
export default function InteractiveObjects() {
  const { isUnboxed, unboxItem, setActivePanel, nextItem } = useGame();

  const objectConfigs = [
    { id: "laptop",      label: "Unbox Laptop",    pos: [-1.5, 1.5, -2],   boxColor: "#D4488E", Component: Laptop,      itemPos: [-1.5, 1.5, -2]    },
    { id: "bookshelf",   label: "Unbox Bookshelf", pos: [-5, 1.5, -3],     boxColor: "#1A7A7A", Component: Bookshelf,   itemPos: [-5, 1.5, -5]      },
    { id: "coffeeTable", label: "Unbox Table",     pos: [0, 1.2, 1],       boxColor: "#E8A838", Component: CoffeeTable, itemPos: [0, 1, 1]           },
    { id: "wardrobe",    label: "Unbox Wardrobe",  pos: [4.5, 1.5, -3],    boxColor: "#C4842D", Component: Wardrobe,    itemPos: [4.5, 1.5, -5]     },
    { id: "plant",       label: "Unbox Plant",     pos: [3.5, 0.8, 1.5],   boxColor: "#2D6B4E", Component: Plant,       itemPos: [3.5, 0.5, 1.5]    },
    { id: "window",      label: "Unbox Window",    pos: [-4.5, 3.5, -6.2], boxColor: "#B22234", Component: Window,      itemPos: [-4.5, 3.5, -6.8]  },
  ];

  return (
    <group>
      {/* Decorative sofa — always visible */}
      <OrnateSofa />

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
