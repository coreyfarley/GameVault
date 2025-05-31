const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// === GET /entries ===
// Display all entries (from database with JOINs)
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT UserGameEntries.entryID, Users.userName, Games.title, StatusCategories.status, 
             UserGameEntries.hoursLogged, UserGameEntries.rating, UserGameEntries.review, 
             UserGameEntries.hasFavorited
      FROM UserGameEntries
      INNER JOIN Users ON UserGameEntries.userID = Users.userID
      INNER JOIN Games ON UserGameEntries.gameID = Games.gameID
      INNER JOIN StatusCategories ON UserGameEntries.statusID = StatusCategories.statusID
    `;
    const [entries] = await db.query(query);
    res.render('entries/list', { entries });
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).send("Error fetching entries from database");
  }
});

// === GET /entries/add ===
// Show form to add a new entry
router.get('/add', async (req, res) => {

  let users = undefined
  let games = undefined
  let status_cat = undefined

  try {
    const query = `
      SELECT userID, userName FROM Users;
    `;
    const users_query = await db.query(query);
    users = users_query[0]
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users from database");
  }

  try {
    const query = `
      SELECT gameID, title FROM Games;
    `;
    const games_query = await db.query(query);
    games = games_query[0]
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).send("Error fetching games from database");
  }

  try {
    const query = `
      SELECT statusID, status FROM StatusCategories;
    `;
    const status_query = await db.query(query);
    status_cat = status_query[0]
  } catch (error) {
    console.error("Error fetching status:", error);
    res.status(500).send("Error fetching status from database");
  }

  res.render('entries/add', { users, games });
});

// === POST /entries/add ===
// Handle form submission to add a new entry
router.post('/add', async (req, res) => {
  try {
    const data = req.body;
    const query = 'CALL CreateUserGameEntry(?, ?, ?, ?, ?, ?, ?)';
    await db.query(query, [
        data.userID,
        data.gameID,
        data.statusID,
        data.hoursLogged,
        data.rating,
        data.review,
        data.hasFavorited,
    ]);
    console.log(`Successfully added entry`);
    res.redirect('/entries');
  } catch (error) {
    console.error("Error adding entry:", error);
    res.status(500).send(`Error adding entry: ${error.message}`);
  }
});

// === GET /entries/edit/:id ===
// Show form to edit an entry
router.get('/edit/:id', async (req, res) => {

  let users = undefined
  let games = undefined
  let status_cat = undefined

  try {
    const query = `
      SELECT userID, userName FROM Users;
    `;
    const users_query = await db.query(query);
    users = users_query[0]
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users from database");
  }

  try {
    const query = `
      SELECT gameID, title FROM Games;
    `;
    const games_query = await db.query(query);
    games = games_query[0]
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).send("Error fetching games from database");
  }

  try {
    const query = `
      SELECT statusID, status FROM StatusCategories;
    `;
    const status_query = await db.query(query);
    status_cat = status_query[0]
  } catch (error) {
    console.error("Error fetching status:", error);
    res.status(500).send("Error fetching status from database");
  }

  try {
    const entryID = req.params.id;
    const query = 'SELECT * FROM UserGameEntries WHERE entryID = ?';
    const [entrys] = await db.query(query, [entryID]);
    editEntry = entrys[0]
    res.render('entries/edit', { entry: editEntry, users, games });
  } catch (error) {
    console.error("Error retrieving :", error);
    res.status(500).send("Error fetching entry from database");
  }
});

// === POST /entries/edit/:id ===
// Handle update form submission
router.post('/edit/:id', async (req, res) => {
  try {
    const data = req.body;
    const entryID = req.params.id;
    const query = 'CALL UpdateUserGameEntry(?, ?, ?, ?, ?, ?, ?, ?)';
    await db.query(query, [
        entryID,
        data.userID,
        data.gameID,
        data.statusID,
        data.hoursLogged,
        data.rating,
        data.review,
        data.hasFavorited,
    ]);
    console.log(`Successfully updated entry ${entryID}`);
    res.redirect('/entries');
  } catch (error) {
    console.error("Error updating entry:", error);
    res.status(500).send(`Error updating entry: ${error.message}`);
  }
});

// === POST /entries/delete/:id ===
// Handle entry deletion
router.post('/delete/:id', async (req, res) => {
  try {
    const entryID = req.params.id;
    const query = 'CALL DeleteUserGameEntry(?)';
    await db.query(query, [entryID]);
    console.log(`Successfully deleted entry ${entryID}`);
    res.redirect('/entries');
  } catch (error) {
    console.error("Error deleting entry:", error);
    res.status(500).send(`Error deleting entry: ${error.message}`);
  }
});

module.exports = router;
