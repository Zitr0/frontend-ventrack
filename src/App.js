import React from 'react';
//Routing Pages
import Dashboard from './Dashboard.js';
import Login from './Login.js';
import Register from './Register.js';
import RegistroUsuarios from './RegistroUsuarios.js';
import Productos from './Productos.jsx';
//Router Modules Router for routing, Switch for switching components related to routes, Link for routes linking
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Ventas from './Ventas.jsx';


class App extends React.Component {
  
render() {
  return (
    
    <Router>
     
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/RegistroUsuarios' component={RegistroUsuarios} />
          <Route exact path='/Productos' component={Productos} />
          <Route exact path='/Ventas' component = {Ventas} />
        </Switch>
      
  </Router>
  );
  
}

}


export default App;
