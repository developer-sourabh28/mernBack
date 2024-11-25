const express = require('express');
const router = express.Router();
const User= require('../schemas/SignupSchema')
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message : 'User not found'})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            return res.status(200).json('User logged in')
        }else{
            res.status(400).json({message :'Invalid credentials'})
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : error.message})
    }
})



module.exports = router; 