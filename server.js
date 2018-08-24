const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
//process.env is an object that stores all envirement variables as key value pairs
const port = process.env.PORT || 3000; // if process.env.PORT doesn't exist port will be set to 3000

var app = express();

hbs.registerPartials(__dirname + '/views/partials'); //__dirname stocks the path of parent directory
app.set('view engine','hbs'); //will tell what view engine we wanna use ? HBS in this case

app.use((req,res,next) => {
        var now = new Date().toString();
        var log = `${now} : ${req.method}  ${req.path} \n`;
        fs.appendFile('server.log',log,(err) => {
                if(err) console.log('unable to append to server.log');
        });
        console.log(`${now} ${req.method}  ${req.path}`);
        next();
});

/*
app.use((req,res,next) => {
                res.render('maintenance.hbs');
});
MAINTENANCE PAUSE
*/
app.use(express.static(__dirname + '/public')); //for static front-end pages

hbs.registerHelper('getCurrentYear', () => {
        return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
        return text.toUpperCase();
});

app.get('/',(req,res) => { 
        res.render('home.hbs',{
                pageTitle : 'Home Page',
                welcomeMessage : 'Welcome buddy!',  
        })
});

app.get('/about',(req,res) => {
        res.render('about.hbs',{
                pageTitle : 'About page'
        });
});

app.get('/projects', (req,res) => {
        res.render('projects.hbs',{
                pageTitle : 'Projects page'
        });
});

app.get('/bad',(req,res) => {
        res.send({
                errorMessage : "I don't know where u're goin' man.."
        })
});

app.listen(port,() =>{
        console.log(`server is up on port ${port}`); 
});