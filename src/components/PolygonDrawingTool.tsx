import React, { useRef, useState } from 'react';
import { useMap } from 'react-leaflet';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import * as turf from '@turf/turf';
import 'leaflet-draw/dist/leaflet.draw.css';
import { log } from 'console';

const PolygonDrawer: React.FC = () => {
  const map = useMap();
  const [polygons, setPolygons] = useState<any[]>([]);
  const featureGroupRef = useRef<any>(null);
  const zoom = map.getZoom()

  // //  working fine. but intersects are not shown properly
  // const onCreated = (e: any) => {
  //   const layer = e.layer;
  //   console.log('Polygon Created:', layer.getLatLngs());
  // };

  // const onEdited = (e: any) => {
  //   console.log('Polygons Edited:', e.layers._layers);
  // };

  // const onDeleted = (e: any) => {
  //   console.log('Shapes Deleted:', e.layers._layers);
  // };

  // // Helper function to calculate the distance between two latlng points
  const calculateDistance = (latlng1: L.LatLng, latlng2: L.LatLng) => {
    return latlng1.distanceTo(latlng2);
  };

  // Adjusted function to check if the polygon is closed
  const isPolygonClosed = (latLngs: L.LatLng[], closeRadius: number = 100) => {
    if (latLngs.length < 4) return false;

    const firstPoint = latLngs[0];
    const lastPoint = latLngs[latLngs.length - 1];

    const distance = calculateDistance(firstPoint, lastPoint);

    return distance <= (closeRadius * zoom);
  };
  const isValidPolygon = (latLngs: any) => {
    console.log(latLngs);
    console.log(latLngs.length >= 4);

    return latLngs.length >= 4;
  };

  const checkIntersection = (latLngs: any) => {
    try {
      if (polygons.length > 0) {
        const newPolygonGeo = turf.polygon(latLngs.map((latlng: any) => [latlng.lng, latlng.lat]));
        for (const existingPolygon of polygons) {
          console.log(existingPolygon);
          const existingPolygonGeo = turf.polygon(existingPolygon.getLatLngs()[0].map((latlng: any) => [latlng.lng, latlng.lat]));
          if (turf.booleanIntersects(newPolygonGeo, existingPolygonGeo)) {
            return true;
          }
        }
      }
    } catch (e) {

    }
    return false;
  };

  const onCreated = (e: any) => {
    const layer = e.layer;

    const latLngs = layer.getLatLngs()[0];
    if (!isPolygonClosed(latLngs)) {
      latLngs.push(latLngs[0]);
      layer.setLatLngs(latLngs);
    }
    else {
      latLngs.push(latLngs[0])
      layer.setLatLngs(latLngs);
    }

    if (!isValidPolygon(latLngs)) {
      layer.remove();
      alert('Polygon must have at least 4 vertices and be closed!');
      return;
    }
    if (checkIntersection(latLngs)) {
      layer.setStyle({ color: '#ff0000' });
      alert('Polygon intersects with another polygon!');
      layer.remove(); // Remove the intersecting polygon
      return;
    }

    const array = [...polygons]
    console.log({ vefireAdding: true, array, polygons })
    array.push(layer);
    polygons.push(layer)
    setPolygons(polygons)
  };

  const onEdited = (e: any) => {
    const updatedPolygons: any[] = [];
    e.layers.eachLayer((layer: any) => {
      const latLngs = layer.getLatLngs()[0];
      if (!isPolygonClosed(latLngs)) {
        latLngs.push(latLngs[0]);
        layer.setLatLngs(latLngs);
      }

      if (isValidPolygon(layer) && !checkIntersection(layer)) {
        updatedPolygons.push(layer);
      } else {
        layer.remove();
        alert('Edited polygon is invalid or intersects with another polygon!');
      }
    });

    setPolygons(updatedPolygons);
  };

  const onDeleted = (e: any) => {
    const deletedPolygons = Object.values(e.layers._layers);
    setPolygons(polygons.filter((polygon: any) => !deletedPolygons.includes(polygon)));
  };

  return (
    <FeatureGroup>
      <EditControl
        position="topright"
        onCreated={onCreated}
        onEdited={onEdited}
        onDeleted={onDeleted}
        draw={{
          rectangle: true,
          circle: true,
          marker: true,
          circlemarker: true,
          polyline: true,
          polygon: {
            allowIntersection: true, // Prevents self-intersecting polygons
            shapeOptions: {
              color: '#0000ff', // Polygon color
            },
          },
        }}
        edit={{
          remove: true, // Allow removal of vertices
          edit: true, // Allow editing of vertices
          poly: {
            allowIntersection: false, // Prevent self-intersecting polygons
            shapeOptions: {
              color: '#00ff00', // Color while editing
            },
          },
        }}
      />
    </FeatureGroup>
  );
};

export default PolygonDrawer;