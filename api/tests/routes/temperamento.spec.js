const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Temperamento, conn } = require('../../src/db.js');
const {v4: uuidv4} = require("uuid")
const agent = session(app);
const temperamento = {
    id:uuidv4(),
    name: 'Petter'
};

describe('Temperaments routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Temperamento.sync({ force: true })
    .then(() => Temperamento.create(temperamento)));
  describe('GET /temperament', () => {
    it('should get 200', () =>
      agent.get('/temperament').expect(200)
    );
  });
});
