const express = require('express'); // import express module (simplifies routing/requests, among other things)
const app = express(); // create an instance of the express module (app is the conventional variable name used)
// let ejs = require('ejs'); 
const fetch = require('node-fetch'); // import node-fetch (enables the fetch API to be used server-side)
const PORT = process.env.PORT || 5000; // use either the host env var port (PORT) provided by Heroku or the local port (5000) on your machine

app.use(express.static(__dirname));
app.set('views', __dirname);
app.set('view engine', 'ejs');

app.get('/', (req, res) => { // send a get request to root directory ('/' is this file (app.js))
  res.render('index');
})

app.listen(PORT, () => { // start server and listen on specified port
<<<<<<< HEAD
  console.log(`App is running on ${PORT}`) // confirm server is running and log port to the console
}) 

//npm install ejs
//app.use(express.static(__dirname));
//app.set('views', __dirname);
//app.set('view engine', 'ejs');
//res.render('index', {activity: json.activity})
//add index.ejs
//use templating <%= activity %>
//add style.css
=======
  console.log(`App is running on ${PORT}`) // confirm server is running and log port to the console 
}) 
>>>>>>> 13d5190c8fd91a8e23b6b5d41e15deaf536974d1
