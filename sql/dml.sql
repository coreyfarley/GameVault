
-- These are for various dropdown paramters. --
SELECT userID, userName FROM Users;
SELECT gameID, title FROM Games;
SELECT publisherID, name FROM Publishers;
SELECT platformID, name FROM Platforms;
SELECT genreID, name FROM Genres;

-- These are for the table listings. --
SELECT * FROM Users;

SELECT Games.gameID, Publishers.name AS publisherName, Games.title
FROM Games
INNER JOIN Publishers ON Games.publisherID = Publishers.publisherID;

SELECT * FROM Publishers;

SELECT * FROM Genres;

SELECT * FROM Platforms;

SELECT UserGameEntries.entryID, Users.userName, Games.title, StatusCategories.status, UserGameEntries.hoursLogged, UserGameEntries.rating, UserGameEntries.review, UserGameEntries.hasFavorited
FROM UserGameEntries
INNER JOIN Users ON UserGameEntries.userID = Users.userID
INNER JOIN Games ON UserGameEntries.gameID = Games.gameID
INNER JOIN StatusCategories ON UserGameEntries.statusID = StatusCategories.statusID;

SELECT * FROM StatusCategories;

SELECT Games.title, Platforms.name, GamePlatforms.releaseDate
FROM GamePlatforms
INNER JOIN Games ON GamePlatforms.gameID = Games.gameID
INNER JOIN Platforms ON GamePlatforms.platformID = Platforms.platformID;

SELECT Games.title, Genres.name
FROM GameGenres
INNER JOIN Games ON GameGenres.gameID = Games.gameID
INNER JOIN Genres ON GameGenres.genreID = Genres.genreID;


-- Delete commands --
DELETE FROM Users WHERE userID = :userIDInput;
DELETE FROM Games WHERE gameID = :gameIDInput;
DELETE FROM Publishers WHERE publisherID = :publisherIDInput;
DELETE FROM Genres WHERE genreID = :genreIDInput;
DELETE FROM Platforms WHERE platformID = :platformIDInput;
DELETE FROM UserGameEntries WHERE entryID = :entryIDInput;
DELETE FROM StatusCategories WHERE statusID = :statusIDInput;
DELETE FROM GamePlatforms WHERE gameID = :gameIDInput AND platformID = :platformIDInput;
DELETE FROM GameGenres WHERE gameID = :gameIDInput AND genreID = :genreIDInput;

-- Insert commands --
INSERT INTO Users (userID, userName, email, joinDate)
VALUES (:userIDInput, :userNameInput, :emailInput, :joinDateInput);

INSERT INTO Games (publisherID, title)
VALUES (:publisherIDInput, :titleInput);

INSERT INTO Publishers (name, location)
VALUES (:nameInput, :locationInput);

INSERT INTO Genres (name)
VALUES (:nameInput);

INSERT INTO UserGameEntries (userID, gameID, statusID, hoursLogged, rating, review, hasFavorited)
VALUES (:userIDInput, :gameIDInput, :statusIDInput, :hoursLoggedInput, :ratingInput, :reviewInput, :hasFavoritedInput);

INSERT INTO StatusCategories (statusID, status)
VALUES (:statusIDInput, :statusInput);

INSERT INTO GamePlatforms (gameID, platformID, releaseDate)
VALUES (:gameIDInput, :platformIDInput, :releaseDateInput);

INSERT INTO GameGenres (gameID, genreID)
VALUES (:gameIDInput, :genreIDInput);

-- Update commands --
UPDATE Users 
SET userName = :userNameInput,
    email = :emailInput,
    joinDate = :joinDateInput 
WHERE userID = :userIDInput;

UPDATE Games 
SET title = :titleInput 
WHERE publisherID = :publisherIDInput 
AND gameID = :gameIDInput;

UPDATE Publishers 
SET name = :nameInput,
    location = :locationInput 
WHERE publisherID = :publisherIDInput;

UPDATE Genres 
SET name = :nameInput 
WHERE genreID = :genreIDInput;

UPDATE Platforms 
SET name = :nameInput, 
    manufacturer = :manufacturerInput 
WHERE platformID = :platformIDInput;

UPDATE UserGameEntries 
SET userID = :userIDInput,
    gameID = :gameIDInput,
    statusID = :statusIDInput,
    hoursLogged = :hoursLoggedInput,
    rating = :ratingInput,
    review = :reviewInput,
    hasFavorited = :hasFavoritedInput 
WHERE entryID = :entryIDInput;

UPDATE StatusCategories 
SET status = :statusInput 
WHERE statusID = :statusIDInput;

