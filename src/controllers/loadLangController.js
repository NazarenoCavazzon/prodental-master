const fs = require('fs');
const path = require('path');


const loadLang = (lang) =>{

    return {
        _principal: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/home/principal.json'))),
        _aboutus: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/home/aboutus.json'))),    
        aboutus: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/aboutus.json'))),    
        _buttonText: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/buttonText.json'))),    
        _treatments: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/home/treatments.json'))),    
        _staff: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/home/staff.json'))),    
        _testimonials: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/home/testimonials.json'))),    
        _faq: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/home/faq.json'))),   
        _contact: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/home/contact.json'))),     
        _footer: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/home/footer.json'))),     
        _navbar: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/home/navbar.json'))),     
        _auth: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/auth.json'))),     
        _account: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/account.json'))),     
        _experiencia: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/experiencia.json'))),
        experiencia: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/home/experiencia.json'))),
        dentalPro: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/home/dentalPro.json')))
    }
}

module.exports = loadLang;