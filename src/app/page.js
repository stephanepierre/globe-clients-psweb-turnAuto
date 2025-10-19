"use client";
import { useState, useEffect } from "react";
import Globe from "../components/GlobeCalculs.jsx";
import { gsap } from "gsap";

export default function App() {
  const [target, setTarget] = useState({ lat: 48.866667, lng: 2.333333 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  const cities = [
    { name: "France", lat: 46.3622, lng: -1.5231, clients: 10, flag: "🇫🇷" },
    { name: "Canada", lat: 45.50884, lng: 73.58781, clients: 10, flag: "🇨🇦" },
    { name: "Italie", lat: 41.5319, lng: -12.2912, clients: 1, flag: "🇮🇹" },
    { name: "Belgique", lat: 50.499527, lng: -4.475403, clients: 3, flag: "🇧🇪" },   
    { name: "Espagne", lat: 40.4168, lng: 3.7038, clients: 2, flag: "🇪🇸" }, 
    { name: "Angleterre", lat: 51.3026, lng: -0.0739, clients: 2, flag: "🇬🇧" }, 
    { name: "New York", lat: 40.43, lng: 74.00, clients: 1, flag: "🇺🇸" }, 
    { name: "Suisse", lat: 46.5657, lng: -7.2650, clients: 2, flag: "🇨🇭" }, 
    { name: "Dallas", lat: 32.7791, lng: 96.8088, clients: 1, flag: "🇺🇸" }, 
  ];

  // 🔄 Rotation automatique
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cities.length);
      setTarget(cities[(currentIndex + 1) % cities.length]);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // 🎬 Animation du texte à chaque changement
  useEffect(() => {
    const city = cities[currentIndex];
    const text = `${city.flag} ${city.name} - ${city.clients} client${city.clients > 1 ? "s" : ""}`;

    gsap.to("#cityText", { opacity: 0, duration: 0.3, onComplete: () => {
      setDisplayText(text);
      gsap.to("#cityText", { opacity: 1, duration: 0.5 });
    }});
  }, [currentIndex]);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Globe target={target} />

      {/* Texte dynamique */}
      <div
        id="cityText"
        style={{
          position: "absolute",
          bottom: "10%",
          width: "100%",
          textAlign: "center",
          color: "white",
          fontSize: "2rem",
          fontWeight: "600",
          letterSpacing: "1px",
          opacity: 0,
          textShadow: "0 0 10px rgba(0,0,0,0.7)",
        }}
      >
        {displayText}
      </div>
    </div>
  );
}
