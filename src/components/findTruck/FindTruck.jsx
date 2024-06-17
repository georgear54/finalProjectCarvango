import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import classes from "./findTruck.module.css";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 52.256599944765746,
  lng: -7.12747034956677,
};

// const FindTruck = () => {
//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);

//   useEffect(() => {
//     const loader = new Loader({
//       apiKey: "AIzaSyD2BGWy5q1Hl_3ZQIsn9XfBX6_QisZHTMI",
//       version: "weekly",
//     });

//     loader.load().then(() => {
//       if (mapRef.current) {
//         mapInstance.current = new google.maps.Map(mapRef.current, {
//           center: center,
//           zoom: 15,
//         });

//         new google.maps.Marker({
//           position: center,
//           map: mapInstance.current,
//         });
//       }
//     });

//     return () => {
//       if (mapInstance.current) {
//         mapInstance.current = null;
//       }
//     };
//   }, []);

//   return (
//     <div className={classes.main}>
//       <h2 className={classes.heading}>Our Food Truck Opening Hours</h2>
//       <p className={classes.hours}>Monday - Friday: 10 AM - 5 PM</p>
//       <div ref={mapRef} style={containerStyle} id="map" />
//     </div>
//   );
// };

export default FindTruck;
