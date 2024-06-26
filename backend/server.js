const express = require('express');
const errorHandler = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;

//Connect to database
connectDB();

const app = express();

//Setting up static folder for Production
//app.use(express.static(path.join(__dirname, 'public')));

//middleware
app.use(express.json());    //allows request body to be JSON
app.use(express.urlencoded({extended: false})); //allows request body to be URLencoded format

//Cors Middleware
//app.use(cors());

app.get('/', (req, res) =>{
    res.status(201).json({message: "Welcome to the ticketing platform"});
})

//Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));