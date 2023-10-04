const express = require('express')
const passport = require('passport')
require('./db/conn')
// const googleAuthRoute = require('./Routes/googleAuthRoute')
// const loginRoute =  require('./Routes/loginRoute')
// const profileRoute =  require('./Routes/profileRoute')
const adminRoute =  require('./Routes/adminRoute')
const merchantRoute =  require('./Routes/merchantRoute')
const addressRoute =  require('./Routes/addressBalanceRoute')

const docRoute =  require('./Routes/newDoc')




const bodyParser = require("body-parser");
var multer = require('multer');
var upload = multer();
const mongoose = require("mongoose");
var findOrCreate = require('mongoose-findorcreate')
const session = require('express-session')
const app = express()
const cors = require('cors')
const passportSetup = require('./passport')
const Notice = require('./models/Googleauth')
// Notice.plugin(findOrCreate)
const callback_url = "http://localhost:3000/";
app.use(express.json());
// app.use(formidable());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(upload.array())
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));



app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE"
  })
)
// app.use('/auth', googleAuthRoute )
// app.use('/profile', profileRoute )
app.use('/auth', adminRoute )
app.use('/merchant', merchantRoute )
app.use('/createtransaction', docRoute)
app.use('/address', addressRoute)


app.listen(5050, () => {
  console.log("server running on port 5050")
})