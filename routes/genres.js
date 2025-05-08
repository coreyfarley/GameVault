const express = require('express');
const router = express.Router();

// === GET /genres ===
// Display all genres (dummy data for now)
router.get('/', (req, res) => {
  const genres = [
    { genreID: 301, name: 'Action-Adventure' },
    { genreID: 302, name: 'Racing' },
    { genreID: 303, name: 'First Person Shooter' },
    { genreID: 304, name: 'RPG' }
  ];

  res.render('genres/list', { genres });
});

// === GET /genres/add ===
// Show form to add a new genre
router.get('/add', (req, res) => {
  res.render('genres/add');
});

// === POST /genres/add ===
// Handle form submission to add a new genre (placeholder logic)
router.post('/add', (req, res) => {
  const { name } = req.body;
  console.log('New genre submitted:', { name });

  // In the future: INSERT INTO Genres ...
  res.redirect('/genres');
});

// === GET /genres/edit/:id ===
// Show form to edit a genre (placeholder data)
router.get('/edit/:id', (req, res) => {
  const dummyGenre = {
    genreID: req.params.id,
    name: ''
  };

  res.render('genres/edit', { genre: dummyGenre });
});

// === POST /genres/edit/:id ===
// Handle update form submission (placeholder logic)
router.post('/edit/:id', (req, res) => {
  const { name } = req.body;
  console.log(`Updated genre ${req.params.id}:`, { name });

  // In the future: UPDATE Genres SET ...
  res.redirect('/genres');
});

// === POST /genres/delete/:id ===
// Handle genre deletion (placeholder logic)
router.post('/delete/:id', (req, res) => {
  const genreID = req.params.id;
  console.log(`Deleted genre ${genreID} (simulated)`);

  // In the future: DELETE FROM Genres WHERE genreID = ?
  res.redirect('/genres');
});

module.exports = router;
