import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Paypal = () => {
  const initialOptions = {
    "client-id":
      "AZFXM0DCrLWBtK-lhTaO0KXxaVPt9gfD12-leYNpSFeV7lks92hL3_OMsxSzG6bvKhOFmOEcplooZqgj", // Replace with your actual PayPal Client ID
    currency: "USD",
    intent: "capture",
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "10.00", // Set the amount you want to charge
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      const name = details.payer.name.given_name;
      alert(`Transaction completed by ${name}`);
      // Handle further actions like updating the order status in your database
    });
  };

  const onError = (err) => {
    console.error("PayPal Checkout onError", err);
    // Handle the error in a user-friendly way
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default Paypal;
