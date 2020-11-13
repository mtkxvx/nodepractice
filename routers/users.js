const express = require("express");
const router = express.Router();
const User = require("../models/users");
const {userValidation} = require('../validation/user');
const bcrypt=require('bcrypt');


router.post("/", async (req, res) => {

  const {error}= userValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const existance=await User.findOne({name:req.body.name});
  if(existance) return res.status(400).send("User already exist");

  const salt= await bcrypt.genSalt(10);
  const hashpass=await bcrypt.hash(req.body.password,salt);

  const user = new User({
    name: req.body.name,
    password: hashpass,
  });
  try {
    res.send(usersave);
    console.log('done')
    const usersave = await user.save();
    
  } 
  catch (e) {
    res.status(400).send(e);
  }
});

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (e) {
    res.json({ message: e });
  }
});

router.get("/:iduser", async (req, res) => {
  try {
    const user = await User.findById(req.params.iduser);
    res.json(user);
  } catch (e) {
    res.json({ message: e });
  }
});

router.delete("/:iduser", async (req, res) => {
  try {
    const user = await User.remove({ _id: req.params.iduser });
    res.json(user);
  } catch (e) {
    res.json({ message: e });
  }
});

router.patch("/:iduser", async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.params.iduser },
      { $set: { pass: req.body.pass } }
    );
    res.json(user);
  } catch (e) {
    res.json({ message: e });
  }
});

module.exports = router;
