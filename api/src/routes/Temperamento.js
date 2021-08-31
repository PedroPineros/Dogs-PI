const {Router} = require ('express') ;
const router = Router();



router.get('/', (req, res, next)=>{
    res.send('buenas buenas 2')
})


module.exports = router;