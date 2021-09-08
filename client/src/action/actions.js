import { GET_DOGS, GET_TEMPERAMENTS, GET_BUSCAR, POST_GUARDAR,POST_CONECTION} from "../reducer/reducer";
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
    export function getBuscar(name){
        return function(dispatch){
            return axios.get(`http://localhost:3001/dogs?name=${name}`)
            .then(response => response.data)
            .then(response => {dispatch({type: GET_BUSCAR, payload:response})})
            .catch(err =>(console.log("error : " + err)))
        }
    }

    export function postAdd(name){
        return function(dispatch){
            return axios.post(`http://localhost:3001/dogs`,name)
            .then(response => response.data)
            .then(response => {dispatch({type: POST_GUARDAR, payload:response})})
            .catch(err =>(console.log("error : " + err)))
        }
    }

    export function postConection({idDog,idTemperamento}){
        return function(dispatch){
            return axios.post(`http://localhost:3001/dogs/${idDog}/temperament/${idTemperamento}`)
            .then(response => response.data)
            .then(response => {dispatch({type: POST_CONECTION, payload:response})})
            .catch(err =>(console.log("error : " + err)))
        }
    }
