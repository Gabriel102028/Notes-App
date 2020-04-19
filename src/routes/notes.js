const express = require('express');
const router = express.Router();

const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth');

router.get('/notes/add', isAuthenticated, (req, res) =>{
    res.render('notes/new-note');
});

// Validacion del Form
router.post('/notes/new-note', isAuthenticated, async (req, res) =>{
    const { title, description } = req.body;
    const errors = [];
    if(!title){
        errors.push({text: 'Please provide a title'});
    };
    if(!description){
       errors.push({text: 'Please provide a description'});
    };

    if(errors.length > 0){
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    }else{
        const newNote = new Note({ title, description });
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('success_message', 'Note added Successfully');
        res.redirect('/notes');
    }
});

router.get('/notes', isAuthenticated, async (req, res) =>{
    const notesFind = await Note.find({user: req.user.id}).sort({date: 'desc'});

    //Desconstrução
    const notes = notesFind.map(note => {
        const { _id, title, description } = note;
        return { _id, title, description }
    });
    
    res.render('notes/all-notes', { notes });
});

router.get('/notes/edit/:id', isAuthenticated, async (req, res) =>{
    const note = await Note.findById(req.params.id);
    const { _id, title, description } = note;

    res.render('notes/edit-note', { note: { _id, title, description } });
});

router.put('/notes/edit-note/:id', isAuthenticated, async (req, res) => {
     const { _id, title, description } = req.body;
     await Note.findByIdAndUpdate(req.params.id, { title, description});
     req.flash('success_message', 'Note updated successfully');
     res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_message', 'Note deleted successfully');
    res.redirect('/notes');
});

module.exports = router;
