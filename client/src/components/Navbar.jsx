import React, { useState } from 'react';
import "./Navbar.css"
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getBuscar } from '../action/actions'
import dogicon from '../img/perro.png'
import huellaicon from '../img/desaparecido.png'

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
            <div className="NavMenu">
                <ul className="ulNav">
                    <NavLink className="" to='/' ><img className="dogIcon" src={dogicon} alt="" /></NavLink>
                    <li><NavLink className="menu" to='/' >Home</NavLink></li>
                    <li><NavLink className="menu" to='/paginaprincipal'>Pagina Principal</NavLink></li>
                    <li><NavLink className="menu" to='/addDog'> Agregar Perro</NavLink></li>
                </ul>
            </div>
            <div className="NavBuscar">
                <ul className="ulBuscar">
                    <li> <input onChange={handleChange} placeholder='Buscar Perro' type="text" /></li>
                    <li onClick={handleBuscar}  className="imgbuscar"><NavLink className="btnlink" to='/DogDetalles'><img className="huella" src={huellaicon} alt="" /></NavLink></li>
                </ul>
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