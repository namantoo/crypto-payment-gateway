const { request, response } = require('express');
const jwt = require('jsonwebtoken');

// reminder: make this async await 
module.exports = (req, res, next) => {
    // const token = req.headers.authorization
    try{
        const token = req.headers.authorization.split(" ")[1];
        const verify = jwt.verify(token, 'thisisaproductionbuildapiforourstartup')
        next()
    }
    catch(error){
        res.status(401).json({
            msg: "invalid token"
        })
    }
    // const verify =  jwt.verify(token, 'mynameuisnandnuewfiurnwifnrenurieriieru');
 
}