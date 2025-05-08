const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = 9123;

// Handlebars setup
app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route includes
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');

app.use('/', indexRoutes);
app.use('/users', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
