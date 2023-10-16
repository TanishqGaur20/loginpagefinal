require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

const PORT = process.env.PORT || 3000;

const collection = require("./mongodb");//requiring collection to this file from mongodb file
// const exp = require('constants');
const connectdb = require("./mongodb");

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.static(path.join(__dirname, '../images')));

app.use(express.json());//this two line use to get the hbs file successfullY and mongodb connected
app.set("view engine", "hbs");//defining that our view engine is hbs

const template_path = path.join(__dirname, "../template");//here we are getting the path of template file

app.set("views", template_path);//here we are defining that our template file is acting or working like the view file and consider it as the views template_path is the path of template file

app.use(express.urlencoded({ extended: false }));//this thing helps the keep things organised so that the app will easily use the details of form

app.get("/", (req, res) => {
    res.render("login")
})


app.get("/signup", (req, res) => {
    res.render("signup")
})

app.get("/login", (req, res) => { //if requested for /login page then login.hbs will be redirected.
    res.render("login")
})


app.post("/signup", async (req, res) => {
    try {


        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        await collection.insertMany([data])//inserting the data object to database

        res.render("home");//if user inserted value he will goto home page
    }
    catch (err) {
        console.log(err);
        res.send(err);

    }

})//here we are fetchng the signup details


app.post("/login", async (req, res) => {

    try {
        const getCollectionByName = await collection.findOne({ name: req.body.name });//here we are finding collection in our database with name as the user entered during login
        if (getCollectionByName.password === req.body.password) {
            res.render("home")
        }
        else {
            res.send("Wrong Password")
        }
    }
    catch {
        res.send("wrong Details")
    }

})

// app.use(errorHandler);

// const startserver = () => {

//     try {
//         collection();
//         app.listen(PORT, () => {
//             console.log("Connected to server");
//         });
//     }
//     catch (error) {
//         console.log(error);
//     }

// }



connectdb().then(() => {
    app.listen(PORT, () => {

        console.log("Connected to server");
    })

})

// startserver();