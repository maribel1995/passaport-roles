const express = require('express');
const router = express.Router()
const User = require('../models/user');
const Course = require('../models/course');

const passport = require('passport');


//GET login
router.get("/login", (req, res, next) => {
    res.render("login");
  });


//POST login
router.post('/login', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    passReqToCallback: true
}))


//GET logout
router.get('/logout', (req,res,next) => {
    res.render('logout');
})



//GET login facebook
router.get('/auth/facebook', (req, res, next) => {

})

router.get('/auth/facebook', (req,res,next) => {

})

module.exports = router;