"use client";
import { useState, useEffect } from 'react';
import Globe from '../components/GlobeCalculs.jsx';
import DestinationButtons from '../components/GlobeDestinationsButtons.jsx';

export default function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('✅ Service Worker enregistré avec succès :', registration);
        })
        .catch((error) => {
          console.error('❌ Échec de l’enregistrement du Service Worker :', error);
        });
    }
  }, []);
  const [target, setTarget] = useState({ lat: 48.866667, lng: -2.333333 }); // Paris par défaut

  const destinations = [
    { name: 'Rio', lat: -22.9068, lng: 43.1227 },
    { name: 'Paris', lat: 48.866667, lng: -2.333333 },
    { name: 'New York', lat: 40.4251, lng: 74.0021 },
    { name: 'Tokyo', lat: 35.4122, lng: -139.4130 }
  ];

  return (
    <>
      <DestinationButtons destinations={destinations} setTarget={setTarget} />
      <Globe target={target} />
    </>
  );
}
