import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { onError } from "../libs/errorLib";
import { Nav, Tab, Row, Col,  } from "react-bootstrap";

import "./Settings.css";
import config from "../config";

const Settings = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);

  return (
    <div className="Settings">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Tab 1</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Tab 2</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
               
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default Settings;
