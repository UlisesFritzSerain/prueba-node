const bcryptjs = require('bcryptjs');

const User = require ('../models/User');

const { validationResult } = require('express-validator') 

const usersController = {

    login: (req,res) =>{
        console.log(req.session)
        res.render('login')
    },

    processLogin: (req,res) =>{

        let userToLogin = User.findByField('email',req.body.email);
        
        if(userToLogin){
            let passIsOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if(passIsOk){
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                return res.redirect('profile')
            };
            return res.render('login', {
                errors:{
                    email:{
                        msg: 'Las credenciales son incorrectas'
                    }
                }
            })
        };

        return res.render('login', {
            errors:{
                email:{
                    msg: 'No se encuentra este email en nuestra base de datos'
                }
            }
        });
    },

    showRegister:(req,res) =>{res.render('register')} ,

    saveRegister: (req,res) => {
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0 ){
            return res.render ('register', {
                errors: resultValidation.mapped(), // ENVÍA TODOS LOS ERRORES A LA VISTA PARA QUE LOS PODAMOS MOSTRAR
                oldData: req.body // PARA GUARDAR LOS DATOS QUE ESTABAN BIEN ESCRITOS EN EL FORMULARIO
            })
        }

        let userInDB = User.findByField('email', req.body.email);
        
        if(userInDB){
            return res.render ('register', {
                errors: {
                    email:{
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body
        });
    }

        let imageName;
        if (req.file != undefined){
            imageName = req.file.filename;
        }else{
            imageName = 'img-default.jpg';
        }

        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password,10),
            image: imageName,
        }

        let userCreated = User.create(userToCreate);
        return res.redirect('/')
    },

    list: (req,res) => {
        
        res.render('usersList', {users});
    },

    profile: (req,res) => {
        res.render('profile', {
            user: req.session.userLogged
        })
    }
}

module.exports = usersController;