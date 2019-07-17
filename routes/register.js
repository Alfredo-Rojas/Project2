// const express = require('express');
// const router  = express.Router();
// const bcrypt  = require('bcryptjs');
// const User    = require('../models/User');

// const passport = require('passport');

// const ensureLogin = require("connect-ensure-login");

// /* GET register page */
// router.get('/', (req, res, next)=>{
//     res.render('register');
// });

// /* POST login page */
// router.post('/', (req, res, next)=>{
//     console.log(req.body);
//     const thePassword = req.body.thePassword;
//     const theUsername = req.body.theUsername;
//     const email       = req.body.theEmail;
//     const salt = bcrypt.genSaltSync(12);
    
//     console.log(salt);
//     const hashedPassWord =  bcrypt.hashSync(thePassword, salt);
//     console.log(hashedPassWord);

//     User.create({
//         username: theUsername,
//         password: hashedPassWord,
//         email: email
//     })
//     .then(()=>{
//         console.log('yay');
//         res.redirect('/')
//     })
//     .catch((err)=>{
//         next(err);
//     })
// })




// module.exports = router;