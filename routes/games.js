const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// === GET /games ===
// Display all games (from database with publisher names)
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT Games.gameID, Publishers.name AS publisherName, Games.title
      FROM Games
      INNER JOIN Publishers ON Games.publisherID = Publishers.publisherID
    `;
    const [games] = await db.query(query);
    res.render('games/list', { games });
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).send("Error fetching games from database");
  }
});

// === GET /games/add ===
// Show form to add a new game
router.get('/add', async (req, res) => {
  try {
    const query = `
      SELECT publisherID, name FROM Publishers;
    `;
    const publishers_query = await db.query(query);
    const publishers = publishers_query[0]
    res.render('games/add', { publishers } );
  } catch (error) {
    console.error("Error fetching publishers:", error);
    res.status(500).send("Error fetching publishers from database");
  }
});

// === POST /games/add ===
// Handle form submission to add a new game (placeholder logic)
router.post('/add', async (req, res) => {
  try {
    const data = req.body;
    const query = 'CALL CreateGame(?, ?)';
    await db.query(query, [
        data.publisherID,
        data.title
    ]);
    console.log(`Successfully added game`);
    res.redirect('/games');
  } catch (error) {
    console.error("Error adding game:", error);
    res.status(500).send(`Error adding game: ${error.message}`);
  }
});

// === GET /games/edit/:id ===
// Show form to edit a game
router.get('/edit/:id', async (req, res) => {

  editGame = undefined
  try {
    const gameID = req.params.id;
    const query = 'SELECT * FROM Games WHERE gameID = ?';
    const [games] = await db.query(query, [gameID]);
    editGame = games[0]
  } catch (error) {
    console.error("Error retrieving:", error);
    res.status(500).send("Error fetching game from database");
  }

  try {
    const query = `
      SELECT publisherID, name FROM Publishers;
    `;
    const publishers_query = await db.query(query);
    const publishers = publishers_query[0]
    res.render('games/edit', { game: editGame, publishers });
  } catch (error) {
    console.error("Error fetching publishers:", error);
    res.status(500).send("Error fetching publishers from database");
  }
});

// === POST /games/edit/:id ===
// Handle update form submission
router.post('/edit/:id', async (req, res) => {
  try {
    const data = req.body;
    const gameID = req.params.id;
    const query = 'CALL UpdateGame(?, ?, ?)';
    await db.query(query, [
        gameID,
        data.publisherID,
        data.title
    ]);
    console.log(`Successfully updated game ${gameID}`);
    res.redirect('/games');
  } catch (error) {
    console.error("Error updating game:", error);
    res.status(500).send(`Error updating game: ${error.message}`);
  }
});

// === POST /games/delete/:id ===
// Handle game deletion (placeholder logic)
router.post('/delete/:id', async (req, res) => {
  try {
    const gameID = req.params.id;
    const query = 'CALL DeleteGame(?)';
    await db.query(query, [gameID]);
    console.log(`Successfully deleted game ${gameID}`);
    res.redirect('/games');
  } catch (error) {
    console.error("Error deleting game:", error);
    res.status(500).send(`Error deleting game: ${error.message}`);
  }
});

module.exports = router;
