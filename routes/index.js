const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Course = require('../models/course');


//GET homepage

router.get('/', (req,res,next) => {
    res.render('home')
});

//User
    //GET user
    router.get('/user', (req, res, next) =>{
        res.render('user');
    })
    //GET user/add
    router.get('/user/add', (req,res,next) => {
        res.render('user-add');
    })
    //POST user/add
    router.post('/user/add', (req, res, next) => {
        const {name, bio, role, email, password} = req.body;
        const newUser = new User({name, bio, role, email, password});

        newUser.save()
        .then(user => {
            res.redirect('/users')
        })
        .catch(err => {throw new Error(err)});
    })


//GET course
router.get('/course', (req,res,next) => {
    res.render('course');
});

//GET login and logout
router.get('/login', (req,res,next) => {
    res.render('login');
});

router.get('/logout', (req,res,next) => {
    res.render('logout');
})

//GET login facebook
router.get('/auth/facebook', (req, res, next) => {

})

router.get('/auth/facebook', (req,res,next) => {

})