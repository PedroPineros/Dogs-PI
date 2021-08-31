const {Router} = require ('express') ;
const { getTemperaments } = require('../controlers/temperamento');
const router = Router();



router.get('/', getTemperaments)


module.exports = router;