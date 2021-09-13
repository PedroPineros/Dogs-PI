const { Temperamento, conn } = require('../../src/db.js');
const { expect } = require('chai');
const {v4: uuidv4} = require("uuid")

describe('Temperamento model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Temperamento.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Temperamento.create({
            id: "qwqwe123",
            name: "Amistoso"
        })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Temperamento.create({ 
            id: uuidv4(),
            name: 'Pugi' });
      });
    });
  });
});
