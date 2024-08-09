
// import React, { useState, useRef, useEffect } from 'react';
// import { MapContainer, TileLayer, Polygon, Marker } from 'react-leaflet';
// import L from 'leaflet';
// import * as turf from '@turf/turf'; // For polygon intersection checks

// interface PolygonDrawingToolProps {
//   onPolygonCreated: (polygon: L.Polygon) => void;
// }

// const PolygonDrawingTool: React.FC<PolygonDrawingToolProps> = ({ onPolygonCreated }) => {
//   const [polygonPoints, setPolygonPoints] = useState<L.LatLng[]>([]);
//   const [editing, setEditing] = useState<boolean>(false);
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);
//   const polygonRef = useRef<L.Polygon | null>(null);

//   const handleVertexClick = (index: number) => {
//     if (editing) {
//       if (activeIndex === index) {
//         setPolygonPoints(polygonPoints.filter((_, i) => i !== index));
//         setActiveIndex(null);
//       } else {
//         setActiveIndex(index);
//       }
//     }
//     };


//   const checkIntersection = (newPolygon: L.LatLng[]) => {
//     // Convert Leaflet LatLngs to Turf polygons
//     const turfPolygon = turf.polygon([newPolygon.map((latlng) => [latlng.lng, latlng.lat])]);
//     for (const existingPolygon of polygonPoints) {
//       const existingTurfPolygon = turf.polygon([existingPolygon.lng, existingPolygon.lat]);
//       if (turf.booleanOverlap(turfPolygon, existingTurfPolygon)) {
//         return false; // Intersection found
//       }
//     }
//     return true; // No intersection
//   };

//   const handlePolygonCreated = (polygon: L.Polygon) => {
//     if (checkIntersection(polygonPoints)) {
//       // Add the polygon to the list of polygons
//       setPolygonPoints([...polygonPoints, polygon.getLatLngs()[0][0]]);
//       onPolygonCreated(polygon);
//     } else {
//       // Handle intersection error (e.g., display a message to the user)
//       console.error('Polygon intersects with existing polygons');
//     }
//   };
//   const handleVertexDrag = (e: L.LeafletMouseEvent, index: number) => {
//     const newPoints = [...polygonPoints];
//     newPoints[index] = e.latlng;

//     if (checkIntersection(newPoints)) {
//       setPolygonPoints(newPoints);
//     } else {
//       // Handle intersection error (e.g., display a message to the user)
//       console.error('Moving vertex creates intersection');
//     }
//   };
//   const handleVertexAdd = (newPoint: L.LatLng, index: number) => {
//     const newPoints = [...polygonPoints];
//     newPoints.splice(index + 1, 0, newPoint);

//     if (checkIntersection(newPoints)) {
//       setPolygonPoints(newPoints);
//     } else {
//       // Handle intersection error (e.g., display a message to the user)
//       console.error('Adding vertex creates intersection');
//     }
//   };


//   const handleMarkerClick = (e: L.LeafletMouseEvent) => {
//     const marker = e.target as L.Marker;
//     const index = polygonPoints.findIndex((point) => point.equals(marker.getLatLng()));
//     if (index !== -1) {
//       handleVertexClick(index); // Assuming handleVertexClick is defined as before
//     }
//     };
//   const handleMarkerDrag=(e:L.LeafletMouseEvent)=>{
//     const marker = e.target as L.Marker;
//     const index = polygonPoints.findIndex((point) => point.equals(marker.getLatLng()));
//     if (index !== -1) {
//       const newPoints = [...polygonPoints];
//       newPoints[index] = e.latlng;

//       if (checkIntersection(newPoints)) {
//         setPolygonPoints(newPoints);
//       } else {
//         // Handle intersection error (e.g., display a message to the user)
//         console.error('Moving vertex creates intersection');
//       }
//     }
//   }

//   useEffect(() => {
//     const markers = document.querySelectorAll('.leaflet-marker-icon');
//     markers.forEach((markerElement) => {
//       const marker = L.DomUtil.getMarker(markerElement);
//       marker.on('dragend', handleMarkerDrag);
//       marker.on('click', handleMarkerClick);
//     });
//   }, [polygonPoints]);

//   return (
//     <>
//       {polygonPoints.map((point, index) => (
//         <Marker
//           key={index}
//           position={point}
//           draggable={editing}
//         />
//       ))}
//     </>
//   );
// };

