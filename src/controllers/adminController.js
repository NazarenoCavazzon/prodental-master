const db = require('../database/models');
const loadLang = require('./loadLangController');
const moment = require('moment');
const tratmentsJSON = require('../../public/json/eng/treatments.json')

module.exports = {

    index: (req,res) =>{

        // if (req.session.userLog != 0){
        //     res.redirect('/account');
        // }else{
            res.redirect('/admin/users');
        // }
    },
    users: async (req,res) =>{

        // if (req.session.userLog != 0){
        //     res.redirect('/account');
        // }else{

            let users = await db.User.findAll({include:['turns']});

            console.log(users);

            return res.render('admin/users', {
                title: 'Admin users | Dentalpro',
                users: users
            });
        // }
    },
    staff: async (req,res) =>{

        // if (req.session.userLog != 0){
        //     res.redirect('/account');
        // }else{
            let staffs = await db.Staff.findAll();
            
            return res.render('admin/staff', {
                title: 'Admin staff | Dentalpro',
                staffs: staffs
            });
        // }
    },
    turns: async (req,res) =>{

        // if (req.session.userLog != 0){
        //     res.redirect('/account');
        // }else{

            const turns = await db.Turn.findAll({include:['treatment', 'user']});
            const treatments = await db.Treatment.findAll();
            const users = await db.User.findAll();

            let lang = null;
            if (req.cookies.lang == undefined){
                lang='eng';
                
                res.cookie("lang","eng");
            }else{
                lang=req.cookies.lang;
            }
            
            moment.locale(lang);
            
            turns.forEach(turn => {
                turn.setDataValue('dateParsed',moment(turn.date).format('dddd DD MMMM YYYY'))
            });


            return res.render('admin/turns', {
                title: 'Admin turns | Dentalpro',
                turns: turns,
                treatments: treatments,
                users: users
            });
        // }
    },
    account: (req,res) =>{

        // if (req.session.userLog != 0){
        //     res.redirect('/account');
        // }else{
            return res.render('admin/account', {
                title: 'Admin account | Dentalpro'
            });
        // }
    },
    treatments: async (req,res) =>{

        // if (req.session.userLog != 0){
        //     res.redirect('/account');
        // }else{

            const treatments = await db.Treatment.findAll();

            return res.render('admin/treatments', {
                title: 'Admin treatments | Dentalpro',
                treatments: treatments
            });
        // }
    },
    turnCreate: async (req,res) =>{
        if (req.body.user!='null'){
            await db.Turn.create({
                treatment_id: req.body.treatment,
                user_id: req.body.user,
                date: req.body.datetime
            })
        }else{
            await db.Turn.create({
                treatment_id: req.body.treatment,
                date: req.body.datetime
            })
        }
        return res.redirect('/admin/turns');
    },
    turnDelete: async (req,res) =>{
        await db.Turn.destroy({
            where: {
                id: req.body.deleteTurnId
            }
        })
        return res.redirect('/admin/turns');
    },

    turnEdit: async (req,res) =>{
        await db.Turn.update({
            treatment_id: req.body.treatment,
            user_id:  req.body.user,
            date:  req.body.datetime,
        },{
            where: {
                id: req.body.idTurn
            }
        })
        return res.redirect('/admin/turns')
    }
}