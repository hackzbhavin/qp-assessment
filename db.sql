-- create database
-- dbname : grocery



DROP TABLE IF EXISTS admins;
CREATE TABLE admins (
  AdminId INT AUTO_INCREMENT PRIMARY KEY,
  FullName VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL COMMENT 'MD5 Hash password',
  IsActive BOOLEAN DEFAULT true,
  IsSoftDeleted BOOLEAN DEFAULT false,
  CreatedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UpdatedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);


INSERT INTO admins (FullName, Email, Password)
VALUES ('Bhavin Patil', 'bhavinpatil28@gmail.com', 'e10adc3949ba59abbe56e057f20f883e');


-- =================================================================

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  UserId INT AUTO_INCREMENT PRIMARY KEY,
  Email VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL COMMENT 'MD5 hashed password',
  IsActive BOOLEAN DEFAULT true,
  IsSoftDeleted BOOLEAN DEFAULT false,
  CreatedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UpdatedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);

DROP TABLE IF EXISTS userdetails;
CREATE TABLE userdetails (
  UserDetailId INT AUTO_INCREMENT PRIMARY KEY,
  UserId INT NOT NULL,
  FullName VARCHAR(255) NOT NULL,
  PhoneNumber VARCHAR(20) NOT NULL,
  Address VARCHAR(255) NOT NULL,
  FOREIGN KEY (UserId) REFERENCES users(UserId)
);

INSERT INTO users (Email, Password) VALUES ('john@wwe.com', 'e10adc3949ba59abbe56e057f20f883e');
INSERT INTO users (Email, Password) VALUES ('rock@wwe.com', 'e10adc3949ba59abbe56e057f20f883e');

INSERT INTO userdetails (UserId, FullName, PhoneNumber, Address) VALUES (1, 'John Cena', '1234567890', '123 Main Street');
INSERT INTO userdetails (UserId, FullName, PhoneNumber, Address) VALUES (2, 'Rock', '1234567891', '121 Main Street');


-- =================================================================

DROP TABLE IF EXISTS currency;
CREATE TABLE currency (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  Code VARCHAR(3) NOT NULL UNIQUE,
  Name VARCHAR(50) NOT NULL,
  Symbol VARCHAR(5) NOT NULL
);

INSERT INTO currency (Code, Name, Symbol) VALUES ('INR', 'Indian Rupee', '₹');
INSERT INTO currency (Code, Name, Symbol) VALUES ('USD', 'United States Dollar', '$');

-- =================================================================


DROP TABLE IF EXISTS items;
CREATE TABLE items (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  CurrencyId INT NOT NULL,
  Price DECIMAL(10, 2) NOT NULL,
  Quantity INT NOT NULL,
  IsActive BOOLEAN DEFAULT true,
  IsSoftDeleted BOOLEAN DEFAULT false,
  CreatedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UpdatedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CreatedById INT NOT NULL,
  UpdatedById INT NOT NULL,
  FOREIGN KEY (CreatedById) REFERENCES admins(AdminId),
  FOREIGN KEY (UpdatedById) REFERENCES admins(AdminId),
  FOREIGN KEY (CurrencyId) REFERENCES currency(Id)
);

-- Insert data into items table
INSERT INTO items (Name, CurrencyId, Price, Quantity, CreatedById, UpdatedById)
VALUES 
  ('Apple', 1, 1.50, 100, 1, 1),  -- Assuming CurrencyId 1 refers to INR and CreatedById 1 is an admin user
  ('Banana', 1, 0.75, 150, 1, 1);  -- Assuming CurrencyId 1 refers to INR and CreatedById 1 is an admin user


-- =================================================================
-- =========================== USP ======================================
-- =================================================================

DELIMITER //
DROP FUNCTION IF EXISTS ShortEncryptItemId//
CREATE FUNCTION ShortEncryptItemId(itemId INT) RETURNS CHAR(50)
BEGIN
    DECLARE encryptedItemId CHAR(50);
    
    SET encryptedItemId = MD5(itemId);
    
    RETURN encryptedItemId;
