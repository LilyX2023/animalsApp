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
//Route
app.get('/',(req, res) => {
    res.send('Server is running')
})

app.get('/animals/seed', async (req, res) => {
    try {
    //array of animals
    const startAnimals = [
        {
        id: 0,
        species: "African Elephant",
        extinct: false,
        location: "Africa",
        lifeExpectancy: 60
      },
      {
        id: 1,
        species: "Bengal Tiger",
        extinct: false,
        location: "India",
        lifeExpectancy: 10
      },
      {
        id: 2,
        species: "Giant Panda",
        extinct: false,
        location: "China",
        lifeExpectancy: 20
      },
      {
        id: 3,
        species: "Dodo",
        extinct: true,
        location: "Mauritius",
        lifeExpectancy: 20
      },
      {
        id: 4,
        species: "Green Sea Turtle",
        extinct: false,
        location: "Global Oceans",
        lifeExpectancy: 80
      },
      {
        id: 5,
        species: "Siberian Tiger",
        extinct: false,
        location: "Russia",
        lifeExpectancy: 15
      }]
    
    //Delete all fruits
    await Animal.deleteMany({})

    //Seed
    const animals = await Animal.create(startAnimals)

    //response
    res.json(animals)
    } catch (error) {
        res.send('There was error')
    }

})


///////////////////////////////////////////////////////
//Index
app.get("/animals", async (req, res) => {
    try {
      //get all animals
      const animals = await Animal.find({});
      // render a template
      res.render("index.ejs", {animals})
    } catch (error) {
      console.log("-----", error.message, "------");
      res.status(400).send("error, read logs for details");
    }
  });

//Show
app.get("/animals/:id", async (req, res) => {
  try{
      // get the id from params
      const id = req.params.id

      // find the particular fruit from the database
      const animal = await Animal.findById(id)

      // render the template with the fruit
      res.render("show.ejs", {animal})
  }catch(error){
      console.log("-----", error.message, "------")
      res.status(400).send("error, read logs for details")
  }
})
///////////////////////////////////////////////////////
// Server Listener
////////////////////////////////////////////////////////
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})







