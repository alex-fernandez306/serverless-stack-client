import React, { useState } from "react";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import ResetPasswordForm from "../components/ResetPasswordForm";
import { Auth } from "aws-amplify";


const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [workFlow, setWorkFlow] = useState("initial");
  const [email, setEmail] = useState("");

  const handleReset = async (username) => {
    setIsLoading(true);
    try {
      await Auth.forgotPassword(username);
      setEmail(username);
      setWorkFlow("change-password");
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (email, verificationCode, newPassword) => {
    setIsLoading(true);
    try {
      await Auth.forgotPasswordSubmit(email, verificationCode, newPassword);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const onCancel = (event) => {
    event.preventDefault();
    setWorkFlow("initial");
  }

  return (
    <div className="ForgotPassword">
      {workFlow === "initial" && <ForgotPasswordForm isLoading={isLoading} handleSubmit={handleReset} />}
      {workFlow === "change-password" && (
        <ResetPasswordForm email={email} isLoading={isLoading} handleSubmit={handleChangePassword} onCancel={onCancel} />
      )}
    </div>
  );
};

export default ForgotPassword;
