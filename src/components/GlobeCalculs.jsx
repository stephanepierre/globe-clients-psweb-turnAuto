"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader, Vector3 } from "three";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const SCALE = 100;
const CAMERA_DISTANCE = 300;

/* Calcul des positions avec latitude, longitude et angle de vue */
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
  const [cities, setCities] = useState([]);

  /* Récupération des infos pour la position de la caméra et du point rouge */
  useEffect(() => {
    const point = latLngToXYZ(target.lat, target.lng, SCALE + 1);
    const cam = latLngToXYZ(target.lat, target.lng, SCALE + CAMERA_DISTANCE);

    if (markerRef.current) {
      markerRef.current.position.copy(point);
    }

    gsap.to(camera.position, {
      x: cam.x,
      y: cam.y,
      z: cam.z,
      duration: 2,
      onUpdate: () => {
        camera.lookAt(point);
      },
    });
  }, [target]);

  // Chargement de la texture du globe

    useEffect(() => {
      const loader = new TextureLoader();
      loader.load('/textures/texture_globe.jpg', (texture) => {
        if (globeRef.current) {
          globeRef.current.material.map = texture;
          globeRef.current.material.needsUpdate = true;
        }
      });
    }, []);

  // Chargement des villes
  useEffect(() => {
    fetch("/data/city_more_1M5.json")
      .then((res) => res.json())
      .then((data) => setCities(data));
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 1, 1]} />

      {/* 🌍 Globe */}
      <mesh ref={globeRef} rotation={[0, -Math.PI, 0]}>
        <sphereGeometry args={[SCALE, 64, 64]} />
        <meshStandardMaterial />
      </mesh>

      {/* 🔴 Point animé (ville cible) */}
      <mesh ref={markerRef}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* 🟠 Capitales et 🔵 grandes villes */}
      {cities.map((city, idx) => {
        const pos = latLngToXYZ(city.lat, city.lng, SCALE + 1);
        return (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.6, 8, 8]} />
            <meshStandardMaterial color={city.capitale ? "orange" : "lightblue"} />
          </mesh>
        );
      })}

      <OrbitControls enablePan={false} enableZoom={true} />
    </>
  );
}

export default function Globe({ target }) {
  return (
    <Canvas
      camera={{ position: [0, 0, SCALE + CAMERA_DISTANCE], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
    >
      <GlobeScene target={target} />
    </Canvas>
  );
}
