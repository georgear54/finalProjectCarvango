import React from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
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
      {/* <h2 className={classes.heading}>Our Food Truck Opening Hours</h2>
      <p className={classes.hours}>Monday - Friday: 10 AM - 5 PM</p>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
          <Marker position={center} />
        </GoogleMap>
      </LoadScript> */}
    </div>
  );
}

export default FindTruck;
