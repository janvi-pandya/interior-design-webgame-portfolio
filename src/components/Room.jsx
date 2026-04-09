import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGame } from "../context/GameContext";

function Window2x2({ position, rotation = [0, 0, 0], frameColor = "#E8D5C0" }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.2, 2.2, 0.12]} />
        <meshStandardMaterial color={frameColor} roughness={0.55} />
      </mesh>
      {/* Inner trim */}
      <mesh position={[0, 0, 0.07]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 2.0, 0.06]} />
        <meshStandardMaterial color="#F6C9D6" roughness={0.65} />
      </mesh>

      {/* Glass panes (2x2) */}
      {[
        [-0.5, 0.5],
        [0.5, 0.5],
        [-0.5, -0.5],
        [0.5, -0.5],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.1]}>
          <boxGeometry args={[0.85, 0.85, 0.02]} />
          <meshStandardMaterial color="#CDE7FF" opacity={0.55} transparent roughness={0.15} />
        </mesh>
      ))}

      {/* Cross bars */}
      <mesh position={[0, 0, 0.105]} castShadow>
        <boxGeometry args={[0.08, 2.05, 0.03]} />
        <meshStandardMaterial color={frameColor} roughness={0.55} />
      </mesh>
      <mesh position={[0, 0, 0.105]} castShadow>
        <boxGeometry args={[2.05, 0.08, 0.03]} />
        <meshStandardMaterial color={frameColor} roughness={0.55} />
      </mesh>

      {/* Curtains */}
      <mesh position={[-1.25, 0, 0.12]} castShadow>
        <boxGeometry args={[0.3, 2.55, 0.05]} />
        <meshStandardMaterial color="#CFC8FF" opacity={0.65} transparent roughness={0.8} />
      </mesh>
      <mesh position={[1.25, 0, 0.12]} castShadow>
        <boxGeometry args={[0.3, 2.55, 0.05]} />
        <meshStandardMaterial color="#CFC8FF" opacity={0.65} transparent roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.35, 0.14]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 2.9, 10]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#D4C0A8" roughness={0.6} />
      </mesh>
    </group>
  );
}

function Door({ position, rotation = [0, 0, 0], label = "Door" }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.6, 2.9, 0.14]} />
        <meshStandardMaterial color="#E8D5C0" roughness={0.55} />
      </mesh>
      {/* Door slab */}
      <mesh position={[0, -0.05, 0.06]} castShadow receiveShadow>
        <boxGeometry args={[1.35, 2.65, 0.1]} />
        <meshStandardMaterial color="#FFD6C9" roughness={0.75} />
      </mesh>
      {/* Panels */}
      {[-0.7, 0.15].map((y, i) => (
        <mesh key={i} position={[0, y, 0.12]} castShadow>
          <boxGeometry args={[1.1, 0.85, 0.03]} />
          <meshStandardMaterial color="#F6C9D6" roughness={0.75} />
        </mesh>
      ))}
      {/* Handle */}
      <mesh position={[0.5, -0.2, 0.14]} castShadow>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#E2B04A" metalness={0.35} roughness={0.35} />
      </mesh>

      {/* Tiny plaque (just for orientation; can remove later) */}
      <mesh position={[0, 1.25, 0.14]} castShadow>
        <boxGeometry args={[0.9, 0.18, 0.02]} />
        <meshStandardMaterial color="#FFF4E6" opacity={0.85} transparent />
      </mesh>
      {/* NOTE: keeping label text out (no 3D text lib). */}
      <mesh visible={false}>
        <boxGeometry args={[0.001, 0.001, 0.001]} />
        <meshStandardMaterial />
      </mesh>
      {label ? null : null}
    </group>
  );
}

