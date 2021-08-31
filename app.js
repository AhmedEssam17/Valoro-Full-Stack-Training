const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const meme = require('./meme');

//express app
const app = express();

// mongo db connection
const dbURI = 'mongodb+srv://Essam:ps4playerr@cluster0.zqjnw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then((result) => app.listen(process.env.PORT || 3000))
.catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

//blog routes
app.use('/blogs', blogRoutes);

// api call
app.use(meme);

//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});
