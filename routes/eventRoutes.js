"use strict";
const express = require("express");
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get("/", ensureAuth, eventController.fetchAllEvents);
router.get("/:id", ensureAuth, eventController.fetchEventById);
router.delete("/:id", ensureAuth, eventController.removeEvent);
router.post("/", ensureAuth, eventController.createEvent);
router.put("/:id", ensureAuth, eventController.updateEvent);


function ensureAuth(req, res, next) {
  req.session.returnTo = req.originalUrl;
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  next();
}

module.exports = router;
