import { GET_DOGS, GET_TEMPERAMENTS } from "../reducer/reducer";
import axios from 'axios'


export function getDogs(){
        return function(dispatch){
            return axios.get(`http://localhost:3001/dogs`)
            .then(response => response.data)
            .then(response => {dispatch({type: GET_DOGS, payload:response})})
            .catch(err =>(console.log("error : " + err)))
        }
    }

    export function getTemperaments(){
        return function(dispatch){
            return axios.get(`http://localhost:3001/temperament`)
            .then(response => response.data)
            .then(response => {dispatch({type: GET_TEMPERAMENTS, payload:response})})
            .catch(err =>(console.log("error : " + err)))
        }
    }

