const mongoose = require("mongoose")
const  docSchema = new mongoose.Schema({
   name: String,
   app_name: String,
   app_link: String,
   email: String,
   password: String,
},{ collection: 'x',
versionKey: false //here
})

module.exports =  mongoose.model('x', docSchema) ;


