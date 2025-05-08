const express = require('express');
const router = express.Router();

// === GET /games ===
// Display all games (dummy data for now)
router.get('/', (req, res) => {
  const games = [
    { gameID: 201, publisherID: 501, title: 'The Legend of Zelda: Breath of the Wild' },
    { gameID: 202, publisherID: 502, title: 'Forza Horizon 5' },
    { gameID: 203, publisherID: 503, title: 'Counter-Strike 2' },
    { gameID: 204, publisherID: 504, title: 'The Witcher 3: Wild Hunt' }
  ];

  res.render('games/list', { games });
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
