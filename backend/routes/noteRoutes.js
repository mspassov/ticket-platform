const express = require('express');
const router = express.Router({mergeParams: true});
const protectRoute = require('../middleware/authMiddleware');
const asyncHandler = require('express-async-handler');
const Users = require('../models/userModel');
const Tickets = require('../models/ticketModel');
const Notes = require('../models/noteModel');

//GET notes for a specific ticket
router.get('/', protectRoute, asyncHandler(async (req, res) =>{
    //Find the user and store the ID, so that we can get the corresponding tickets
    const user = await Users.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error("User not found");
    }

    const ticket = await Tickets.findById(req.params.id)

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized');
    }

    const notes = await Notes.find({ticket: req.params.id})

    res.status(200).json(notes)
}))

//POST Create notes for a specific ticket
router.post('/', protectRoute, asyncHandler(async (req, res) =>{
    //Find the user and store the ID, so that we can get the corresponding tickets
    const user = await Users.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error("User not found");
    }

    const ticket = await Tickets.findById(req.params.id)

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized');
    }

    const note = await Notes.create({
        ticket: req.params.id,
        text: req.body.text,
        isStaff: false,
        user: req.user.id
    })

    res.status(200).json(note)
}))


module.exports = router