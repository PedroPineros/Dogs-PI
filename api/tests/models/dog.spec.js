const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');
const {v4: uuidv4} = require("uuid")

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({
            id: uuidv4(),    
            nombre:"Pug",  
            altura: {min: 32, max: 50},
            peso: {min: 41, max: 50},
            anos_de_vida: "65",
            raza: "Toy"       
        })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
    });
  });
});
