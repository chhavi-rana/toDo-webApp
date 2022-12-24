const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
require('dotenv').config()

let myItems = [];


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

//Setting up database - mongoDB
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://admin-chhavi:" + process.env.password + "@cluster0.xp215ns.mongodb.net/toDolistDB");
//mongodb+srv://admin-chhavi:T9XIktCvEdK9PSmY@cluster0.xp215ns.mongodb.net/toDolistDB
// Defining a schema
const itemSchema = new mongoose.Schema({
    name : String
});


// Defining model
const Item = mongoose.model("Item", itemSchema);

Item.find(function(err, items){
    if(err){
        console.log(err);
    }else{
        console.log(1);
        myItems = [...items];
    }
});


let today = new Date();
let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
};
let day = today.toLocaleDateString("en-US", options);




setTimeout(function(){
    app.get("/", function(req, res){
        //console.log(myItems);
        res.render('list', {kindOfDay : day, arrItems : myItems })
    });
}, 200);


app.post('/', function(req, res){
    let item = req.body.newItem;
    let newItem = new Item({                       // Add new items to our todoList database.
        name : item
    });
    newItem.save();
    
    setTimeout(function(){
        Item.find(function(err, items){                     // Render items from our toDoList database.
            if(err){
                console.log(err);
            }else{
                console.log(items);
                console.log("AAAAAAAAAAAAAAAAAAAAA");
                
                myItems = [...items];               // copy items into myItems.
                //console.log(myItems);
                res.redirect("/");
                
            }
        });
    }, 200);
   
});


app.post("/delete", function(req, res){
    console.log(req.body.checkbox);
    const checkedItem = req.body.checkbox;
    
    Item.findByIdAndRemove(checkedItem, function(err){               // Delete items from our toDolist database.
        if(err){
            console.log(err);
        }else{
            console.log("successfully deleted.")
        }
    });    
    
    
    setTimeout(function(){
        Item.find(function(err, items){
            if(err){
                console.log(err);
            }else{
                //console.log(items);
                myItems = [...items];               // copy items into myItems.
                res.redirect("/");           
            }
        },500);
    }) 
        
});


app.listen(process.env.PORT || 3000, function(){
    console.log("Server running at 3000");
});
