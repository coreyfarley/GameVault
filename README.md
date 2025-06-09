# GameVault

A web application for tracking and managing your video game collection.

## Project Overview

GameVault is a database-powered web application that allows gamers to log, track, and review their gaming experiences in one centralized location. The application enables users to maintain a personal catalog of games across multiple platforms, track playtime, assign status categories, write reviews, and rate their gaming experiences.

As gaming becomes more ubiquitous and personal libraries grow across multiple platforms, GameVault provides the tools to track, reflect, and take ownership of your gaming experience.

### Key Features

- Track games across multiple platforms
- Log playtime, status, ratings, and reviews
- Manage publishers, genres, and platforms
- Favorite your top games
- Comprehensive game library management

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MySQL with stored procedures for data integrity
- **Frontend**: Handlebars templating engine, CSS
- **Deployment**: Forever.js for production deployment
- **Development**: Nodemon for development environment

## Installation & Setup

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/coreyfarley/GameVault.git
   cd GameVault
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Create a MySQL database
   - Copy `database/db-credentials-example.js` to `database/db-credentials.js` and update with your database credentials

4. Initialize the database:
   - Start the application (it will automatically initialize the database)
   - Or visit `/reset-database` route after starting the application

5. Start the application:
   - Development mode: `npm run dev`
   - Production mode: `npm run production`


## Navigation

The application provides a navigation bar at the top of each page with links to all major sections:
- Home: Overview of the application
- Users: Manage user accounts
- Games: Browse and manage games
- Platforms: View and edit gaming platforms
- Publishers: Manage game publishers
- Genres: Browse and edit game genres
- Entries: View and manage user game entries
- Status: Manage status categories
- Game-Platforms: Manage game-platform relationships
- Game-Genres: Manage game-genre relationships

### Running the Application

- **Development Mode**: `npm run dev`
- **Production Mode**: `npm run production`
- **Stop Production**: `npm run stop_production`

## Citations

- **CS 340 Exploration - Web Application Technology**
    - These files use primarily code derived from this module for the app's basic setup, using the same name/directory structure as the module:
    - app.js
    - database/db-connector.js
    - views/layouts/main.hbs
    - public/css/style.css
    - Most of the other hbs views in the views directory are derived from the handlebars in bsg-people.hbs from the module, adapted for each table and split into separate create/add/delete pages.
   
- **CS 340 Exploration: PL/SQL part 2, Stored Procedures for CUD**
    - The usage of SQL TRANSACTIONs was learned from this module.
    - sql/pl.sql
    
- **[MySQL Tutorial - SIGNAL](https://www.mysqltutorial.org/mysql-stored-procedure/mysql-signal/)**
    - The usage of SQLSTATE was learned from this site.
    - sql/pl.sql
    
- **CS 340 Exploration - Implementing CUD operations in your app**
    - The routes in the routes directory were derived primarily from this module, adapted for each table.

- **AI Tool Assistance and Usage**
    - CHATGPT and Microsoft Copilot were the two tools utilized for this project.
    - Style.CSS file AI tools were used to streamline the design process for font selections, coloring, padding, spacing, etc. 
    - AI tools were used to brainstorm the structure and layout of this README file, but not to populate it.

## Contributors

- Corey Farley
- Fox Caminiti
