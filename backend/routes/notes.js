const express = require('express')
const router = express.Router()

const User = require('../models/User')
const Notes = require('../models/Notes')

var fetchuser = require('../middleware/fetchuser')

const { body, validationResult } = require('express-validator');
const { isValidObjectId } = require('mongoose')



router.get('/fetchallnotes' , fetchuser , async (req,res) =>{

    try {
        const userid = req.user.id;
        const user = await User.findOne({ id:userid });
    
        const user_notes = await Notes.find({ user:userid });
        res.json(user_notes);
    } 
    catch (error) {
        res.status(500).json(error);
    }
});


router.post('/addnote' , fetchuser , [

    // fill validations

] , async (req,res) =>{

    try {
        const {title , description , tag} = req.body;
        const newNote = await Notes.create({
            user : req.user.id,
            title : title,
            description : description,
            tag : tag
        })
        const savedNote = await newNote.save();
        res.json(savedNote);
    } 
    catch (error) {
        res.status(500).json(error);
    }
});



router.put('/updatenote/:id' ,fetchuser, async (req,res) =>{

    try {
        const {title,description,tag} = req.body;
        const userid = req.user.id;
        const noteid = req.params.id;

        const newNote = {};
        if(title)
        newNote.title=title;
        if(description)
        newNote.description=description;
        if(tag)
        newNote.tag=tag;


        let note = await Notes.findById(noteid);
        if(!note)
        return res.status(404).json({error:"No such note exists"});

        if(userid !== note.user.toString())
        return res.status(401).json({error:"Ye aapka note nhi hai boss"});

        const updatedNote = await Notes.findByIdAndUpdate(noteid , {$set : newNote} , {new:true});
        res.json(updatedNote);
    }
     catch (error) {
        res.status(400).json(error);
    }

});



router.delete('/deletenote/:id' ,fetchuser, async (req,res) =>{

    try {
        const noteid = req.params.id;
        const userid = req.user.id;

        let note = await Notes.findById(noteid);
        if(!note)
        return res.status(404).json({error:"No such note exists"});

        if(userid !== note.user.toString())
        return res.status(401).json({error:"Ye aapka note nhi hai boss"});

        const deletedNote = await Notes.findByIdAndDelete(noteid);
        res.json({Success:"Note deleted" , note:deletedNote});
    } 
    catch (error) {
        res.status(400).send(error);
    }
});


module.exports = router