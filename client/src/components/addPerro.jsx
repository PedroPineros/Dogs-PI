import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getDogs, getTemperaments, postAdd, postConection } from '../action/actions';
import './addPerro.css'
// import fondo from '../img/huella1.png'
import save from '../img/pg.png'

export function AddDogs({ postAdd, Razas, getDogs, Temperamentos, getTemperaments, postConection, Form }) {
    const [stateTemperamentos, setTemp] = useState([])
    const [stateAdd, setAdd] = useState({
        name: "",
        alturaMin: parseInt(""),
        alturaMax: parseInt(""),
        pesoMin: parseInt(""),
        pesoMax: parseInt(""),
        anos_de_vida: "",
        raza: ""
    })
    const [stateT, setT] = useState([])
    useEffect(() => {
        getDogs()
        getTemperaments()
    }, [])

    useEffect(() => {
        let idDog = Form.id
        stateTemperamentos.map(idTemperamento => postConection({ idDog, idTemperamento }))
    }, [Form])

    const handleChange = (e) => {
        setAdd({ ...stateAdd, [e.target.name]: e.target.value })
    }
    const handleGuardar = (e) => {
        e.preventDefault(e)
        if (stateAdd.name && stateAdd.alturaMin && 
            stateAdd.alturaMin && stateAdd.raza &&
            stateAdd.pesoMax && stateAdd.pesoMin &&
            stateAdd.anos_de_vida && stateAdd.raza) {
            postAdd(stateAdd)
            alert("Raza de perro " + stateAdd.name + " creada exitosamente")
        } else {
            alert("Debe completar todos los datos")
        }
    }
    //------> razas----------//
    var DogstateSet = [...new Set(Razas.map(e => e.raza))]
    DogstateSet = DogstateSet.filter(e => e !== "").filter(e => e !== undefined).filter(e => e !== null)
    //---------> temperamentos--------//

    let temp = Temperamentos
    //-------------------------------//  

    const handleTemperamento = (e) => {
        e.preventDefault()
        setTemp([...stateTemperamentos, e.target.value])
        let t = Temperamentos.filter(elem => elem.id === e.target.value).map(idT => idT.name)[0]
        if (!stateT.includes(t)) {
            setT([...stateT, t])
        }
    }
    console.log(stateT)

    return (
        <div className="ContenedorForm">
            <div className="formCentro">
                <h2>Registro nueva Raza</h2>
                <form className="form">
                    <div className="form1">
                        <label>Nombre</label>
                        <input type="text" name="name" onChange={handleChange} placeholder="Nombre raza de perro" />
                        <label>Altura Minimo</label>
                        <input type="number" name="alturaMin" onChange={handleChange} placeholder="Ingrese altura maxima" />
                        <label>Altura Maximo</label>
                        <input type="number" name="alturaMax" onChange={handleChange} placeholder="Ingrese altura minima" />
                        <label>Peso Minimo</label>
                        <input type="number" name="pesoMin" onChange={handleChange} placeholder="Ingrese peso maximo" />
                    </div>
                    <div className="form2">
                        <label>Peso Maximo</label>
                        <input type="number" name="pesoMax" onChange={handleChange} placeholder="Ingrese peso minimo" />
                        <label></label>
                        <label>Años de Vida</label>
                        <input type="text" onChange={handleChange} name="anos_de_vida" placeholder="Años de vida" />
                        <label>Selecciona la Raza</label>
                        <select onChange={handleChange} name="raza">
                            <option >Razas</option>
                            {DogstateSet.map((e, i) => {
                                return (
                                    <option key={i}>{e}</option>
                                )
                            })
                            }
                        </select>
                        <label>Temperamentos</label>
                        <select onChange={handleTemperamento} name="temperamento">
                            <option >Temperamento</option>
                            {temp.map(e => {
                                return (
                                    <option key={e.id} value={e.id}>{e.name}</option>
                                )
                            })
                            }
                        </select>
                    </div>
                </form>
                <div>
                    <div className="form3">
                        <h3>Tus Temperamentos</h3>
                        <h5 >{stateT.map(e => e + ", ")}</h5>
                    </div>
                </div>
                <div>
                    <button className="guardar" onClick={handleGuardar}><img className="imgsave" src={save} alt="" /></button>
                </div>
            </div>
        </div >
    )
}
const mapStateToProps = (state) => {
    return {
        Razas: state.Dogs,
        Temperamentos: state.Temperaments,
        Form: state.DogAdd
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        postAdd: (name) => dispatch(postAdd(name)),
        getDogs: () => dispatch(getDogs()),
        getTemperaments: () => dispatch(getTemperaments()),
        postConection: (idDogs, idTemperamento) => dispatch(postConection(idDogs, idTemperamento))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddDogs)