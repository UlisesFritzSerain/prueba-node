const express = require ('express');
const router = express.Router();

const path = require('path');
const multer = require('multer');

const bcrypt = require('bcryptjs');

const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const { body } = require('express-validator')

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, './public/img/users'); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
  });
const uploadFile = multer({ storage });

const validations = [
   body('firstName').notEmpty().withMessage('Tienes que escribir un nombre'),
   body('lastName').notEmpty().withMessage('Tienes que escribir un apellido'),
   body('email').notEmpty().withMessage('Tienes que escribir un correo electrónico').bail().isEmail().withMessage('Debes escribir un correo electrónico válido')
   ,
   body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
   body('confirmPassword').notEmpty().withMessage('Tienes que escribir una contraseña').custom((value, {req}) => {
      if (value !== req.body.password) {
            throw new Error('Las contraseñas deben ser iguales');
   }
       return true;
})
   ];

const validationsLogin =[
   body('email').notEmpty().withMessage('Tienes que escribir un correo electrónico').bail().isEmail().withMessage('Tienes que escribir un correo electrónico válido'),
   body('password').notEmpty().withMessage('Tienes que escribir una contraseña')
];



const usersController = require ('../controllers/usersControllers');

router.get('/register', guestMiddleware ,usersController.showRegister);
router.post('/register',uploadFile.single('img-profile'),validations ,usersController.saveRegister)


router.get('/login', guestMiddleware ,usersController.login);
router.post('/login',usersController.processLogin);

router.get('/list', usersController.list);

router.get('/profile', authMiddleware ,usersController.profile);

module.exports = router;