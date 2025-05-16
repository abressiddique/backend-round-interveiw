const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const router = express.Router();
const User = require("../models/usermodels");
const validateToken = require("../middleware/validatetoken");

// REGISTER ROUTE
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);
  const hashedpassword = await bcrypt.hash(password, 10);
  console.log(hashedpassword, "this is the hpassowrd");

  try {
    const newUser = await User.create({
      username,
      email,
      password: hashedpassword,
    }); // 💡 await is needed here!
    res.status(200).json({
      text: "The user was created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({
      text: "Something went wrong",
      error: error.message,
    });
  }
});

// LOGIN ROUTE
router.post("/login", async (req, res) => {
 const {email,password}=req.body;
 try {
    const  find = await User.findOne({email})
    console.log(find)
    const ismatched=await bcrypt.compare(password,find.password)
    if(!ismatched){
        res.status(404)
        res.json({text:"the password is wrong "})
    }
    const token = jwt.sign({id:find._id,email:find.email},"jwt_secret",{expiresIn:"1h"})
    res.json({text:"everything went sucesdful",token})
    
 } catch (error) {
    res.status(400)
    res.json({text:"soemthien went wrong",msg:error.message})
    
 }
});

// CURRENT USER ROUTE
router.get("/current", validateToken, (req, res) => {
  res.json({ text: "This is the current user" ,user:req.user});
});

module.exports = router;
