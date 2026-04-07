import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Room from "./Room";
import InteractiveObjects from "./InteractiveObjects";

export default function Scene() {
  return (
    <Canvas
      shadows
      camera={{
        position: [8, 8, 8],
        fov: 45,
        near: 0.1,
        far: 100,
      }}
      style={{ background: "linear-gradient(180deg, #E8E0FF 0%, #FFF4E6 100%)" }}
    >
      {/* Ambient light for soft fill */}
      <ambientLight intensity={0.6} color="#FFF4E6" />

      {/* Main directional light - warm sunlight */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.8}
        color="#FFE4CC"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Soft fill light from the other side */}
      <directionalLight
        position={[-3, 5, -3]}
        intensity={0.3}
        color="#CFC8FF"
      />

      {/* Point light for cozy glow */}
      <pointLight position={[0, 4, 0]} intensity={0.4} color="#FFD6C9" distance={12} />

      {/* Subtle accent light */}
      <pointLight position={[-4, 2, 2]} intensity={0.2} color="#CDE7FF" distance={8} />

      <Room />
      <InteractiveObjects />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={6}
        maxDistance={18}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.5}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        target={[0, 2, 0]}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </Canvas>
  );
}
