const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

// New Schema for User
const UserShema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true},
    date: { type: Date, default: Date.now}
});

// method for Encrypt password
UserShema.methods.encryptPassword = async (password) =>{
    const satl = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, satl);
    return hash;
};

// method para comparar a senha com a que existe na base de dados

UserShema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password,this.password);
};

//exports module
module.exports = mongoose.model('User', UserShema);