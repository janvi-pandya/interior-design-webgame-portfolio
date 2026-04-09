import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
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

function LabelChip({ title, subtitle, onClick }) {
  return (
    <div
      className="portfolio-label"
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
    >
      <div className="portfolio-label__title">{title}</div>
      <div className="portfolio-label__subtitle">{subtitle}</div>
      <div className="portfolio-label__hint">Click to open • Drag to move</div>
    </div>
  );
}

function GhostSnap({ pos }) {
  return (
    <mesh position={pos} rotation={[0, 0, 0]}>
      <boxGeometry args={[0.001, 0.001, 0.001]} />
      <meshStandardMaterial transparent opacity={0} />
    </mesh>
  );
}

function ShadowPlaceholder({ position, footprint = [1.6, 1.0], shape = "rect" }) {
  const [w, h] = footprint;
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.011, 0]} receiveShadow>
        {shape === "circle" ? (
          <circleGeometry args={[Math.max(w, h) / 2, 48]} />
        ) : (
          <planeGeometry args={[w, h]} />
        )}
        <meshStandardMaterial color="#000000" opacity={0.32} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]} receiveShadow>
        {shape === "circle" ? (
          <ringGeometry args={[Math.max(w, h) / 2 + 0.02, Math.max(w, h) / 2 + 0.09, 48]} />
        ) : (
          <ringGeometry args={[Math.min(w, h) / 2, Math.min(w, h) / 2 + 0.12, 48]} />
        )}
        <meshStandardMaterial color="#111111" opacity={0.18} transparent />
      </mesh>
    </group>
  );
}

