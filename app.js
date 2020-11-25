const express = require('express'); // import express module (simplifies routing/requests, among other things)
const app = express(); // create an instance of the express module (app is the conventional variable name used)
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // import node-fetch (enables the fetch API to be used server-side)
const PORT = process.env.PORT || 5000; // use either the host env var port (PORT) provided by Heroku or the local port (5000) on your machine

const { Pool } = require('pg');
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,	
	ssl: {
		rejectUnauthorized: false
	}
});

app.use(express.static(__dirname));
app.set('views', __dirname);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => { // send a get request to root directory ('/' is this file (app.js))
  const getString = 'SELECT * FROM my_activities';
  pool
    .query(getString)
    .then(results => {
      res.render('index', { activities: results.rows } );
    })
    .catch(err => console.log(err));
});

app.post('/add', (req, res) => {
  const addString = 'INSERT INTO my_activities (activity) VALUES ($1) RETURNING *';
  const activityToAdd = [ req.body.activity ]; // this is $1  
  pool
    .query(addString, activityToAdd)
    .then(result => {
      let addedActivity = result.rows[0].activity;
      console.log(`${addedActivity} has been added!`);
      res.send(`${addedActivity} has been added!`);
    })
    .catch(err => console.log(err));
});

app.post('/delete', (req, res) => {
  var removeString = 'DELETE FROM my_activities';
  pool
    .query(removeString)    
    .then(res.send('All activities cleared!'))
    .catch(err => console.log(err));  
});

app.listen(PORT, () => { // start server and listen on specified port
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


//connect to DB created in GUI
//heroku pg:psql -a heroku-fullstack-v1
//create table
//create table activities (activity text);
