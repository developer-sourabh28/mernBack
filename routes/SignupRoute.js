const express = require('express');
const router = express.Router();
const User = require('../schemas/SignupSchema')

router.post('/', async (req, res) => {
    try {
        const newUser = new User({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        })

        const savedUser = await newUser.save();
        res.status(200).json(savedUser)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : error.message})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const getUser = await User.findById();
        if(!getUser){
            return res.status(404).json({message : 'User not found'})
        }
        res.status(200).json(getUser)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

module.exports = router;