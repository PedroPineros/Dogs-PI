import React, { useState } from 'react';
import "./Navbar.css"
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getBuscar, vacioDetalles } from '../action/actions'
import dogicon from '../img/perro.png'
import huellaicon from '../img/desaparecido.png'

export function Navbar({ getBuscar, vacioDetalles, Dogstate }) {
    const [stateBuscar, setBuscar] = useState("")
    //----------- Buscar Dog <---------------\\
    const handleChange = (e) => {
        e.preventDefault()
        setBuscar(e.target.value)
    }
    const handleBuscar = (e) => {
        e.preventDefault()
        let upper = stateBuscar.charAt(0).toUpperCase()+stateBuscar.slice(1)
        let lower = stateBuscar.charAt(0).toLowerCase()+stateBuscar.slice(1)
        let Dogs = Dogstate.map(e=> e.nombre)
        if(Dogs.includes(upper)){
            getBuscar(upper)
        }else if(Dogs.includes(lower)){
            getBuscar(lower)
        }else{
            vacioDetalles()
        }
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
        getBuscar: (name) => dispatch(getBuscar(name)),
        vacioDetalles: () => dispatch(vacioDetalles())
    }
}
const mapStateToProps = (state) => {
    return {
        Dogstate: state.Dogs
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)