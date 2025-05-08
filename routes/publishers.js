const express = require('express');
const router = express.Router();

// === GET /publishers ===
// Display all publishers (dummy data for now)
router.get('/', (req, res) => {
  const publishers = [
    { publisherID: 501, name: 'Nintendo' },
    { publisherID: 502, name: 'Xbox Game Studios' },
    { publisherID: 503, name: 'Valve' },
    { publisherID: 504, name: 'CD Projeckt' }
  ];

  res.render('publishers/list', { publishers });
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

  // In the future: INSERT INTO Publishers ...
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

  // In the future: UPDATE Publishers SET ...
  res.redirect('/publishers');
});

// === POST /publishers/delete/:id ===
// Handle publisher deletion (placeholder logic)
router.post('/delete/:id', (req, res) => {
  const publisherID = req.params.id;
  console.log(`Deleted publisher ${publisherID} (simulated)`);

  // In the future: DELETE FROM Publishers WHERE publisherID = ?
  res.redirect('/publishers');
});

module.exports = router;
