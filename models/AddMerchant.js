const mongoose = require("mongoose")
const  adminSchema = new mongoose.Schema({
   name: String,
   app_name: String,
   app_link: String,
   email: String,
   password: String,
},{ collection: 'Merchant',
versionKey: false //here
})

module.exports =  mongoose.model('Merchant', adminSchema) ;


