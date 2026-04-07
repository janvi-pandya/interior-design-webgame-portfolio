import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Room from "./Room";
import InteractiveObjects from "./InteractiveObjects";

export default function Scene() {
  return (
    <Canvas
      shadows
      camera={{
        position: [10, 9, 10],
        fov: 42,
        near: 0.1,
        far: 100,
      }}
      style={{ background: "linear-gradient(180deg, #0D3D3D 0%, #1A5555 40%, #2A4A5A 100%)" }}
    >
      {/* Warm ambient fill — golden hour feel */}
      <ambientLight intensity={0.5} color="#FFE8CC" />

      {/* Main directional — warm golden sunlight */}
      <directionalLight
        position={[6, 10, 6]}
        intensity={0.9}
        color="#FFD699"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Cool fill light — subtle teal */}
      <directionalLight
        position={[-4, 6, -4]}
        intensity={0.25}
        color="#1A7A7A"
      />

      {/* Warm point light — room center glow */}
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#FFD699" distance={14} />

      {/* Accent light — magenta warmth */}
      <pointLight position={[-4, 2, 2]} intensity={0.2} color="#D4488E" distance={8} />

      {/* Brass lamp glow */}
      <pointLight position={[4, 3, -5]} intensity={0.15} color="#E8A838" distance={6} />

      <Room />
      <InteractiveObjects />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={8}
        maxDistance={22}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.5}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        target={[0, 2.5, 0]}
        autoRotate
        autoRotateSpeed={0.25}
      />
    </Canvas>
  );
}
