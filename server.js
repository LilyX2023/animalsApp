//////////////////////////////
//Import our deps
//////////////////////////////
require('dotenv').config()
const express = require("express")
const morgan = require("morgan") // logger
const methodOverride = require ('method-override')
const mongoose = require('mongoose')

///////////////////////////////
//DATABASE CONNECTION
//////////////////////////////
const DATABASE_URL = process.env.DATABASE_URL
mongoose.connect(DATABASE_URL)

mongoose.connection
.on("open", () => {console.log("Connected to Mongoose")})
.on("close", () => {console.log("Disconnected from Mongoose")})
.on("error", (error) => {console.log(error)})

///////////////////////////////////
//Schema
const {Schema, model} = mongoose
const animalSchema = new Schema({
    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number
})

//Model
const Animal = model("Animal", animalSchema)

/////////////////////////////////////
//Express App object
const app = express()

//////////////////////////////////////
//Middleware 
app.use(morgan("dev")); 
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

///////////////////////////////////////
//Routes
app.get('/',(req, res) => {
    res.send('Server is running')
})


///////////////////////////////////////////////////////
// Server Listener
////////////////////////////////////////////////////////
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})







