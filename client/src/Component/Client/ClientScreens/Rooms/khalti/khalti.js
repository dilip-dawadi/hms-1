import React from "react";
import KhaltiCheckout from "khalti-checkout-web";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import myKey from "../../../khaltiIntegration/khaltiKey";
import Message from "../../../../Message/Message";
import { payBookedRoom } from "../../../../redux/actions/roomBook";
export default function Khalti({ paymentId }) {
  const dispatch = useDispatch();
  let config = {
    publicKey: myKey.publicTestKey,
    productIdentity: "12355321",
    productName: "Prabandhak",
    productUrl: "http://localhost:3000/done",
    eventHandler: {
      onSuccess() {
        dispatch(payBookedRoom(paymentId));
      },
      onError(error) {
        console.log(error.message);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: ["KHALTI"],
  };
  let checkout = new KhaltiCheckout(config);

  let buttonStyles = {
    backgroundColor: "purple",
    padding: "10px 20px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    border: "2px solid white",
    marginLeft: "1.8rem",
    marginBottom: "5px",
  };
  return (
    <div>
      <Button
        id="roomBookingKhalti"
        onClick={() => {
          checkout.show({ amount: 1000 });
        }}
        style={buttonStyles}
      >
        Khalti Pay
      </Button>
    </div>
  );
}
