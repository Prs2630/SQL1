const bcrypt = require('bcrypt');

function encrypt(req, res, next) {
    const password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        // Store hash in your password DB.
    });
    console.log("request arrived");
    next();
}
function middleware2(req, res, next) {
    //  req.body.password=req.body.password.toUpperCase();

    console.log("middleware2");
    next();
}
function middleware3(req, res, next) {

    console.log(req.body);
    // req.body.name = req.body.name.toUpperCase();

    //req.body.name=req.body.name.toUpperCase();
    console.log("Middleware 3 called");
    if(req.body.name!=" "){

        res.json({message:"Name is Not Valid"});

    }

    else{
        next();
    }






}

module.exports = {
    encrypt,
    middleware2,
    middleware3
}

