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



