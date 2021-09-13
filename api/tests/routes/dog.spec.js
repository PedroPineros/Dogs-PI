/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');
const {v4: uuidv4} = require("uuid")

const agent = session(app);
const dog = {
    id: uuidv4(),
    name: "Pug",
    altura: {min: 5, max: 47},
    peso: {min: 40, max: 50},
    anos_de_vida: 63,
    raza: "Toy"

};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
});
