const db = require('../database/models');
const loadLang = require('./loadLangController');
const moment = require('moment');
const tratmentsJSON = require('../../public/json/eng/treatments.json')

module.exports = {

    index: async(req,res) =>{
        if (req.cookies.logged){
            const user = await db.User.findOne({where: {id: req.cookies.userLog}});
            if(user.dataValues.is_admin){
                res.redirect('/admin/users');
            }else{
                res.redirect('/account');
            }
        } else {
            res.redirect('/login');
        }
    },
    users: async (req,res) =>{
        if (req.cookies.logged){
            const user = await db.User.findOne({where: {id: req.cookies.userLog}});

            if (!user.dataValues.is_admin){
                res.redirect('/account');
            }else{

                let users = await db.User.findAll({include:['turns']});

                return res.render('admin/users', {
                    title: 'Admin users | Dentalpro',
                    users: users
                });
            }
        } else {
            res.redirect('/login');
        }
    },
    staff: async (req,res) =>{
        if (req.cookies.logged){
            const user = await db.User.findOne({where: {id: req.cookies.userLog}});

            if (!user.dataValues.is_admin){
                res.redirect('/account');
            }else{
                let staffs = await db.Staff.findAll();
                
                return res.render('admin/staff', {
                    title: 'Admin staff | Dentalpro',
                    staffs: staffs
                });
            }
        } else {
            res.redirect('/login');
        }
    },
    turns: async (req,res) =>{

        if (req.cookies.logged){
            const user = await db.User.findOne({where: {id: req.cookies.userLog}});
            if (!user.dataValues.is_admin){
                res.redirect('/account');
            }else{

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
            }
        } else {
            res.redirect('/login');
        }
    },
    account: async (req,res) =>{

        if (req.cookies.logged){
            const user = await db.User.findOne({where: {id: req.cookies.userLog}});
            if (!user.dataValues.is_admin){
                res.redirect('/account');
            }else{
                return res.render('admin/account', {
                    title: 'Admin account | Dentalpro'
                });
            }
        } else {
            res.redirect('/login');
        }
    },
    treatments: async (req,res) =>{

        if (req.cookies.logged){
            const user = await db.User.findOne({where: {id: req.cookies.userLog}});
            if (!user.dataValues.is_admin){
                res.redirect('/account');
            }else{
                const treatments = await db.Treatment.findAll();

                return res.render('admin/treatments', {
                    title: 'Admin treatments | Dentalpro',
                    treatments: treatments
                });
            }
        } else {
            res.redirect('/login');
        }
    },
    treatmentsCreate: async (req,res) =>{

        if (req.cookies.logged){
            await db.Sponsor.create({
                name: req.body.name,
                image: req.body.image
            })
            return res.redirect('/admin/sponsors');
        } else {
            res.redirect('/login');
        }
    },
    treatmentsDelete: async (req,res) =>{
        console.log('id', req.body.deleteTurnId)
        if (req.cookies.logged){
            await db.Sponsor.destroy({
                where: {
                    id: req.body.deleteTurnId
                }
            })
            return res.redirect('/admin/sponsors');
        } else {
            res.redirect('/login');
        }
    },
    turnCreate: async (req,res) =>{

        if (req.cookies.logged){
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
        } else {
            res.redirect('/login');
        }
    },
    turnDelete: async (req,res) =>{

        if (req.cookies.logged){
            await db.Turn.destroy({
                where: {
                    id: req.body.deleteTurnId
                }
            })
            return res.redirect('/admin/turns');
        } else {
            res.redirect('/login');
        }
    },

    turnEdit: async (req,res) =>{

        if (req.cookies.logged){
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
        } else {
            res.redirect('/login');
        }
    },

    sponsors: async (req, res) => {
        if (req.cookies.logged){
            const sponsors = await db.Sponsor.findAll();
            return res.render('admin/sponsors', {
                sponsors,
                title: 'Admin sponsors | Dentalpro',
            })
        } else {
            return res.redirect('/login');
        }
    },
    sponsorCreate: async (req,res) =>{

        if (req.cookies.logged){
            await db.Sponsor.create({
                name: req.body.name,
                image: req.body.image
            })
            return res.redirect('/admin/sponsors');
        } else {
            res.redirect('/login');
        }
    },
    sponsorDelete: async (req,res) =>{
        console.log('id', req.body.deleteTurnId)
        if (req.cookies.logged){
            await db.Sponsor.destroy({
                where: {
                    id: req.body.deleteTurnId
                }
            })
            return res.redirect('/admin/sponsors');
        } else {
            res.redirect('/login');
        }
    },
    banners: async (req, res) => {
        if (req.cookies.logged){
            const banners = await db.Banner.findAll();
            return res.render('admin/banners', {
                banners,
                title: 'Admin banners | Dentalpro',
            })
        } else {
            return res.redirect('/login');
        }
    },
    bannersCreate: async (req,res) =>{

        if (req.cookies.logged){
            await db.Banner.create({
                name: req.body.name,
                image: req.body.image,
                description: req.body.description
            })
            return res.redirect('/admin/banners');
        } else {
            res.redirect('/login');
        }
    },
    bannersDelete: async (req,res) =>{
        console.log('id', req.body.deleteTurnId)
        if (req.cookies.logged){
            await db.Banner.destroy({
                where: {
                    id: req.body.deleteTurnId
                }
            })
            return res.redirect('/admin/banners');
        } else {
            res.redirect('/login');
        }
    },
}