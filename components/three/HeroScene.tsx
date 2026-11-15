"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, OrbitControls, Trail } from "@react-three/drei";
import {
  AdditiveBlending,
  BackSide,
  BufferGeometry,
  CanvasTexture,
  Color,
  EdgesGeometry,
  Float32BufferAttribute,
  IcosahedronGeometry,
  NormalBlending,
  ShaderMaterial,
  type Blending,
  type Group,
  type LineSegments,
  type Mesh,
  type MeshPhysicalMaterial,
  type PointLight,
  type Sprite,
  type Texture,
} from "three";
import { useThemeColors } from "./useThemeColors";

const finePointer = () => window.matchMedia("(pointer: fine)").matches;

interface Palette {
  accent: string;
  glow: string;
  foreground: string;
  blending: Blending;
  dark: boolean;
  animate: boolean;
  glowMap: Texture;
}

/** Soft radial gradient used for halos, light heads and particles. */
function useGlowTexture() {
  return useMemo(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.25, "rgba(255,255,255,0.55)");
    g.addColorStop(0.6, "rgba(255,255,255,0.12)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new CanvasTexture(canvas);
  }, []);
}

/* ---------------------------------------------------------------- core */

function Core({ accent, glow, animate }: Palette) {
  const mesh = useRef<Mesh>(null);
  const material = useRef<MeshPhysicalMaterial>(null);

  useFrame(({ clock }, delta) => {
    if (!animate) return;
    const t = clock.elapsedTime;
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.22;
      mesh.current.rotation.y += delta * 0.3;
    }
    // Slow "breathing" glow.
    if (material.current) material.current.emissiveIntensity = 0.35 + Math.sin(t * 1.6) * 0.2;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        ref={material}
        color={accent}
        emissive={glow}
        emissiveIntensity={0.35}
        metalness={0.75}
        roughness={0.18}
        clearcoat={1}
        clearcoatRoughness={0.1}
        flatShading
      />
    </mesh>
  );
}

