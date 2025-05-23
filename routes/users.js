const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// === GET /users ===
// Show all users (from database)
router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM Users';
    const [users] = await db.query(query);
    res.render('users/list', { users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users from database");
  }
});

// === GET /users/add ===
// Show form to add a new user
router.get('/add', (req, res) => {
  res.render('users/add');
});

// === POST /users/add ===
// Handle form submission to add user (placeholder logic)
router.post('/add', (req, res) => {
  const { userName, email, joinDate } = req.body;
  console.log('New user submitted:', { userName, email, joinDate });

  // In the future: INSERT INTO Users ...
  res.redirect('/users');
});

// === GET /users/edit/:id ===
// Show form to edit a user (placeholder data)
router.get('/edit/:id', (req, res) => {
  const dummyUser = {
    userID: req.params.id,
    userName: '',
    email: '',
    joinDate: ''
  };

  res.render('users/edit', { user: dummyUser });
});

// === POST /users/edit/:id ===
// Handle update form submission (placeholder logic)
router.post('/edit/:id', (req, res) => {
  const { userName, email, joinDate } = req.body;
  console.log(`Updated user ${req.params.id}:`, { userName, email, joinDate });

  // In the future: UPDATE Users SET ...
  res.redirect('/users');
});

// === POST /users/delete/:id ===
// Handle user deletion (actual database operation)
router.post('/delete/:id', async (req, res) => {
  try {
    const userID = req.params.id;
    const query = 'DELETE FROM Users WHERE userID = ?';
    await db.query(query, [userID]);
    console.log(`Successfully deleted user ${userID}`);
    res.redirect('/users');
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send(`Error deleting user: ${error.message}`);
  }
});


module.exports = router;
