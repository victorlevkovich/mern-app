import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import {useRoutes} from './routes';
import {useLogin} from './hooks/loginHook';
import NavBar from './components/NavBar';
import 'materialize-css';

function App() {
  const {login, logout, token, userId} = useLogin();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);


  return (
      <AuthContext.Provider value={{
        login, logout, token, userId, isAuthenticated
      }}>
        <Router>
          {isAuthenticated && <NavBar/>}
          <div className="container">
            {routes}
          </div>
        </Router>
      </AuthContext.Provider>
  );
}

export default App;
