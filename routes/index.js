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
        const {name, bio, role, email, password} = req.body;
        const newUser = new User({name, bio, role, email, password});

        newUser.save()
        .then(user => {
            res.redirect('/users')
        })
        .catch(err => {throw new Error(err)});
    })


//GET course
router.get('/courses', (req,res,next) => {
    Course.find({})
    .then(course => {
        
        res.render('courses', {course});
    })
});

//GET course/details

router.get('/course/details', (req,res,next) =>{
    Course.findOne({'_id':req.query.course_id})
    .then(course => {
        res.render('course-details', {course})
    })
    .catch(error => {
        console.log(error)
    })
})

//GET course/add
router.get('/course/add', (req,res,next) => {
    res.render('add-course');
})
//POST course/add
router.post('/course/add', (req, res, next) => {
    const {title, description, level, hours, price, image} = req.body;
    const newCourse = new Course({title, description, level, hours, price, image});

    newCourse.save()
    .then(course => {
        res.redirect('/courses')
    })
    .catch(err => {throw new Error(err)});
})

//GET course/edit
router.get('/course/edit', (req,res,next) =>{
    Course.findOne({'_id':req.query.course_id})
    .then(course => {
        res.render('edit-course', {course})
    })
    .catch(error => {
        console.log(error)
    })
})

//POST course/
router.post('/course/edit', (req,res,next) => {
    const {title,description, level, hours, price,image} = req.body;

    Course.update({'_id': req.query.course_id}, {$set: {title, description, level, hours,price,image}}, {new:true})
    .then(course => {
        res.redirect('/courses');
    })
    .catch(error => {
        console.log(error)
    })
})


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