import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/dog.png'
import './Home.css'
import { getDogs } from '../action/actions'
import { connect } from 'react-redux'

function Home({getDogs}) {

    useEffect(() => {
        getDogs();
    }, []);

    return (
        <div className="contenedorImg">
            <Link to='/paginaprincipal'><img className="logo" src={logo} /></Link>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDogs: () => dispatch(getDogs())
    }
}

export default connect(null, mapDispatchToProps)(Home)