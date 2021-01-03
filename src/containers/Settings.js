import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Nav, Tab, Row, Col,  } from "react-bootstrap";
import ChangePasswordForm from "./ChangePasswordForm";
import "./Settings.css";
import { Auth } from "aws-amplify";
import { useAppContext } from "../libs/contextLib";

const Settings = () => {
  const history = useHistory();
 
  const { user } = useAppContext();
  return (
    <div className="Settings">
      <ChangePasswordForm user={user} />
    </div>
  );
};

export default Settings;
