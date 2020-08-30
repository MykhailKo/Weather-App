const express = require('express');
const path = require('path');
const hbs = require('hbs');
// exporting weather app utils
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


// Define paths
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();
//heroku port
const port = process.env.PORT || 3000;

// Setup static directory 
app.use(express.static(publicPath));

// Setup handlebars 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {title: 'Home', name: 'MykhailKo'});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About', name: 'MykhailKo'});
});

app.get('/help', (req, res) => {
    res.render('help', {title: 'Help', name: 'MykhailKo', message: "Potentail documentation will be provided here."});
});

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        });
    }

    geocode(req.query.address, (error, {lat, lon, location} = {}) => {
        if(error) return res.send({error});
        forecast(lat, lon, (error, forecast) => {
            if(error) return res.send({error});
            res.send({
                location,
                forecast,
                address: req.query.address
            });
        });
    });
});

app.get('/help/*', (reg, res) => {
    res.render('404', {message: '404 Article not found', name: 'MykhailKo'});
});

app.get('*', (req, res) => {
    res.render('404', {message: '404 Page not found', name: 'MykhailKo'});
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});