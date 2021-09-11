import './App.css';
import React from 'react'
import {Route} from 'react-router-dom'
import Home from './components/Home';
import PaginaPrincipal from './components/PaginaPrincipal';
import Navbar from './components/Navbar';
import Dog  from './components/Dog';
import AddDogs from './components/addPerro';

function App() {
  return (
    <div className="App">
      <Route path='/paginaprincipal' component={Navbar}/>
      <Route path='/addDog' component={Navbar}/>
      <Route path='/DogDetalles' component={Navbar}/>
      <Route exact path='/' component={Home}/>
      <Route path='/paginaprincipal' component={PaginaPrincipal}/>
      <Route path='/DogDetalles' component={Dog}/>
      <Route path='/addDog' component={AddDogs}/>
    </div>
  );
}

export default App;
