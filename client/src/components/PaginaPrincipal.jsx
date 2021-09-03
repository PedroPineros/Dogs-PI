import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import './PaginaPrincipal.css'
import { connect } from 'react-redux'


export function PaginaPrincipal({ Dogstate }) {
    const [stateDogs, setState] = useState([])//--> Probar con objeto {}
    const [stateIndiceMayor, IMayorState] = useState([])
    const [stateIndiceMenor, IMenorState] = useState([])

    useEffect(() => {
        setState(Dogstate.slice(0, 8))
        IMayorState(parseInt(stateIndiceMayor + 16))
        IMenorState(parseInt(stateIndiceMenor + 8))
    }, []);
    
    const handleClick = () => {
        IMayorState(stateIndiceMayor + 8)
        IMenorState(stateIndiceMenor+ 8)
        var i = stateIndiceMenor
        var j = stateIndiceMayor
        setState(Dogstate.slice(i,j)) 
    }
    
    console.log(stateIndiceMayor)
    console.log(stateIndiceMenor)
    console.log(stateDogs)
    return (
        <div>
            {stateDogs.map((e) => {
                return (
                    <div><p>{e.nombre}</p></div>
                )
            }
            )}

            <button onClick={handleClick}>next</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { Dogstate: state.Dogs }
}

export default connect(mapStateToProps, null)(PaginaPrincipal)