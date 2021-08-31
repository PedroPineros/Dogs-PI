
const { Temperamento } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const {
    YOUR_API_KEY
} = process.env;

function getTemperaments(req, res, next) {
    // const tempDb = Temperamento.findAll();
    let tablaTemp = [];
    return Temperamento.findAll()
        .then(response => {
            if (response.length === 0) {
                return axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
                    .then((response) => {
                        let arrayTemperament = response.data.map(e => e.temperament)
                        arrayTemperament = arrayTemperament.join("").split(",")
                        let a = new Set(arrayTemperament) // se retiran los repetidos
                        let array = [...a]
                        array.map(e => tablaTemp.push({id: uuidv4(), name: e}))
                        Temperamento.bulkCreate(tablaTemp)
                            .then(response => res.send(response.map(e=> e.name)))
                    }
                    )
            } else {
                res.send(response.map(e => e.name))
            }

        })

}

module.exports = { getTemperaments }
