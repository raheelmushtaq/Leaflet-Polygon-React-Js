// // // src/components/Map.tsx
// // import React, { useState } from 'react';
// // import { MapContainer, TileLayer, Polygon, useMapEvents } from 'react-leaflet';
// // import 'leaflet/dist/leaflet.css';
// // import L from 'leaflet';

// // const defaultPosition: [number, number] = [51.505, -0.09];

// // const Map: React.FC = () => {
// //   const [polygons, setPolygons] = useState<any[][]>([]);
// //   const [currentPolygon, setCurrentPolygon] = useState<any[]>([]);
// //   const [isEditing, setIsEditing] = useState(false);

// //   const MapEvents: React.FC = () => {
// //     useMapEvents({
// //       click(e) {
// //         if (isEditing) return;
// //         const { lat, lng } = e.latlng;
// //         setCurrentPolygon([...currentPolygon, [lat, lng]]);
// //       },
// //       dblclick() {
// //         if (isEditing) return;
// //         if (!checkIntersection(currentPolygon, polygons)) {
// //           setPolygons([...polygons, currentPolygon]);
// //           setCurrentPolygon([]);
// //         } else {
// //           alert('Polygons cannot intersect!');
// //         }
// //       }
// //     });
// //     return null;
// //   };

// //   const checkIntersection = (polygon: any[], polygons: any[][]): boolean => {
// //     const poly1 = L.polygon(polygon);
// //     return polygons.some(p => L.polygon(p).getBounds().intersects(poly1.getBounds()));
// //   };

// //   return (
// //     <MapContainer center={defaultPosition} zoom={13} style={{ height: "100vh", width: "100%" }}>
// //       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
// //       {polygons.map((polygon, idx) => (
// //         <Polygon key={idx} positions={polygon} />
// //       ))}
// //       <Polygon positions={currentPolygon} />
// //       <MapEvents />
// //     </MapContainer>
// //   );
// // };

// // export default Map;

// // // src/components/Map.tsx
// // import React, { useState, useRef, useEffect } from 'react';
// // import { MapContainer, TileLayer, Polygon, useMapEvents } from 'react-leaflet';
// // import 'leaflet/dist/leaflet.css';
// // import L, { Map as LeafletMap, LatLngExpression, LeafletMouseEvent, Polygon as LeafletPolygon } from 'leaflet';

// // const defaultPosition: LatLngExpression = [51.505, -0.09];

// // const Map: React.FC = () => {
// //   const [polygons, setPolygons] = useState<LatLngExpression[][]>([]);
// //   const [currentPolygon, setCurrentPolygon] = useState<LatLngExpression[]>([]);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const mapRef = useRef<LeafletMap>(null);

// //   useMapEvents({
// //     click(e: LeafletMouseEvent) {
// //       if (isEditing) return;
// //       const { lat, lng } = e.latlng;
// //       setCurrentPolygon([...currentPolygon, [lat, lng]]);
// //     },
// //     dblclick() {
// //       if (isEditing) return;
// //       if (!checkIntersection(currentPolygon, polygons)) {
// //         setPolygons([...polygons, currentPolygon]);
// //         setCurrentPolygon([]);
// //       } else {
// //         alert('Polygons cannot intersect!');
// //       }
// //     },
// //   });

// //   const checkIntersection = (polygon: LatLngExpression[], otherPolygons: LatLngExpression[][]): boolean => {
// //     const poly1 = L.polygon(polygon);
// //     return otherPolygons.some(p => L.polygon(p).getBounds().intersects(poly1.getBounds()));
// //   };

// //   const handleEditMode = () => {
// //     setIsEditing(!isEditing);
// //   };

// //   useEffect(() => {
// //     if (!mapRef.current) return;

// //     const map = mapRef.current;

// //     if (isEditing) {
// //       polygons.forEach((polygon, idx) => {
// //         const layer = L.polygon(polygon).addTo(map);
// //         layer.on('pm:edit', e => {
// //           const editedPolygon = e.target.getLatLngs()[0].map((latlng: any) => [latlng.lat, latlng.lng]);
// //           if (!checkIntersection(editedPolygon, polygons.filter((_, i) => i !== idx))) {
// //             setPolygons(polygons.map((p, i) => (i === idx ? editedPolygon : p)));
// //           } else {
// //             alert('Polygons cannot intersect!');
// //             layer.setLatLngs(polygons[idx]);
// //           }
// //         });
// //         layer.on('pm:remove', () => {
// //           setPolygons(polygons.filter((_, i) => i !== idx));
// //         });
// //       });
// //     } else {
// //       map.eachLayer(layer => {
// //         if (layer instanceof LeafletPolygon) {
// //           map.removeLayer(layer);
// //         }
// //       });
// //       polygons.forEach(polygon => L.polygon(polygon).addTo(map));
// //     }
// //   }, [isEditing, polygons]);

