import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { getBuscar } from '../action/actions'

export function Navbar({ getBuscar }) {
    const [stateBuscar, setBuscar] = useState()
    //----------- Buscar Dog <---------------\\
    const handleChange = (e) => {
        
            e.preventDefault()
            setBuscar(e.target.value)
      
    }
    const handleBuscar = (e) => {
        e.preventDefault()
        getBuscar(stateBuscar)
    }

    return (
        <nav>
            <div>
                <ul>
                    <li><Link to='/' >Home</Link></li>
                    <li><Link to='/paginaprincipal'>Pagina Principal</Link></li>
                    <li><Link to='/addDog'>Agregar Perro</Link></li>
                </ul>
            </div>
            <div>
                <input onChange={handleChange} placeholder='Buscar Perro' />
                <button onClick={handleBuscar}><NavLink to='/DogDetalles'>Buscar</NavLink></button>
            </div>

        </nav>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        getBuscar: (name) => dispatch(getBuscar(name))
    }
}
export default connect(null, mapDispatchToProps)(Navbar)