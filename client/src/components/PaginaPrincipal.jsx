import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import './PaginaPrincipal.css'
import { connect } from 'react-redux'


export function PaginaPrincipal({ Dogstate }) {
    const [stateDogs, setState] = useState([])//--> Probar con objeto {}
    const [stateIndiceMayor, IMayorState] = useState([])
    const [stateIndiceMenor, IMenorState] = useState([])
    const [stateContadorPage, ContadorState] = useState([])

    useEffect(() => {
        setState(Dogstate.slice(0, 8))
        IMayorState(parseInt(stateIndiceMayor + 16))//valor inicial indice mayor
        IMenorState(parseInt(stateIndiceMenor + 8))// valor indice menor menor
        ContadorState(parseInt(1))//valor inicial paginado
    }, []);
    

        let paginado = 8;
    var pagesIndice = Math.ceil(Dogstate.length / paginado)//total de paginas a mostrar

    const handleClickNext = () => {
        if (stateContadorPage < pagesIndice) {
            IMayorState(stateIndiceMayor + 8)
            IMenorState(stateIndiceMenor + 8)
            let i = stateIndiceMenor
            let j = stateIndiceMayor
            setState(Dogstate.slice(i, j))
            ContadorState(stateContadorPage + 1)
            console.log(stateContadorPage)

        } else
            alert('No hay mas Perros para mostrar')
    }
    
    const handleClickBack = () => {
        if (stateContadorPage >= 2) {
            IMayorState(stateIndiceMayor - 8)
            IMenorState(stateIndiceMenor - 8)
            var i = stateIndiceMenor
            var j = stateIndiceMayor
            setState(Dogstate.slice(i, j))
            ContadorState(stateContadorPage - 1)
        } else {
            setState(Dogstate.slice(0, 8))
        }
    }
    console.log(Dogstate.length)
    return (
        <div>
            {stateDogs.map((e) => {
                return (
                    <div><p>{e.nombre}</p></div>
                )
            }
            )}

            <button onClick={handleClickBack}>Back</button>
            <button onClick={handleClickNext}>next</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { Dogstate: state.Dogs }
}

export default connect(mapStateToProps, null)(PaginaPrincipal)