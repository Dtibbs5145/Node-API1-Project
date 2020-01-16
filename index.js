// implement your API here
const express = require('express');
const db = require('./data/db');

const server = express();

server.listen(3000, () => {
    console.log(' *** listening on 3000 *** ');
});

//------POST-------

server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    db.insert(userInfo)
        .then(user => {
            res.status(201).json({ message: 'User added!', user});
        })
        .catch(err => {
            res.status(500).json({ message: 'Something went wrong. Double check your info.', err});
        })
});

//--------GET---------

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        }) .catch(err => {
            res.status(500).json({ success: false, err });
        });
});

//-------GET BY ID-------

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    
    db.findById(id)
        .then(user => {
            res.status(200).json(user);
        }) .catch(err => {
            res.status(500).json({ success: false, err });
        });
});