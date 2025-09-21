import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const FlyToDistrict = ({ district }) => {
  const map = useMap();
  const markerRef = useRef(null);

  useEffect(() => {
    if (district) {
      map.flyTo([district.latitude, district.longitude], 10, { duration: 2 });
      if (markerRef.current) {
        markerRef.current.openPopup();
      }
    }
  }, [district, map]);

  if (!district) return null;

  return (
    <Marker
      position={[district.latitude, district.longitude]}
      icon={customIcon}
      ref={markerRef}
    >
      <Popup autoPan={true}>
        <div>
          <h2 className="font-bold">{district.district}</h2>
          <p>{district.city}</p>
          <p>Region: {district.region}</p>
        </div>
      </Popup>
    </Marker>
  );
}

const CoverageMap = ({ serviceCenters, searchQuery }) => {
  const match = serviceCenters.find((d) =>
    d.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-[600px]">
      <MapContainer
        center={[23.685, 90.3563]} 
        zoom={7}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {serviceCenters.map((d, idx) => (
          <Marker
            key={idx}
            position={[d.latitude, d.longitude]}
            icon={customIcon}
          >
            <Popup>
              <div>
                <h2 className="font-bold">{d.district}</h2>
                <p>{d.city}</p>
                <p>Region: {d.region}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {match && <FlyToDistrict district={match} />}
      </MapContainer>
    </div>
  );
};

export default CoverageMap;
