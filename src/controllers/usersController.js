const db = require('../database/models');

module.exports = {
    index: (req,res) =>{        
        res.render('room');
    },

    getUser: async (req,res) =>{
        let user_id = req.params.id
        let user = await db.User.findOne({where: {id: user_id}})
        res.json(user);
    }
}