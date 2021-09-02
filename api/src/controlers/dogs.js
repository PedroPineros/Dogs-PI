const { Dog, Temperamento } = require('../db');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const {
    YOUR_API_KEY
} = process.env;

function getView(req, res, next) {
    let { name } = req.query
    if (name) {
        getBuscarDogs(req, res, next)
    } else {
        getDogs(req, res, next)
    }
}

const getDogs = async function (req, res, next) {
    let dogsApiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
    let dogsDbResponse = await Dog.findAll({ include: Temperamento }).then(response => { return response })
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
    let db = dogsDbResponse.map(raza => {
        let infoDb = {
            id: raza.id,
            nombre: raza.name,
            temperamento: raza.Temperamentos,
            peso: raza.peso
        }
        return infoDb
    })
    var ApiDb = (db.concat(Api))
    if (ApiDb) {
        res.send(ApiDb)
    } else {
        res.status(404)
    }

}

function getBuscarDogs(req, res, next) {
    const { name } = req.query;
    let nombre = name.charAt(0).toUpperCase() + name.slice(1)
    const dogsApi = axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
    const dogsDb = Dog.findAll()
    Promise.all([dogsApi, dogsDb])
        .then((response) => {
            let [dogsApiResponse, dogsDbResponse] = response;
            let nombreRazas = dogsDbResponse.concat(dogsApiResponse.data).map(razas => razas.name)
            let dbnames = nombreRazas.filter(e => e.includes(nombre) || e.includes(name))
            if (dbnames.length) {
                res.send(dbnames)
            } else {
                res.status(400).send('Raza de Perros no existe')
            }
        })
        .catch((error) => next(error))

}

function getBuscarId(req, res, next) {
    var { id } = req.params;
    if (id.length > 20) {
        return Dog.findByPk(id)
        .then(response => {
            let detalles = {
                nombre:response.name,
                temperamento: response.Temperamentos,
                altura: response.altura,
                peso: response.peso,
                años_de_vida: response.anos_de_vida
            }
        res.send(detalles)
        })
    } else {
        return axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
        .then(response => {
            let intID = parseInt(id)
            let index = response.data.map(e=> e.id).indexOf(intID)
            let raza = response.data[index]
            let detalles = {
                imagen: raza.image.url,
                nombre: raza.name,
                temperamento: raza.temperament,
                altura: raza.height,
                peso: raza.weight,
                anos_de_vida: raza.life_span
            }
            res.send(detalles)
        })
    }
}



function postFormularioDogs(req, res, next) {
    const { name, altura, peso, anos_de_vida } = req.body;
    let values = {
        name: name,
        altura: altura,
        peso: peso,
        anos_de_vida: anos_de_vida
    }
    return Dog.create({ ...values, id: uuidv4() })
        .then(response => res.send(response))
}

const postDogs_Temperamentos = async function(req, res){
    const {dogid, Temperamentoid} = req.params
    var dog = await Dog.findByPk(dogid)
    var temperamento = await Temperamento.findByPk(Temperamentoid)
    var rest = await dog.addTemperamentos(temperamento)
    res.send(rest)
}

module.exports = { getView, postFormularioDogs, getBuscarId, postDogs_Temperamentos }

