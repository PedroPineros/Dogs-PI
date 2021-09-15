import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import './PaginaPrincipal.css'
import { connect } from 'react-redux'
import { getDogs, getTemperaments } from '../action/actions'
import dfault from '../img/perropp.png';

export function PaginaPrincipal({ Dogstate, getDogs, TemperamentsState, getTemperaments }) {
    //------------------------Estados----------------------------\\
    const [stateDogs, setState] = useState([])
    const [stateIndice, setIndice] = useState({
        contador: 1,
        max: 0,
        min: 0
    })
    const [stateClick, setClick] = useState({
        next: 0,
        back: 0
    })
    const [stateDogsAll, DogsAllState] = useState([])

    //------------------------------------------------------------\\
    useEffect(() => {
        getTemperaments()
        getDogs()
    }, []);
    useEffect(() => {
        DogsAllState(Dogstate)
    }, [Dogstate])
    useEffect(() => {
        setState(stateDogsAll.slice(0, 9))
    }, [stateDogsAll])
    //-------------------------Handles-----------------------------\\
    //--> ir hacia adelante paginacion <---
    const handleClickNext = () => {
        if (stateIndice.contador === 1) {
            setIndice({
                contador: stateIndice.contador + 1,
                min: 9,
                max: 18
            })
        }
        if (stateIndice.max + 9 < stateDogsAll.length && stateIndice.contador !== 1) {
            setIndice({
                contador: stateIndice.contador + 1,
                min: stateIndice.min + 9,
                max: stateIndice.max + 9
            })
        }
        if (stateIndice.max + 9 >= stateDogsAll.length && stateIndice.max < stateDogsAll.length) {
            setIndice({
                contador: stateIndice.contador + 1,
                min: stateDogsAll.length - (stateDogsAll.length - stateIndice.max),
                max: stateDogsAll.length
            })
        }
        setClick({ ...stateClick, next: stateClick.next + 1 })
    }
    useEffect(() => {
        setState(stateDogsAll.slice(stateIndice.min, stateIndice.max))
    }, [stateClick.next])


    //--> ir hacia atras paginacion <---
    const handleClickBack = () => {
        if (stateIndice.contador > 1) {
            if (stateIndice.contador === 2) {
                setIndice({ contador: stateIndice.contador - 1, max: 9, min: 0 })
            }
            else if (stateIndice.max === stateDogsAll.length) {
                var maximo = stateIndice.min
                setIndice({ contador: stateIndice.contador - 1, max: maximo, min: maximo - 9 })
            }
            else {
                setIndice({ contador: stateIndice.contador - 1, min: stateIndice.min - 9, max: stateIndice.max - 9 })
            }
            setClick({ ...stateClick, back: stateClick.back + 1 })
        }
    }
    useEffect(() => {
        setState(stateDogsAll.slice(stateIndice.min, stateIndice.max))
    }, [stateClick.back])
    //-----------------------------Ordenar Desc && Asc && peso max && min <-------

    const handleOrder = (e) => {
        let DogsAll = [...stateDogsAll]
        if (e.target.value === "asc") {
            DogsAll.sort((a, b) => a.nombre.localeCompare(b.nombre))
            DogsAllState(DogsAll)
        } else if (e.target.value === "desc") {
            DogsAll.sort((a, b) => b.nombre.localeCompare(a.nombre))
            DogsAllState(DogsAll)
        } 
        else if (e.target.value === "peso_min") {
            DogsAll.sort((a, b) => a.peso.min - b.peso.min)
            DogsAllState(DogsAll)
        } else if (e.target.value === "peso_max") {
            DogsAll.sort((a, b) => b.peso.max - a.peso.max)
            DogsAllState(DogsAll)
        } if (e.target.value === "Todos") {
            DogsAllState(Dogstate)
        }
        setIndice({contador:1, max:0, min:0})
    }
    //-----------------------------filter Temperamentos<-----------------\\
    const handleFilterTemp = (event) => {
        // let temperamentos = e.target.value
        if (event.target.value === "Todos") {
            DogsAllState(Dogstate)
        } else {
            let DogsAll = [...Dogstate]
            let all = []
            if (event.target.value) {
                DogsAll = DogsAll.filter(elem => elem.temperamento !== "").filter(elem => elem.temperamento !== undefined)
                all = (DogsAll.filter(e => e.temperamento.includes(event.target.value)))
            }
            DogsAllState(all)
        }
        setIndice({contador:1, max:0, min:0})
    }
    let temp = [...TemperamentsState]


    //------------ Filter razas---------\\
    const handleFilterRaza = (e) => {
        if (e.target.value === "Todos") {
            DogsAllState(Dogstate)
        } else {
            let r = e.target.value
            let DogsAll = [...Dogstate]
            let razas = DogsAll.filter(e => e.raza === r)
            DogsAllState(razas)
        }
        setIndice({contador:1, max:0, min:0})
    }
    let DogsAll = [...Dogstate]
    let DogstateSet = [...DogsAll.map(e => e.raza)]
    let razasDogs = DogstateSet.filter(e => e !== "").filter(e => e !== undefined).filter(e => e !== null)
    DogstateSet = [...new Set(razasDogs.map(e => e))]


    //---------------------------------------------------------------------------\\
    return (
        <div className="dogall">
            <div className="btns">
                <h3>Filtros</h3>
                <select className="filtroSelect" onChange={handleOrder}>
                    <option value="Todos">AZ/ZA</option>
                    <option value="asc">A / Z</option>
                    <option value="desc">Z / A</option>
                </select>
                <select className="filtroSelect" onChange={handleOrder}>
                    <option value="Todos">Peso</option>
                    <option value="peso_min">Peso min</option>
                    <option value="peso_max">Peso max</option>
                </select>

                <select className="filtroSelect" onChange={handleFilterTemp}>
                    <option value="Todos">Temperamentos</option>
                    {temp.map((e, i) => {
                        return (
                            <option key={i} value={e.name}>{e.name}</option>
                        )
                    })
                    }
                </select>

                <select className="filtroSelect" onChange={handleFilterRaza}>
                    <option value="Todos">Razas</option>
                    {DogstateSet.map((e, i) => {
                        return (
                            <option key={i}>{e}</option>
                        )
                    })
                    }
                </select>
                <button value="Todos" className="todosDogs" onClick={handleOrder}>All</button>
            </div>
            <div className="cards">
                {stateDogs.map((e, i) => {
                    if (!e.imagen) {
                        let Temp = e.temperamento.split(",")
                        return (
                            <div key={i} className="card">
                                <img className="Dogimg" src={dfault} alt=""></img>
                                <h4>Nombre</h4>
                                <h5>{e.nombre}</h5>
                                <h4>Peso Minimo</h4>
                                <h5>{e.peso.min} Kg</h5>
                                <h4>Peso Maximo</h4>
                                <h5>{e.peso.max} Kg</h5>
                                <h4>Temperamentos</h4>
                                <p>{Temp.map((e,i)=>{
                                    return (
                                        <h5 key={i}>{e}</h5>
                                    )
                                })}</p>
                            </div>
                        )
                    }
                    return (
                        <div key={i} className="card">
                            <img className="Dogimg" src={e.imagen} alt=""></img>
                            <h4>Nombre</h4>
                            <h5>{e.nombre}</h5>
                            <h4>Peso Minimo</h4>
                            <h5>{e.peso.min} Kg</h5>
                            <h4>Peso Maximo</h4>
                            <h5>{e.peso.max} Kg</h5>
                            <h4>Temperamentos</h4>
                            <h5>{e.temperamento}</h5>
                        </div>
                    )
                }
                )}
            </div>
            <div className="btnBN">
                <button onClick={handleClickBack}>Back</button>
                <h5>{stateIndice.contador}</h5>
                <button onClick={handleClickNext}>next</button>
            </div>
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