/** Fresnel "atmosphere": a rim of blue light around the core. */
function Atmosphere({ glow, blending, dark }: Palette) {
  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          uColor: { value: new Color(glow) },
          uIntensity: { value: dark ? 0.5 : 0.45 },
        },
        vertexShader: /* glsl */ `
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vNormal = normalize(normalMatrix * normal);
            vView = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          uniform float uIntensity;
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            // x = 0 at the silhouette, 1 facing the camera. With this sphere
            // scaled to ~1.9x the core, the glow peaks right at the core edge
            // (x ~ 0.83) and falls off smoothly to zero at the outer edge.
            float x = abs(dot(vNormal, vView));
            float glow = pow(x, 5.0) * (1.0 - x) * 15.0;
            gl_FragColor = vec4(uColor, glow * uIntensity);
          }
        `,
        side: BackSide,
        transparent: true,
        depthWrite: false,
        blending,
      }),
    [glow, blending, dark]
  );

  return (
    <mesh scale={1.9}>
      <sphereGeometry args={[1, 48, 48]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function Halo({ glow, blending, dark, animate, glowMap }: Palette) {
  const sprite = useRef<Sprite>(null);
  useFrame(({ clock }) => {
    if (!animate || !sprite.current) return;
    const s = 5.2 + Math.sin(clock.elapsedTime * 1.6) * 0.35;
    sprite.current.scale.set(s, s, 1);
  });
  return (
    <sprite ref={sprite} scale={5.2}>
      <spriteMaterial
        map={glowMap}
        color={glow}
        transparent
        opacity={dark ? 0.55 : 0.35}
        depthWrite={false}
        blending={blending}
      />
    </sprite>
  );
}

/** Geodesic shell drawn as clean edges, with a light wave sweeping across it. */
function Shell({ glow, foreground, blending, dark, animate }: Palette) {
  const group = useRef<Group>(null);
  const lines = useRef<LineSegments>(null);
  const geometry = useMemo(() => new EdgesGeometry(new IcosahedronGeometry(1.75, 1)), []);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uBase: { value: new Color(foreground) },
          uGlow: { value: new Color(glow) },
          uBaseAlpha: { value: dark ? 0.14 : 0.2 },
        },
        vertexShader: /* glsl */ `
          varying vec3 vPos;
          void main() {
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform float uTime;
          uniform vec3 uBase;
          uniform vec3 uGlow;
          uniform float uBaseAlpha;
          varying vec3 vPos;
          void main() {
            float wave = smoothstep(0.75, 1.0, sin(vPos.y * 2.2 + vPos.x * 0.8 - uTime * 1.8));
            vec3 col = mix(uBase, uGlow, wave);
            gl_FragColor = vec4(col, uBaseAlpha + wave * 0.75);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending,
      }),
    [foreground, glow, blending, dark]
  );

  useFrame(({ clock }, delta) => {
    if (!animate) return;
    if (lines.current) (lines.current.material as ShaderMaterial).uniforms.uTime.value = clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y -= delta * 0.08;
      group.current.rotation.x -= delta * 0.04;
    }
  });

  return (
    <group ref={group}>
      <lineSegments ref={lines} geometry={geometry} material={material} />
    </group>
  );
}

/* --------------------------------------------------------------- orbits */

interface OrbitSpec {
  radius: number;
  rotation: [number, number, number];
  speed: number;
  offset: number;
}

const orbits: OrbitSpec[] = [
  { radius: 2.4, rotation: [Math.PI / 2.4, 0, 0], speed: 0.7, offset: 0 },
  { radius: 2.85, rotation: [Math.PI / 3, -Math.PI / 5, 0.5], speed: -0.45, offset: 2 },
  { radius: 2.15, rotation: [-Math.PI / 2.8, Math.PI / 4, -0.3], speed: 0.9, offset: 4 },
];

function Comet({
  orbit,
  glow,
  blending,
  animate,
  glowMap,
  showTrail,
}: Palette & { orbit: OrbitSpec; showTrail: boolean }) {
  const head = useRef<Mesh>(null);
  // Start on the orbit so the trail never streaks in from the origin.
  const initial: [number, number, number] = [
    Math.cos(orbit.offset) * orbit.radius,
    Math.sin(orbit.offset) * orbit.radius,
    0,
  ];
  useFrame(({ clock }) => {
    if (!head.current) return;
    const t = (animate ? clock.elapsedTime : 0) * orbit.speed + orbit.offset;
    head.current.position.set(Math.cos(t) * orbit.radius, Math.sin(t) * orbit.radius, 0);
  });
  const light = (
    <mesh ref={head} position={initial}>
      <sphereGeometry args={[0.035, 12, 12]} />
      <meshBasicMaterial color="#ffffff" />
      <sprite scale={0.55}>
        <spriteMaterial map={glowMap} color={glow} transparent depthWrite={false} blending={blending} />
      </sprite>
    </mesh>
  );
  if (!showTrail) return light;
  return (
    <Trail width={0.9} length={5} color={glow} attenuation={(w) => w * w} decay={1.5}>
      {light}
    </Trail>
  );
}

function Orbits(props: Palette) {
  const { glow, foreground, dark, animate } = props;
  // Wait for the entrance animation to settle before drawing trails, otherwise
  // the fast scale/rotation of the first frames leaves jagged streaks.
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (!animate) return;
    const id = setTimeout(() => setSettled(true), 1800);
    return () => clearTimeout(id);
  }, [animate]);
  return (
    <>
      {orbits.map((orbit, i) => (
        <group key={i} rotation={orbit.rotation}>
          <mesh>
            <torusGeometry args={[orbit.radius, 0.006, 8, 160]} />
            <meshBasicMaterial
              color={i === 1 ? foreground : glow}
              transparent
              opacity={i === 1 ? (dark ? 0.18 : 0.22) : 0.45}
              depthWrite={false}
            />
          </mesh>
          <Comet {...props} orbit={orbit} showTrail={animate && settled} />
        </group>
      ))}
    </>
  );
}

/** Blue point lights circling the core so highlights sweep across its facets. */
function MovingLights({ glow, animate }: Palette) {
  const a = useRef<PointLight>(null);
  const b = useRef<PointLight>(null);
  useFrame(({ clock }) => {
    const t = animate ? clock.elapsedTime : 0.8;
    a.current?.position.set(Math.cos(t * 0.8) * 2.6, Math.sin(t * 0.6) * 1.2, Math.sin(t * 0.8) * 2.6);
    b.current?.position.set(Math.cos(-t * 0.6 + 2) * 2.4, Math.cos(t * 0.5) * 1.6, Math.sin(-t * 0.6 + 2) * 2.4);
  });
  return (
    <>
      <pointLight ref={a} color={glow} intensity={18} distance={8} decay={2} />
      <pointLight ref={b} color="#7dd3fc" intensity={10} distance={8} decay={2} />
    </>
  );
}

/* ------------------------------------------------------------ particles */

function Particles({ glow, blending, dark, animate, glowMap }: Palette) {
  const points = useRef<Group>(null);
  const geometry = useMemo(() => {
    const count = 420;
    const positions = new Float32Array(count * 3);
    // Deterministic pseudo-random so SSR/hydration and re-renders are stable.
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < count; i++) {
      const r = 2.2 + rand() * 3.2;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.75;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new Float32BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame((_, delta) => {
    if (!animate || !points.current) return;
    points.current.rotation.y += delta * 0.03;
    points.current.rotation.x += delta * 0.01;
  });

  return (
    <group ref={points}>
      <points geometry={geometry}>
        <pointsMaterial
          map={glowMap}
          color={glow}
          size={0.09}
          sizeAttenuation
          transparent
          opacity={dark ? 0.85 : 0.6}
          depthWrite={false}
          blending={blending}
        />
      </points>
    </group>
  );
}

/* ------------------------------------------------------------ satellites */

const satellites = [
  { pos: [2.3, 1.1, 0.6], shape: "octa", scale: 0.17 },
  { pos: [-2.4, -0.9, 0.4], shape: "tetra", scale: 0.2 },
  { pos: [-1.6, 1.5, -1.2], shape: "box", scale: 0.13 },
  { pos: [1.7, -1.5, -0.8], shape: "octa", scale: 0.12 },
] as const;

function Satellites({ accent, glow, animate }: Palette) {
  return (
    <>
      {satellites.map((s, i) => (
        <Float key={i} speed={animate ? 1.8 : 0} rotationIntensity={1.4} floatIntensity={0.8}>
          <mesh position={[...s.pos]} scale={s.scale}>
            {s.shape === "octa" ? (
              <octahedronGeometry args={[1, 0]} />
            ) : s.shape === "tetra" ? (
              <tetrahedronGeometry args={[1, 0]} />
            ) : (
              <boxGeometry args={[1, 1, 1]} />
            )}
            <meshPhysicalMaterial
              color={accent}
              emissive={glow}
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
              clearcoat={1}
              flatShading
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/* ------------------------------------------------------------- framing */

/** Eased scale-in on mount, then a gentle tilt toward the pointer. */
function Rig({ children, animate }: { children: React.ReactNode; animate: boolean }) {
  const group = useRef<Group>(null);
  const start = useRef<number | null>(null);

  useFrame(({ clock, pointer }, delta) => {
    const g = group.current;
    if (!g) return;
    if (!animate) {
      g.scale.setScalar(1);
      return;
    }
    if (start.current === null) start.current = clock.elapsedTime;
    const p = Math.min(1, (clock.elapsedTime - start.current) / 1.6);
    const eased = 1 - Math.pow(1 - p, 4);
    g.scale.setScalar(0.55 + 0.45 * eased);
    const k = Math.min(1, delta * 2.5);
    g.rotation.y += (pointer.x * 0.4 + (1 - eased) * -1.2 - g.rotation.y) * k;
    g.rotation.x += (-pointer.y * 0.25 - g.rotation.x) * k;
  });

  return <group ref={group}>{children}</group>;
}

export default function HeroScene({ animate }: { animate: boolean }) {
  const { accent, foreground, dark } = useThemeColors();
  const glowMap = useGlowTexture();

  const palette: Palette = {
    accent,
    // Brighter electric blue for emissive light; deeper in light mode for contrast.
    glow: dark ? "#3b82f6" : "#2563eb",
    foreground,
    blending: dark ? AdditiveBlending : NormalBlending,
    dark,
    animate,
    glowMap,
  };

  return (
    <Canvas
      camera={{ position: [0, 0, 7.8], fov: 45 }}
      dpr={[1, 2]}
      frameloop={animate ? "always" : "demand"}
      gl={{ antialias: true, alpha: true }}
      aria-hidden
    >
      <ambientLight intensity={dark ? 0.25 : 0.55} />
      <directionalLight position={[4, 5, 6]} intensity={dark ? 1.2 : 1.8} />

      {/* Local studio lighting for metallic reflections (no network fetch). */}
      <Environment resolution={64}>
        <Lightformer form="ring" intensity={3} color="#60a5fa" position={[0, 3, -4]} scale={4} />
        <Lightformer form="rect" intensity={2} color="#ffffff" position={[-4, 1, 2]} scale={[3, 1, 1]} />
        <Lightformer form="rect" intensity={2.5} color="#1d4ed8" position={[4, -2, 2]} scale={[2, 2, 1]} />
      </Environment>

      <MovingLights {...palette} />

      <Rig animate={animate}>
        <Halo {...palette} />
        <Core {...palette} />
        <Atmosphere {...palette} />
        <Shell {...palette} />
        <Orbits {...palette} />
        <Satellites {...palette} />
        <Particles {...palette} />
      </Rig>

      {finePointer() ? (
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.6} />
      ) : null}
    </Canvas>
  );
}
