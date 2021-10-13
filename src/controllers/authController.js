const db = require('../database/models');
const bcrypt = require('bcrypt');
const loadLang = require('./loadLangController');

module.exports = {
    login: (req,res) =>{
        if (req.session.userLog){
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
                authDat: language._auth
            });
        }
    },
    logout: (req,res) =>{
        if (req.session.userLog){
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
                if (user.id == 0){
                    res.redirect('/admin/turns');
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

        if (req.session.userLog){
            res.redirect('/account');
        }else{
            res.render('signup', {
                title: 'Signup | Prodental', 
                langFlag: lang,
                footerDat: language._footer,
                authDat: language._auth    
            });
        }
    },
    processSignup: async (req,res)  =>{

        try {
            const user = await db.User.create({
              name: req.body.firstName + ' '+req.body.lastName,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password,10) 
            })
            
            res.redirect('/login');
            
          } catch (error) {
            console.log(error);
          }
    }
}