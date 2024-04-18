const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/authMiddleware');
const asyncHandler = require('express-async-handler');
const Users = require('../models/userModel');
const Tickets = require('../models/ticketModel');

//Used to re-route into the notes router
const noteRouter = require('./noteRoutes');
router.use('/get/:id/notes', noteRouter);

//GET tickets for a specific user
router.get('/get', protectRoute, asyncHandler(async (req, res) =>{
    //Find the user and store the ID, so that we can get the corresponding tickets
    const user = await Users.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error("User not found");
    }

    const tickets = await Tickets.find({user: req.user.id})

    res.status(200).json(tickets)
}))

//GET single ticket by id
router.get('/get/:id', protectRoute, asyncHandler(async (req, res) =>{
    const user = await Users.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error("User not found");
    }

    const ticket = await Tickets.findById(req.params.id);
    if(!ticket){
        res.status(401);
        throw new Error('Ticket does not exist');
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Ticket not authorized');
    }

    res.status(201).json(ticket);
}))

//PUT update single ticket by id
router.put('/update/:id', protectRoute, asyncHandler(async (req, res) =>{
    const user = await Users.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error("User not found");
    }

    const ticket = await Tickets.findById(req.params.id);
    if(!ticket){
        res.status(401);
        throw new Error('Ticket does not exist');
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Ticket not authorized');
    }

    //update request
    const updatedTicket = await Tickets.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(201).json({success: true, payload: updatedTicket});
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

//DELETE single ticket by id
router.delete('/delete/:id', protectRoute, asyncHandler(async (req, res) =>{
    const user = await Users.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error("User not found");
    }

    const ticket = await Tickets.findById(req.params.id);
    if(!ticket){
        res.status(401);
        throw new Error('Ticket does not exist');
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Ticket not authorized');
    }

    //Perform delete request
    const delTicket = await Tickets.deleteOne(ticket);

    res.status(201).json({success: true, payload: delTicket});
}))


module.exports = router;