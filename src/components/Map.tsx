import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapContainer.css';
import PolygonDrawer from './PolygonDrawingTool';

const DEFAULT_CENTER: [number, number] = [33.6844, 73.0479]; // Default location: Islamabad, Pakistan
const DEFAULT_ZOOM = 13;

const Map: React.FC = () => {
  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom={true}
      tap={false}
      className="map-container"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <PolygonDrawer />
    </MapContainer>
  );
};

export default Map;