"use client";
export default function DestinationButtons({ destinations, setTarget }) {
  return (
    <div className="buttonBlockDestination" style={{  }}>
      {destinations.map((dest) => (
        <button
          key={dest.name}
          onClick={() => setTarget({ lat: dest.lat, lng: dest.lng })}
          className="destinationButtons"
        >
          {dest.name}
        </button>
      ))}
    </div>
  );
}
