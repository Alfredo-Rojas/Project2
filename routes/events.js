const express = require('express');
const router  = express.Router();

const passport = require('passport');
const ensureLogin = require("connect-ensure-login");

//Models 
const Events = require('../models/Events');
// const User = require('../models/User');

/* GET Events page */
router.get('/', (req, res, next) => {
  res.render('events');
});

router.get('/add', ensureLogin.ensureLoggedIn('/user/login'), (req, res, next) => {
  res.render('events/new-event');
});

router.get('/all-events', (req, res, next) => {
  if(!req.user) res.redirect('/user/login')
  Events.find({owner: req.user._id})
  .then(allEvents => {
    console.log("-============ ", allEvents);
    res.render('events/all-events', {events: allEvents});
  }).catch(err => next(err));
});

router.get('/update-events', (req, res, next) => {
  res.render('events/update-events');
});

router.get('/delete-events', (req, res, next) => {
  res.render('events/delete-events');
});



// details for the event
router.get('/details/:eventId', (req, res, next) => {
  Events.findById(req.params.eventId).populate('checkin').populate('leftEvents')
  .then(theEvent => {
    data = {
      theEvent: theEvent,
      hasCheckin: false,
      hasCheckout: false
    }

    if(theEvent.checkin.length > 0) data.hasCheckin = true;
    if(theEvent.leftEvents.length > 0) data.hasCheckout = true;
    res.render('events/details', data);
  }).catch(err => next(err));
});


router.get('/edit/:eventId', (req, res, next) => {
  Events.findById(req.params.eventId)
  .then(theEvent => {
    res.render('events/updated-events', {theEvent})
  }).catch(err => next(err));
});


// update the event using this route
router.post('/edit/:eventId', (req, res, next) => {
  Events.findByIdAndUpdate(req.params.eventId, req.body, {new: true})
  .then(updatedEvent => {
    console.log("the event after the update ----------------- ", updatedEvent);
    res.redirect(`/events/details/${updatedEvent._id}`);
  })
});


// delete the event with this route
router.post('/delete/:eventId', (req, res, next) => {
  Events.findByIdAndRemove(req.params.eventId)
  .then(() => {
    console.log("event has been deleted <<<<<<<<  ");
    res.redirect('/events/all-events');
  }).catch(err => next(err));
});



// checkin route for the event
router.post('/checkin/:eventId', (req, res, next) => {
  if(!req.user) res.redirect('/user/login')
  Events.findById(req.params.eventId)
  .then(theEvent => {
    if(theEvent.leftEvents.includes(req.user._id)) { 
      theEvent.leftEvents.pull(req.user._id)
    }
    theEvent.checkin.push(req.user._id);
    theEvent.save()
    .then(updatedEvent => {
      console.log("updated event after user checks in ------------ ", updatedEvent);
      res.redirect('back');
    }).catch(err => next(err));
  }).catch(err => next(err));
});



// route to mark the user left the event
router.post('/checkout/:eventId', (req, res, next) => {
  if(!req.user) res.redirect('/user/login')
  Events.findById(req.params.eventId)
  .then(theEvent => {
    theEvent.checkin.pull(req.user._id)
    theEvent.leftEvents.push(req.user._id)
    theEvent.save()
    .then(updatedEvent => {
      console.log('event after updating that the user has left the event ================= ', updatedEvent)
      res.redirect('back');
    }).catch(err => next(err));
  }).catch(err => next(err));
});




router.post('/new-event', async (req, res, next) => {
  if(!req.user) res.redirect('/user/login')
  console.log("saving the info for a new event  ", req.body)
  const { title, image, description } = req.body;
  const errors = [];
  if(!title) {
    errors.push({ text: 'Please write a Title' });
  }
  // if(!image) {
  //   errors.push({ text: 'Please add an image' });
  // }
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
    console.log("=========================================== ", newEvents);
    newEvents.owner = req.user._id;
    console.log(">>>>>>>>>>>>>>>>>>>>>> ", newEvents)
    await newEvents.save();
    req.flash('success_msg', 'Event Added Successfuly');
    res.redirect('/events/all-events');
  }
});




module.exports = router;
