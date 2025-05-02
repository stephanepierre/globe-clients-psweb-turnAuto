"use client"
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { TextureLoader, Vector3 } from 'three';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const SCALE = 100;  //distance du globe
const CAMERA_DISTANCE = 300;  //distance de la caméra

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

  /* Choix de la carte selon une URL et de sa texture */
  useEffect(() => {
    const loader = new TextureLoader();
    loader.load('https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-blue-marble.jpg', (texture) => {
      if (globeRef.current) {
        globeRef.current.material.map = texture;
        globeRef.current.material.needsUpdate = true;
      }
    });
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 1, 1]} />
      <mesh ref={globeRef} rotation={[0, -Math.PI, 0]}>
        <sphereGeometry args={[SCALE, 64, 64]} />
        <meshStandardMaterial />
      </mesh>

      {/* 🔴 Point rouge */}
      <mesh ref={markerRef}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>

      <OrbitControls enablePan={false} enableZoom={true} />
    </>
  );
}

export default function Globe({ target }) {
  return (
    <Canvas camera={{ position: [0, 0, SCALE + CAMERA_DISTANCE], fov: 45 }} style={{ width: '100%', height: '100%' }}>
      <GlobeScene target={target} />
    </Canvas>
  );
}
