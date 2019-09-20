const express = require('express');
const bcrypt = require('bcryptjs');
const router = require('express').Router();

const Users = require('./auth-model');
const authenticator = require('./authenticate-middleware');


router.post('/register', (req, res) => {
  // implement registration
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 8);

  Users.add({ username, password: hash })
    .then(saved => {
      res.status(200).json({ saved })
    })
    .catch(err => {
      res.status(400).json({ err })
    })
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      console.log('user', user);
      console.log('bcrypt', user && bcrypt.compareSync(password, user.password))
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user.username;
        res.status(200).json({ message: `Welcome ${user.username}!` })
      } else {
        res.status(400).json({ message: 'Invalid credentials'})
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;