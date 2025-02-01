-- CREATE DATABASE LBPS;


CREATE TABLE StudentInformation (
    StudentID INT PRIMARY KEY ,
    StudentName VARCHAR(100) NOT NULL,
    CurrentPoints INT DEFAULT 0
);

CREATE TABLE RedeemableItems (
    ItemID INT PRIMARY KEY,
    ItemName VARCHAR(100) NOT NULL,
    QuantityAvailable INT DEFAULT 0,
    ItemValue INT NOT NULL
);
