const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = 9123;

// Configure handlebars with custom helpers
const hbs = exphbs.create({
  extname: '.hbs',
  helpers: {
    eq: (a, b) => a === b
  }
});

// Set up view engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route includes
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const gameRoutes = require('./routes/games');
const genreRoutes = require('./routes/genres');
const platformRoutes = require('./routes/platforms');
const publisherRoutes = require('./routes/publishers');
const entryRoutes = require('./routes/entries');
const statusRoutes = require('./routes/status');

app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/games', gameRoutes);
app.use('/genres', genreRoutes);
app.use('/platforms', platformRoutes);
app.use('/publishers', publisherRoutes);
app.use('/entries', entryRoutes);
app.use('/status', statusRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

