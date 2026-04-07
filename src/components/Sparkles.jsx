import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function generateParticles(count) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      offset: new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        Math.random() * 2,
        (Math.random() - 0.5) * 2
      ),
      speed: 0.5 + Math.random() * 1.5,
      delay: Math.random() * 2,
    });
  }
  return arr;
}

export default function Sparkles({ count = 20, position = [0, 0, 0], active = false }) {
  const meshRef = useRef();
  const [particles] = useState(() => generateParticles(count));

  useFrame((state) => {
    if (!meshRef.current || !active) return;
    const time = state.clock.elapsedTime;
    const children = meshRef.current.children;
    for (let i = 0; i < children.length; i++) {
      const p = particles[i];
      const t = (time * p.speed + p.delay) % 2;
      const scale = t < 1 ? Math.sin(t * Math.PI) : 0;
      children[i].scale.setScalar(scale * 0.05);
      children[i].position.set(
        position[0] + p.offset.x,
        position[1] + p.offset.y + t * 0.5,
        position[2] + p.offset.z
      );
    }
  });

  if (!active) return null;

  return (
    <group ref={meshRef}>
      {particles.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={2}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}