// export default PolygonDrawingTool;

import React, { useRef, useState } from 'react';
import { useMap } from 'react-leaflet';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import * as turf from '@turf/turf';
import 'leaflet-draw/dist/leaflet.draw.css';

const PolygonDrawer: React.FC = () => {
  
//   const map = useMap();
//   const [polygons, setPolygons] = useState<any[]>([]);
//   const featureGroupRef = useRef<any>(null);

//   const isValidPolygon = (polygon: any) => {
//     const latLngs = polygon.getLatLngs()[0]; // Get the first ring of the polygon
//     // Ensure that the polygon has at least 4 vertices and is closed
//     return latLngs.length >= 4 && latLngs[0].equals(latLngs[latLngs.length - 1]);
//   };

//   const checkIntersection = (newPolygon: any) => {
//     const newPolygonGeo = turf.polygon(newPolygon.getLatLngs()[0].map((latlng: any) => [latlng.lng, latlng.lat]));
//     for (const existingPolygon of polygons) {
//       const existingPolygonGeo = turf.polygon(existingPolygon.getLatLngs()[0].map((latlng: any) => [latlng.lng, latlng.lat]));
//       if (turf.booleanIntersects(newPolygonGeo, existingPolygonGeo)) {
//         return true;
//       }
//     }
//     return false;
//   };

//   const onCreated = (e: any) => {
//     const layer = e.layer;
//     if (!isValidPolygon(layer)) {
//       layer.remove(); // Remove the invalid polygon
//       alert('Polygon must have at least 4 vertices and be closed!');
//       return;
//     }
//     if (checkIntersection(layer)) {
//       layer.setStyle({ color: '#ff0000' }); // Change color to red if intersecting
//       alert('Polygon intersects with another polygon!');
//       return;
//     }
//     setPolygons([...polygons, layer]);
//     console.log('Polygon Created:', layer.getLatLngs());
//   };

//   const onEdited = (e: any) => {
//     const updatedPolygons = Object.values(e.layers._layers);
//     if (!updatedPolygons.every(isValidPolygon)) {
//       // Remove invalid polygons
//       updatedPolygons.forEach((polygon: any) => {
//         if (!isValidPolygon(polygon)) {
//           polygon.remove();
//         }
//       });
//       alert('All polygons must have at least 4 vertices!');
//     } else {
//       setPolygons(updatedPolygons);
//       console.log('Polygons Edited:', updatedPolygons);
//     }
//   };

//   const onDeleted = (e: any) => {
//     const deletedPolygons = Object.values(e.layers._layers);
//     setPolygons(polygons.filter((polygon: any) => !deletedPolygons.includes(polygon)));
//     console.log('Shapes Deleted:', deletedPolygons);
//   };


//   return (
//     <FeatureGroup ref={featureGroupRef}>
//       <EditControl
//         position="topright"
//         onCreated={onCreated}
//         onEdited={onEdited}
//         onDeleted={onDeleted}
//         draw={{
//           rectangle: false,
//           circle: false,
//           marker: false,
//           circlemarker: false,
//           polyline: false,
//           polygon: {
//             allowIntersection: false, // Prevents self-intersecting polygons
//             shapeOptions: {
//               color: '#ff0000', // Polygon color
//             },
//           },
//         }}
//         edit={{
//           remove: true,
//           edit: true,
//           poly: {
//             allowIntersection: false,
//             shapeOptions: {
//               color: '#00ff00',
//             },
//           },
//         }}
//       />
//     </FeatureGroup>
//   );
// };

// export default PolygonDrawer;

const map = useMap();
const [polygons, setPolygons] = useState<any[]>([]);
const featureGroupRef = useRef<any>(null);

// const isValidPolygon = (polygon: any) => {
//   const latLngs = polygon[0].getLatLngs()[0]; // Get the first ring of the polygon
//   // Ensure that the polygon has at least 4 vertices and is closed
//   console.log({latLngs, })
//   return latLngs.length >= 4 && latLngs[0].equals(latLngs[latLngs.length - 1]);
  
// };

// const isValidPolygon = (polygon: any) => {
//   const latLngs = polygon.getLatLngs()[0]; // Get the first ring of the polygon
//     console.log({latLngs})

//   // Check if the polygon has at least 4 vertices
//   const hasMinVertices = latLngs.length >= 4;
  
//   // Check if the polygon is closed
//   const isClosed = latLngs.length > 0 && latLngs[0].equals(latLngs[latLngs.length - 1]);

//   // Ensure that the polygon is both closed and has at least 4 vertices
//   return hasMinVertices && isClosed;
// };

// const checkIntersection = (newPolygon: any) => {
//   const newPolygonGeo = turf.polygon(newPolygon.getLatLngs()[0].map((latlng: any) => [latlng.lng, latlng.lat]));
//   for (const existingPolygon of polygons) {
//     const existingPolygonGeo = turf.polygon(existingPolygon.getLatLngs()[0].map((latlng: any) => [latlng.lng, latlng.lat]));
//     if (turf.booleanIntersects(newPolygonGeo, existingPolygonGeo)) {
//       return true;
//     }
//   }
//   return false;
// };

// const onCreated = (e: any) => {
//   const layer = e.layer;
//   if (!isValidPolygon([layer])) {
//     layer.remove(); // Remove the invalid polygon
//     alert('Polygon must have at least 4 vertices and be closed!');
//     return;
//   }
//   if (checkIntersection(layer)) {
//     layer.setStyle({ color: '#ff0000' }); // Change color to red if intersecting
//     alert('Polygon intersects with another polygon!');
//     return;
//   }
//   setPolygons([...polygons, layer]);
//   console.log('Polygon Created:', layer.getLatLngs());


// };

// const onEdited = (e: any) => {
//   const updatedPolygons: any[] = [];
  
//   // Iterate over each layer in the edit event
//   e.layers.eachLayer((layer: any) => {
//     if (isValidPolygon([layer])) {
//       updatedPolygons.push(layer);
//     } else {
//       layer.remove(); // Remove invalid polygons
//     }
//   });
  
//   // Update state with valid polygons
//   setPolygons(updatedPolygons);
//   console.log('Polygons Edited:', updatedPolygons);
// };

// const onDeleted = (e: any) => {
//   const deletedPolygons = Object.values(e.layers._layers);
//   setPolygons(polygons.filter((polygon: any) => !deletedPolygons.includes(polygon)));
//   console.log('Shapes Deleted:', deletedPolygons);
// };

//   // Helper function to check if a polygon is closed
//   const isPolygonClosed = (latLngs: any[]) => {
//     if (latLngs.length < 4) return false;
//     return latLngs[0].equals(latLngs[latLngs.length - 1]);
//   };

//   // Adjusted validation function
//   const isValidPolygon = (polygon: any) => {
//     const latLngs = polygon.getLatLngs()[0]; // Get the first ring of the polygon
//     // Ensure that the polygon has at least 4 vertices and is closed
//     return latLngs.length >= 4 && isPolygonClosed(latLngs);
//   };

//   const checkIntersection = (newPolygon: any) => {
//     const newPolygonGeo = turf.polygon(newPolygon.getLatLngs()[0].map((latlng: any) => [latlng.lng, latlng.lat]));
//     for (const existingPolygon of polygons) {
//       const existingPolygonGeo = turf.polygon(existingPolygon.getLatLngs()[0].map((latlng: any) => [latlng.lng, latlng.lat]));
//       if (turf.booleanIntersects(newPolygonGeo, existingPolygonGeo)) {
//         return true;
//       }
//     }
//     return false;
//   };

//   const onCreated = (e: any) => {
//     const layer = e.layer;
    
//     // Force closure if necessary
//     const latLngs = layer.getLatLngs()[0];
//     if (!isPolygonClosed(latLngs)) {
//       latLngs.push(latLngs[0]); // Add the first vertex to the end
//       layer.setLatLngs(latLngs); // Update the layer with the closed polygon
//     }
    
//     if (!isValidPolygon(layer)) {
//       layer.remove(); // Remove the invalid polygon
//       alert('Polygon must have at least 4 vertices and be closed!');
//       return;
//     }
    
//     if (checkIntersection(layer)) {
//       layer.setStyle({ color: '#ff0000' }); // Change color to red if intersecting
//       alert('Polygon intersects with another polygon!');
//       return;
//     }
    
//     setPolygons([...polygons, layer]);
//     console.log('Polygon Created:', layer.getLatLngs());
//   };

//   const onEdited = (e: any) => {
//     const updatedPolygons: any[] = [];
    
//     // Iterate over each layer in the edit event
//     e.layers.eachLayer((layer: any) => {
//       const latLngs = layer.getLatLngs()[0];
//       if (!isPolygonClosed(latLngs)) {
//         latLngs.push(latLngs[0]); // Add the first vertex to the end
//         layer.setLatLngs(latLngs); // Update the layer with the closed polygon
//       }
      
//       if (isValidPolygon(layer)) {
//         updatedPolygons.push(layer);
//       } else {
//         layer.remove(); // Remove invalid polygons
//       }
//     });
    
//     // Update state with valid polygons
//     setPolygons(updatedPolygons);
//     console.log('Polygons Edited:', updatedPolygons);
//   };

//   const onDeleted = (e: any) => {
//     const deletedPolygons = Object.values(e.layers._layers);
//     setPolygons(polygons.filter((polygon: any) => !deletedPolygons.includes(polygon)));
//     console.log('Shapes Deleted:', deletedPolygons);
//   };


// return (
//   <FeatureGroup ref={featureGroupRef}>
//     <EditControl
//       position="topright"
//       onCreated={onCreated}
//       onEdited={onEdited}
//       onDeleted={onDeleted}
//       draw={{
//         rectangle: false,
//         circle: false,
//         marker: false,
//         circlemarker: false,
//         polyline: false,
//         polygon: {
//           allowIntersection: false, // Prevents self-intersecting polygons
//           shapeOptions: {
//             color: '#0000ff', // Polygon color
//           },
//         },
//       }}
//       edit={{
//         remove: true,
//         edit: true,
//         poly: {
//           allowIntersection: false,
//           shapeOptions: {
//             color: '#00ff00',
//           },
//         },
//       }}
//     />
//   </FeatureGroup>
// );
// };

// import React from 'react';
// import { useMap } from 'react-leaflet';
// import { FeatureGroup } from 'react-leaflet';
// import { EditControl } from 'react-leaflet-draw';
// import 'leaflet-draw/dist/leaflet.draw.css';

// const PolygonDrawer: React.FC = () => {
  // const map = useMap();

  const onCreated = (e: any) => {
    const layer = e.layer;
    console.log('Polygon Created:', layer.getLatLngs());
  };

  const onEdited = (e: any) => {
    console.log('Polygons Edited:', e.layers._layers);
  };

  const onDeleted = (e: any) => {
    console.log('Shapes Deleted:', e.layers._layers);
  };
  
  // const checkIntersection = (newPolygon: any) => {
  //   const newPolygonGeo = turf.polygon(newPolygon.getLatLngs().map((latlng: any) => [latlng.lng, latlng.lat]));
  //   for (const existingPolygon of polygons) {
  //     const existingPolygonGeo = turf.polygon(existingPolygon.getLatLngs().map((latlng: any) => [latlng.lng, latlng.lat]));
  //     if (turf.booleanIntersects(newPolygonGeo, existingPolygonGeo)) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  // const onCreated = (e: any) => {
  //   const layer = e.layer;
  //   if (checkIntersection(layer)) {
  //     layer.setStyle({ color: '#ff0000' }); // Change color to red if intersecting
  //     alert('Polygon intersects with another polygon!');
  //     return;
  //   }
  //   setPolygons([...polygons, layer]);
  //   console.log('Polygon Created:', layer.getLatLngs());
  // };

  // const onEdited = (e: any) => {
  //   const updatedPolygons = Object.values(e.layers._layers);
  //   setPolygons(updatedPolygons);
  //   console.log('Polygons Edited:', updatedPolygons);
  // };

  // const onDeleted = (e: any) => {
  //   const deletedPolygons = Object.values(e.layers._layers);
  //   setPolygons(polygons.filter((polygon: any) => !deletedPolygons.includes(polygon)));
  //   console.log('Shapes Deleted:', deletedPolygons);
  // };

  return (
    <FeatureGroup>
      <EditControl
        position="topright"
        onCreated={onCreated}
        onEdited={onEdited}
        onDeleted={onDeleted}
        draw={{
          rectangle: false,
          circle: false,
          marker: false,
          circlemarker: false,
          polyline: false,
          polygon: {
            allowIntersection: false, // Prevents self-intersecting polygons
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