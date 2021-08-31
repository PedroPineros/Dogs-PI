const {Router} = require ('express') ;
const { getView, postFormularioDogs, getBuscarId } = require('../controlers/dogs');
const router = Router();



router.get('/', getView);
router.get('/:id', getBuscarId);
router.post('/', postFormularioDogs)
// router.get('/:id', getBuscarId)


module.exports = router;

