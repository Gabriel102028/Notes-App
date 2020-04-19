// Variables
const express = require('express');
const path = require('path');
const expresshbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

//Inicializacion
const app = express();
require('./database');
require('./config/passport');

//Sessión de configuracíon

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expresshbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'), 
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

///Middlewares

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Variables global

app.use((req, res, next) => {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


//Rutas
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));


// Archivos estaticos

app.use(express.static(path.join(__dirname, 'public')));




// Server listenning
// concatena el puerto del servidor al console.log
app.listen(app.get('port'), () =>{
    console.log('Server is running on port', app.get('port'));
});