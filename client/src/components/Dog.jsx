import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getDogs } from '../action/actions'
import defaultimg from '../img/default.png'

export function Dog({ DogState, getDogs, Dogspesos, DogsAltura }) {
    useEffect(() => {
        getDogs()
    }, [])

    console.log(Dogspesos)
    if(DogState.imagen){
        return (
            <div>
                <img src={DogState.imagen} alt="" />
                <h2>Nombre {DogState.nombre}</h2>
                <ul>
                    <h4>Peso</h4>
                    <li>Min: {Dogspesos[0]}</li>
                    <li>Max: {Dogspesos[1]}</li>
                </ul>
                <ul>
                <h4>Altura</h4>
                <li>Min: {DogsAltura[0]}</li>
                    <li>Max: {DogsAltura[1]}</li>
            </ul>
                <h4>Temperamentos</h4>
                <ul>
                    <li>{DogState.temperamento}</li>
                </ul>
            </div>
        )
    }else{
        return (
            <div>
                <img src={defaultimg} alt="" />
                <h2>Nombre {DogState.nombre}</h2>
                <ul>
                    <h4>Peso</h4>
                    <li>Min: {Dogspesos[0]}</li>
                    <li>Max: {Dogspesos[1]}</li>
                </ul>
                <ul>
                <h4>Altura</h4>
                <li>Min: {DogsAltura[0]}</li>
                    <li>Max: {DogsAltura[1]}</li>
            </ul>
                <h4>Temperamentos</h4>
                <ul>
                    <li>{DogState.temperamento}</li>
                </ul>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return { 
        DogState: state.Dog,
        Dogspesos: state.peso,
        DogsAltura: state.altura
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getDogs: () => dispatch(getDogs())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dog)