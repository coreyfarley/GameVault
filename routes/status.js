const express = require('express');
const router = express.Router();

// Dummy data for StatusCategories
const statuses = [
  { statusID: 601, statusName: 'Playing' },
  { statusID: 602, statusName: 'Completed' },
  { statusID: 603, statusName: 'Dropped' },
  { statusID: 605, statusName: 'Wishlist' }
];

// GET /status - Display all statuses
router.get('/', (req, res) => {
  res.render('status/list', { statuses });
});

// GET /status/add - Show form to add a new status
router.get('/add', (req, res) => {
  res.render('status/add');
});

// POST /status/add - Handle form submission to add a new status
router.post('/add', (req, res) => {
  const { statusName } = req.body;
  console.log('New status submitted:', { statusName });
  // Placeholder for future database insertion
  res.redirect('/status');
});

// GET /status/edit/:id - Show form to edit an existing status
router.get('/edit/:id', (req, res) => {
  const statusID = parseInt(req.params.id);
  const status = statuses.find(s => s.statusID === statusID);
  if (status) {
    res.render('status/edit', { status });
  } else {
    res.status(404).send('Status not found');
  }
});

// POST /status/edit/:id - Handle form submission to update a status
router.post('/edit/:id', (req, res) => {
  const statusID = parseInt(req.params.id);
  const { statusName } = req.body;
  console.log(`Updated status ${statusID}:`, { statusName });
  // Placeholder for future database update
  res.redirect('/status');
});

// POST /status/delete/:id - Handle deletion of a status
router.post('/delete/:id', (req, res) => {
  const statusID = parseInt(req.params.id);
  console.log(`Deleted status ${statusID} (simulated)`);
  // Placeholder for future database deletion
  res.redirect('/status');
});

module.exports = router;