// //   return (
// //     <>
// //       <button onClick={handleEditMode}>{isEditing ? 'Disable' : 'Enable'} Edit Mode</button>
// //       <MapContainer ref={mapRef} center={defaultPosition} zoom={13} style={{ height: "100vh", width: "100%" }}>
// //         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
// //         {polygons.map((polygon, idx) => (
// //           <Polygon key={idx} positions={polygon} color={isEditing ? 'blue' : 'black'} />
// //         ))}
// //         <Polygon positions={currentPolygon} color="red" />
// //       </MapContainer>
// //     </>
// //   );
// // };

// // export default Map;



// // // src/components/Map.tsx
// // import React, { useState, useRef, useEffect } from 'react';
// // import { MapContainer, TileLayer, Polygon, useMapEvents } from 'react-leaflet';
// // import 'leaflet/dist/leaflet.css';
// // import L, { LatLngExpression, LeafletMouseEvent, LeafletEvent } from 'leaflet';

// // const defaultPosition: LatLngExpression = [51.505, -0.09];

// // const Map: React.FC = () => {
// //   const [polygons, setPolygons] = useState<LatLngExpression[][]>([]);
// //   const [currentPolygon, setCurrentPolygon] = useState<LatLngExpression[]>([]);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const mapRef = useRef<L.Map>(null);

// //   const MapEvents: React.FC = () => {
// //     useMapEvents({
// //       click(e) {
// //         if (isEditing) return;
// //         const { lat, lng } = e.latlng;
// //         setCurrentPolygon([...currentPolygon, [lat, lng]]);
// //       },
// //       dblclick() {
// //         if (isEditing) return;
// //         if (!checkIntersection(currentPolygon, polygons)) {
// //           setPolygons([...polygons, currentPolygon]);
// //           setCurrentPolygon([]);
// //         } else {
// //           alert('Polygons cannot intersect!');
// //         }
// //       }
// //     });
// //     return null;
// //   };
// //   // useMapEvents({
// //   //   click(e: LeafletMouseEvent) {
// //   //     if (isEditing) return;
// //   //     const { lat, lng } = e.latlng;
// //   //     setCurrentPolygon([...currentPolygon, [lat, lng]]);
// //   //   },
// //   //   dblclick() {
// //   //     if (isEditing) return;
// //   //     if (!checkIntersection(currentPolygon, polygons)) {
// //   //       setPolygons([...polygons, currentPolygon]);
// //   //       setCurrentPolygon([]);
// //   //     } else {
// //   //       alert('Polygons cannot intersect!');
// //   //     }
// //   //   },
// //   // });

// //   const checkIntersection = (polygon: LatLngExpression[], otherPolygons: LatLngExpression[][]): boolean => {
// //     const poly1 = L.polygon(polygon);
// //     return otherPolygons.some(p => L.polygon(p).getBounds().intersects(poly1.getBounds()));
// //   };

// //   const handleEditMode = () => {
// //     setIsEditing(!isEditing);
// //   };

// //   useEffect(() => {
// //     if (!mapRef.current) return;

// //     const map = mapRef.current;

// //     if (isEditing) {
// //       polygons.forEach((polygon, idx) => {
// //         const layer = L.polygon(polygon).addTo(map);
// //         layer.on('pm:edit', e => {
// //           const editedPolygon = e.target.getLatLngs()[0].map((latlng: any) => [latlng.lat, latlng.lng]);
// //           if (!checkIntersection(editedPolygon, polygons.filter((_, i) => i !== idx))) {
// //             setPolygons(polygons.map((p, i) => (i === idx ? editedPolygon : p)));
// //           } else {
// //             alert('Polygons cannot intersect!');
// //             layer.setLatLngs(polygons[idx]);
// //           }
// //         });
// //         layer.on('pm:remove', () => {
// //           setPolygons(polygons.filter((_, i) => i !== idx));
// //         });
// //       });
// //     } else {
// //       map.eachLayer(layer => {
// //         if (layer instanceof L.Polygon) {
// //           map.removeLayer(layer);
// //         }
// //       });
// //       polygons.forEach(polygon => L.polygon(polygon).addTo(map));
// //     }
// //   }, [isEditing, polygons]);

// //   return (
// //     <>
// //       <button onClick={handleEditMode}>{isEditing ? 'Disable' : 'Enable'} Edit Mode</button>
// //       <MapContainer ref={mapRef} center={defaultPosition} zoom={13} style={{ height: "100vh", width: "100%" }}>
// //         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
// //         {polygons.map((polygon, idx) => (
// //           <Polygon key={idx} positions={polygon} color={isEditing ? 'blue' : 'black'} />
// //         ))}
// //         <Polygon positions={currentPolygon} color="red" />
// //         <MapEvents />

