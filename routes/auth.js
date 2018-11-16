const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi'); 
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async function(req, res, next) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  let user = await User.findOne( { username: req.body.username} );
  if (!user) return res.status(400).send('Nutzername oder Passwort nicht vorhanden!');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Nutzername oder Passwort nicht vorhanden!');

  const token = user.generateAuthToken();  
  
  res.send(token);
  // res.header('x-auth-token', token).send(_.pick(user, ['username']));

  // res.cookie('jwt', token).send(_.pick(user, ['username']));

  function validate(req) {
    const schema = {
      username: Joi.string().min(5).max(50).required(),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(req, schema);
  }

});



module.exports = router;