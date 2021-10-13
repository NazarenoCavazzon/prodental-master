const fs = require('fs');
const path = require('path');


const loadLang = (lang) =>{

    return {
        _principal: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/home/principal.json'))),
        _aboutus: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/home/aboutus.json'))),    
        _treatments: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/home/treatments.json'))),    
        _staff: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/home/staff.json'))),    
        _testimonials: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/home/testimonials.json'))),    
        _faq: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/home/faq.json'))),   
        _contact: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/home/contact.json'))),     
        _footer: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/home/footer.json'))),     

        _auth: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/auth.json'))),     
        _account: JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/json/'+lang+'/account.json'))),     
    }
}

module.exports = loadLang;