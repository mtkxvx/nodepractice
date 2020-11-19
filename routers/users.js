const express = require("express");
const router = express.Router();
const User = require("../models/users");
const {userValidation} = require('../validation/user');
const bcrypt=require('bcrypt');




router.get("/",  (req, res, next) => {
  try {
    const user =  User.find();
    res.json(user);
  } catch (e) {
    res.json({ message: e });
  }
});

router.post("/",  (req, res, next) => {

  const {error}= userValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

   User.findOne({name:req.body.name}).then(user=>{
    if(user){
      console.log(user);
      console.log('this user already exist');
      return res.status(400).send("User already exist");
    }
    bcrypt.genSalt(10).then(salt=>{
      bcrypt.hash(req.body.password,salt).then(pas=>{
        const user1 = new User({
          name: req.body.name,
          password: pas
        });
          user1.save().then(result => {
            res.send(user1);
          console.log('user save');
          }).catch(err=>{
             res.status(400).send(err);
          });
      }).catch(err=>{
        res.status(400).send(err);
      })
    }).catch(err=>{
      res.status(400).send(err);
    })
  }).catch(e=>res.status(400).send(e))
});

router.get("/:iduser", async (req, res) => {
  try {
    const user = await User.findById(req.params.iduser);
    res.json(user);
  } catch (e) {
    res.json({ message: e });
  }
});

router.delete("/:iduser", async (req, res, next) => {
  try {
    const user =  User.remove({ _id: req.params.iduser });
    res.json(user);
  } catch (e) {
    res.json({ message: e });
  }
});

router.patch("/:iduser",  (req, res, next ) => {
  try {
    const user =  User.updateOne(
      { _id: req.params.iduser },
      { $set: { pass: req.body.pass } }
    );
    res.json(user);
  } catch (e) {
    res.json({ message: e });
  }
});

module.exports = router;