END //

DELIMITER ;


-- =================================================================


DELIMITER //
DROP PROCEDURE IF EXISTS GetExistingItems//
CREATE PROCEDURE GetExistingItems()
BEGIN
    SELECT 
        JSON_OBJECT(
            'ItemId', ShortEncryptItemId(I.Id),
            'Name', I.Name,
            'Currency', JSON_OBJECT(
                'Code', C.Code,
                'Name', C.Name,
                'Symbol', C.Symbol
            ),
            'Price', I.Price,
            'Quantity', I.Quantity,
            'IsActive', I.IsActive
        ) AS Item
    FROM items I
    INNER JOIN currency C ON C.Id = I.CurrencyId
    WHERE I.IsSoftDeleted = 0;
END //

DELIMITER ;



-- =================================================================


DELIMITER //
DROP PROCEDURE IF EXISTS GetItemsById//
CREATE PROCEDURE GetItemsById(INT id)
BEGIN

    SELECT 
    ShortEncryptItemId(I.Id) AS ItemId,
    I.Name,
    I.CurrencyId,
    I.Price,
    I.Quantity,
    I.IsActive
    FROM items I
    WHERE
    I.IsSoftDeleted = 0
    AND ShortEncryptItemId(I.Id) = id
    ; 
    
END //
DELIMITER ;

-- =================================================================

DELIMITER //
DROP PROCEDURE IF EXISTS InsertItem//
CREATE PROCEDURE InsertItem(
    IN itemName VARCHAR(255),
    IN currencyId INT,
    IN itemPrice DECIMAL(10, 2),
    IN itemQuantity INT,
    IN adminId INT
)
BEGIN
    INSERT INTO items (Name, CurrencyId, Price, Quantity, CreatedById, UpdatedById)
    VALUES (itemName, currencyId, itemPrice, itemQuantity, adminId, adminId);
END //

DELIMITER ;

-- =================================================================

DELIMITER //

DROP PROCEDURE IF EXISTS UpdateItem//

CREATE PROCEDURE UpdateItem(
    IN p_itemId VARCHAR(50),
    IN p_itemName VARCHAR(255),
    IN p_currencyId INT,
    IN p_itemPrice DECIMAL(10, 2),
    IN p_itemQuantity INT,
    IN p_adminId INT
)
BEGIN
    UPDATE items
    SET 
        Name = IFNULL(p_itemName, Name),
        CurrencyId = IFNULL(p_currencyId, CurrencyId),
        Price = IFNULL(p_itemPrice, Price),
        Quantity = IFNULL(p_itemQuantity, Quantity),
        UpdatedById = p_adminId
    WHERE ShortEncryptItemId(Id) = p_itemId;
END //

DELIMITER ;

-- =================================================================


DELIMITER //
DROP PROCEDURE IF EXISTS RemoveItem//
CREATE PROCEDURE RemoveItem(
    IN p_itemId VARCHAR(50),
    IN p_adminId INT
)
BEGIN
    UPDATE items
    SET IsSoftDeleted = 1,
        UpdatedById = p_adminId
    WHERE ShortEncryptItemId(Id) = p_itemId;
END //

DELIMITER ;

-- =================================================================
DELIMITER //
DROP PROCEDURE IF EXISTS ManageInventory//
CREATE PROCEDURE ManageInventory(
    IN itemId INT,
    IN action ENUM('increase', 'decrease'),
    IN amount INT
)
BEGIN
    IF action = 'increase' THEN
        UPDATE items SET Quantity = Quantity + amount WHERE Id = itemId;
    ELSE
        UPDATE items SET Quantity = Quantity - amount WHERE Id = itemId AND Quantity >= amount;
    END IF;
END//
DELIMITER ;
