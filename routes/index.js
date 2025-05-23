const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

router.get('/', (req, res) => {
  res.render('index'); // This will render views/index.hbs
});

// === GET /reset-database ===
// Reset the entire database using stored procedure
router.get('/reset-database', async (req, res) => {
  try {
    const query = 'CALL ResetGameVaultDB();';
    await db.query(query);
    res.send(`
      <h1>Database Reset Successful!</h1>
      <p>All tables have been dropped and recreated with sample data.</p>
      <a href="/">Return to Home</a>
    `);
  } catch (error) {
    console.error("Error executing ResetGameVaultDB:", error);
    res.status(500).send(`
      <h1>Database Reset Failed</h1>
      <p>An error occurred while resetting the database.</p>
      <p>Error: ${error.message}</p>
      <a href="/">Return to Home</a>
    `);
  }
});

module.exports = router;
