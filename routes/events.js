const express = require('express');
const router  = express.Router();

const passport = require('passport');
const ensureLogin = require("connect-ensure-login");

//Models 
const Events = require('../models/Events');
const user = require('../models/User');

/* GET Events page */
router.get('/', (req, res, next) => {
  res.render('events');
});

router.get('/add', ensureLogin.ensureLoggedIn('/user/login'), (req, res, next) => {
  res.render('events/new-event');
});

router.get('/all-events', (req, res, next) => {
  res.render('events/all-events');
});

router.get('/update-events', (req, res, next) => {
  res.render('events/update-events');
});

router.get('/delete-events', (req, res, next) => {
  res.render('events/delete-events');
});


router.post('/new-event', async (req, res, next) => {
  const { title, image, description } = req.body;
  const errors = [];
  if(!title) {
    errors.push({ text: 'Please write a Title' });
  }
  if(!image) {
    errors.push({ text: 'Please add an image' });
  }
  if(!description) {
    errors.push({ text: 'Please write a description' });
  }
  if(errors.length > 0) {
    res.render('events/new-event', {
      errors,
      title,
      image,
      description
    });
  } else {
    const newEvents = new Events({title, image, description});
    console.log("=================")
    console.log(newEvents)
    newEvents.user = req.user.id;
    await newEvents.save();
    req.flash('success_msg', 'Event Added Successfuly');
    res.redirect('/events');
  }
});




module.exports = router;
