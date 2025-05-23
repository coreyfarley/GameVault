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
router.get('/add', (req, res) => {

  // Dummy data for publishers
  const publishers = [
    { publisherID: 501, name: 'Nintendo' },
    { publisherID: 502, name: 'Xbox Game Studios' },
  ];

  res.render('games/add', { publishers } );
});

// === POST /games/add ===
// Handle form submission to add a new game (placeholder logic)
router.post('/add', (req, res) => {
  const { title } = req.body;
  console.log('New game submitted:', { title });

  // In the future: INSERT INTO Games ...
  res.redirect('/games');
});

// === GET /games/edit/:id ===
// Show form to edit a game (placeholder data)
router.get('/edit/:id', (req, res) => {
  const dummyGame = {
    gameID: req.params.id,
    publisherID: 501,
    title: ''
  };

  const publishers = [
    { publisherID: 501, name: 'Nintendo' },
    { publisherID: 502, name: 'Xbox Game Studios' },
  ];

  res.render('games/edit', { game: dummyGame, publishers });
});

// === POST /games/edit/:id ===
// Handle update form submission (placeholder logic)
router.post('/edit/:id', (req, res) => {
  const { title } = req.body;
  console.log(`Updated game ${req.params.id}:`, { title });

  // In the future: UPDATE Games SET ...
  res.redirect('/games');
});

// === POST /games/delete/:id ===
// Handle game deletion (placeholder logic)
router.post('/delete/:id', (req, res) => {
  const gameID = req.params.id;
  console.log(`Deleted game ${gameID} (simulated)`);

  // In the future: DELETE FROM Games WHERE gameID = ?
  res.redirect('/games');
});

module.exports = router;
