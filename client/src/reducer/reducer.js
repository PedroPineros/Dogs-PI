export const GET_DOGS = 'GET_DOGS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS'
export const GET_BUSCAR = 'GET_BUSCAR'
export const POST_GUARDAR = 'POST_GUARDAR'
export const POST_CONECTION = 'POST_CONECTION'

const initialState = {
    Dogs: [],
    Temperaments: [],
    Dog:{},
    DogAdd: {},
    peso: [],
    altura: []
}

const rootReducer = function(state = initialState, action){
    switch (action.type) {
        case GET_DOGS:
            return {...state, Dogs: action.payload}
        case GET_TEMPERAMENTS:
            return {...state, Temperaments: action.payload}
        case GET_BUSCAR:
            let pesos= []
            let alturas = []
            console.log(action.payload[0])
            pesos.push(action.payload[0].peso.min,action.payload[0].peso.max)
            alturas.push(action.payload[0].altura.min,action.payload[0].altura.max)
            return {...state, Dog: action.payload[0], peso:pesos, altura:alturas}

        case POST_GUARDAR:
            return {...state, DogAdd: action.payload}
        default:
          return state
    }
}

export default rootReducer