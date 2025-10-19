"use client";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader, Vector3 } from "three";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const SCALE = 100;
// Distance caméra adaptée à la taille de l’écran
const CAMERA_DISTANCE =
  typeof window !== "undefined"
    ? window.innerWidth < 768
      ? 400 // mobile : plus de recul
      : 300 // desktop : distance normale
    : 300;

function latLngToXYZ(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function GlobeScene({ target }) {
  const { camera } = useThree();
  const globeRef = useRef();
  const markerRef = useRef();
  const haloRef = useRef();

  // 📸 Déplacement fluide de la caméra selon la cible
  useEffect(() => {
    const point = latLngToXYZ(target.lat, target.lng, SCALE + 1);
    const cam = latLngToXYZ(target.lat, target.lng, SCALE + CAMERA_DISTANCE);

    if (markerRef.current) markerRef.current.position.copy(point);
    if (haloRef.current) haloRef.current.position.copy(point);

    gsap.to(camera.position, {
      x: cam.x,
      y: cam.y,
      z: cam.z,
      duration: 3,
      ease: "power2.inOut",
      onUpdate: () => camera.lookAt(point),
    });
  }, [target]);

  // 🌍 Chargement de la texture du globe
  useEffect(() => {
    const loader = new TextureLoader();
    loader.load("/textures/texture_globe.jpg", (texture) => {
      if (globeRef.current) {
        globeRef.current.material.map = texture;
        globeRef.current.material.needsUpdate = true;
      }
    });
  }, []);

  // ✨ Animation pulsante du halo
  useFrame(() => {
    if (haloRef.current) {
      const scale = 1 + Math.sin(Date.now() * 0.003) * 0.3; // pulsation douce
      haloRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[1, 1, 1]} />

      {/* 🌍 Globe */}
      <mesh ref={globeRef} rotation={[0, -Math.PI, 0]}>
        <sphereGeometry args={[SCALE, 64, 64]} />
        <meshStandardMaterial />
      </mesh>

      {/* ✨ Point doré pulsant */}
      <mesh ref={markerRef}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshStandardMaterial emissive="#ffcc66" emissiveIntensity={2} color="#ffffff" />
      </mesh>

      {/* 🌟 Halo lumineux */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial color="#ffcc66" transparent opacity={0.25} />
      </mesh>

      <OrbitControls enablePan={false} enableZoom={false} />
    </>
  );
}

export default function Globe({ target }) {
  return (
    <Canvas
      camera={{ position: [0, 0, SCALE + CAMERA_DISTANCE], fov: 45 }}
      style={{ width: "100vw", height: "100vh", background: "black" }}
    >
      <GlobeScene target={target} />
    </Canvas>
  );
}
