export const GET_DOGS = 'GET_DOGS';

const initialState = {
    Dogs: []
}

const rootReducer = function(state = initialState, action){
    switch (action.type) {
        case GET_DOGS:
            return {...state, Dogs: action.payload}
        default:
          return state
    }
}
export default rootReducer