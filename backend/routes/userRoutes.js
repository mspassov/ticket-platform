const express = require('express');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const protectRoute = require('../middleware/authMiddleware');
const Users = require('../models/userModel');
const router = express.Router();

const getToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'});
}

//Register a new user
router.post('/register', asyncHandler(async (req, res) =>{
    const {name, email, password} = req.body;

    //Simple validation
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please enter all fields");
    }

    //Find if the user already exists
    const userExists = await Users.findOne({email: email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    //Hash password and create user in database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await Users.create({
        full_name: name,
        email,
        password: hashedPassword
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.full_name,
            email: user.email,
            token: getToken(user._id)
        })
    }
    else{
        res.status(400);
        throw new Error('Something went wrong with creting user');
    }
}))

//Login an existing user
router.post('/login',asyncHandler(async (req, res) =>{
    const {email, password} = req.body;

    const user = await Users.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user._id,
            name: user.full_name,
            email: user.email,
            token: getToken(user._id)
        })
    }
    else{
        res.status(401);
        throw new Error('Invalid credentials');
    }
}))

//Get user information
router.get('/profile', protectRoute, asyncHandler( async (req, res) =>{
    const user ={
        id: req.user._id,
        full_name: req.user.full_name,
        email: req.user.email
    }
    res.status(200).json(user);
}))


module.exports = router;