function CanopyBed({ position = [2.2, 0, -3.9] }) {
  return (
    <group position={position}>
      {/* Platform */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.4, 0.5, 2.2]} />
        <meshStandardMaterial color="#E8D5C0" roughness={0.6} />
      </mesh>
      {/* Mattress */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.15, 0.35, 1.95]} />
        <meshStandardMaterial color="#FFF4E6" roughness={0.9} />
      </mesh>
      {/* Blanket */}
      <mesh position={[0.1, 0.77, -0.05]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.18, 1.5]} />
        <meshStandardMaterial color="#CFC8FF" roughness={0.8} />
      </mesh>
      {/* Pillows */}
      {[-0.7, 0.2, 1.1].map((x, i) => (
        <mesh key={i} position={[x, 0.83, 0.75]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.18, 0.4]} />
          <meshStandardMaterial color={i === 2 ? "#F6C9D6" : "#FFF4E6"} roughness={0.9} />
        </mesh>
      ))}
      {/* Headboard */}
      <mesh position={[0, 1.1, 1.05]} castShadow receiveShadow>
        <boxGeometry args={[3.4, 1.2, 0.18]} />
        <meshStandardMaterial color="#E8D5C0" roughness={0.6} />
      </mesh>

      {/* Posts */}
      {[
        [-1.55, 0.1, -0.95],
        [1.55, 0.1, -0.95],
        [-1.55, 0.1, 0.95],
        [1.55, 0.1, 0.95],
      ].map((p, i) => (
        <mesh key={i} position={[p[0], 1.55, p[2]]} castShadow receiveShadow>
          <cylinderGeometry args={[0.08, 0.1, 3.1, 16]} />
          <meshStandardMaterial color="#E8D5C0" roughness={0.6} />
        </mesh>
      ))}

      {/* Top frame */}
      <mesh position={[0, 3.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.4, 0.12, 2.2]} />
        <meshStandardMaterial color="#E8D5C0" roughness={0.6} />
      </mesh>

      {/* Drapes (simple ribbons) */}
      {[
        [-1.55, 2.6, 0.95, 0.2],
        [1.55, 2.6, 0.95, -0.2],
      ].map((d, i) => (
        <mesh key={`d-${i}`} position={[d[0], d[1], d[2]]} rotation={[0, d[3], 0]} castShadow>
          <boxGeometry args={[0.18, 1.1, 2.0]} />
          <meshStandardMaterial color="#F6C9D6" transparent opacity={0.55} roughness={0.8} />
        </mesh>
      ))}
      <mesh position={[0, 3.02, 0.95]} castShadow>
        <boxGeometry args={[3.4, 0.25, 0.35]} />
        <meshStandardMaterial color="#F6C9D6" transparent opacity={0.45} roughness={0.8} />
      </mesh>
    </group>
  );
}

function VanitySet({ position = [-3.8, 0, -2.2] }) {
  const { objectTheme } = useGame();
  const m = objectTheme?.mirror || {};
  const frame = m.frame || "#E2B04A";
  const accents = m.accents || "#FFD6C9";
  const glass = m.glass || "#CDE7FF";

  return (
    <group position={position}>
      {/* Vanity table */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.3, 0.12, 1.0]} />
        <meshStandardMaterial color="#E2B04A" metalness={0.2} roughness={0.4} />
      </mesh>
      {[
        [-1, 0.3, -0.35],
        [1, 0.3, -0.35],
        [-1, 0.3, 0.35],
        [1, 0.3, 0.35],
      ].map((p, i) => (
        <mesh key={i} position={p} castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.06, 0.6, 12]} />
          <meshStandardMaterial color="#D4C0A8" roughness={0.6} />
        </mesh>
      ))}
      {/* Mirror */}
      <mesh position={[-0.65, 1.6, 0]} rotation={[0, 0.25, 0]} castShadow>
        <torusGeometry args={[0.55, 0.08, 12, 36]} />
        <meshStandardMaterial color={frame} metalness={0.35} roughness={0.3} />
      </mesh>
      {/* Ornate beads */}
      {Array.from({ length: 14 }).map((_, i) => {
        const a = (i / 14) * Math.PI * 2;
        const r = 0.62;
        const x = -0.65 + Math.cos(a) * r;
        const y = 1.6 + Math.sin(a) * r;
        return (
          <mesh key={`bead-${i}`} position={[x, y, 0.02]} castShadow>
            <sphereGeometry args={[0.035, 10, 10]} />
            <meshStandardMaterial color={accents} roughness={0.6} />
          </mesh>
        );
      })}
      {/* Crown top */}
      <mesh position={[-0.65, 2.35, 0.02]} castShadow>
        <coneGeometry args={[0.18, 0.22, 18]} />
        <meshStandardMaterial color={frame} metalness={0.35} roughness={0.3} />
      </mesh>
      <mesh position={[-0.65, 1.6, 0.03]} rotation={[0, 0.25, 0]}>
        <circleGeometry args={[0.45, 32]} />
        <meshStandardMaterial color={glass} opacity={0.55} transparent />
      </mesh>
      {/* Stool */}
      <mesh position={[0.75, 0.28, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.75, 0.12, 0.55]} />
        <meshStandardMaterial color="#F6C9D6" roughness={0.8} />
      </mesh>
      {[
        [0.45, 0.12, -0.22],
        [1.05, 0.12, -0.22],
        [0.45, 0.12, 0.22],
        [1.05, 0.12, 0.22],
      ].map((p, i) => (
        <mesh key={`st-${i}`} position={p} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.32, 12]} />
          <meshStandardMaterial color="#D4C0A8" roughness={0.6} />
        </mesh>
      ))}
      {/* Tiny perfume bottles */}
      {[
        [0.6, 0.66, -0.25],
        [0.9, 0.66, 0.18],
      ].map((p, i) => (
        <mesh key={`p-${i}`} position={p} castShadow>
          <cylinderGeometry args={[0.07, 0.05, 0.18, 12]} />
          <meshStandardMaterial color={i === 0 ? "#CFC8FF" : "#FFD6C9"} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}

function PrincessRug({ position = [0.2, 0.02, -0.6] }) {
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[7.6, 5.2]} />
        <meshStandardMaterial color="#F6C9D6" opacity={0.22} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]} receiveShadow>
        <ringGeometry args={[1.2, 2.2, 48]} />
        <meshStandardMaterial color="#CFC8FF" opacity={0.18} transparent />
      </mesh>
    </group>
  );
}

