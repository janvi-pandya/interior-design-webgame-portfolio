import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Room() {
  const floorRef = useRef();

  useFrame((state) => {
    if (floorRef.current) {
      floorRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  return (
    <group ref={floorRef}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#F5E6D3" />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 3, -6]} receiveShadow>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial color="#FFF4E6" />
      </mesh>

      {/* Left wall */}
      <mesh position={[-6, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial color="#FFF0E0" />
      </mesh>

      {/* Baseboard - back */}
      <mesh position={[0, 0.15, -5.95]}>
        <boxGeometry args={[12, 0.3, 0.1]} />
        <meshStandardMaterial color="#E8D5C0" />
      </mesh>

      {/* Baseboard - left */}
      <mesh position={[-5.95, 0.15, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[12, 0.3, 0.1]} />
        <meshStandardMaterial color="#E8D5C0" />
      </mesh>

      {/* Rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[3, 64]} />
        <meshStandardMaterial color="#F6C9D6" opacity={0.4} transparent />
      </mesh>

      {/* Picture frames on back wall */}
      <group position={[-2.5, 4, -5.9]}>
        <mesh>
          <boxGeometry args={[1.2, 0.9, 0.05]} />
          <meshStandardMaterial color="#E8D5C0" />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[1, 0.7, 0.02]} />
          <meshStandardMaterial color="#CDE7FF" />
        </mesh>
      </group>

      <group position={[2, 4.2, -5.9]}>
        <mesh>
          <boxGeometry args={[0.8, 1, 0.05]} />
          <meshStandardMaterial color="#E8D5C0" />
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
    </group>
  );
}
