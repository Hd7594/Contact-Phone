const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");

router.post("/contacts/create", async (req, res) => {
  try {
    const { name, city, phone, number, notifications } = req.body;
    const newContact = new Contact({
      name: name,
      city: city,
      phone: phone,
      number: number,
      notifications: notifications,
    });
    await newContact.save();
    res.status(201).json({ message: "new Contact added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/contacts/list", async (req, res) => {
  try {
    const allContacts = await Contact.find();
    if (allContacts.length > 0) {
      res.json(allContacts);
    } else {
      res.json({ message: "request not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/contacts/update", async (req, res) => {
  try {
    const updateContact = await Contact.findByIdAndUpdate(req.body.id, {
      number: req.body.number,
    });
    if (!req.body.id) {
      res.json({ message: "missing id" });
    }
    await updateContact.save();
    res.json({ message: "Contact updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/contacts/delete", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.body.id);
    if (req.body.id) {
      res.json({ message: "Contact deleted" });
    } else {
      res.json({ message: "bad request" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
