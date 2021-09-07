export const GET_DOGS = 'GET_DOGS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS'
const initialState = {
    Dogs: [],
    Temperaments: []
}

const rootReducer = function(state = initialState, action){
    switch (action.type) {
        case GET_DOGS:
            return {...state, Dogs: action.payload}
        case GET_TEMPERAMENTS:
            return {...state, Temperaments: action.payload}
        default:
          return state
    }
}

export default rootReducer