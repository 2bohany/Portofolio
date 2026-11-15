"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import type { Group, Mesh } from "three";
import { useThemeColors } from "./useThemeColors";

const finePointer = () => window.matchMedia("(pointer: fine)").matches;

interface SceneProps {
  animate: boolean;
}

function Core({ accent, foreground, animate }: { accent: string; foreground: string; animate: boolean }) {
  const core = useRef<Mesh>(null);
  const shell = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!animate) return;
    if (core.current) {
      core.current.rotation.x += delta * 0.25;
      core.current.rotation.y += delta * 0.35;
    }
    if (shell.current) {
      shell.current.rotation.x -= delta * 0.1;
      shell.current.rotation.y -= delta * 0.15;
    }
  });

  return (
    <group>
      <mesh ref={core}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={accent} flatShading metalness={0.35} roughness={0.3} />
      </mesh>
      <mesh ref={shell} scale={1.65}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={foreground} wireframe transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function Rings({ accent, foreground, animate }: { accent: string; foreground: string; animate: boolean }) {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (animate && group.current) group.current.rotation.z += delta * 0.12;
  });
  return (
    <group ref={group}>
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.35, 0.012, 16, 128]} />
        <meshBasicMaterial color={accent} transparent opacity={0.7} />
      </mesh>
      <mesh rotation={[Math.PI / 3, -Math.PI / 5, 0.5]}>
        <torusGeometry args={[2.75, 0.008, 16, 128]} />
        <meshBasicMaterial color={foreground} transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

const orbiterShapes = ["box", "octahedron", "tetrahedron", "box", "octahedron", "tetrahedron"] as const;

function Orbiters({ accent, foreground, animate }: { accent: string; foreground: string; animate: boolean }) {
  const group = useRef<Group>(null);
  const items = useMemo(
    () =>
      orbiterShapes.map((shape, i) => {
        const angle = (i / orbiterShapes.length) * Math.PI * 2;
        const radius = 2.35 + (i % 2) * 0.4;
        return {
          shape,
          position: [Math.cos(angle) * radius, Math.sin(angle * 2) * 0.5, Math.sin(angle) * radius] as const,
          scale: 0.16 + (i % 3) * 0.05,
          useAccent: i % 2 === 0,
        };
      }),
    []
  );

  useFrame((_, delta) => {
    if (animate && group.current) group.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={group} rotation={[Math.PI / 12, 0, 0]}>
      {items.map((item, i) => (
        <Float key={i} speed={animate ? 2 : 0} rotationIntensity={1.2} floatIntensity={0.6}>
          <mesh position={[...item.position]} scale={item.scale}>
            {item.shape === "box" ? (
              <boxGeometry args={[1, 1, 1]} />
            ) : item.shape === "octahedron" ? (
              <octahedronGeometry args={[1, 0]} />
            ) : (
              <tetrahedronGeometry args={[1, 0]} />
            )}
            <meshStandardMaterial
              color={item.useAccent ? accent : foreground}
              flatShading
              metalness={0.2}
              roughness={0.4}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/** Tilts the whole scene gently toward the pointer. */
function PointerTilt({ children, animate }: { children: React.ReactNode; animate: boolean }) {
  const group = useRef<Group>(null);
  useFrame(({ pointer }, delta) => {
    if (!animate || !group.current) return;
    const k = Math.min(1, delta * 3);
    group.current.rotation.y += (pointer.x * 0.35 - group.current.rotation.y) * k;
    group.current.rotation.x += (-pointer.y * 0.25 - group.current.rotation.x) * k;
  });
  return <group ref={group}>{children}</group>;
}

export default function HeroScene({ animate }: SceneProps) {
  const { accent, foreground } = useThemeColors();

  return (
    <Canvas
      camera={{ position: [0, 0, 7.8], fov: 45 }}
      dpr={[1, 2]}
      frameloop={animate ? "always" : "demand"}
      gl={{ antialias: true, alpha: true }}
      aria-hidden
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 6]} intensity={1.6} />
      <directionalLight position={[-5, -3, -4]} intensity={0.5} color={accent} />
      <PointerTilt animate={animate}>
        <Core accent={accent} foreground={foreground} animate={animate} />
        <Rings accent={accent} foreground={foreground} animate={animate} />
        <Orbiters accent={accent} foreground={foreground} animate={animate} />
      </PointerTilt>
      {finePointer() ? <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.6} /> : null}
    </Canvas>
  );
}
