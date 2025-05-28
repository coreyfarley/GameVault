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
router.post('/add', async (req, res) => {
  try {
    const data = req.body;
    const query = 'CALL CreateUser(?, ?, ?)';
    await db.query(query, [
        data.userName,
        data.email,
        data.joinDate
    ]);
    console.log(`Successfully added user`);
    res.redirect('/users');
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send(`Error adding user: ${error.message}`);
  }
});

// === GET /users/edit/:id ===
// Show form to edit a user (placeholder data)
router.get('/edit/:id', async (req, res) => {
  try {
    const userID = req.params.id;
    const query = 'SELECT * FROM Users WHERE userID = ?';
    const [users] = await db.query(query, [userID]);
    editUser = users[0]
    editUser.joinDate = editUser.joinDate.toISOString().split('T')[0];
    res.render('users/edit', { user: editUser });
  } catch (error) {
    console.error("Error retrieving :", error);
    res.status(500).send("Error fetching users from database");
  }

});

// === POST /users/edit/:id ===
// Handle update form submission (placeholder logic)
router.post('/edit/:id', async (req, res) => {
  try {
    const data = req.body;
    const userID = req.params.id;
    const query = 'CALL UpdateUser(?, ?, ?, ?)';
    await db.query(query, [
        userID,
        data.userName,
        data.email,
        data.joinDate,
    ]);
    console.log(`Successfully updated user ${userID}`);
    res.redirect('/users');
  } catch (error) {
    console.error("Error updatinguser:", error);
    res.status(500).send(`Error updating user: ${error.message}`);
  }
});

// === POST /users/delete/:id ===
// Handle user deletion (actual database operation)
router.post('/delete/:id', async (req, res) => {
  try {
    const userID = req.params.id;
    const query = 'CALL DeleteUser(?)';
    await db.query(query, [userID]);
    console.log(`Successfully deleted user ${userID}`);
    res.redirect('/users');
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send(`Error deleting user: ${error.message}`);
  }
});


module.exports = router;
