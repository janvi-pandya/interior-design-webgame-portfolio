import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

/* Indian princess room — teal walls, ornate arches, gold trim, warm rug */
export default function Room() {
  const roomRef = useRef();

  useFrame((state) => {
    if (roomRef.current) {
      roomRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.015;
    }
  });

  return (
    <group ref={roomRef}>
      {/* ── Floor — warm wood tone ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#D4A574" />
      </mesh>

      {/* Floor border pattern */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0, 0]} receiveShadow>
        <ringGeometry args={[6.5, 7, 4]} />
        <meshStandardMaterial color="#C4842D" opacity={0.3} transparent />
      </mesh>

      {/* ── Back wall — rich teal ── */}
      <mesh position={[0, 3.5, -7]} receiveShadow>
        <planeGeometry args={[14, 7]} />
        <meshStandardMaterial color="#1A7A7A" />
      </mesh>

      {/* ── Left wall — slightly lighter teal ── */}
      <mesh position={[-7, 3.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[14, 7]} />
        <meshStandardMaterial color="#1E8585" />
      </mesh>

      {/* ── Ornate arch panel — back wall center ── */}
      <group position={[0, 3.5, -6.9]}>
        {/* Main panel frame */}
        <mesh>
          <boxGeometry args={[4, 5, 0.08]} />
          <meshStandardMaterial color="#15696A" />
        </mesh>
        {/* Gold border */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[3.8, 4.8, 0.02]} />
          <meshStandardMaterial color="#C4842D" emissive="#C4842D" emissiveIntensity={0.15} />
        </mesh>
        {/* Inner panel */}
        <mesh position={[0, 0, 0.07]}>
          <boxGeometry args={[3.4, 4.4, 0.02]} />
          <meshStandardMaterial color="#1A7A7A" />
        </mesh>
        {/* Arch top — semicircle approximation */}
        <mesh position={[0, 1.8, 0.08]}>
          <cylinderGeometry args={[1.2, 1.2, 0.04, 32, 1, false, 0, Math.PI]} />
          <meshStandardMaterial color="#C4842D" emissive="#C4842D" emissiveIntensity={0.1} />
        </mesh>
      </group>

      {/* ── Ornate wall art — back wall (inspired by reference image) ── */}
      <group position={[0, 4.2, -6.82]}>
        {/* Frame */}
        <mesh>
          <boxGeometry args={[1.6, 1.6, 0.06]} />
          <meshStandardMaterial color="#C4842D" emissive="#C4842D" emissiveIntensity={0.2} />
        </mesh>
        {/* Art inner */}
        <mesh position={[0, 0, 0.04]}>
          <boxGeometry args={[1.3, 1.3, 0.02]} />
          <meshStandardMaterial color="#D4488E" />
        </mesh>
        {/* Mandala-inspired pattern (decorative circles) */}
        <mesh position={[0, 0, 0.06]}>
          <ringGeometry args={[0.2, 0.5, 16]} />
          <meshStandardMaterial color="#E8A838" emissive="#E8A838" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.065]}>
          <ringGeometry args={[0.05, 0.15, 8]} />
          <meshStandardMaterial color="#F5D68A" emissive="#F5D68A" emissiveIntensity={0.2} />
        </mesh>
      </group>

      {/* ── Side arch panels — left wall ── */}
      <group position={[-6.9, 3.8, -2]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <boxGeometry args={[2.5, 4, 0.08]} />
          <meshStandardMaterial color="#156D6D" />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[2.2, 3.7, 0.02]} />
          <meshStandardMaterial color="#C4842D" emissive="#C4842D" emissiveIntensity={0.1} />
        </mesh>
        <mesh position={[0, 0, 0.07]}>
          <boxGeometry args={[1.9, 3.4, 0.02]} />
          <meshStandardMaterial color="#1E8585" />
        </mesh>
        {/* Arched window peek */}
        <mesh position={[0, 0.8, 0.08]}>
          <cylinderGeometry args={[0.6, 0.6, 0.04, 32, 1, false, 0, Math.PI]} />
          <meshStandardMaterial color="#E8885C" opacity={0.6} transparent />
        </mesh>
      </group>

      {/* ── Gold crown molding — back wall ── */}
      <mesh position={[0, 6.95, -6.95]}>
        <boxGeometry args={[14, 0.15, 0.15]} />
        <meshStandardMaterial color="#C4842D" emissive="#C4842D" emissiveIntensity={0.3} />
      </mesh>

      {/* ── Gold crown molding — left wall ── */}
      <mesh position={[-6.95, 6.95, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[14, 0.15, 0.15]} />
        <meshStandardMaterial color="#C4842D" emissive="#C4842D" emissiveIntensity={0.3} />
      </mesh>

      {/* ── Wainscoting / lower wall panel — back ── */}
      <mesh position={[0, 0.8, -6.92]}>
        <boxGeometry args={[14, 1.6, 0.1]} />
        <meshStandardMaterial color="#15696A" />
      </mesh>
      {/* Gold baseboard trim — back */}
      <mesh position={[0, 0.05, -6.92]}>
        <boxGeometry args={[14, 0.12, 0.12]} />
        <meshStandardMaterial color="#C4842D" emissive="#C4842D" emissiveIntensity={0.2} />
      </mesh>

      {/* ── Wainscoting — left ── */}
      <mesh position={[-6.92, 0.8, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[14, 1.6, 0.1]} />
        <meshStandardMaterial color="#156D6D" />
      </mesh>
      {/* Gold baseboard trim — left */}
      <mesh position={[-6.92, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[14, 0.12, 0.12]} />
        <meshStandardMaterial color="#C4842D" emissive="#C4842D" emissiveIntensity={0.2} />
      </mesh>

      {/* ── Oriental rug — rich red with gold border ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0.3]} position={[0, 0.02, 0]}>
        <planeGeometry args={[6, 4]} />
        <meshStandardMaterial color="#B22234" opacity={0.85} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0.3]} position={[0, 0.025, 0]}>
        <planeGeometry args={[5.6, 3.6]} />
        <meshStandardMaterial color="#C4842D" opacity={0.3} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0.3]} position={[0, 0.03, 0]}>
        <planeGeometry args={[5.2, 3.2]} />
        <meshStandardMaterial color="#8B1A2B" opacity={0.7} transparent />
      </mesh>

      {/* ── Decorative brass lamps — wall sconces ── */}
      {[[-3.5, 4.5, -6.85], [3.5, 4.5, -6.85]].map((pos, i) => (
        <group key={`lamp-${i}`} position={pos}>
          {/* Lamp bracket */}
          <mesh>
            <boxGeometry args={[0.15, 0.3, 0.1]} />
            <meshStandardMaterial color="#C4842D" />
          </mesh>
          {/* Lamp shade */}
          <mesh position={[0, -0.3, 0.1]}>
            <cylinderGeometry args={[0.15, 0.2, 0.3, 8]} />
            <meshStandardMaterial color="#E8A838" emissive="#FFD699" emissiveIntensity={0.4} />
          </mesh>
          {/* Glow */}
          <pointLight position={[0, -0.3, 0.2]} intensity={0.3} color="#FFD699" distance={4} />
        </group>
      ))}

      {/* ── Decorative brass vases on floor ── */}
      <group position={[-5.5, 0.5, -5.5]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.3, 1, 16]} />
          <meshStandardMaterial color="#C4842D" metalness={0.4} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color="#B87333" metalness={0.5} roughness={0.4} />
        </mesh>
      </group>

      <group position={[5.5, 0.4, -5.5]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.25, 0.2, 0.8, 16]} />
          <meshStandardMaterial color="#B87333" metalness={0.4} roughness={0.5} />
        </mesh>
      </group>

      {/* ── Cherry blossom / decorative branches in vase ── */}
      <group position={[5.5, 1.2, -5.5]}>
        {[[-0.1, 0, 0], [0.1, 0.3, 0.05], [0, 0.5, -0.05]].map((p, i) => (
          <mesh key={`branch-${i}`} position={p}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="#E8578A" emissive="#E8578A" emissiveIntensity={0.2} />
          </mesh>
        ))}
        {/* Stems */}
        <mesh position={[0, 0.2, 0]} rotation={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.015, 0.015, 0.8]} />
          <meshStandardMaterial color="#5A3D2B" />
        </mesh>
        <mesh position={[0.05, 0.3, 0]} rotation={[0, 0, -0.15]}>
          <cylinderGeometry args={[0.012, 0.012, 0.7]} />
          <meshStandardMaterial color="#5A3D2B" />
        </mesh>
      </group>

      {/* ── Fairy / string lights along back wall top ── */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={`light-${i}`} position={[-5.5 + i * 1, 6.5, -6.85]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color="#FFD699"
            emissive="#FFD699"
            emissiveIntensity={1.2}
          />
        </mesh>
      ))}

      {/* String light wire */}
      <mesh position={[0, 6.5, -6.87]}>
        <boxGeometry args={[12, 0.015, 0.015]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>

      {/* ── Decorative cushions on floor (Indian style) ── */}
      <group position={[-2, 0.15, 2]}>
        <mesh rotation={[-Math.PI / 2, 0, 0.5]} castShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.15, 16]} />
          <meshStandardMaterial color="#E8578A" />
        </mesh>
      </group>
      <group position={[-1.2, 0.15, 2.5]}>
        <mesh rotation={[-Math.PI / 2, 0, -0.3]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.12, 16]} />
          <meshStandardMaterial color="#E8A838" />
        </mesh>
      </group>
    </group>
  );
}
