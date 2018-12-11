const auth = require('../middleware/auth');

const formidable = require('formidable');

const express = require('express');
const router = express.Router();

const _ = require('lodash');
const {Bot, validate} = require('../models/bot');

/* Route to admin panel */

router.get('/', auth, async function (req, res){

  //console.log( "/admin: user id:" , req.session.userId, " user name: " , req.session.userName);
  const userName = req.session.userName;
  const userId = req.session.userId;
  
  const bot_query = await Bot.find({owner : userId}); 
  res.render('admin', {bot_query : bot_query, userName : userName});
  //console.log(bot_query);
  
});

// test area for image upload:

router.post('/imgupload', async function (req, res){
  
  let form = await new formidable.IncomingForm();

  form.parse(req);
  
  form.on('fileBegin', function (name, file){
    file.path = 'uploads/' + file.name;
  });

  form.on('file', function (name, file){
    console.log('Uploaded ' + file.name);
  });

  res.redirect('/admin');

});

// test end



router.post('/newbot', async function (req, res){
  
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  let bot = await Bot.findOne( { name: req.body.name} );
  if (bot) return res.status(400).send('Ein Bot mit diesem Namen ist bereits vorhanden!');

  let botData = {
    'name' : req.body.name, 
    'description' : req.body.description, 
    'image_path' : req.body.image_path, 
    'workspace_id_url' : req.body.workspace_id_url, 
    'username_token' : req.body.username_token, 
    'password_token' : req.body.password_token, 
    'date_created' : req.body.date_created, 
    'owner' : req.session.userId, 
    'isPublic' : req.body.isPublic
  };
  console.log(botData);

  bot = new Bot(_.pick(botData, ['name', 'description', 'image_path', 'workspace_id_url', 'username_token', 'password_token', 'date_created', 'owner', 'isPublic']));

  await bot.save();

  res.redirect('/admin');

});

module.exports = router;

