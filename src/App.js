import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Create from './components/create.comp';
import Edit from './components/edit.comp';
import Index from './components/index.comp';

import {Link, Switch, Route, BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="container">
      <nav className = 'navbar navbar-expand-lg navbar-light bg-light'>
        <Link to={'/'} className='nav-brand'>React CRUD EXample</Link>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <Link to={'/'} className='nav-link'> Home </Link>
              </li>
              <li className='nav-item'>
                <Link to={'/create'} className='nav-link'> Create </Link>
              </li>
              <li className='nav-item'>
                <Link to={'/index'} className='nav-link'>Index</Link>
              </li>
            </ul>
        </div>
      </nav><br/>

      <h2>Welcome to React CRUD Tutorial</h2>
      <Switch>
        <Route exact path='/create' component ={Create}/>
        <Route exact path='/edit/:id' component ={Edit}/>
        <Route exact path='/index' component ={Index}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
