const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// === GET /publishers ===
// Display all publishers (from database)
router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM Publishers';
    const [publishers] = await db.query(query);
    res.render('publishers/list', { publishers });
  } catch (error) {
    console.error("Error fetching publishers:", error);
    res.status(500).send("Error fetching publishers from database");
  }
});

// === GET /publishers/add ===
// Show form to add a new publisher
router.get('/add', (req, res) => {
  res.render('publishers/add');
});

// === POST /publishers/add ===
// Handle form submission to add a new publisher (placeholder logic)
router.post('/add', (req, res) => {
  const { name } = req.body;
  console.log('New publisher submitted:', { name });
  res.redirect('/publishers');
});

// === GET /publishers/edit/:id ===
// Show form to edit a publisher (placeholder data)
router.get('/edit/:id', (req, res) => {
  const dummyPublisher = {
    publisherID: req.params.id,
    name: ''
  };

  res.render('publishers/edit', { publisher: dummyPublisher });
});

// === POST /publishers/edit/:id ===
// Handle update form submission (placeholder logic)
router.post('/edit/:id', (req, res) => {
  const { name } = req.body;
  console.log(`Updated publisher ${req.params.id}:`, { name });
  res.redirect('/publishers');
});

// === POST /publishers/delete/:id ===
// Handle publisher deletion (placeholder logic)
router.post('/delete/:id', (req, res) => {
  const publisherID = req.params.id;
  console.log(`Deleted publisher ${publisherID} (simulated)`);
  res.redirect('/publishers');
});

module.exports = router;
