const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
const User = require('./user')

// const fs = require('fs')
// const data = '1231 api route'
// const path = '../src/assets/data/login.json'

// router.post('/store', (req, res) => {
//     fs.appendFile(path, data, (err) => {
//         if(err) {
//             console.error('Error while storing')
//             res.send('Error while storing')
//             return
//         }
//     })
//     console.log('Success')
// });


router.get('/users', (req, res, next) => {
    User.find()
        .exec()
        .then(users => {
            res.status(200).json({
                users: users
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

router.post('/register', (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length > 0) {
                return res.status(409).json({
                    message: "Username already exists"
                })
            }
            else {
                // bcrypt.hash(req.body.password, 10, (err, hash) => {
                //     if(err) {
                //         return res.status(500).json({
                //             error: err
                //         });
                //     } else {

                console.log('Register')
                const user = new User({
                    _id: mongoose.Types.ObjectId(),
                    username: req.body.username,
                    password: req.body.password
                    // password: hash
                });
                user.save()
                    .then(result => {
                        console.log(result);
                        // const token = jwt.sign(
                        //     {
                        //         id: user._id,
                        //         username: user.username
                        //     },
                        //     'secret',
                        //     {
                        //         expiresIn: "1h"
                        //     }
                        // );
                        return res.status(201).json({
                            message: 'User Created',
                            // token: token
                        });
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({
                            error: err
                        });
                    })
                // }
                // })
            }
        })
});

router.post('/login', (req, res, next) => {
    User.findOne({username: req.body.username})
        .exec()
        .then(user => {
            if(!user) {
                return res.status(401).json({
                    // message: "Auth Failed"
                    message: "Incorrect username"
                })
            }
            if(req.body.password == user.password) {
                const token = jwt.sign(
                    {
                        id: user._id,
                        username: user.username
                    },
                    'secret',
                    {
                        expiresIn: "1h"
                    }
                );
                return res.status(200).json({
                    message: "Auth Successful",
                    token: token,
                })
            }
            res.status(401).json({
                // message: "Auth Failed"
                message: "Incorrect Password"
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

router.get('/verify', (req, res, next) => { 
    let token = req.headers.authorization
    if(!token) {
        return res.status(401).json({
            message: 'Verified Unauthorised'
        })
    }
    token = token.split(" ")[1];
    if(token === 'null') {
        return res.status(401).json({
            message: 'Verified Unauthorised'
        })
    }
    try {
        let decoded = jwt.verify(token, 'secret')
        console.log(decoded)
        req.userData = decoded
        return res.status(200).json({
            message: 'Verified Authorised'
        })
    } catch(err) {
        return res.status(401).json({
            message: 'Verified Auth Failed'
        })
    }
})

router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    User.remove({_id: id})
        .exec()
        .then(result => {
            if(result.length > 0) {
                res.status(200).json({
                    message: "User deleted"
                })
            } else {
                res.status(422).json({
                    message: "not found"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router