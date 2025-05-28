DROP PROCEDURE IF EXISTS DeleteUser;
DROP PROCEDURE IF EXISTS UpdateUser;
DROP PROCEDURE IF EXISTS CreateUser;

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
