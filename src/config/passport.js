const passport  = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

//Função responsavel por realizar a validação do user atraves do email

passport.use(new LocalStrategy({
    usernameField: 'email',
}, async (email, password, done) =>{
    const user = await User.findOne({email: email });
    if(!user){
        return done(null, false, { message: 'Not User found..'});
    }else {
        const match = await user.matchPassword(password);
        if(match){
            return done(null, user);
        }else {
            return done(null, false, { message: 'Incorrect Password..'});
        }
    }
}
));

//Armazenar o ID do user 
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});