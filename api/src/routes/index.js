const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouter = require('./Dog.js')
const TemperamentosRouter = require('./Temperamento.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogsRouter);
router.use('/temperament', TemperamentosRouter);


module.exports = router;
