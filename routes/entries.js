const express = require('express');
const router = express.Router();

// === GET /entries ===
// Display all entries (dummy data for now)
router.get('/', (req, res) => {
  const entries = [
    {
      entryID: 1,
      userName: 'bennyBeav52',
      gameTitle: 'The Witcher 3',
      status: 'Completed',
      rating: 9,
      notes: 'Amazing storyline!'
    },
    {
      entryID: 2,
      userName: 'speedRacer',
      gameTitle: 'Forza Horizon 5',
      status: 'Playing',
      rating: 8,
      notes: 'Great graphics and gameplay.'
    }
  ];

  res.render('entries/list', { entries });
});

// === GET /entries/add ===
// Show form to add a new entry
router.get('/add', (req, res) => {
  // Dummy data for users and games
  const users = [
    { userID: 101, userName: 'bennyBeav52' },
    { userID: 102, userName: 'speedRacer' }
  ];

  const games = [
    { gameID: 201, title: 'The Witcher 3' },
    { gameID: 202, title: 'Forza Horizon 5' }
  ];

  res.render('entries/add', { users, games });
});

// === POST /entries/add ===
// Handle form submission to add a new entry (placeholder logic)
router.post('/add', (req, res) => {
  const { userID, gameID, status, rating, notes } = req.body;
  console.log('New entry submitted:', { userID, gameID, status, rating, notes });

  // In the future: INSERT INTO Entries ...
  res.redirect('/entries');
});

// === GET /entries/edit/:id ===
// Show form to edit an entry (placeholder data)
router.get('/edit/:id', (req, res) => {
  const dummyEntry = {
    entryID: req.params.id,
    userID: 101,
    gameID: 201,
    status: 'Completed',
    rating: 9,
    notes: 'Amazing storyline!'
  };

  const users = [
    { userID: 101, userName: 'bennyBeav52' },
    { userID: 102, userName: 'speedRacer' }
  ];

  const games = [
    { gameID: 201, title: 'The Witcher 3' },
    { gameID: 202, title: 'Forza Horizon 5' }
  ];

  res.render('entries/edit', { entry: dummyEntry, users, games });
});

// === POST /entries/edit/:id ===
// Handle update form submission (placeholder logic)
router.post('/edit/:id', (req, res) => {
  const { userID, gameID, status, rating, notes } = req.body;
  console.log(`Updated entry ${req.params.id}:`, { userID, gameID, status, rating, notes });

  // In the future: UPDATE Entries SET ...
  res.redirect('/entries');
});

// === POST /entries/delete/:id ===
// Handle entry deletion (placeholder logic)
router.post('/delete/:id', (req, res) => {
  const entryID = req.params.id;
  console.log(`Deleted entry ${entryID} (simulated)`);

  // In the future: DELETE FROM Entries WHERE entryID = ?
  res.redirect('/entries');
});

module.exports = router;
