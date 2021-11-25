const db = require('../database/models');
const bcrypt = require('bcrypt');
const loadLang = require('./loadLangController');
const url = require('url');

module.exports = {

    login: (req,res) =>{
        if (req.cookies.logged){
            res.redirect('/account');
        }else{
            let lang = null;
            if (req.cookies.lang == undefined){
                lang='eng';
            }else{
                lang=req.cookies.lang;
            }
            let language = loadLang(lang);
            
            res.render('login', {
                title: 'Login | Prodental', 
                langFlag: lang,
                footerDat: language._footer,
                authDat: language._auth,
                navbarDat: language._navbar
            });
        }
    },
    logout: (req,res) =>{
        if (req.cookies.logged){
            res.clearCookie("logged");
            req.session.userLog = undefined;
        }
        res.redirect('/');
    },
    processLogin: async (req,res) =>{ 

        let user = await db.User.findOne({
            where:{
                email: req.body.email
            }
        })
    
        if (user){
            if (bcrypt.compare(req.body.password,user.password)){
                res.cookie('logged', true, {expire : new Date() + 900000});
                req.session.userLog = user.id;
                if (user.dataValues.is_admin){
                    res.redirect('/admin/');
                }else{
                    res.redirect('/account');
                }
            }
        }else{
            res.redirect('/login');
        }
    },
    signup: (req,res) =>{

        let lang = null;
        if (req.cookies.lang == undefined){
          lang='eng';
        }else{
          lang=req.cookies.lang;
        }

        let language = loadLang(lang);

        res.render('signup', {
            title: 'Signup | Prodental', 
            langFlag: lang,
            footerDat: language._footer,
            authDat: language._auth,
            navbarDat: language._navbar    
        });
        
    },
    processSignup: async (req,res)  =>{

        try {
            let dniReq = req.body.dni;
            let dni = "";
            if (dniReq.length == 8){
                dni = dniReq.substring(0,2)+"."+dniReq.substring(2,5)+"."+dniReq.substring(5,8)
            } else if (dniReq.length == 7){
                dni = dniReq.substring(0,1)+"."+dniReq.substring(1,4)+"."+dniReq.substring(4,7)                
            } else{
                res.redirect('/signup');
            }
            const user = await db.User.create({
              name: req.body.firstName + ' '+req.body.lastName,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password,10),
              dni: dni,
            });

            res.cookie('userLog', user.id, {expire : new Date() + 900000});
            res.cookie('logged', true, {expire : new Date() + 900000});

            res.redirect('/account');
            
          } catch (error) {
            console.log(error);
          }
    }
}