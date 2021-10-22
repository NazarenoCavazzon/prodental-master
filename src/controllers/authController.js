const db = require('../database/models');
const bcrypt = require('bcrypt');
const loadLang = require('./loadLangController');
const url = require('url');

var cookieParser = require('cookie-parser');

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
            req.session.destroy();
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
                req.session.userLog = user.id; 
                if (user.dataValues.is_admin){
                    res.cookie('logged', true, {expire : new Date() + 900000});
                    res.redirect('/admin/');
                }else{
                    res.cookie('logged', true, {expire : new Date() + 900000});
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
            const user = await db.User.create({
              name: req.body.firstName + ' '+req.body.lastName,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password,10) 
            });

            req.session.userLog = user.id; 
            res.cookie('logged', true, {expire : new Date() + 900000});

            res.redirect('/account');
            
          } catch (error) {
            console.log(error);
          }
    }
}