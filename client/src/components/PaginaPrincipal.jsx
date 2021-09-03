import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import './PaginaPrincipal.css'
import { connect } from 'react-redux'
import { getDogs } from '../action/actions'

export function PaginaPrincipal({ Dogstate, getDogs}) {
    const [stateDogs, setState] = useState([])//--> Probar con objeto {}
    const [stateIndice, IndiceState] = useState({
        mayor: 0,
        menor: 0
    })
    const [stateContadorPage, ContadorState] = useState([])

    useEffect(() => {
        getDogs()
        setState(Dogstate.slice(0, 8))
        IndiceState({mayor: 16, menor:8})
        ContadorState(parseInt(1))//valor inicial paginado        
    }, []);
    

        let paginado = 8;
    var pagesIndice = Math.ceil((Dogstate.length / paginado)-1)//total de paginas a mostrar

    //--> ir hacia adelante paginacion <---
    const handleClickNext = () => {
        if (stateContadorPage < pagesIndice) {
            IndiceState({mayor: stateIndice.mayor + 8, menor:stateIndice.menor + 8})
            setState(Dogstate.slice(stateIndice.menor, stateIndice.mayor))
            ContadorState(stateContadorPage + 1)
        } else
            alert('No hay mas Perros para mostrar')
    }
    //--> ir hacia atras paginacion <---
    const handleClickBack = () => {
     if (stateContadorPage >= 2) {
            IndiceState({mayor: stateIndice.mayor - 8, menor:stateIndice.menor - 8})
            setState(Dogstate.slice(stateIndice.menor, stateIndice.mayor))
            ContadorState(stateContadorPage - 1)
        } else {
            setState(Dogstate.slice(0, 8))
        }
    }
    console.log(stateDogs)

    return (
        <div>
            {stateDogs.map((e) => {
                return (
                    <div>
                        <p>{e.nombre}</p>
                        <p>{e.raza}</p>
                    </div>
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
const mapDispatchToProps = (dispatch) => {
    return {
        getDogs: () => dispatch(getDogs())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginaPrincipal)