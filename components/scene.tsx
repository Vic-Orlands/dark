"use client";

import { Canvas } from "@react-three/fiber";
import { Text3D } from "@react-three/drei";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { useMemo, Suspense } from "react";

const FONT_URL =
  "https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_bold.typeface.json";

function pseudoRandom(seed: string) {
  let h = 1779033703;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967295;
  };
}

function Letter({
  char,
  color,
  seed,
}: {
  char: string;
  color: string;
  seed: string;
}) {
  // Initial random drop position & rotation
  if (char === " ") return null;

  const rng = pseudoRandom(seed);

  const startPos: [number, number, number] = [
    (rng() - 0.5) * 16,
    10 + rng() * 15,
    (rng() - 0.5) * 10,
  ];

  const startRot: [number, number, number] = [
    rng() * Math.PI,
    rng() * Math.PI,
    rng() * Math.PI,
  ];

  return (
    <RigidBody
      position={startPos}
      rotation={startRot}
      restitution={0.4}
      friction={0.6}
      colliders={false}
    >
      {/* Manual collider to prevent Rapier from crashing while Text3D loads */}
      <CuboidCollider args={[0.6, 0.7, 0.2]} position={[0, 0, 0]} />
      <group position={[-0.6, -0.7, -0.2]}>
        <Text3D
          font={FONT_URL}
          size={1.4}
          height={0.4}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.04}
          bevelSize={0.03}
          bevelOffset={0}
          bevelSegments={5}
        >
          {char}
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
        </Text3D>
      </group>
    </RigidBody>
  );
}

export default function Scene() {
  const text = "POWER DELIVERED";
  const chars1 = text.split("");
  const chars2 = text.split("");

  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        camera={{ position: [0, 5, 25], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
      >
        <color attach="background" args={["#030712"]} />{" "}
        {/* tailwind gray-950 */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 20, 10]} intensity={2} castShadow />
        <pointLight position={[-10, 10, -10]} intensity={1} />
        <Suspense fallback={null}>
          <Physics>
            {/* Ground */}
            <RigidBody
              type="fixed"
              position={[0, -4, 0]}
              colliders="cuboid"
              friction={1}
              restitution={0.3}
            >
              <mesh receiveShadow>
                <boxGeometry args={[100, 1, 100]} />
                <meshStandardMaterial color="#111827" />{" "}
                {/* tailwind gray-900 */}
              </mesh>
            </RigidBody>

            {/* Invisible Walls to keep letters from flying away */}
            <RigidBody type="fixed" position={[-15, 5, 0]} colliders="cuboid">
              <mesh visible={false}>
                <boxGeometry args={[1, 50, 50]} />
              </mesh>
            </RigidBody>
            <RigidBody type="fixed" position={[15, 5, 0]} colliders="cuboid">
              <mesh visible={false}>
                <boxGeometry args={[1, 50, 50]} />
              </mesh>
            </RigidBody>
            <RigidBody type="fixed" position={[0, 5, -15]} colliders="cuboid">
              <mesh visible={false}>
                <boxGeometry args={[50, 50, 1]} />
              </mesh>
            </RigidBody>
            <RigidBody type="fixed" position={[0, 5, 10]} colliders="cuboid">
              <mesh visible={false}>
                <boxGeometry args={[50, 50, 1]} />
              </mesh>
            </RigidBody>

            {/* Falling Letters Set 1 (Yellow) */}
            {chars1.map((char, i) => (
              <Letter
                key={`set1-${i}`}
                char={char}
                color="#eab308"
                seed={`${char}-${i}`}
              />
            ))}

            {/* Falling Letters Set 2 (Cyan) */}
            {chars2.map((char, i) => (
              <Letter
                key={`set2-${i}`}
                char={char}
                color="#06b6d4"
                seed={`${char}-${i}`}
              />
            ))}
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}