// //       </MapContainer>
// //     </>
// //   );
// // };

// // export default Map;

// // // src/components/Map.tsx
// // import React, { useState, useRef, useEffect } from 'react';
// // import { MapContainer, TileLayer, Polygon, useMapEvents } from 'react-leaflet';
// // import 'leaflet/dist/leaflet.css';
// // import L, { LatLngExpression, LeafletMouseEvent } from 'leaflet';

// // const defaultPosition: LatLngExpression = [51.505, -0.09];

// // const Map: React.FC = () => {
// //   const [polygons, setPolygons] = useState<LatLngExpression[][]>([]);
// //   const [currentPolygon, setCurrentPolygon] = useState<LatLngExpression[]>([]);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const mapRef = useRef<L.Map>(null);

// //   const MapClickHandler = () => {
// //     useMapEvents({
// //       click(e: LeafletMouseEvent) {
// //         if (isEditing) return;
// //         const { lat, lng } = e.latlng;
// //         setCurrentPolygon([...currentPolygon, [lat, lng]]);
// //       },
// //       dblclick() {
// //         if (isEditing) return;
// //         if (!checkIntersection(currentPolygon, polygons)) {
// //           setPolygons([...polygons, currentPolygon]);
// //           setCurrentPolygon([]);
// //         } else {
// //           alert('Polygons cannot intersect!');
// //         }
// //       },
// //     });
// //     return null;
// //   };

// //   const checkIntersection = (polygon: LatLngExpression[], otherPolygons: LatLngExpression[][]): boolean => {
// //     const poly1 = L.polygon(polygon);
// //     return otherPolygons.some(p => L.polygon(p).getBounds().intersects(poly1.getBounds()));
// //   };

// //   const handleEditMode = () => {
// //     setIsEditing(!isEditing);
// //   };

// //   const enableEditing = () => {
// //     if (mapRef.current) {
// //       const map = mapRef.current;
// //       polygons.forEach((polygon, idx) => {
// //         const layer = L.polygon(polygon).addTo(map).on('pm:edit', (e: any) => {
// //           const editedPolygon = e.target.getLatLngs()[0].map((latlng: L.LatLng) => [latlng.lat, latlng.lng]);
// //           if (!checkIntersection(editedPolygon, polygons.filter((_, i) => i !== idx))) {
// //             setPolygons(polygons.map((p, i) => (i === idx ? editedPolygon : p)));
// //           } else {
// //             alert('Polygons cannot intersect!');
// //             layer.setLatLngs(polygons[idx]);
// //           }
// //         }).on('pm:remove', () => {
// //           setPolygons(polygons.filter((_, i) => i !== idx));
// //         });
// //         if (layer instanceof L.Polygon) {
// //           (layer as any).pm?.enable?.();
// //         }      });
// //     }
// //   };

// //   const disableEditing = () => {
// //     if (mapRef.current) {
// //       const map = mapRef.current;
// //       map.eachLayer(layer => {
// //         if (layer instanceof L.Polygon) {
// //           (layer as any).pm?.disable?.();
// //         }
// //       });
// //     }
// //   };

// //   useEffect(() => {
// //     if (isEditing) {
// //       enableEditing();
// //     } else {
// //       disableEditing();
// //     }
// //   }, [isEditing]);

// //   return (
// //     <>
// //       <button onClick={handleEditMode}>{isEditing ? 'Disable' : 'Enable'} Edit Mode</button>
// //       <MapContainer ref={mapRef} center={defaultPosition} zoom={13} style={{ height: "100vh", width: "100%" }}>
// //         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
// //         {polygons.map((polygon, idx) => (
// //           <Polygon key={idx} positions={polygon} color={isEditing ? 'blue' : 'black'} />
// //         ))}
// //         <Polygon positions={currentPolygon} color="red" />
// //         <MapClickHandler />
// //       </MapContainer>
// //     </>
// //   );
// // };

// // export default Map;


// // src/components/Map.tsx
// import React, { useState, useRef, useEffect } from 'react';
// import { MapContainer, TileLayer, Polygon, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L, { LatLngExpression, LeafletMouseEvent } from 'leaflet';

// const defaultPosition: LatLngExpression = [51.505, -0.09];

// const Map: React.FC = () => {
//   const [polygons, setPolygons] = useState<LatLngExpression[][]>([]);
//   const [currentPolygon, setCurrentPolygon] = useState<LatLngExpression[]>([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [selectedPolygonIndex, setSelectedPolygonIndex] = useState<number | null>(null);
//   const mapRef = useRef<L.Map>(null);

