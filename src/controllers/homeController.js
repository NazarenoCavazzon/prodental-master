let db = require("../database/models");
const loadLang = require("./loadLangController");
const fs = require("fs");
const treatmentsJSON = require("../../public/json/eng/treatments.json");
const aboutusJSON = require("../../public/json/eng/aboutus.json");

module.exports = {
  index: async (req, res) => {
    let lang = null;
    if (req.cookies.lang == undefined) {
      lang = "esp";
      res.cookie("lang", "esp");
    } else {
      lang = req.cookies.lang;
    }
    let language = loadLang(lang);

    let user;

    if (req.session.userLog) {
      user = await db.User.findOne({
        where: {
          id: req.session.userLog,
        },
      });
    }

    let testimonials = await db.Testimonial.findAll();
    let treatments = await db.Treatment.findAll({
      where: { lang: lang },
      includes: ["images"],
    });
    let staffs = await db.Staff.findAll();

    res.render("home", {
      title: "HOME | Prodental",
      user: user,
      testimonials: testimonials,
      principalDat: language._principal,
      aboutusDat: language._aboutus,
      treatmentsDat: language._treatments,
      staffDat: language._staff,
      staffs: staffs,
      testimonialsDat: language._testimonials,
      faqDat: language._faq,
      contactDat: language._contact,
      footerDat: language._footer,
      treatments: treatments,
      langFlag: lang,
      navbarDat: language._navbar,
    });
  },

  aboutus: (req, res) => {
    let lang = null;
    if (req.cookies.lang == undefined) {
      lang = "eng";
      res.cookie("lang", "eng");
    } else {
      lang = req.cookies.lang;
    }
    let language = loadLang(lang);

    res.render("aboutus", {
      title: "About Us | Dentalpro",
      langFlag: lang,
      footerDat: language._footer,
      contactDat: language._contact,
      navbarDat: language._navbar,
      aboutusDat: language.aboutus,
    });
  },

  faq: (req, res) => {
    let lang = null;
    if (req.cookies.lang == undefined) {
      lang = "eng";
      res.cookie("lang", "eng");
    } else {
      lang = req.cookies.lang;
    }

    let language = loadLang(lang);

    res.render("faq", {
      title: "FAQs | Dentalpro",
      langFlag: lang,
      footerDat: language._footer,
      contactDat: language._contact,
      navbarDat: language._navbar,
    });
  },

  treatments: async (req, res) => {
    let lang = null;
    if (req.cookies.lang == undefined) {
      lang = "eng";
      res.cookie("lang", "eng");
    } else {
      lang = req.cookies.lang;
    }

    let language = loadLang(lang);

    let treatment = await db.Treatment.findOne({
      where: { title: req.params.title },
    });
    let bullets = await db.Bullets.findAll({
      where: { treatment_id: treatment.id },
    });
    let treatments = await db.Treatment.findAll();

    res.render("treatments", {
      title: "Treatment | Dentalpro",
      langFlag: lang,
      footerDat: language._footer,
      treatment: treatment,
      treatmentInfo: treatmentsJSON[req.params.id - 1],
      bulletsTreatment: bullets,
      navbarDat: language._navbar,
      accountDat: language._account,
      treatments: treatments,
    });
  },

  langChange: function (req, res) {
    let dire = req.body.hiddenInput;

    try {
      if (req.cookies.lang == "eng") {
        res.cookie("lang", "esp");
      } else {
        res.cookie("lang", "eng");
      }
    } catch (error) {
      console.log(error);
    }
    res.redirect(dire);
  },
  experienceDentalPro: async (req, res) => {
    res.render("./home/dentalpro");
  },
};
