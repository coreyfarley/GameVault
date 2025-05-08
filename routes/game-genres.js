const express = require('express');
const router = express.Router();

// Dummy data
const games = [
  { gameID: 1, title: 'The Witcher 3' },
  { gameID: 2, title: 'Forza Horizon 5' }
];

const genres = [
  { genreID: 1, name: 'RPG' },
  { genreID: 2, name: 'Racing' },
  { genreID: 3, name: 'Adventure' }
];

let gameGenres = [
  { gameID: 1, genreID: 1 },
  { gameID: 1, genreID: 3 },
  { gameID: 2, genreID: 2 }
];

// GET /game-genres
router.get('/', (req, res) => {
  const associations = gameGenres.map(gg => {
    const game = games.find(g => g.gameID === gg.gameID);
    const genre = genres.find(g => g.genreID === gg.genreID);
    return {
      gameID: gg.gameID,
      genreID: gg.genreID,
      gameTitle: game ? game.title : 'Unknown',
      genreName: genre ? genre.name : 'Unknown'
    };
  });
  res.render('game-genres/list', { associations });
});

// GET /game-genres/add
router.get('/add', (req, res) => {
  res.render('game-genres/add', { games, genres });
});

// === POST /game-genres/add ===
// Handle game-genre addition (simulated)
router.post('/add', (req, res) => {
    const { gameID, genreID } = req.body;
    console.log(`Added game-genre association: gameID=${gameID}, genreID=${genreID} (simulated)`);
  
    // In the future: INSERT INTO GameGenres (gameID, genreID) VALUES (?, ?)
    res.redirect('/game-genres');
  });
  

// === POST /game-genres/delete ===
// Handle game-genre deletion (simulated)
router.post('/delete', (req, res) => {
    const { gameID, genreID } = req.body;
    console.log(`Deleted game-genre association: gameID=${gameID}, genreID=${genreID} (simulated)`);
  
    // In the future: DELETE FROM GameGenres WHERE gameID = ? AND genreID = ?
    res.redirect('/game-genres');
  });
  
module.exports = router;
