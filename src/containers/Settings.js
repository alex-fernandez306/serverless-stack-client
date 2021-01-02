import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { onError } from "../libs/errorLib";
import { Elements, StripeProvider } from "react-stripe-elements";
import BillingForm from "../components/BillingForm";
import "./Settings.css";
import config from "../config";

const Settings = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    setStripe(window.Stripe(config.STRIPE_KEY));
  }, []);

  const billUser = (details) => {
    return API.post("notes", "/billing", {
      body: details,
    });
  };

  const handleFormSubmit = async (storage, { token, error }) => {
    if (error) {
      onError(error);
      return;
    }
  
    setIsLoading(true);
  
    try {
      await billUser({
        storage,
        source: token.id
      });
  
      alert("Your card has been charged successfully!");
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  };
  return (
    <div className="Settings">
      <StripeProvider stripe={stripe}>
        <Elements
          fonts={[
            {
              cssSrc: "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800",
            },
          ]}
        >
          <BillingForm isLoading={isLoading} onSubmit={handleFormSubmit} />
        </Elements>
      </StripeProvider>
    </div>
  );
};

export default Settings;
