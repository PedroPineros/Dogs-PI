import React from "react";
import { Link } from 'react-router-dom'
import logo from '../img/dog.png'
import './Home.css'

function Home() {

    return (
        <div className="contenedorImg">
            <Link to='/paginaprincipal'><img src={logo} /></Link>
        </div>
    )
}


export default Home