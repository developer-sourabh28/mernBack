const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SignupSchema = new Schema({
    name :{
        type : String,
        required: true,
    },
    email : {
        type : String,
        required: true,
    },
    password : {
        type : String,
        required: true,
    }
})

SignupSchema.pre('save', async function (next) {
 if(!this.isModified('password')) return next()
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
})

module.exports = mongoose.model('signup', SignupSchema);