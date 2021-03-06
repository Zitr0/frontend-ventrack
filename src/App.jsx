import React from 'react';
//Routing Pages
import Dashboard from './Dashboard.js';
import Login from './Login.js';
import Register from './Register.js';
import Usuarios from './Usuarios.jsx';
import Productos from './Productos.jsx';
//Router Modules Router for routing, Switch for switching components related to routes, Link for routes linking
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import Ventas from './Ventas.jsx';
import Home from './home.jsx';
import { Auth0Provider } from "@auth0/auth0-react";
import ProtectedRoute from './auth/protected-route';

class App extends React.Component {
  
render() {

  return (
    <BrowserRouter>
      <Auth0Provider
        domain="misiontic-ventrack.us.auth0.com"
        clientId="CEQSisbcrioU2kpQlCs00D94LmXp6CP1"
        redirectUri="https://ventrack.herokuapp.com/dashboard"
      >
          <Router>
              <Switch>
              <Route exact path='/' component={Home} />
                <ProtectedRoute exact path='/Dashboard' component={Dashboard} />
                <ProtectedRoute exact path='/login' component={Login} />
                <ProtectedRoute exact path='/register' component={Register} />
                <ProtectedRoute exact path='/Usuarios' component={Usuarios} />
                <ProtectedRoute exact path='/Productos' component={Productos} />
                <ProtectedRoute exact path='/Ventas' component = {Ventas} />
              </Switch>   
          </Router>
      </Auth0Provider>
    </BrowserRouter>
  );
  
}

}


export default App;

/* <Route path='/'><Home /></Route> */