//   const MapClickHandler = () => {
//     useMapEvents({
//       click(e: LeafletMouseEvent) {
//         if (isEditing) return;
//         const { lat, lng } = e.latlng;
//         // if (currentPolygon.length == 0 || !checkIntersection(currentPolygon, polygons)) {
//           setCurrentPolygon([...currentPolygon, [lat, lng]]);
//           // setCurrentPolygon([]);
//         // }
//       },
//       dblclick() {
//         if (isEditing) return;
//         if (!checkIntersection(currentPolygon, polygons)) {
//           setPolygons([...polygons, currentPolygon]);
//           setCurrentPolygon([]);
//         } else {
//           alert('Polygons cannot intersect!');
//         }
//       },
//     });
//     return null;
//   };

//   const checkIntersection = (polygon: LatLngExpression[], otherPolygons: LatLngExpression[][]): boolean => {
//     const poly1 = L.polygon(polygon);
//     return otherPolygons.some(p => L.polygon(p).getBounds().intersects(poly1.getBounds()));
//   };

//   const handleEditMode = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleDeletePolygon = () => {
//     if (selectedPolygonIndex !== null) {
//       setPolygons(polygons.filter((_, idx) => idx !== selectedPolygonIndex));
//       setSelectedPolygonIndex(null);
//     }
//   };

//   const enableEditing = () => {
//     if (mapRef.current) {
//       const map = mapRef.current;
//       polygons.forEach((polygon, idx) => {
//         const layer = L.polygon(polygon).addTo(map).on('pm:edit', (e: any) => {
//           const editedPolygon = e.target.getLatLngs()[0].map((latlng: L.LatLng) => [latlng.lat, latlng.lng]);
//           if (!checkIntersection(editedPolygon, polygons.filter((_, i) => i !== idx))) {
//             setPolygons(polygons.map((p, i) => (i === idx ? editedPolygon : p)));
//           } else {
//             alert('Polygons cannot intersect!');
//             layer.setLatLngs(polygons[idx]);
//           }
//         }).on('pm:remove', () => {
//           setPolygons(polygons.filter((_, i) => i !== idx));
//         });
//         if (layer instanceof L.Polygon) {
//           (layer as any).pm?.enable?.();
//           // layer.off('click');
//         }
//         // layer.pm.enable();
//         layer.on('click', () => setSelectedPolygonIndex(idx));
//       });
//     }
//   };

//   const disableEditing = () => {
//     if (mapRef.current) {
//       const map = mapRef.current;
//       map.eachLayer(layer => {
//         if (layer instanceof L.Polygon) {
//           (layer as any).pm?.disable?.();
//           layer.off('click');
//         }
//       });
//     }
//   };

//   useEffect(() => {
//     if (isEditing) {
//       enableEditing();
//     } else {
//       disableEditing();
//     }
//   }, [isEditing]);

//   return (
//     <>
//       <button onClick={handleEditMode}>{isEditing ? 'Disable' : 'Enable'} Edit Mode</button>
//       {selectedPolygonIndex !== null && <button onClick={handleDeletePolygon}>Delete Selected Polygon</button>}
//       <MapContainer ref={mapRef} center={defaultPosition} zoom={13} style={{ height: "100vh", width: "100%" }}>
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         {polygons.map((polygon, idx) => (
//           <Polygon
//             key={idx}
//             positions={polygon}
//             color={selectedPolygonIndex === idx ? 'red' : isEditing ? 'blue' : 'black'}
//             eventHandlers={{
//               click: () => setSelectedPolygonIndex(idx),
//             }}
//           />
//         ))}
//         <Polygon positions={currentPolygon} color="red" />
//         <MapClickHandler />
//       </MapContainer>
//     </>
//   );
// };

// export default Map;

// import React, { useState, useRef, useEffect } from 'react';
// import { MapContainer, TileLayer, Polygon, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L, { LatLngExpression, LeafletMouseEvent } from 'leaflet';
// import PolygonDrawingTool from './PolygonDrawingTool';

// const defaultPosition: LatLngExpression = [51.505, -0.09];

// const Map: React.FC = () => {
//   const  center: [number, number] = [51.505, -0.09]
//   const  zoom =12
//     const mapRef = useRef<L.Map>(null);

//     const handlePolygonCreated = (polygon: L.Polygon) => {
//       // Handle the created polygon here (e.g., save to state, send to server)
//       console.log('Polygon created:', polygon);
//     };

//   return (
//     <>
//       {/* <button onClick={handleEditMode}>{isEditing ? 'Disable' : 'Enable'} Edit Mode</button> */}
//       <MapContainer ref={mapRef} center={defaultPosition} zoom={13} style={{ height: "100vh", width: "100%" }}>
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <PolygonDrawingTool onPolygonCreated={handlePolygonCreated} />

//       </MapContainer>
//     </>
//   );
// };
// export default Map;   


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