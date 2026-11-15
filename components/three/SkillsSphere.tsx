"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { CanvasTexture, LinearFilter, SRGBColorSpace, Vector3, type Group, type Sprite } from "three";
import { useThemeColors } from "./useThemeColors";

const finePointer = () => window.matchMedia("(pointer: fine)").matches;

const RADIUS = 2.9;

function makeLabelTexture(text: string, color: string, font: string) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const fontSize = 64;
  ctx.font = `600 ${fontSize}px ${font}`;
  const width = Math.ceil(ctx.measureText(text).width) + 24;
  canvas.width = width;
  canvas.height = fontSize + 24;
  ctx.font = `600 ${fontSize}px ${font}`;
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(text, width / 2, canvas.height / 2);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.minFilter = LinearFilter;
  return { texture, aspect: width / canvas.height };
}

function Label({
  text,
  position,
  color,
  hoverColor,
  font,
}: {
  text: string;
  position: Vector3;
  color: string;
  hoverColor: string;
  font: string;
}) {
  const sprite = useRef<Sprite>(null);
  const [hovered, setHovered] = useState(false);
  const label = useMemo(
    () => makeLabelTexture(text, hovered ? hoverColor : color, font),
    [text, hovered, color, hoverColor, font]
  );
  useEffect(() => () => label.texture.dispose(), [label]);

  const worldPos = useMemo(() => new Vector3(), []);
  useFrame(({ camera }) => {
    if (!sprite.current) return;
    // Fade labels on the far side of the sphere for a sense of depth.
    sprite.current.getWorldPosition(worldPos);
    const facing = worldPos.clone().normalize().dot(camera.position.clone().normalize());
    const material = sprite.current.material;
    const depth = (facing + 1) / 2;
    material.opacity = hovered ? 1 : 0.08 + 0.92 * depth * depth;
    const s = hovered ? 1.25 : 1;
    sprite.current.scale.set(0.32 * label.aspect * s, 0.32 * s, 1);
  });

  return (
    <sprite
      ref={sprite}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <spriteMaterial map={label.texture} transparent depthWrite={false} />
    </sprite>
  );
}

function Sphere({ skills, animate }: { skills: string[]; animate: boolean }) {
  const { accent, foreground, font } = useThemeColors();
  const group = useRef<Group>(null);
  const paused = useRef(false);

  // Evenly distribute labels on a sphere (Fibonacci lattice).
  const positions = useMemo(() => {
    const n = skills.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    return skills.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      return new Vector3(Math.cos(theta) * r * RADIUS, y * RADIUS, Math.sin(theta) * r * RADIUS);
    });
  }, [skills]);

  useFrame((_, delta) => {
    if (!animate || paused.current || !group.current) return;
    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x += delta * 0.04;
  });

  return (
    <group
      ref={group}
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
    >
      <mesh>
        <sphereGeometry args={[RADIUS * 0.92, 24, 16]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.08} />
      </mesh>
      {skills.map((skill, i) => (
        <Label
          key={skill}
          text={skill}
          position={positions[i]}
          color={foreground}
          hoverColor={accent}
          font={font}
        />
      ))}
    </group>
  );
}

export default function SkillsSphere({ skills, animate }: { skills: string[]; animate: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8.2], fov: 50 }}
      dpr={[1, 2]}
      frameloop={animate ? "always" : "demand"}
      gl={{ antialias: true, alpha: true }}
    >
      <Sphere skills={skills} animate={animate} />
      {finePointer() ? <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} /> : null}
    </Canvas>
  );
}