export default function Room() {
  const floorRef = useRef();
  const { roomTheme } = useGame();

  useFrame((state) => {
    if (floorRef.current) {
      floorRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  const theme = roomTheme || {};
  const floorColor = theme.floor || "#FFF4E6";
  const backWallColor = theme.backWall || "#E8E0FF";
  const leftWallColor = theme.leftWall || "#FFF0E8";
  const trimColor = theme.trim || "#E8D5C0";

  return (
    <group ref={floorRef}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color={floorColor} roughness={0.95} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 3, -6]} receiveShadow>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial color={backWallColor} roughness={0.95} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-6, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial color={leftWallColor} roughness={0.95} />
      </mesh>

      {/* Baseboard - back */}
      <mesh position={[0, 0.15, -5.95]}>
        <boxGeometry args={[12, 0.3, 0.1]} />
        <meshStandardMaterial color={trimColor} roughness={0.55} />
      </mesh>

      {/* Baseboard - left */}
      <mesh position={[-5.95, 0.15, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[12, 0.3, 0.1]} />
        <meshStandardMaterial color={trimColor} roughness={0.55} />
      </mesh>

      <PrincessRug />

      {/* Doors */}
      {/* Entrance door on left wall (near front) */}
      <Door position={[-5.93, 1.45, 3.5]} rotation={[0, Math.PI / 2, 0]} label="Entrance" />
      {/* Bathroom door on back wall (right side) */}
      <Door position={[4.4, 1.45, -5.93]} rotation={[0, 0, 0]} label="Bathroom" />

      {/* Windows (2x2 panes) */}
      {/* Window on back wall (left side) */}
      <Window2x2 position={[-3.4, 3.25, -5.92]} rotation={[0, 0, 0]} frameColor="#E8D5C0" />
      {/* Window on left wall (mid) */}
      <Window2x2 position={[-5.92, 3.25, -0.8]} rotation={[0, Math.PI / 2, 0]} frameColor="#E8D5C0" />

      {/* Picture frames on back wall */}
      <group position={[-2.5, 4, -5.9]}>
        <mesh>
          <boxGeometry args={[1.2, 0.9, 0.05]} />
          <meshStandardMaterial color="#E2B04A" metalness={0.25} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[1, 0.7, 0.02]} />
          <meshStandardMaterial color="#CDE7FF" />
        </mesh>
      </group>

      <group position={[2, 4.2, -5.9]}>
        <mesh>
          <boxGeometry args={[0.8, 1, 0.05]} />
          <meshStandardMaterial color="#E2B04A" metalness={0.25} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[0.6, 0.8, 0.02]} />
          <meshStandardMaterial color="#D8F3E3" />
        </mesh>
      </group>

      {/* Fairy lights on back wall */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[-3 + i * 0.9, 5.2, -5.85]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color="#FFD6C9"
            emissive="#FFD6C9"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}

      {/* Extra warm “pinterest princess” set dressing */}
      <CanopyBed />
      <VanitySet />

      {/* Soft golden diya-like glows near floor */}
      {[
        [-1.8, 0.15, -4.7],
        [1.2, 0.15, -5.0],
        [-4.9, 0.15, -1.2],
      ].map((p, i) => (
        <group key={`diy-${i}`} position={p}>
          <mesh>
            <cylinderGeometry args={[0.12, 0.16, 0.1, 18]} />
            <meshStandardMaterial color="#E2B04A" metalness={0.25} roughness={0.35} />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshStandardMaterial color="#FFD6C9" emissive="#FFD6C9" emissiveIntensity={1.2} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
