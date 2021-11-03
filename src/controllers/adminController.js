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
            const treatments = await db.Treatment.findAll();

            if (!user.dataValues.is_admin){
                res.redirect('/account');
            }else{

                let users = await db.User.findAll({include:['turns']});
                for(let u in users){
                    console.log('u', users[u].turns.map((e)=>{
                        return e.dataValues.date
                    }))
                }

                return res.render('admin/users', {
                    title: 'Admin users | Dentalpro',
                    users: users,
                    treatments: treatments
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
                let dniList = [];
                const turns = await db.Turn.findAll({include:['treatment', 'user'], order: [['date', 'ASC']]});
                console.log(turns)
                const treatments = await db.Treatment.findAll({where: {lang: 'esp'}});
                const users = await db.User.findAll({where: {is_admin: false}});
                for(let user in users){
                    dniList.push(users[user].dataValues.dni);
                }
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
                    users: users,
                    dniList: dniList,
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
                const treatments = await db.Treatment.findAll({ 
                    order: [['treatment', 'ASC']]
                });

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
            await db.Treatment.findOne({where: {treatment: req.body.treatment, lang: req.body.lang}}).then(async (treatment) => {
                if (treatment != null){
                    return res.redirect('/admin/treatments');
                }else{
                    await db.Treatment.create({
                        title: req.body.title,
                        short_description: req.body.short_description,
                        subtitle: req.body.subtitle,
                        lang: req.body.lang,
                        image_principal: req.body.image_principal,
                        info_title: req.body.info_title,
                        info: req.body.info,
                        treatment: req.body.treatment,
                        title: req.body.title,
                        video: req.body.video_url,
                        description_title: req.body.description_title,
                        description: req.body.description,
                        footer_title: req.body.footer_title,
                        footer: req.body.footer,
                    })
                    return res.redirect('/admin/treatments');
                }
            });
        } else {
            res.redirect('/login');
        }
    },
    treatmentsEdit: async (req,res) =>{
        if (req.cookies.logged){
            console.log(req.body);
            await db.Treatment.update({
                title: req.body.titleEdit,
                subtitle: req.body.subtitleEdit,
                image_principal: req.body.image_principalEdit,
                short_description: req.body.short_descriptionEdit,
                info: req.body.infoEdit,
                info_title: req.body.info_titleEdit,
                video: req.body.video_urlEdit,
                description_title: req.body.description_titleEdit,
                description: req.body.descriptionEdit,
                footer: req.body.footerEdit,
                footer_title: req.body.footer_titleEdit,
                title: req.body.titleEdit,
                lang: req.body.langEdit,
                treatment: req.body.treatmentEdit,
            },{
                where: {
                    id: req.body.hiddenTreatmentId
                }
            })
            return res.redirect('/admin/treatments');
        } else {
            res.redirect('/login');
        }
    },
    treatmentsDelete: async (req,res) =>{
        console.log('id', req.body.deleteTurnId)
        if (req.cookies.logged){
            await db.Treatment.destroy({
                where: {
                    id: req.body.deleteTurnId
                }
            })
            return res.redirect('/admin/treatments');
        } else {
            res.redirect('/login');
        }
    },
    userDelete: async (req,res) =>{
        console.log('id', req.body.deleteUser)
        if (req.cookies.logged){
            await db.User.destroy({
                where: {
                    id: req.body.deleteUser
                }
            })
            return res.redirect('/admin/users');
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
    userEdit: async (req,res) =>{

        if (req.cookies.logged){
            await db.User.update({
                name: req.body.name,
                email:  req.body.email,
                password:  req.body.password,
                is_admin:  req.body.is_admin,
                dni:  req.body.dni,
                plan:  req.body.plan,
                security_code:  req.body.security_code,
            },{
                where: {
                    id: req.body.hiddenUserId
                }
            })
            return res.redirect('/admin/users')
        } else {
            res.redirect('/login');
        }
    },

    staffCreate: async (req,res) =>{
        console.log(req.body)
        if (req.cookies.logged){
            await db.Staff.create({
                name: req.body.name,
                matricula: req.body.matricula,
                en_description: req.body.en_description,
                es_description: req.body.es_description,
                image: req.body.image,
            })
            return res.redirect('/admin/staff');
        } else {
            res.redirect('/login');
        }
    },
    staffDelete: async (req,res) =>{

        if (req.cookies.logged){
            await db.Staff.destroy({
                where: {
                    id: req.body.deleteStaffId
                }
            })
            return res.redirect('/admin/staff');
        } else {
            res.redirect('/login');
        }
    },

    staffEdit: async (req,res) =>{
        console.log(req.body)
        if (req.cookies.logged){
            await db.Staff.update({
                name: req.body.nameEdit,
                matricula: req.body.matriculaEdit,
                image: req.body.imageEdit,
                es_description: req.body.es_descriptionEdit,
                en_description: req.body.en_descriptionEdit
            },{
                where: {
                    id: req.body.hiddenStuffId
                }
            })
            return res.redirect('/admin/staff')
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
    messages: async (req, res) => {
        if (req.cookies.logged){
            const messages = await db.Message.findAll();
            return res.render('admin/messages', {
                messages,
                title: 'Admin messages | Dentalpro',
            })
        } else {
            return res.redirect('/login');
        }
    },
    messagesDelete: async (req,res) =>{
        console.log('id', req.body.deleteTurnId)
        if (req.cookies.logged){
            await db.Message.destroy({
                where: {
                    id: req.body.deleteTurnId
                }
            })
            return res.redirect('/admin/messages');
        } else {
            res.redirect('/login');
        }
    },
}