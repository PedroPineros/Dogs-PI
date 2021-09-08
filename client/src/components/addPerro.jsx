import 'core-js'
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getDogs, getTemperaments, postAdd, postConection } from '../action/actions';

export function AddDogs({ postAdd, Razas, getDogs, Temperamentos, getTemperaments, postConection, Form }) {
    const [stateTemperamentos, setTemp] = useState([])
    const [stateAdd, AddState] = useState({
        name: "",
        alturaMin: parseInt(""),
        alturaMax: parseInt(""),
        pesoMin: parseInt(""),
        pesoMax: parseInt(""),
        anos_de_vida: "",
        raza: ""
    })

    useEffect(() => {
        getDogs()
        getTemperaments()
    }, [])

    useEffect(() => {
        let idDog = Form.id
        stateTemperamentos.map(idTemperamento => postConection({ idDog, idTemperamento }))
    }, [Form])

    const handleChange = (e) => {
        AddState({ ...stateAdd, [e.target.name]: e.target.value })
    }
    const handleGuardar = (e) => {
        e.preventDefault(e)
        postAdd(stateAdd)
        window.location.reload(false)
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
    }


    console.log(Form)
    return (
        <div>
            <form action="">
                <label>Nombre</label>
                <input type="text" name="name" onChange={handleChange} placeholder="Nombre raza de perro" />
                <label>Altura Minimo</label>
                <input type="number" name="alturaMin" onChange={handleChange} placeholder="Ingrese altura maxima" />
                <label>Altura Maximo</label>
                <input type="number" name="alturaMax" onChange={handleChange} placeholder="Ingrese altura minima" />
                <label>Peso Minimo</label>
                <input type="number" name="pesoMin" onChange={handleChange} placeholder="Ingrese peso maximo" />
                <label>Peso Maximo</label>
                <input type="number" name="pesoMax" onChange={handleChange} placeholder="Ingrese peso minimo" />
                <label></label>
                <input type="text" onChange={handleChange} name="anos_de_vida" placeholder="Años de vida" />
                <select onChange={handleChange} name="raza">
                    <option >Razas</option>
                    {DogstateSet.map(e => {
                        return (
                            <option>{e}</option>
                        )
                    })
                    }
                </select>
                <select onChange={handleTemperamento} name="temperamento">
                    <option >Temperamento</option>
                    {temp.map(e => {
                        return (
                            <option value={e.id}>{e.name}</option>
                        )
                    })
                    }
                </select>
            </form>
            <button onClick={handleGuardar}>Guardar</button>
        </div>
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