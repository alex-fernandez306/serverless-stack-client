import React, {useEffect, useState} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Routes from './Routes';
import {AppContext} from "./libs/contextLib";
import {Auth} from "aws-amplify";
import {useHistory} from 'react-router-dom';
import './App.css';

const  App = () => {
  const history = useHistory();
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  
  const handleLogout  =  async () => {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/login");
  }

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () =>  {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch(e) {
      if (e !== 'No current user') {
        history.push("/login");
      }
    }
    setIsAuthenticating(false);
  };

  return (
    !isAuthenticating && (<div className="App container py-3">
      <Navbar collapseOnSelect bg='light' expand='md' className='mb-3'>
        <LinkContainer to="/">
          <Navbar.Brand className="font-weigth-bold text-muted"> 
              Scratch
          </Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
          {isAuthenticated ? (
                <>
                  <LinkContainer to="/settings">
                    <Nav.Link>Settings</Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
            ) : (
              <>
                <LinkContainer to="/signup">
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </>
            )}

          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated}}>
      <Routes>
      </Routes>
      </AppContext.Provider>
    
    </div>)
  );
}

export default App;
