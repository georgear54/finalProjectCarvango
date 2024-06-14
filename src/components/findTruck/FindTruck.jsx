import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import classes from "./findTruck.module.css";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 52.256599944765746,
  lng: -7.12747034956677,
};

function FindTruck() {
  return (
    <div className={classes.main}>
      <h2 className={classes.heading}>Our Food Truck Opening Hours</h2>
      <p className={classes.hours}>Monday - Friday: 10 AM - 5 PM</p>
      <LoadScript
        googleMapsApiKey="AIzaSyD2BGWy5q1Hl_3ZQIsn9XfBX6_QisZHTMI"
        libraries={["places"]}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onLoad={(map) => {
            const marker = new window.google.maps.Marker({
              position: center,
              map,
            });
          }}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default FindTruck;
