import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <nav>
            <div>
            <ul>
                <li><Link to='/' >Home</Link></li>
                <li><Link to='/paginaprincipal'>Pagina Principal</Link></li>
                <li><Link to='/addDog'>Agregar Perro</Link></li>
            </ul>
            </div>
            <div>
                <input placeholder='Buscar Perro'></input>
            </div>

        </nav>
    )
}

export default Navbar