const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/authMiddleware');
const asyncHandler = require('express-async-handler');
const Users = require('../models/userModel');
const Tickets = require('../models/ticketModel');

//GET tickets for a specific user
router.get('/get', protectRoute, asyncHandler(async (req, res) =>{
    //Find the user and store the ID, so that we can get the corresponding tickets
    const user = await Users.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error("User not found");
    }

    const tickets = await Tickets.find({user: req.user.id})

    res.status(200).json({tickets})
}))

//POST create tickets for a specific user
router.post('/create', protectRoute, asyncHandler(async (req, res) =>{
    const {product, description} = req.body;

    if(!product || !description){
        res.status(400);
        throw new Error('Please add a product or description');
    }

    //Find the user and store the ID, so that we can get the corresponding tickets
    const user = await Users.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error("User not found");
    }

    const ticket = await Tickets.create({
        user: req.user.id,
        product,
        description,
        status: 'New'
    });

    res.status(201).json(ticket);
}))


module.exports = router;