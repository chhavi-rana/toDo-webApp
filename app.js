const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

let items = [];

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

let today = new Date();
let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
};
let day = today.toLocaleDateString("en-US", options);


app.get("/", function(req, res){
    res.render('list', {kindOfDay : day, arrItems : items })
});

app.post('/', function(req, res){
    let item = req.body.newItem;
    items.push(item);
    res.redirect("/");
});

app.listen(3000, function(){
    console.log("Server running at port 3000");
});
