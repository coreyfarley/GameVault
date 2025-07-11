const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

// Database
const db = require('./database/db-connector');

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
const gamePlatformsRoutes = require('./routes/game-platforms');
const gameGenresRoutes = require('./routes/game-genres');

app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/games', gameRoutes);
app.use('/genres', genreRoutes);
app.use('/platforms', platformRoutes);
app.use('/publishers', publisherRoutes);
app.use('/entries', entryRoutes);
app.use('/status', statusRoutes);
app.use('/game-platforms', gamePlatformsRoutes);
app.use('/game-genres', gameGenresRoutes);


// Set up DB before starting server
(async function initializeApp() {
  try {
    const query = 'CALL ResetGameVaultDB();';
    await db.query(query);
    console.log("Database initialized successfully");
    
    // Start server after database is initialized
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error executing ResetGameVaultDB on server startup:", error);
    console.error("Starting server without database initialization...");
    
    // Start server even if database initialization fails
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT} (database may not be initialized)`);
    });
  }
})();
