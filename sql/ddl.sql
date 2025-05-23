-- Stored Procedure to Reset GameVault Database
DELIMITER //
CREATE PROCEDURE ResetGameVaultDB()
BEGIN
    SET FOREIGN_KEY_CHECKS=0;
    SET AUTOCOMMIT = 0;

    DROP TABLE IF EXISTS Users, Games, Publishers, Genres, Platforms, UserGameEntries, StatusCategories, GamePlatforms, GameGenres;

-- CREATE queries --

-- Users table --
CREATE TABLE Users (
    userID int(11) NOT NULL AUTO_INCREMENT,
    userName varchar(30) NOT NULL,
    email varchar(255) NOT NULL,
    joinDate date NOT NULL,
    PRIMARY KEY (userID),
    CONSTRAINT UNIQUE (userName),
    CONSTRAINT UNIQUE (email)
);

-- Games table --
CREATE TABLE Games (
    gameID int(11) NOT NULL AUTO_INCREMENT,
    publisherID int(11) NOT NULL,
    title varchar(1000) NOT NULL,
    PRIMARY KEY (gameID),
    CONSTRAINT FOREIGN KEY (publisherID) REFERENCES Publishers(publisherID) ON DELETE RESTRICT
);

-- Publishers table --
CREATE TABLE Publishers (
    publisherID int(11) NOT NULL AUTO_INCREMENT,
    name varchar(1000) NOT NULL,
    location varchar(1000) NOT NULL,
    PRIMARY KEY (publisherID)
);

-- Genres table --
CREATE TABLE Genres (
    genreID int(11) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    PRIMARY KEY (genreID)
);

-- Platforms table --
CREATE TABLE Platforms (
    platformID int(11) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    manufacturer varchar(1000) NOT NULL,
    PRIMARY KEY (platformID)
);

-- UserGameEntries table --
CREATE TABLE UserGameEntries (
    entryID int(11) NOT NULL AUTO_INCREMENT,
    userID int(11) NOT NULL,
    gameID int(11) NOT NULL,
    statusID int(11),
    hoursLogged int(11) NOT NULL,
    rating int(2),
    review varchar(5000),
    hasFavorited boolean,
    PRIMARY KEY (entryID),
    CONSTRAINT FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY (gameID) REFERENCES Games(gameID) ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY (statusID) REFERENCES StatusCategories(statusID)
);

CREATE TABLE StatusCategories (
    statusID int(11) NOT NULL AUTO_INCREMENT,
    status varchar(255) NOT NULL,
    PRIMARY KEY (statusID)
);

-- GamePlatforms table --
CREATE TABLE GamePlatforms (
    gameID int(11) NOT NULL,
    platformID int(11) NOT NULL,
    releaseDate date NOT NULL,
    CONSTRAINT FOREIGN KEY (gameID) REFERENCES Games(gameID) ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY (platformID) REFERENCES Platforms(platformID) ON DELETE CASCADE
);

-- GameGenres table --
CREATE TABLE GameGenres (
    gameID int(11) NOT NULL,
    genreID int(11) NOT NULL,
    CONSTRAINT FOREIGN KEY (gameID) REFERENCES Games(gameID) ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY (genreID) REFERENCES Genres(genreID) ON DELETE CASCADE
);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;

-- Data --

-- Users data --
INSERT INTO Users (userName, email, joinDate) VALUES
("bennyBeav52", "benny@osu.edu", "2024-01-15"),
("speedRacer", "f1fan@gmail.com", "2016-11-25"),
("apeX", "apex@vitality.cs", "2025-04-08"),
("geralt_rivia", "grivia@kaer_morhen.com", "2019-08-22");

-- Genres data --
INSERT INTO Genres (name) VALUES
("Action-Adventure"),
("Racing"),
("First Person Shooter"),
("RPG");

-- Platforms data --
INSERT INTO Platforms (name, manufacturer) VALUES
("Nintendo Switch", "Nintendo"),
("Xbox Series X", "Microsoft"),
("PC", "Various"),
("Playstation 4", "Sony");

-- Publishers data --
INSERT INTO Publishers (name, location) VALUES
("Nintendo", "Kyoto, Japan"),
("Xbox Game Studios", "Redmond, USA"),
("Valve", "Bellevue, USA"),
("CD Projekt", "Warsaw, Poland");

