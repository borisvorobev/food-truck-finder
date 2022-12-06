import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import './Map.css';

const Map = ({
  results = [],
  selectedTruck = {},
  onTruckSelect = () => {},
}) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (
      !selectedTruck?.latitude ||
      !selectedTruck?.longitude ||
      !mapRef.current
    )
      return;

    const { latitude, longitude } = selectedTruck;
    mapRef.current.target.flyTo({ lat: latitude, lng: longitude }, 15);
  }, [selectedTruck, selectedTruck?.latitude, selectedTruck?.longitude]);

  useEffect(() => {
    if (!results.length || !mapRef.current) return;

    const { latitude, longitude } = results[0];

    mapRef.current.target.flyTo({ lat: latitude, lng: longitude });
  }, [results]);

  console.warn({selectedTruck})
  return (
    <div>
      <MapContainer
        className="map"
        center={[37.76340997878508, -122.37006]}
        zoom={13}
        whenReady={(map) => {
          mapRef.current = map;
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {results.length &&
          results.map((result, index) => (
            <Marker
              position={{ lat: result.latitude, lng: result.longitude }}
              key={`marker-${result.objectid}-${index}`}
              eventHandlers={{
                click: () => onTruckSelect(result),
              }}
              opacity={selectedTruck?.objectid === result.objectid ? 1 : 0.3}
            >
              <Popup>
                <h4>{result.applicant}</h4>
                <i>{result.locationdescription}</i>
                <hr />
                <p>{result.fooditems}</p>
              </Popup>
              <Tooltip
                direction="bottom" offset={[0, 20]}
                opacity={1}
              >
                {result.applicant}
              </Tooltip>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default Map;
