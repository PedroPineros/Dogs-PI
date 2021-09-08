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
    try {
        let dogsApiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
        let dogsDbResponse = await Dog.findAll({ include: Temperamento }).then(response => { return response })
        let Api = dogsApiResponse.data.map(razaApi => {
            var MinString = razaApi.weight.metric.slice(0, -4)
            var MinInt = parseInt(MinString)
            var MaxString = razaApi.weight.metric.slice(4)
            var MaxInt = parseInt(MaxString)
            //---altura
            var alturaMinString = razaApi.height.metric.slice(0, -4)
            var alturaMinInt = parseInt(alturaMinString)
            var alturaMaxString = razaApi.height.metric.slice(4)
            var alturaMaxInt = parseInt(alturaMaxString)
            //----
            let infoApi = {
                id: razaApi.id,
                nombre: razaApi.name,
                peso: {
                    min: MinInt,
                    max: MaxInt,
                },
                altura: {
                    min: alturaMinInt,
                    max: alturaMaxInt
                },
                imagen: razaApi.image.url,
                temperamento: razaApi.temperament,
                raza: razaApi.breed_group
            }
            return infoApi
        });
        let db = dogsDbResponse.map(raza => {
            let infoDb = {
                id: raza.id,
                nombre: raza.name,
                temperamento: raza.Temperamentos.map(e=> e.name).join(","),
                altura:{
                    min: raza.altura.min,
                    max: raza.altura.max,
                },
                peso: {
                    min: raza.peso.min,
                    max: raza.peso.max,
                },
                raza: raza.raza
            }
            return infoDb
        })
        var ApiDb = (db.concat(Api))
        if (ApiDb) {
            res.send(ApiDb)
        } else {
            res.status(404)
        }
    } catch (err) {
        // console.log(err)
    }
}

const getBuscarDogs = async function(req, res, next) {
    try {
        const { name } = req.query;
        let nombre = name.charAt(0).toUpperCase() + name.slice(1)
        let dogsApiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
        let dogsDbResponse = await Dog.findAll({ include: Temperamento }).then(response => { return response })
        let Api = dogsApiResponse.data.map(razaApi => {
            var MinString = razaApi.weight.metric.slice(0, -4)
            var MinInt = parseInt(MinString)
            var MaxString = razaApi.weight.metric.slice(4)
            var MaxInt = parseInt(MaxString)
            //---altura
            var alturaMinString = razaApi.height.metric.slice(0, -4)
            var alturaMinInt = parseInt(alturaMinString)
            var alturaMaxString = razaApi.height.metric.slice(4)
            var alturaMaxInt = parseInt(alturaMaxString)
            //----
            let infoApi = {
                id: razaApi.id,
                nombre: razaApi.name,
                peso: {
                    min: MinInt,
                    max: MaxInt,
                },
                altura: {
                    min: alturaMinInt,
                    max: alturaMaxInt
                },
                imagen: razaApi.image.url,
                temperamento: razaApi.temperament,
                raza: razaApi.breed_group
            }
            return infoApi
        });
        let db = dogsDbResponse.map(raza => {
            let infoDb = {
                id: raza.id,
                nombre: raza.name,
                temperamento: raza.Temperamentos.map(e=> e.name).join(","),
                altura:{
                    min: raza.altura.min,
                    max: raza.altura.max,
                },
                peso: {
                    min: raza.peso.min,
                    max: raza.peso.max,
                },
                raza: raza.raza
            }
            return infoDb
        })
        var nombreRazas = (db.concat(Api))
        let dbnames = nombreRazas.filter(e => e.nombre === name || e.nombre === nombre)
        if (dbnames) {
            res.send(dbnames)
        } else {
            res.status(404)
        }
    } catch (err) {
        // console.log(err)
    }

}

function getBuscarId(req, res, next) {
    var { id } = req.params;
    if (id.length > 20) {
        return Dog.findByPk(id)
            .then(response => {
                let detalles = {
                    nombre: response.name,
                    temperamento: response.Temperamentos,
                    altura: response.altura,
                    peso: response.peso.metric,
                    años_de_vida: response.anos_de_vida,
                    raza: response.raza
                }
                res.send(detalles)
            })
    } else {
        return axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
            .then(response => {
                let intID = parseInt(id)
                let index = response.data.map(e => e.id).indexOf(intID)
                let raza = response.data[index]
                let detalles = {
                    imagen: raza.image.url,
                    nombre: raza.name,
                    raza: e.breed_group,
                    temperamento: raza.temperament,
                    altura: raza.height,
                    peso: raza.weight.metric,
                    anos_de_vida: raza.life_span
                }
                res.send(detalles)
            }).catch((error) => next(error))
    }
}



function postFormularioDogs(req, res, next) {
    const { name, alturaMin,alturaMax, pesoMin, pesoMax, anos_de_vida, raza } = req.body;
    let values = {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        altura: {
            min: alturaMin,
            max: alturaMax
        },
        peso: {
            min: pesoMin,
            max: pesoMax
        },
        anos_de_vida: anos_de_vida,
        raza: raza
    }
    return Dog.create({ ...values, id: uuidv4() })
        .then(response => res.send(response))
        .catch((error) => next(error))
}

const postDogs_Temperamentos = async function (req, res) {
    const { dogid, Temperamentoid } = req.params
    var dog = await Dog.findByPk(dogid)
    var temperamento = await Temperamento.findByPk(Temperamentoid)
    var rest = await dog.addTemperamentos(temperamento)
    res.send(rest)
}

module.exports = { getView, postFormularioDogs, getBuscarId, postDogs_Temperamentos }

