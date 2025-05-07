"use client";
import { useEffect, useState } from "react";

export default function DestinationButtons({ setTarget }) {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    fetch("/data/city_more_1M5.json")
      .then((res) => res.json())
      .then((data) => setCities(data));
  }, []);

  const handleChange = (e) => {
    const selected = cities.find((city) => city.ville === e.target.value);
    if (selected) {
      setTarget({ lat: selected.lat, lng: selected.lng });
      setSelectedCity(selected);
    }
  };

  return (
    <div className="dropdownDestination">
      <select onChange={handleChange} className="destinationSelect">
        <option value="">Choisir une ville</option>
        {cities
          .sort((a, b) => a.ville.localeCompare(b.ville))
          .map((city, idx) => (
            <option key={idx} value={city.ville}>
              {city.ville} {city.capitale ? "★" : ""}
            </option>
          ))}
      </select>

      {selectedCity && (
        <div className="city-info-card">
          <p><strong>🏙️ Ville :</strong> {selectedCity.ville}</p>
          <p><strong>🌍 Pays :</strong> {selectedCity.pays}</p>
          <p><strong>👥 Population :</strong> {selectedCity.population.toLocaleString()} habitants</p>
          <p><strong>🏛️ Capitale :</strong> {selectedCity.capitale ? "Oui" : "Non"}</p>
        </div>
      )}
    </div>
  );
}
