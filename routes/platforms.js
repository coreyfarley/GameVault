const express = require('express');
const router = express.Router();

// === GET /platforms ===
// Display all platforms (dummy data for now)
router.get('/', (req, res) => {
  const platforms = [
    { platformID: 401, name: 'Nintendo Switch', manufacturer: 'Nintendo' },
    { platformID: 402, name: 'Xbox Series X', manufacturer: 'Microsoft' },
    { platformID: 403, name: 'PC', manufacturer: 'Various' },
    { platformID: 404, name: 'Playstation 4', manufacturer: 'Sony' }
  ];

  res.render('platforms/list', { platforms });
});

// === GET /platforms/add ===
// Show form to add a new platform
router.get('/add', (req, res) => {
  res.render('platforms/add');
});

// === POST /platforms/add ===
// Handle form submission to add a new platform (placeholder logic)
router.post('/add', (req, res) => {
  const { name } = req.body;
  console.log('New platform submitted:', { name });

  // In the future: INSERT INTO Platforms ...
  res.redirect('/platforms');
});

// === GET /platforms/edit/:id ===
// Show form to edit a platform (placeholder data)
router.get('/edit/:id', (req, res) => {
  const dummyPlatform = {
    platformID: req.params.id,
    name: ''
  };

  res.render('platforms/edit', { platform: dummyPlatform });
});

// === POST /platforms/edit/:id ===
// Handle update form submission (placeholder logic)
router.post('/edit/:id', (req, res) => {
  const { name } = req.body;
  console.log(`Updated platform ${req.params.id}:`, { name });

  // In the future: UPDATE Platforms SET ...
  res.redirect('/platforms');
});

// === POST /platforms/delete/:id ===
// Handle platform deletion (placeholder logic)
router.post('/delete/:id', (req, res) => {
  const platformID = req.params.id;
  console.log(`Deleted platform ${platformID} (simulated)`);

  // In the future: DELETE FROM Platforms WHERE platformID = ?
  res.redirect('/platforms');
});

module.exports = router;
