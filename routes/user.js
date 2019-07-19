const express = require('express');
const router  = express.Router();

const bcrypt  = require('bcryptjs');
const User    = require('../models/User');

const passport = require('passport');
const ensureLogin = require("connect-ensure-login");

//Get login page
/////////////////////
router.get('/login', (req, res, next) => {
  res.render('user/login');
});

///////////////////////
//Post login page
router.post("/login", passport.authenticate("local", {
  successRedirect: "/events/all-events",
  failureRedirect: "/user/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.post('/logout', (req, res, next)=>{
  req.logout();
  res.redirect('/user/login');
});

///////////////////////
//Get user profile
router.get('/profile', (req, res, next) => {
  res.render('user/profile');
});

////////////////////////
//Get register page
router.get('/register', (req, res, next) => {
  res.render('user/register');
});

//////////////////////
//Post register page
router.post('/register', (req, res, next)=>{
    console.log(req.body);
    const thePassword = req.body.password;
    const theUsername = req.body.username;
    const email       = req.body.email;
    const salt = bcrypt.genSaltSync(12);
    console.log(salt);
    const hashedPassWord =  bcrypt.hashSync(thePassword, salt);
    console.log(hashedPassWord);

    User.create({
        username: theUsername,
        password: hashedPassWord,
        email: email
    })
    .then(()=>{
        console.log('yay');
        res.render('events/new-event')
    })
    .catch((err)=>{
        next(err);
    });
});

// router.get('/register', (req, res) => {
//   res.render('user/register');
// });

// router.post('/register', async (req, res) => {
//   let errors = [];
//   const { name, email, password, confirm_password } = req.body;
//   if(password != confirm_password) {
//     errors.push({text: 'Passwords do not match.'});
//   }
//   if(password.length < 4) {
//     errors.push({text: 'Passwords must be at least 4 characters.'})
//   }
//   if(errors.length > 0){
//     res.render('user/register', {errors, name, email, password, confirm_password});
//   } else {
//     // Look for email coincidence
//     const emailUser = await User.findOne({email: email});
//     if(emailUser) {
//       req.flash('error_msg', 'The Email is already in use.');
//       res.redirect('/user/register');
//     } else {
//       // Saving a New User
//       const newUser = new User({name, email, password});
//       newUser.password = await newUser.encryptPassword(password);
//       await newUser.save();
//       req.flash('success_msg', 'You are registered.');
//       res.redirect('/events');
//     }
//   }
// });

// router.get('/login', (req, res, next) => {
//   res.render('user/login');
// });

// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/events',
//   failureRedirect: '/user/login',
//   failureFlash: true,
//   passReqToCallback: true
// }));

// router.get('/logout', (req, res, next) => {
//   req.logout();
//   req.flash('success_msg', 'You are logged out now.');
//   res.redirect('/user/login');
// });

module.exports = router;
