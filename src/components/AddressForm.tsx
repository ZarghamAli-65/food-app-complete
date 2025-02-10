import { AddressElement } from "@stripe/react-stripe-js";
import React from "react";

const AddressForm = () => {
  return (
    // <form>
    <div>
      <h3>Address</h3>
      <AddressElement
        options={{ mode: "shipping" }}
        onChange={(event) => {
          if (event.complete) {
            // const address = event.value.address;
          }
        }}
      />
    </div>
    // </form>
  );
};

export default AddressForm;
