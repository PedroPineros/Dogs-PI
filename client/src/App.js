import './App.css';
import React from 'react'
import {Route} from 'react-router-dom'
import Home from './components/Home';
import PaginaPrincipal from './components/PaginaPrincipal';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Home}/>
      <Route path='/paginaprincipal' component={Navbar}/>
      <Route path='/paginaprincipal' component={PaginaPrincipal}/>
    </div>
  );
}

export default App;
