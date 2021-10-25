const db = require('../database/models');
const loadLang = require('./loadLangController');
const moment = require('moment');
moment.locale('es');



module.exports = {
    index: async (req,res) =>{
        let lang = null;
        if (req.cookies.lang == undefined){
        lang='esp';
        res.cookie("lang","eng");
        }else{
        lang=req.cookies.lang;
        }
        let language = loadLang(lang);

        let user = await db.User.findOne({
            where:{
                id: req.cookies.userLog
            }
        })
        if (user.dataValues.is_admin){
            res.redirect('/admin/users');
        }

        let turns = await db.Turn.findAll({
            where:{
                user_id: req.cookies.userLog
            },
            include: [
                'treatment'
            ]
        }) 

        turns.forEach(turn => {
            turn.setDataValue('date',moment(turn.date).format('dddd DD MMMM YYYY'))
        });


        return res.render('account',{
            user: user, 
            turns: turns ,
            title: 'Account | Prodental',
            accountDat: language._account
        })
    },
    turnTreatment: async (req,res) =>{

        if (req.cookies.logged){
            let lang = null;
            if (req.cookies.lang == undefined){
            lang='eng';
            res.cookie("lang","eng");
            }else{
            lang=req.cookies.lang;
            }
            let language = loadLang(lang);

            if (req.cookies.userLog){
                let user = await db.User.findOne({
                    where:{
                        id: req.cookies.userLog
                    }
                })
                let treatments = await db.Treatment.findAll();
                return res.render('account/turn-treatment',
                { 
                    treatments: treatments, 
                    title: "Turn | Prodental", 
                    user: user,
                    accountDat: language._account
                });
            }else{
                return res.redirect('/login')
            }
        }else{
            return res.redirect('/login')
        }
    },
    processTurnTreatment: async (req,res) =>{

        if (req.cookies.logged){
            let lang = null;
            if (req.cookies.lang == undefined){
                lang='eng';
            res.cookie("lang","eng");
            }else{
                lang=req.cookies.lang;
            }
            let language = loadLang(lang);  

            if (req.cookies.userLog){

                let user = await db.User.findOne({
                    where:{
                        id: req.cookies.userLog
                    }
                })
            
                let turnsByDaysArray = []; 
                let days = [];
        
                // TRAIGO DESDE LA DB
                let turns = await db.Turn.findAll({
                    where: {
                        user_id: null,
                        treatment_id: req.body.treatment
                    }
                });
                // OBTENEMOS SOLO LOS DIAS 
                for (let i = 0; i < turns.length; i++){

                    let date = moment(turns[i].date).format('DD MMMM YYYY');
                    
                    if (!days.includes(date)){
                        days.push(date);
                        turnsByDaysArray.push([]);
                    }
                }
                // FILTRAMOS Y ORDENAMOS SEGUN DIAS
                for (let k = 0; k < days.length; k++){

                    for (let l = 0; l < turns.length; l++){

                        let date = moment(turns[l].date).format('DD MMMM YYYY');
                        let time =  moment(turns[l].date).format('h:mm a');

                        if (date.includes(days[k])){
                            turns[l].setDataValue('date', date);  
                            turns[l].setDataValue('time', time);  
                            turnsByDaysArray[k].push(turns[l].dataValues)
                        }

                    }
                }
                return res.render('account/turn-date', { 
                    turns: turnsByDaysArray, 
                    treatment_id: req.body.treatment, 
                    title: "Turn | Prodental", 
                    user:user,
                    accountDat: language._account
                });
            }else{
                return res.redirect('/login')
            }
        }else{
            return res.redirect('/login')
        }
    },
    turnDate: async (req,res) =>{

        if (req.cookies.logged){
            let lang = null;
            if (req.cookies.lang == undefined){
            lang='eng';
            res.cookie("lang","eng");
            }else{
            lang=req.cookies.lang;
            }
            let language = loadLang(lang);

            if (req.cookies.userLog){
                let user = await db.User.findOne({
                    where:{
                        id: req.cookies.userLog
                    }
                })
                let treatments = await db.Treatment.findAll();

                
                return res.render('account/turn-date',
                { 
                    user: user, 
                    treatments: treatments ,
                    title: "Turn | Prodental" ,
                    accountDat: language._account
                });
            }else{
                return res.redirect('/login')
            }
        }else{
            return res.redirect('/login')
        }        
    },
    processTurnDate: async (req,res) =>{

        if (req.cookies.logged){
            await db.Turn.update({
                treatment_id: req.body.treatmentId,
                user_id: req.cookies.userLog,
            },{
                where: {
                    id: req.body.dateTurn
                }
            })

            return res.redirect('/account/');
        }else{
            return res.redirect('/login')
        }
    },
    turnDelete: async (req,res) =>{

        if (req.cookies.logged){        
            await db.Turn.update({
                user_id: null,
            },{
                where: {
                    id: req.body.turnId
                }
            })

            return res.redirect('/account')
        }else{
            return res.redirect('/login')
        }
    },
    
}