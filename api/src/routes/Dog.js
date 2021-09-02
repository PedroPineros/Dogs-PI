const {Router} = require ('express') ;
const { getView, postFormularioDogs, getBuscarId, postDogs_Temperamentos } = require('../controlers/dogs');
const router = Router();



router.get('/', getView);
router.get('/:id', getBuscarId);
router.post('/', postFormularioDogs)
router.post('/:dogid/temperament/:Temperamentoid', postDogs_Temperamentos)


module.exports = router;

