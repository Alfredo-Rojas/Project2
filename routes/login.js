// const express = require('express');
// const router  = express.Router();
// const bcrypt  = require('bcryptjs');
// const User    = require('../models/User');

// const passport = require('passport');


// const ensureLogin = require("connect-ensure-login");


// router.get('/', (req, res, next)=>{
//   res.render('login')
// })

// router.post("/", passport.authenticate("local", {
//   successRedirect: "/",
//   failureRedirect: "/",
//   failureFlash: true,
//   passReqToCallback: true
// }));



// router.post('/logout', (req, res, next)=>{
//   req.logout();
//   res.redirect("/login");
// })




// module.exports = router;