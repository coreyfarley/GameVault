const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// === GET /platforms ===
// Display all platforms (from database)
router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM Platforms';
    const [platforms] = await db.query(query);
    res.render('platforms/list', { platforms });
  } catch (error) {
    console.error("Error fetching platforms:", error);
    res.status(500).send("Error fetching platforms from database");
  }
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
  res.redirect('/platforms');
});

// === POST /platforms/delete/:id ===
// Handle platform deletion (placeholder logic)
router.post('/delete/:id', (req, res) => {
  const platformID = req.params.id;
  console.log(`Deleted platform ${platformID} (simulated)`);
  res.redirect('/platforms');
});

module.exports = router;