function DraggableItem({ id, children, basePosition, onOpen, hitbox = [2.6, 2.2, 2.0] }) {
  const { setItemPosition, positions, snapTargets, setIsDragging, markPlaced, isPlaced } = useGame();
  const current = positions[id] || basePosition;
  const { camera, gl } = useThree();
  const drag = useRef({
    active: false,
    pointerId: null,
    y: 0,
    offset: new THREE.Vector3(),
    plane: new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
    intersection: new THREE.Vector3(),
    ndc: new THREE.Vector2(),
    raycaster: new THREE.Raycaster(),
  });
  const moved = useRef(false);
  const anim = useRef(null);

  const snaps = snapTargets?.[id] || [];
  const { nearestSnapPos, nearestSnapHint, nearestDist } = useMemo(() => {
    let best = null;
    let bestDist = Infinity;
    for (const s of snaps) {
      const dx = (s.pos?.[0] ?? 0) - current[0];
      const dz = (s.pos?.[2] ?? 0) - current[2];
      const d = Math.hypot(dx, dz);
      if (d < bestDist) {
        bestDist = d;
        best = s;
      }
    }
    return {
      nearestSnapPos: best?.pos ?? null,
      nearestSnapHint: best?.hint ?? null,
      nearestDist: bestDist,
    };
  }, [current, snaps]);

  const getPlanePoint = (clientX, clientY, y) => {
    const rect = gl.domElement.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const yNdc = -(((clientY - rect.top) / rect.height) * 2 - 1);
    drag.current.ndc.set(x, yNdc);
    drag.current.raycaster.setFromCamera(drag.current.ndc, camera);
    // plane equation: normal(0,1,0) dot p + constant = 0 => y + constant = 0
    drag.current.plane.set(new THREE.Vector3(0, 1, 0), -y);
    const hit = drag.current.raycaster.ray.intersectPlane(drag.current.plane, drag.current.intersection);
    return hit ? drag.current.intersection.clone() : null;
  };

  const snapNow = () => {
    if (!nearestSnapPos) return;
    // Require user to drag onto the shadow target to "complete" placement.
    if (nearestDist < 0.75) {
      anim.current = {
        from: new THREE.Vector3(current[0], current[1], current[2]),
        to: new THREE.Vector3(nearestSnapPos[0], nearestSnapPos[1], nearestSnapPos[2]),
        t0: performance.now(),
        dur: 380,
      };
    }
  };

  useFrame(() => {
    if (!anim.current) return;
    const now = performance.now();
    const p = Math.min(1, (now - anim.current.t0) / anim.current.dur);
    const ease = 1 - Math.pow(1 - p, 3);
    const v = anim.current.from.clone().lerp(anim.current.to, ease);
    setItemPosition(id, [v.x, v.y, v.z]);
    if (p >= 1) {
      anim.current = null;
      markPlaced(id);
    }
  });

  useEffect(() => {
    const onMove = (ev) => {
      if (!drag.current.active) return;
      if (drag.current.pointerId != null && ev.pointerId !== drag.current.pointerId) return;
      if (anim.current) return;
      const hit = getPlanePoint(ev.clientX, ev.clientY, drag.current.y);
      if (!hit) return;
      const next = hit.add(drag.current.offset);
      const nextPos = [next.x, drag.current.y, next.z];
      const dx = nextPos[0] - current[0];
      const dz = nextPos[2] - current[2];
      if (Math.hypot(dx, dz) > 0.01) moved.current = true;
      setItemPosition(id, nextPos);
    };

    const onUp = (ev) => {
      if (!drag.current.active) return;
      if (drag.current.pointerId != null && ev.pointerId !== drag.current.pointerId) return;
      drag.current.active = false;
      drag.current.pointerId = null;
      setIsDragging(false);
      snapNow();
      setTimeout(() => {
        moved.current = false;
      }, 0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera, gl, id, setItemPosition, setIsDragging, nearestDist, nearestSnapPos]);

  return (
    <group position={current}>
      {/* Invisible hitbox so dragging always works reliably */}
      <mesh
        position={[0, 0, 0]}
        onPointerDown={(e) => {
          e.stopPropagation();
          if (anim.current) return;
          if (isPlaced(id)) return;
          moved.current = false;
          // Lock Y so furniture always stays "on the floor".
          // basePosition[1] is calibrated per item so it visually touches the floor.
          const y = (basePosition?.[1] ?? current?.[1] ?? 0) + 0.0001;
          const hit = getPlanePoint(e.clientX, e.clientY, y);
          if (!hit) return;
          drag.current.active = true;
          drag.current.pointerId = e.pointerId;
          drag.current.y = y;
          const cur = new THREE.Vector3(current[0], current[1], current[2]);
          drag.current.offset.copy(cur).sub(hit);
          setIsDragging(true);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = isPlaced(id) ? "default" : "grab";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
        <boxGeometry args={hitbox} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>

      <group
        onClick={(e) => {
          e.stopPropagation();
          if (!moved.current) onOpen?.();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "grab";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
        {children}
      </group>

      {nearestSnapPos && nearestDist < 1.2 && (
        <group position={[nearestSnapPos[0] - current[0], 0, nearestSnapPos[2] - current[2]]}>
          <mesh rotation={[0, 0, 0]} position={[0, -0.95, 0]}>
            <ringGeometry args={[0.35, 0.5, 32]} />
            <meshStandardMaterial color="#FFD6C9" emissive="#FFD6C9" emissiveIntensity={0.6} transparent opacity={0.55} />
          </mesh>
          <GhostSnap pos={[0, 0, 0]} />
          {nearestSnapHint && (
            <Html position={[0, 0.6, 0]} center>
              <div className="snap-hint">{nearestSnapHint}</div>
            </Html>
          )}
        </group>
      )}
    </group>
  );
}

/* ── Laptop on Desk ── */
function Laptop({ position }) {
  const ref = useRef();
  const { objectTheme } = useGame();
  const t = objectTheme?.laptop || {};
  const deskTop = t.deskTop || "#E8D5C0";
  const laptopBase = t.laptopBase || "#CFC8FF";
  const laptopScreen = t.laptopScreen || "#7B6EA4";
  const keycaps = t.keycaps || "#FFF4E6";
  const metal = t.metal || "#E2B04A";

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
          <meshStandardMaterial color={deskTop} roughness={0.7} />
        </mesh>
        {/* Desk legs */}
        {[[-1, -1.35, -0.5], [1, -1.35, -0.5], [-1, -1.35, 0.5], [1, -1.35, 0.5]].map((p, i) => (
          <mesh key={i} position={p} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 1.4]} />
            <meshStandardMaterial color={metal} metalness={0.25} roughness={0.35} />
          </mesh>
        ))}
        {/* Laptop base */}
        <mesh position={[0, -0.45, 0]} castShadow>
          <boxGeometry args={[1.2, 0.06, 0.8]} />
          <meshStandardMaterial color={laptopBase} roughness={0.45} metalness={0.05} />
        </mesh>
        {/* Trackpad */}
        <mesh position={[0, -0.41, 0.18]} castShadow>
          <boxGeometry args={[0.42, 0.01, 0.28]} />
          <meshStandardMaterial color={keycaps} roughness={0.85} />
        </mesh>
        {/* Keyboard deck */}
        <mesh position={[0, -0.41, -0.08]} castShadow>
          <boxGeometry args={[0.95, 0.01, 0.36]} />
          <meshStandardMaterial color="#4a3f5c" opacity={0.18} transparent />
        </mesh>
        {/* Keys (simple grid) */}
        {Array.from({ length: 5 }).flatMap((_, r) =>
          Array.from({ length: 8 }).map((__, c) => {
            const x = -0.42 + c * 0.12;
            const z = 0.07 - r * 0.085;
            return (
              <mesh key={`k-${r}-${c}`} position={[x, -0.405, z]} castShadow>
                <boxGeometry args={[0.09, 0.01, 0.06]} />
                <meshStandardMaterial color={keycaps} roughness={0.9} />
              </mesh>
            );
          })
        )}
        {/* Hinge */}
        <mesh position={[0, -0.41, -0.38]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 1.05, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color={metal} metalness={0.35} roughness={0.35} />
        </mesh>
        {/* Laptop screen */}
        <mesh position={[0, 0.05, -0.35]} rotation={[-0.2, 0, 0]} castShadow>
          <boxGeometry args={[1.2, 0.8, 0.04]} />
          <meshStandardMaterial color={laptopScreen} roughness={0.55} />
        </mesh>
        {/* Screen glow */}
        <mesh position={[0, 0.05, -0.33]} rotation={[-0.2, 0, 0]}>
          <planeGeometry args={[1.05, 0.65]} />
          <meshStandardMaterial color="#CDE7FF" emissive="#CDE7FF" emissiveIntensity={0.5} />
        </mesh>
        {/* Webcam dot */}
        <mesh position={[0, 0.42, -0.33]} rotation={[-0.2, 0, 0]}>
          <sphereGeometry args={[0.03, 10, 10]} />
          <meshStandardMaterial color="#111111" />
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

/* ── Diwan / Daybed ── */
function DiwanBed({ position }) {
  return (
    <FloatingObject speed={0.9} amplitude={0.2}>
      <group position={position}>
        {/* Base */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.5, 1.2]} />
          <meshStandardMaterial color="#E8D5C0" roughness={0.65} />
        </mesh>
        {/* Mattress */}
        <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.25, 1.05]} />
          <meshStandardMaterial color="#FFF4E6" roughness={0.9} />
        </mesh>
        {/* Bolsters */}
        {[-1.0, 1.0].map((x, i) => (
          <mesh key={i} position={[x, 0.7, -0.35]} castShadow>
            <cylinderGeometry args={[0.16, 0.16, 0.55, 18]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color={i === 0 ? "#CFC8FF" : "#F6C9D6"} roughness={0.8} />
          </mesh>
        ))}
        {/* Backrest */}
        <mesh position={[0, 0.8, -0.55]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.9, 0.18]} />
          <meshStandardMaterial color="#FFD6C9" roughness={0.85} />
        </mesh>
        {/* Throw */}
        <mesh position={[0.2, 0.7, 0.15]} rotation={[0, -0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.12, 0.8]} />
          <meshStandardMaterial color="#CDE7FF" roughness={0.9} />
        </mesh>
      </group>
    </FloatingObject>
  );
}

/* ── Main exported component ── */
export default function InteractiveObjects() {
  const { isUnboxed, unboxItem, setActivePanel, nextItem, positions, isPlaced } = useGame();

  const objectConfigs = [
    {
      id: "laptop",
      label: "Unbox Desk",
      pos: [-1.5, 1.5, -2],
      boxColor: "#CFC8FF",
      Component: Laptop,
      itemPos: [-1.5, 2.05, -2],
      chip: { title: "About Me", subtitle: "Full Stack Developer" },
      chipOffset: [0, 1.35, 0],
      targetPos: [-1.5, 2.05, -2],
      shadow: { footprint: [2.6, 1.6], shape: "rect" },
      hitbox: [3.2, 2.6, 2.4],
    },
    {
      id: "bookshelf",
      label: "Unbox Projects",
      pos: [-4.5, 1.5, -3],
      boxColor: "#F6C9D6",
      Component: Bookshelf,
      itemPos: [-4.5, 1.5, -4],
      chip: { title: "Projects", subtitle: "Things I’ve built" },
      chipOffset: [0, 1.55, 0],
      targetPos: [-4.5, 1.5, -4],
      shadow: { footprint: [2.2, 0.9], shape: "rect" },
      hitbox: [2.6, 3.4, 1.3],
    },
    {
      id: "coffeeTable",
      label: "Unbox Experience",
      pos: [0, 1.2, 1],
      boxColor: "#CDE7FF",
      Component: CoffeeTable,
      itemPos: [0, 0.98, 1],
      chip: { title: "Experience", subtitle: "Work + internships" },
      chipOffset: [0, 1.05, 0],
      targetPos: [0, 0.98, 1],
      shadow: { footprint: [1.9, 1.9], shape: "circle" },
      hitbox: [2.2, 1.6, 2.2],
    },
    {
      id: "wardrobe",
      label: "Unbox Skills",
      pos: [4, 1.5, -3],
      boxColor: "#FFD6C9",
      Component: Wardrobe,
      itemPos: [4, 1.4, -4.5],
      chip: { title: "Skills", subtitle: "Tech + tools" },
      chipOffset: [0, 1.55, 0],
      targetPos: [4, 1.4, -4.5],
      shadow: { footprint: [1.9, 0.9], shape: "rect" },
      hitbox: [2.2, 3.2, 1.6],
    },
    {
      id: "plant",
      label: "Unbox Highlights",
      pos: [3, 0.8, 1.5],
      boxColor: "#D8F3E3",
      Component: Plant,
      itemPos: [3, 0.5, 1.5],
      chip: { title: "Highlights", subtitle: "Achievements + courses" },
      chipOffset: [0, 1.2, 0],
      targetPos: [3, 0.5, 1.5],
      shadow: { footprint: [0.9, 0.9], shape: "circle" },
      hitbox: [1.4, 1.6, 1.4],
    },
    {
      id: "window",
      label: "Unbox Contact",
      pos: [-4, 3.5, -5.5],
      boxColor: "#CDE7FF",
      Component: Window,
      itemPos: [-4, 0, -5.85],
      chip: { title: "Contact", subtitle: "Let’s connect" },
      chipOffset: [0, 1.4, 0],
      targetPos: [-4, 3.5, -5.85],
      shadow: { footprint: [2.2, 0.4], shape: "rect" },
      hitbox: [2.6, 3.0, 0.8],
    },
    {
      id: "diwanBed",
      label: "Unbox Diwan Bed",
      pos: [2.0, 1.2, 0],
      boxColor: "#FFD6C9",
      Component: DiwanBed,
      itemPos: [1.8, 0.75, -1.2],
      chip: { title: "Education", subtitle: "Academic journey" },
      chipOffset: [0, 1.35, 0],
      targetPos: [1.8, 0.75, -1.2],
      shadow: { footprint: [3.1, 1.5], shape: "rect" },
      hitbox: [3.4, 2.0, 1.8],
    },
  ];

  return (
    <group>
      {objectConfigs.map((config) => {
        const { id, label, pos, boxColor, itemPos, chip, chipOffset, targetPos, shadow } = config;
        const ItemComponent = config.Component;
        const unboxed = isUnboxed(id);
        const isNext = nextItem === id;
        const basePos = positions?.[id] || itemPos;
        return (
          <group key={id}>
            {unboxed && !isPlaced(id) && targetPos && (
              <ShadowPlaceholder
                position={[targetPos[0], 0, targetPos[2]]}
                footprint={shadow?.footprint}
                shape={shadow?.shape}
              />
            )}
            {unboxed ? (
              <DraggableItem
                id={id}
                basePosition={itemPos}
                onOpen={() => setActivePanel(id)}
                hitbox={config.hitbox}
              >
                <ItemComponent position={[0, 0, 0]} />
                {chip && (
                  <Html position={chipOffset || [0, 1.2, 0]} center>
                    <LabelChip
                      title={chip.title}
                      subtitle={chip.subtitle}
                      onClick={() => setActivePanel(id)}
                    />
                  </Html>
                )}
              </DraggableItem>
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
