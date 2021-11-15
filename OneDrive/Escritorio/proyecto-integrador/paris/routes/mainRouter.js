const express = require ('express');
const router = express.Router();
const mainController = require ('../controllers/mainController');

router.get('/', mainController.index);

router.get('/pruebaSession', (req,res) =>{
    if(req.session.visitas == undefined){
        req.session.visitas= 0;
    }
    req.session.visitas++;
    res.send('Session tiene el número ' + req.session.visitas)
});

module.exports = router;