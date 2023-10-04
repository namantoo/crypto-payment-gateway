const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://noodletester:a763j052He19Elbc@mongodb-noodle-testing-8787d6b1.mongo.ondigitalocean.com/paymentdatabase?tls=true&authSource=admin&replicaSet=mongodb-noodle-testing");
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});w
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;
