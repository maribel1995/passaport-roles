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
    //GET users
    router.get('/users', (req, res, next) =>{
        User.find({})
        .then(users => {
            
            res.render('users', {users});
        })
    })
    //GET user/add
    router.get('/user/add', (req,res,next) => {
        res.render('add-user');
    })
    //POST user/add
    router.post('/user/add', (req, res, next) => {
        const {name,role, email, password} = req.body;
        const newUser = new User({name, role, email, password});

        newUser.save()
        .then(user => {
            res.redirect('/users')
        })
        .catch(err => {throw new Error(err)});
    })
    //GET user/edit
    router.get('/user/edit', (req,res,next) => {
        User.findOne({'_id': req.query.user_id})
        .then(user => {
            res.render('edit-user', {user})
        })
        .catch(error => {
            console.log(error);
        })
    })
    //POST user/edit
    router.post('/user/edit', (req,res,next) => {
        const {name,role, email, password} = req.body;

        User.update({'_id': req.query.user_id}, {$set: {name, role, email, password}}, {new:true})
        .then(user => {
            res.redirect('/users');
        })
        .catch(error => {
            console.log(error)
        })
    })
    //DELETE user/delete
    router.post('/user/delete', (req, res, next) => {
        User.deleteOne({'_id': req.query.user_id})
        .then(user => {
            res.redirect('/users')
        })
        .catch(error => {
            console.log(error)
        })
    })


//Course
    //GET course
    router.get('/courses', (req,res,next) => {
        res.render('courses');
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

module.exports = router;