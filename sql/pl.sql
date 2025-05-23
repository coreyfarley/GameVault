-- PL/SQL File containing Procedure Language SQL for GameVault
-- This file contains stored procedures for CUD (Create, Update, Delete) operations

-- Demo DELETE procedure to test RESET functionality
-- Deletes a specific user by userID
DELIMITER //
CREATE PROCEDURE DeleteTestUser(IN p_userID INT)
BEGIN
    DELETE FROM Users WHERE userID = p_userID;
END //
DELIMITER ;

-- Additional stored procedures can be added here for future CUD operations
