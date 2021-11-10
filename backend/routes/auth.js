const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

var fetchuser = require('../middleware/fetchuser')
var jwt = require('jsonwebtoken')
const JWT_SECRET = 'shobhit_agarwal'


// Create User using POST req.

router.post('/createuser' , [
        body('name','Enter a Valid name').isLength({min:3}),
        body('email','Enter a Valid email').isEmail(),
        body('password', 'Password should be of atleast length 5').isLength({min:5}),
    ] , 
    async (req,res)=>{
        
        let success=false;
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            // console.log("Invaliid details");
            return res.status(400).json({ success,error:errors.array() });
        }

        let {name,email,password} = req.body;
        
        let user = await User.findOne({email:email});

        if(user)
        return res.status(400).json({success,error:"Email already taken"});

        user = await User.create({
            name:name,
            email:email,
            password:password
        })
        user = await user.save();

        const data = {
            user:{
                id:user.id
            }
        }

        success=true;
        const authToken = jwt.sign(data , JWT_SECRET);
        res.json({success,authToken})
});



router.post('/login' , [
    body('email','Enter a Valid email').isEmail(),
] , 
async (req,res)=>{

    const errors = validationResult(req);
    let success=false;
    
    if(!errors.isEmpty())
    {
        // console.log("Invaliid details");
        return res.status(400).json({success, errors:errors.array() });
    }

    let {email,password} = req.body;
    let user = await User.findOne({email:email});

    if(!user || user.password!=password)
    {
        return res.status(400).json({success,error:'Please Login with correct details'});
    }

    const data = {
        user:{
            id:user.id
        }
    }
    success=true;
    const authToken = jwt.sign(data , JWT_SECRET);
    res.json({success,authToken})

});



router.post('/getuser' , fetchuser , async (req,res) => {

    try {
        const userID = req.user.id;
        const user = await User.findOne({ id: userID}).select('-password');
        res.json(user);

    } catch (error) {
        res.status(500).send(error)
    }

});


module.exports = router

