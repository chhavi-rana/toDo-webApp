const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

let myItems = [];


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

//Setting up database - mongoDB
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/toDolistDB");

// Defining a schema
const itemSchema = new mongoose.Schema({
    name : String
});


// Defining model
const Item = mongoose.model("Item", itemSchema);


let today = new Date();
let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
};
let day = today.toLocaleDateString("en-US", options);


Item.find(function(err, items){
    if(err){
        console.log(err);
    }else{
        myItems = [...items];
    }
});


app.get("/", function(req, res){
    console.log(myItems);
    res.render('list', {kindOfDay : day, arrItems : myItems })
});


app.post('/', function(req, res){
    let item = req.body.newItem;
    let newItem = new Item({
        name : item
    });
    newItem.save();
    
    Item.find(function(err, items){
        if(err){
            console.log(err);
        }else{
            console.log(items);
            myItems = [...items];
            res.redirect("/");
            
        }
    });
   
});


app.listen(3000, function(){
    console.log("Server running at port 3000");
});
