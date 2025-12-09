"use strict";
const model = require('../models/eventModel');

async function fetchAllEvents(req, res) {
    try {
        const events = await model.getAllEvents();
        res.render("events-list", { eventsList: events, title: "Events", user: req.user });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function fetchEventById(req, res) {
    const id = req.params.id;

    if (!id) return res.status(400).send("Missing required id param!");

    try {
        const event = await model.getEventById(id);
        res.render("event-details", { event: event, title: `${event.name}`, user: req.user });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function removeEvent(req, res) {
    const id = req.params.id;

    if (!id) return res.status(400).send("Missing required id param!");

    try {
        const deleted = await model.deleteEvent(id);
        if (deleted > 0) {
            res.send(`Event with id ${id} deleted successfully.`);
        } else {
            res.status(404).send("Event not found.");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function createEvent(req, res) {
    const { name, type, date, local, city, state, address, price, description } = req.body;

    if (!name || !type || !date || !local || !city || !state || !address || !price) {
        return res.status(400).send("Missing required event fields!");
    }

    try {
        const newEvent = await model.addEvent(name, type, date, local, city, state, address, price, description);
        res.status(201).json(newEvent);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function updateEvent(req, res) {
    const { name, type, date, local, city, state, address, price, description } = req.body;
    const { id } = req.params;

    if (!name || !type || !date || !local || !city || !state || !address || !price) {
        return res.status(400).send("Missing required event fields!");
    }

    try {
        const updatedEvent = await model.updateEvent(
            id,
            name,
            type,
            date,
            local,
            city,
            state,
            address,
            price,
            description
        );

        if (!updatedEvent) {
            return res.status(404).send("Event not found");
        }

        res.status(200).json(updatedEvent);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

module.exports = {
    fetchAllEvents,
    fetchEventById,
    removeEvent,
    createEvent,
    updateEvent
};
