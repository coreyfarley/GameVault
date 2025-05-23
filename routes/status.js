const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// GET /status - Display all statuses (from database)
router.get('/', async (req, res) => {
  try {
    const query = 'SELECT statusID, status AS statusName FROM StatusCategories';
    const [statuses] = await db.query(query);
    res.render('status/list', { statuses });
  } catch (error) {
    console.error("Error fetching status categories:", error);
    res.status(500).send("Error fetching status categories from database");
  }
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
router.get('/edit/:id', async (req, res) => {
  try {
    const statusID = parseInt(req.params.id);
    const [statuses] = await db.query('SELECT * FROM StatusCategories WHERE statusID = ?', [statusID]);
    if (statuses.length > 0) {
      res.render('status/edit', { status: statuses[0] });
    } else {
      res.status(404).send('Status not found');
    }
  } catch (error) {
    console.error("Error fetching status:", error);
    res.status(500).send("Error fetching status from database");
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
