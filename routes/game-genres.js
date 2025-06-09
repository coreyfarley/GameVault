const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// GET /game-genres - Display all game-genre associations (from database)
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT DISTINCT Games.title AS gameTitle, Genres.name AS genreName,
             GameGenres.gameID, GameGenres.genreID
      FROM GameGenres
      INNER JOIN Games ON GameGenres.gameID = Games.gameID
      INNER JOIN Genres ON GameGenres.genreID = Genres.genreID
    `;
    const [associations] = await db.query(query);
    res.render('game-genres/list', { associations });
  } catch (error) {
    console.error("Error fetching game-genres:", error);
    res.status(500).send("Error fetching game-genres from database");
  }
});

// GET /game-genres/add
router.get('/add', async (req, res) => {
  try {
    const [games] = await db.query('SELECT gameID, title FROM Games');
    const [genres] = await db.query('SELECT genreID, name FROM Genres');
    res.render('game-genres/add', { games, genres });
  } catch (error) {
    console.error("Error fetching games/genres:", error);
    res.status(500).send("Error fetching games/genres from database");
  }
});

// === POST /game-genres/add ===
// Handle game-genre addition (simulated)
router.post('/add', (req, res) => {
    const { gameID, genreID } = req.body;
    console.log(`Added game-genre association: gameID=${gameID}, genreID=${genreID} (simulated)`);
    res.redirect('/game-genres');
  });
  

// === POST /game-genres/delete ===
// Handle game-genre deletion (simulated)
router.post('/delete', (req, res) => {
    const { gameID, genreID } = req.body;
    console.log(`Deleted game-genre association: gameID=${gameID}, genreID=${genreID} (simulated)`);
    res.redirect('/game-genres');
  });
  
module.exports = router;
