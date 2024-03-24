const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Users = require('../models/userModel');

const protectRoute = asyncHandler(async (req, res, next) =>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            //Assign found user to the request, so it can be used anywhere
            req.user = await Users.findById(decodedToken.id).select('-password');

            //Call the next piece of middleware
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Unauthorized user');
        }
    }

    if(!token){
        console.log("There is a missing authorization token");
        res.status(401);
        throw new Error('Unauthorized user');
    }
})

module.exports = protectRoute;
