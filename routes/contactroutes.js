const express = require("express");
const validateToken = require("../middleware/validatetoken");
const Contact = require("../models/contactsmodels")

const router = express.Router();

// Apply authentication middleware to all routes in this router
router.use(validateToken);
// GET all contacts for the user
router.get("/", async (req, res) => {
  try {
    const contact = await Contact.find({user:req.user.id})
    res.status(200).json({data:contact})
    
  } catch (error) {
    res.status(400).json({text:error.message})
    
  }
});

// CREATE a new contact
router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const contact = await Contact.create({user:req.user.id,name,email,phone})
    res.status(200).json({text:"sucess",user:contact})
    
  } catch (error) {
    res.status(400).json({text:error.message})
    
  }

  
});

// UPDATE a contact by ID
router.put("/:id", async (req, res) => {
  const {name,email,phone}=req.body;
  try {
    const  contact = await Contact.findById(req.params.id);
    if(contact.user.toString()!== req.user.id){
        res.status(404).json({text:"you re not aauthorised"})
    }
    contact.name=name|| contact.name
    contact.email=email|| contact.email
    contact.phone=phone|| contact.phone
    res.status(200).json({text:"succes",user:contact})
    
  } catch (error) {
    res.status(400).json({text:error.message})
    
  }
});

// DELETE a contact by ID
router.delete("/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete" });
    }

    await contact.deleteOne();
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
});

module.exports = router;