
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
                    let arrayTemperament = response.data.map(e => e.temperament).join("")
                    arrayTemperament = arrayTemperament.split(/(?=[A-Z])/)
                    let a = new Set(arrayTemperament) // se retiran los repetidos
                    let array = [...a]
                    let temp = array
                    let temp1 = temp.filter(e => e.includes(",")).join("").split(", ").filter(e => e !== "")
                    let temp2 = temp.filter(e => !e.includes(","))
                    let tempConcat = temp1.concat(temp2)
                    let tempSet = [...new Set(tempConcat)]
                    tempSet = tempSet.sort((a, b) => a.localeCompare(b))
                    let tempSet1 = [...tempSet]
                    tempSet1.map(e => tablaTemp.push({ id: uuidv4(), name: e }))
                    Temperamento.bulkCreate(tablaTemp)
                        .then(response => res.send(response))
                }
                )
            } else {
                let obj =response.map(e=>{
                    let info={id: e.id, name:e.name}
                    return info
                }
                    )
            
               
                 res.send(obj)
               
            }

        })

}

module.exports = { getTemperaments }
