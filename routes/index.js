const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Course = require('../models/course');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;


//GET homepage

router.get('/', (req, res, next) => {
    res.render('home')
});

//User
//GET user
router.get('/user', (req, res, next) => {
    res.render('user');
})
//GET users
router.get('/users', (req, res, next) => {
    console.log(req.user)
    User.find({})
        .then(users => {

            res.render('users', {
                users
            });
        })
})
//GET user/add
router.get('/user/add', (req, res, next) => {
    res.render('add-user');
})
//POST user/add
router.post('/user/add', (req, res, next) => {
    const {
        name,
        role,
        email,
        password
    } = req.body;

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
        name,
        role,
        email,
        password: hashPass
    });

    newUser.save()
        .then(user => {
            res.redirect('/users')
        })
        .catch(err => {
            throw new Error(err)
        });
})
//GET user/edit
router.get('/user/edit', (req, res, next) => {
    User.findOne({
            '_id': req.query.user_id
        })
        .then(user => {
            res.render('edit-user', {
                user
            })
        })
        .catch(error => {
            console.log(error);
        })
})
//POST user/edit
router.post('/user/edit', (req, res, next) => {
    const {
        name,
        role,
        email,
        password
    } = req.body;

    User.update({
            '_id': req.query.user_id
        }, {
            $set: {
                name,
                role,
                email,
                password
            }
        }, {
            new: true
        })
        .then(user => {
            res.redirect('/users');
        })
        .catch(error => {
            console.log(error)
        })
})
//DELETE user/delete
router.post('/user/delete', (req, res, next) => {
    User.deleteOne({
            '_id': req.query.user_id
        })
        .then(user => {
            res.redirect('/users')
        })
        .catch(error => {
            console.log(error)
        })
})


//GET course
router.get('/courses', (req, res, next) => {
    Course.find({})
        .then(course => {

            res.render('courses', {
                course
            });
        })
});

//GET course/details

router.get('/course/details', (req, res, next) => {
    Course.findOne({
            '_id': req.query.course_id
        })
        .then(course => {
            res.render('course-details', {
                course
            })
        })
        .catch(error => {
            console.log(error)
        })
})

//GET course/add
router.get('/course/add', (req, res, next) => {
    res.render('add-course');
})
//POST course/add
router.post('/course/add', (req, res, next) => {
    const {
        title,
        description,
        level,
        hours,
        price,
        image
    } = req.body;
    const newCourse = new Course({
        title,
        description,
        level,
        hours,
        price,
        image
    });

    newCourse.save()
        .then(course => {
            res.redirect('/courses')
        })
        .catch(err => {
            throw new Error(err)
        });
})

//GET course/edit
router.get('/course/edit', (req, res, next) => {
    Course.findOne({
            '_id': req.query.course_id
        })
        .then(course => {
            res.render('edit-course', {
                course
            })
        })
        .catch(error => {
            console.log(error)
        })
})

//POST course/
router.post('/course/edit', (req, res, next) => {
    const {
        title,
        description,
        level,
        hours,
        price,
        image
    } = req.body;

    Course.update({
            '_id': req.query.course_id
        }, {
            $set: {
                title,
                description,
                level,
                hours,
                price,
                image
            }
        }, {
            new: true
        })
        .then(course => {
            res.redirect('/courses');
        })
        .catch(error => {
            console.log(error)
        })
})

module.exports = router;