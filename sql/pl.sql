DROP PROCEDURE IF EXISTS DeleteUser;
DROP PROCEDURE IF EXISTS UpdateUser;
DROP PROCEDURE IF EXISTS CreateUser;

DROP PROCEDURE IF EXISTS DeleteGame;
DROP PROCEDURE IF EXISTS UpdateGame;
DROP PROCEDURE IF EXISTS CreateGame;

DROP PROCEDURE IF EXISTS DeleteUserGameEntry;
DROP PROCEDURE IF EXISTS UpdateUserGameEntry;
DROP PROCEDURE IF EXISTS CreateUserGameEntry;

-- Delete User
DELIMITER //
CREATE PROCEDURE DeleteUser(IN p_userID int(11))
BEGIN
    DECLARE error_message VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM Users WHERE userID = p_userID;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Users for id: ', p_userID);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- Update User
DELIMITER //
CREATE PROCEDURE UpdateUser(
    IN p_userID int(11),
    IN p_userName varchar(30),
    IN p_email varchar(255),
    IN p_joinDate date
)
BEGIN
    DECLARE error_message VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        UPDATE Users
        SET userName = p_userName, 
        email = p_email, 
        joinDate = p_joinDate
        WHERE userID = p_userID;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Users for id: ', p_userID);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- Create User
DELIMITER //
CREATE PROCEDURE CreateUser(
    IN p_userName varchar(30),
    IN p_email varchar(255),
    IN p_joinDate date
)
BEGIN
    DECLARE error_message VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        INSERT INTO Users (userName, email, joinDate)
        VALUES (p_userName, p_email, p_joinDate);

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('Insert of Users failed.');
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- Delete Game
DELIMITER //
CREATE PROCEDURE DeleteGame(IN p_gameID int(11))
BEGIN
    DECLARE error_message VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM Games WHERE gameID = p_gameID;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Games for id: ', p_gameID);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- Update Game
DELIMITER //
CREATE PROCEDURE UpdateGame(
    IN p_gameID int(11),
    IN p_publisherID int(11),
    IN p_title varchar(1000)
)
BEGIN
    DECLARE error_message VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        UPDATE Games
        SET publisherID = p_publisherID, 
        title = p_title
        WHERE gameID = p_gameID;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Games for id: ', p_gameID);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- Create Game
DELIMITER //
CREATE PROCEDURE CreateGame(
    IN p_publisherID int(11),
    IN p_title varchar(1000)
)
BEGIN
    DECLARE error_message VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        INSERT INTO Games (publisherID, title)
        VALUES (p_publisherID, p_title);

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('Insert of Games failed.');
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- Delete UserGameEntry
DELIMITER //
CREATE PROCEDURE DeleteUserGameEntry(IN p_entryID int(11))
BEGIN
    DECLARE error_message VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM UserGameEntries WHERE entryID = p_entryID;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in UserGameEntries for id: ', p_entryID);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- Update UserGameEntry
DELIMITER //
CREATE PROCEDURE UpdateUserGameEntry(
    IN p_entryID int(11),
    IN p_userID int(11),
    IN p_gameID int(11),
    IN p_statusID int(11),
    IN p_hoursLogged int(11),
    IN p_rating int(2),
    IN p_review varchar(5000),
    IN p_hasFavorited boolean
)
BEGIN
    DECLARE error_message VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        UPDATE UserGameEntries
        SET userID = p_userID, 
        gameID = p_gameID, 
        statusID = p_statusID, 
        hoursLogged = p_hoursLogged, 
        rating = p_rating, 
        review = p_review, 
        hasFavorited = p_hasFavorited
        WHERE entryID = p_entryID;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in UserGameEntries for id: ', p_entryID);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- Create UserGameEntry
DELIMITER //
CREATE PROCEDURE CreateUserGameEntry(
    IN p_userID int(11),
    IN p_gameID int(11),
    IN p_statusID int(11),
    IN p_hoursLogged int(11),
    IN p_rating int(2),
    IN p_review varchar(5000),
    IN p_hasFavorited boolean
)
BEGIN
    DECLARE error_message VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        INSERT INTO UserGameEntries (userID, gameID, statusID, hoursLogged, rating, review, hasFavorited)
        VALUES (p_userID, p_gameID, p_statusID, p_hoursLogged, p_rating, p_review, p_hasFavorited);

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('Insert of UserGameEntries failed.');
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;
