const express = require('express');
const router = express.Router();

// dummy data
const games = [
  { gameID: 1, title: 'The Witcher 3' },
  { gameID: 2, title: 'Forza Horizon 5' }
];

const platforms = [
  { platformID: 1, name: 'PC' },
  { platformID: 2, name: 'Xbox' },
  { platformID: 3, name: 'PlayStation' }
];

let gamePlatforms = [
  { gameID: 1, platformID: 1 },
  { gameID: 1, platformID: 3 },
  { gameID: 2, platformID: 2 }
];

// GET /game-platforms
router.get('/', (req, res) => {
  const associations = gamePlatforms.map(gp => {
    const game = games.find(g => g.gameID === gp.gameID);
    const platform = platforms.find(p => p.platformID === gp.platformID);
    return {
      gameID: gp.gameID,
      platformID: gp.platformID,
      gameTitle: game ? game.title : 'Unknown',
      platformName: platform ? platform.name : 'Unknown'
    };
  });
  res.render('game-platforms/list', { associations });
});

// GET /game-platforms/add
router.get('/add', (req, res) => {
  res.render('game-platforms/add', { games, platforms });
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
