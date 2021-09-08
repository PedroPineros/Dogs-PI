import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import './PaginaPrincipal.css'
import { connect } from 'react-redux'
import { getDogs, getTemperaments} from '../action/actions'

export function PaginaPrincipal({ Dogstate, getDogs, TemperamentsState, getTemperaments }) {
    //------------------------Estados----------------------------\\
    const [stateDogs, setState] = useState([])
    const [stateIndice, IndiceState] = useState({
        contador: 0,
        mayor: 0,
        menor: 0
    })
    const [stateDogsAll, DogsAllState] = useState([])
    
    //------------------------------------------------------------\\
    useEffect(() => {
        getTemperaments()
        getDogs();
        IndiceState({ contador: 1, mayor: 16, menor: 8 });
    }, []);
    useEffect(() => {
        DogsAllState(Dogstate)
    }, [Dogstate])
    useEffect(() => {
        setState(stateDogsAll.slice(0, 8))
    }, [stateDogsAll])
    //-------------------------Handles-----------------------------\\
    let paginado = 8;
    var pagesIndice = Math.ceil((stateDogsAll.length / paginado) - 1)//total de paginas a mostrar

    //--> ir hacia adelante paginacion <---
    const handleClickNext = () => {
        if (stateIndice.contador < pagesIndice) {
            IndiceState({ contador: stateIndice.contador + 1, mayor: stateIndice.mayor + 8, menor: stateIndice.menor + 8 })
            setState(stateDogsAll.slice(stateIndice.menor, stateIndice.mayor))
        } else
            alert('No hay mas Perros para mostrar')
    }
    //--> ir hacia atras paginacion <---
    const handleClickBack = () => {
        if (stateIndice.contador >= 2) {
            IndiceState({ contador: stateIndice.contador - 1, mayor: stateIndice.mayor - 8, menor: stateIndice.menor - 8 })
            setState(stateDogsAll.slice(stateIndice.menor, stateIndice.mayor))
        } else {
            // setState(stateDogsAll.slice(0, 8))
            alert("No hay mas para mostrar")
        }
    }
    //-----------------------------Ordenar Desc && Asc && peso max && min <-------
    
    const handleOrder = (e) => {
        let DogsAll = [...stateDogsAll]
        if (e.target.value === "asc") {
            DogsAll.sort((a, b) => a.nombre.localeCompare(b.name))
            DogsAllState(DogsAll)
        } else if (e.target.value === "desc") {
            DogsAll.sort((a, b) => b.nombre.localeCompare(a.name))
            DogsAllState(DogsAll)
        } else if (e.target.value === "peso_min") {
            DogsAll.sort((a, b) => a.peso.min - b.peso.min)
            DogsAllState(DogsAll)
        } else if (e.target.value === "peso_max") {
            DogsAll.sort((a, b) => b.peso.max - a.peso.max)
            DogsAllState(DogsAll)
            
        }

    }
    //-----------------------------filter Temperamentos<-----------------\\
    const handleFilterTemp = (e) => {
        let temperamentos = e.target.value
        let DogsAll = [...Dogstate]
        // console.log(DogsAll[1].temperamento.includes(temperamentos))
        DogsAll = DogsAll.filter(elem => elem.temperamento !== "").filter(elem => elem.temperamento !== undefined)
        DogsAllState(DogsAll.filter(e => e.temperamento.includes(temperamentos)))
        // console.log(DogsAll.filter(e => e.temperamento.includes(temperamentos)))

    }
    let temp = [...TemperamentsState]
    

    //------------ Filter razas---------\\
    const handleFilterRaza = (e) => {
        let r = e.target.value
        let DogsAll = [...Dogstate]
        let razas = DogsAll.filter(e => e.raza === r)
        DogsAllState(razas)
        
    }
    let DogsAll = [...Dogstate]
    let DogstateSet = [...DogsAll.map(e => e.raza)]
    let razasDogs = DogstateSet.filter(e => e !== "").filter(e => e !== undefined).filter(e => e !== null)
    DogstateSet = [...new Set(razasDogs.map(e => e))]
    console.log(stateDogs)
 

    //---------------------------------------------------------------------------\\
    return (
        <div>
            <button value="asc" onClick={handleOrder}>Ordenar ascendente</button>
            <button value="desc" onClick={handleOrder}>Ordenar descendente</button>
            <button value="peso_min" onClick={handleOrder}>Peso -</button>
            <button value="peso_max" onClick={handleOrder}>Peso +</button>
            
            <select onClick={handleFilterTemp}>
                <option >Temperamentos</option>
                {temp.map(e => {
                    return (
                        <option value={e.name}>{e.name}</option>
                    )
                })
                }
            </select>
            <select onClick={handleFilterRaza}>
                <option >Razas</option>
                {DogstateSet.map(e => {
                    return (
                        <option>{e}</option>
                    )
                })
                }
            </select>

            {stateDogs.map((e) => {
                return (
                    <div>
                        <p>{e.nombre}</p>

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
    return {
        Dogstate: state.Dogs,
        TemperamentsState: state.Temperaments
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getDogs: () => dispatch(getDogs()),
        getTemperaments: () => dispatch(getTemperaments())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginaPrincipal)