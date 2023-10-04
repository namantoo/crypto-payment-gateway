const mongoose = require("mongoose")
const  adminSchema = new mongoose.Schema({
   name: String,
   email: String,
   password: String,
},{ collection: 'Admin',
versionKey: false //here
})

module.exports =  mongoose.model('Admin', adminSchema) ;


