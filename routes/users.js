const express = require('express');
const router = express.Router();

// === GET /users ===
// Show all users (with dummy data for now)
router.get('/', (req, res) => {
  const users = [
    { userID: 101, userName: 'bennyBeav52', email: 'benny@osu.edu', joinDate: '2024-01-15' },
    { userID: 102, userName: 'speedRacer', email: 'f1fan@gmail.com', joinDate: '2016-11-25' },
    { userID: 103, userName: 'apeX', email: 'apex@vitality.cs', joinDate: '2025-04-08' },
    { userID: 104, userName: 'geralt_rivia', email: 'grivia@kaer_morhen.com', joinDate: '2019-08-22' }
  ];

  res.render('users/list', { users });
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
// Handle user deletion (placeholder logic)
router.post('/delete/:id', (req, res) => {
    const userID = req.params.id;
    console.log(`Deleted user ${userID} (simulated)`);
  
    // In the future: DELETE FROM Users WHERE userID = ?
    res.redirect('/users');
  });

module.exports = router;
