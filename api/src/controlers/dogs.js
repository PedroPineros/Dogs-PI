const {Dog} = require('../db');
const axios = require('axios');
const { v4:uuidv4 } = require('uuid');
require('dotenv').config();
const {
    YOUR_API_KEY
  } = process.env;

function getView(req, res, next){
    let {name} = req.query
    if(name){
      getBuscarDogs(req, res, next)  
    }else{
      getDogs(req, res, next)
    }
}

function getDogs(req, res, next){
    const dogsApi = axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
    const dogsDb = Dog.findAll()
    Promise.all([dogsApi,dogsDb])
    .then((response)=>{
        let [dogsApiResponse, dogsDbResponse] = response;
        let Api = dogsApiResponse.data.map(razaApi => {
            let infoApi = {
               id: razaApi.id,
               nombre: razaApi.name,
               peso: razaApi.weight,
               imagen: razaApi.image.url,
               temperamento: razaApi.temperament
            }
            return infoApi
        });
        let db = dogsDbResponse.map(raza =>{
            let infoDb = {
                id: raza.id,
                nombre: raza.name,
                peso: raza.peso
             }
             return infoDb
        })
        var ApiDb = (db.concat(Api))
        res.send(ApiDb)
    })
    .catch((error)=>next(error))
}

function getBuscarDogs(req, res, next){
    const {name} = req.query;
    const dogsApi = axios.get(`https://api.thedogapi.com/v1/breeds/search?name=${name}&api_key=${YOUR_API_KEY}`)
    const dogsDb = Dog.findAll()
    Promise.all([dogsApi,dogsDb])
    .then((response)=>{
        let [dogsApiResponse, dogsDbResponse] = response;
        res.send(
            (dogsDbResponse.concat(dogsApiResponse.data)).map(razas => razas.name)
            )
    })
    .catch((error)=>next(error))
    
}

function getBuscarId(req, res, next){
    const {id} = req.params;
    const dogsDb = Dog.findAll()
    const dogsApi = axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
    Promise.all([dogsApi, dogsDb])
    .then((response)=>{
        let [dogsApiResponse,dogsDbResponse] = response
        let razas =  (dogsDbResponse.concat(dogsApiResponse.data))
        let idrazas = parseInt(razas.map(razas => razas.id).toString().indexOf(id))
        res.json(razas[idrazas])
    })
    .catch((error)=>next(error))
}



function postFormularioDogs(req, res, next){
    const {name, altura, peso, anos_de_vida} = req.body;
    let values = {
        name: name,
        altura: altura,
        peso: peso,
        anos_de_vida: anos_de_vida
    }
    return Dog.create({...values, id:uuidv4()})
    .then(response => res.send(response))
}

module.exports = {getView, postFormularioDogs, getBuscarId}

