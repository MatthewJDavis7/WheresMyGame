"use strict";
const pool = require('./db');

async function getAllEvents() {
    const queryText = "SELECT * FROM events";
    const result = await pool.query(queryText);
    return result.rows;
}

async function getEventById(id) {
    const queryText = "SELECT * FROM events where id= $1";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}


async function deleteEvent(id) {
    const queryText = "DELETE FROM events WHERE id = $1 ";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

async function addEvent(name, type, date, local, city, state, address, price, description) {
    const queryText = `
        INSERT INTO events 
        (name, type, date, local, city, state, address, price, description)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING *
    `;
    let values = [name, type, date, local, city, state, address, price, description];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function updateEvent(id, name, type, date, local, city, state, address, price, description) {
    const queryText = `
        UPDATE events
        SET name = $1,
            type = $2,
            date = $3,
            local = $4,
            city = $5,
            state = $6,
            address = $7,
            price = $8,
            description = $9
        WHERE id = $10
        RETURNING *
    `;
    const values = [name, type, date, local, city, state, address, price, description, id];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

module.exports = {
    getAllEvents,
    getEventById,
    deleteEvent,
    addEvent,
    updateEvent
};
