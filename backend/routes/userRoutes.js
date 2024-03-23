const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

//Register a new user
router.post('/register', asyncHandler(async (req, res) =>{
    const {name, email, password} = req.body;

    //Simple validation
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please enter all fields");
    }

    res.send('Register route');
}))

//Login an existing user
router.post('/login',asyncHandler(async (req, res) =>{
    res.send('Login route');
}))


module.exports = router;