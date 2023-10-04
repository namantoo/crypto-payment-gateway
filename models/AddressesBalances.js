const mongoose = require("mongoose")
const  addressSchema = new mongoose.Schema({
   address: String,
   status: String,
   balance: String,
},{ collection: 'addresses',
versionKey: false //here
})

module.exports =  mongoose.model('addresses', addressSchema) ;


