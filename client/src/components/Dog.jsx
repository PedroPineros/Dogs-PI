import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getDogs } from '../action/actions'
import defaultimg from '../img/fresco.png'
import buscar from '../img/default.png'
import './Dog.css'

export function Dog({ DogState, getDogs, Dogspesos, DogsAltura, Dogs }) {
    useEffect(() => {
        getDogs()
    }, [])


    if (!DogState.nombre) {
        return (
            <div>
                <h1>Busque un nombre de Dog valido</h1>
                <img className="nada" src={buscar} alt="" />
            </div>
        )
    } else if (DogState.imagen) {
        let Temp = DogState.temperamento.split(",")
        return (
            <div className="contenedorDetalles">
                <div className="detalles">
                    <div className="imgDetalles">
                        <h2>{DogState.nombre}</h2>
                        <img className="imgDet" src={DogState.imagen} alt="" />
                    </div>
                    <div className="masDetalles">
                        <h4>Raza<h5>{DogState.raza}</h5></h4>
                        <h4>Peso Minimo: <h5>{Dogspesos[0]} Kg</h5></h4>
                        <h4>Peso Maximo: <h5>{Dogspesos[1]} Kg</h5></h4>
                        <h4>Altura Minima <h5>{DogsAltura[0]} cm</h5></h4>
                        <h4>Altura Maxima <h5>{DogsAltura[1]} cm</h5></h4>
                        <h4>Temperamentos {Temp.map(e => {
                            return (
                                <h5>{e}</h5>
                            )
                        })}</h4>

                    </div>
                </div>
            </div>
        )
    } else {
        let Temp = DogState.temperamento.split(",")
        return (
            <div className="contenedorDetalles">
                <div className="detalles">
                    <div className="imgDetalles">
                        <h2>{DogState.nombre}</h2>
                        <img className="imgDet" src={defaultimg} alt="" />
                    </div>
                    <div className="masDetalles">
                        <h4>Raza<h5>{DogState.raza}</h5></h4>
                        <h4>Peso Minimo: <h5>{Dogspesos[0]} Kg</h5></h4>
                        <h4>Peso Maximo: <h5>{Dogspesos[1]} Kg</h5></h4>
                        <h4>Altura Minima <h5>{DogsAltura[0]} cm</h5></h4>
                        <h4>Altura Maxima <h5>{DogsAltura[1]} cm</h5></h4>
                        <h4>Temperamentos {Temp.map(e => {
                            return (
                                <h5>{e}</h5>
                            )
                        })}</h4>

                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        DogState: state.Dog,
        Dogspesos: state.peso,
        DogsAltura: state.altura,
        Dogs: state.Dogs
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getDogs: () => dispatch(getDogs())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dog)