-- Games data --
INSERT INTO Games (title, publisherID) VALUES
("The Legend of Zelda: Breath of the Wild", (SELECT publisherID FROM Publishers WHERE name = "Nintendo")),
("Forza Horizon 5", (SELECT publisherID FROM Publishers WHERE name = "Xbox Game Studios")),
("Counter Strike 2", (SELECT publisherID FROM Publishers WHERE name = "Valve")),
("The Witcher 3: Wild Hunt", (SELECT publisherID FROM Publishers WHERE name = "CD Projekt"));

INSERT INTO StatusCategories (status) VALUES
("Playing"),
("Completed"),
("Dropped"),
("Wishlist");

-- GameGenre data --
INSERT INTO GameGenres (gameID, genreID) VALUES

((SELECT gameID FROM Games WHERE title =  "The Legend of Zelda: Breath of the Wild"),
 (SELECT genreID FROM Genres WHERE name = "Action-Adventure")),

((SELECT gameID FROM Games WHERE title =  "Forza Horizon 5"),
 (SELECT genreID FROM Genres WHERE name = "Racing")),

((SELECT gameID FROM Games WHERE title =  "Counter Strike 2"),
 (SELECT genreID FROM Genres WHERE name = "First Person Shooter")),

((SELECT gameID FROM Games WHERE title =  "The Witcher 3: Wild Hunt"),
 (SELECT genreID FROM Genres WHERE name = "RPG")),

((SELECT gameID FROM Games WHERE title =  "The Witcher 3: Wild Hunt"),
 (SELECT genreID FROM Genres WHERE name = "Action-Adventure"));

-- GamePlatform data --
INSERT INTO GamePlatforms (gameID, platformID, releaseDate) VALUES

((SELECT gameID FROM Games WHERE title =        "The Legend of Zelda: Breath of the Wild"),
 (SELECT platformID FROM Platforms WHERE name = "Nintendo Switch"),
                                                "2017-03-03"),

((SELECT gameID FROM Games WHERE title =        "Forza Horizon 5"),
 (SELECT platformID FROM Platforms WHERE name = "Xbox Series X"),
                                                "2021-11-09"),

((SELECT gameID FROM Games WHERE title =        "Forza Horizon 5"),
 (SELECT platformID FROM Platforms WHERE name = "PC"),
                                                "2021-11-09"),

((SELECT gameID FROM Games WHERE title =        "Counter Strike 2"),
 (SELECT platformID FROM Platforms WHERE name = "PC"),
                                                "2023-09-27"),

((SELECT gameID FROM Games WHERE title =        "The Witcher 3: Wild Hunt"),
 (SELECT platformID FROM Platforms WHERE name = "PC"),
                                                "2023-09-27"),

((SELECT gameID FROM Games WHERE title =        "The Witcher 3: Wild Hunt"),
 (SELECT platformID FROM Platforms WHERE name = "Playstation 4"),
                                                "2015-05-19");

-- UserGameEntries data --
INSERT INTO UserGameEntries (userID, gameID, statusID, hoursLogged, rating, review, hasFavorited) VALUES

((SELECT userID FROM Users WHERE userName = "bennyBeav52"),
 (SELECT gameID FROM Games WHERE title =    "The Legend of Zelda: Breath of the Wild"),
 (SELECT statusID FROM StatusCategories WHERE status = "Playing"),
 155, 8, "Masterpiece in game design", 1),

((SELECT userID FROM Users WHERE userName = "speedRacer"),
 (SELECT gameID FROM Games WHERE title =    "Forza Horizon 5"),
 (SELECT statusID FROM StatusCategories WHERE status = "Playing"),
 33, 6, "Stunning graphics", 0),

((SELECT userID FROM Users WHERE userName = "apeX"),
 (SELECT gameID FROM Games WHERE title =    "Counter Strike 2"),
 (SELECT statusID FROM StatusCategories WHERE status = "Dropped"),
 585, 7, "Competitive gameplay", 1),

((SELECT userID FROM Users WHERE userName = "geralt_rivia"),
 (SELECT gameID FROM Games WHERE title =    "The Witcher 3: Wild Hunt"),
 (SELECT statusID FROM StatusCategories WHERE status = "Completed"),
 333, 8, "Soo immersive!", 1);

END //
DELIMITER ;
