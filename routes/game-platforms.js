const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// GET /game-platforms - Display all game-platform associations (from database)
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT DISTINCT Games.title AS gameTitle, Platforms.name AS platformName, 
             GamePlatforms.releaseDate, GamePlatforms.gameID, GamePlatforms.platformID
      FROM GamePlatforms
      INNER JOIN Games ON GamePlatforms.gameID = Games.gameID
      INNER JOIN Platforms ON GamePlatforms.platformID = Platforms.platformID
    `;
    const [associations] = await db.query(query);
    res.render('game-platforms/list', { associations });
  } catch (error) {
    console.error("Error fetching game-platforms:", error);
    res.status(500).send("Error fetching game-platforms from database");
  }
});

// GET /game-platforms/add
router.get('/add', async (req, res) => {
  try {
    const [games] = await db.query('SELECT gameID, title FROM Games');
    const [platforms] = await db.query('SELECT platformID, name FROM Platforms');
    res.render('game-platforms/add', { games, platforms });
  } catch (error) {
    console.error("Error fetching games/platforms:", error);
    res.status(500).send("Error fetching games/platforms from database");
  }
});

// === POST /game-platforms/add ===
// Handle game-platform addition (simulated)
router.post('/add', (req, res) => {
    const { gameID, platformID } = req.body;
    console.log(`Added game-platform association: gameID=${gameID}, platformID=${platformID} (simulated)`);
  
    // In the future: INSERT INTO GamePlatforms (gameID, platformID) VALUES (?, ?)
    res.redirect('/game-platforms');
  });

// === POST /game-platforms/delete ===
// Handle game-platform deletion (simulated)
router.post('/delete', (req, res) => {
    const { gameID, platformID } = req.body;
    console.log(`Deleted game-platform association: gameID=${gameID}, platformID=${platformID} (simulated)`);
  
    // In the future: DELETE FROM GamePlatforms WHERE gameID = ? AND platformID = ?
    res.redirect('/game-platforms');
  });

module.exports = router;
