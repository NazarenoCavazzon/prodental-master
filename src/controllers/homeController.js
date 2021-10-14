let db = require('../database/models');
const loadLang = require('./loadLangController');
const fs = require('fs');
const treatmentsJSON = require('../../public/json/eng/treatments.json');
const aboutusJSON = require('../../public/json/eng/aboutus.json');

module.exports = {
    index: async (req,res) => {

      let lang = null;
      if (req.cookies.lang == undefined){
        lang='eng';
        res.cookie("lang","eng");
      }else{
        lang=req.cookies.lang;
      }
      let language = loadLang(lang);

      let user;
      
      if (req.session.userLog){
          user = await db.User.findOne({
              where:{
                  id: req.session.userLog
              }
          })
      }
      
      let testimonials = await db.Testimonial.findAll();
      let treatments = await db.Treatment.findAll({includes:["images"]});
      let staffs = await db.Staff.findAll();

      res.render('home',  
        { 
          title: 'HOME | Prodental', 
          user: user, 
          testimonials: testimonials,
          principalDat: language._principal,
          aboutusDat: aboutusJSON,
          treatmentsDat: language._treatments,
          staffDat: language._staff,
          staffs: staffs,
          testimonialsDat: language._testimonials,
          faqDat: language._faq,
          contactDat: language._contact,
          footerDat: language._footer,
          treatments: treatments, 
          langFlag: lang
        }
      )
    },

    aboutus: (req,res)=>{
      let lang = null;
      if (req.cookies.lang == undefined){
        lang='eng';
        res.cookie("lang","eng");
      }else{
        lang=req.cookies.lang;
      }

      let language = loadLang(lang);

      res.render('aboutus', {
        title: 'About Us | Dentalpro', 
        langFlag: lang,
        footerDat: language._footer,
        contactDat: language._contact,
        aboutusDat: aboutusJSON
      });
    },

    faq: (req,res)=>{
      let lang = null;
      if (req.cookies.lang == undefined){
        lang='eng';
        res.cookie("lang","eng");
      }else{
        lang=req.cookies.lang;
      }

      let language = loadLang(lang);

      res.render('faq', {
        title: 'FAQs | Dentalpro', 
        langFlag: lang,
        footerDat: language._footer,
        contactDat: language._contact,
      });
    },

    treatments: async (req,res)=>{
      let lang = null;
      if (req.cookies.lang == undefined){
        lang='eng';
        res.cookie("lang","eng");
      }else{
        lang=req.cookies.lang;
      }

      let language = loadLang(lang);
      let bulletTreatment;
      
      let treatment = await db.Treatment.findByPk(req.params.id);
      if (treatment.bullets_json){
        bulletTreatment = require('../../public/json/eng/treatments/'+treatment.bullets_json+'.json');
      }else{
        bulletTreatment = undefined;
      }
      
      res.render('treatments', {
        title: 'Treatment | Dentalpro', 
        langFlag: lang,
        footerDat: language._footer,
        treatment: treatment,
        treatmentInfo: treatmentsJSON[req.params.id-1],
        bulletsTreatment: bulletTreatment
      });
    },

    langChange: function(req,res){
  
      let dire = req.body.hiddenInput;
      
      try {
        if (req.cookies.lang == "eng" ){
          res.cookie("lang","esp");
        }else{
          res.cookie("lang","eng");
        }
        
      } catch (error) {
        console.log(error);
      }
      res.redirect(dire);
    },
    experienceDentalPro: async (req,res) =>{

      res.render('./home/dentalpro');
    }
}