CREATE DATABASE Breakdown_company;
USE Breakdown_company;


-- TASK 1
CREATE TABLE Members (
	MemberID varchar(10) PRIMARY KEY, 
	MFName VARCHAR(20), 
	MLName VARCHAR(20),
	MLoc VARCHAR(20)
);

CREATE TABLE Vehicle (
    VehReg VARCHAR(10) PRIMARY KEY,
    VehMake VARCHAR(10),
    VehModel VARCHAR(10),
    MemberID VARCHAR(10),
    CONSTRAINT MemberID FOREIGN KEY (MemberID) REFERENCES Members(MemberID)
);

CREATE TABLE Engineer (
	EngID INT PRIMARY KEY,
    EFName VARCHAR(20),
    ELName VARCHAR(20)
);

CREATE TABLE EngVan (
    VanReg VARCHAR(10) PRIMARY KEY,
    VanMake VARCHAR(10),
    VanModel VARCHAR(10),
    VMileage INT,
    EngID INT,
    CONSTRAINT EngID FOREIGN KEY (EngID) REFERENCES Engineer(EngID)
);

CREATE TABLE Breakdown (
    BDID INT(10) PRIMARY KEY,
    VehReg VARCHAR(10),
    VanReg VARCHAR(10),
    BDDATE DATE,
    BDTIME TIME,
    BDLoc VARCHAR(20),
    CONSTRAINT VehReg FOREIGN KEY (VehReg) REFERENCES Vehicle(VehReg),
    CONSTRAINT VanReg FOREIGN KEY (VanReg) REFERENCES EngVan(VanReg)
);


-- TASK 2
INSERT INTO Members (MemberID, MFName, MLName, MLoc)
VALUES
    (1, 'Linet', 'Piggot', 'Bristol'),
    (2, 'Tedd', 'Carnew', 'London'),
    (3, 'Nathalia', 'Drever', 'London'),
    (4, 'Neil', 'Ygo', 'Oxford'),
    (5, 'Brigg', 'Stickford', 'Luton'),
    (6, 'Ardyth', 'Rosettini', 'Liverpool'),
    (7, 'Hedvig', 'Bedingfield', 'Blackpool'),
    (8, 'Connie', 'Hughill', 'Preston'),
    (9, 'Filbert', 'Marchant', 'Cambridge'),
    (10, 'Morissa', 'Shasnan', 'Newcastle'),
    (11, 'Kile', 'Shelsher', 'Liverpool'),
    (12, 'Levin', 'Maase', 'London'),
    (13, 'Davina', 'Dolman', 'Bristol'),
    (14, 'Freeland', 'Girardetti', 'Bath'),
    (15, 'Mason', 'Dalyell', 'Exeter');

INSERT INTO Vehicle (VehReg, VehMake, VehModel, MemberID)
VALUES
    ('JN1CV6APXC', 'BMW', 'X5', 14),
    ('KMHGH4JH4C', 'Mitsubishi', 'Rider', 12),
    ('WAUFL44D83', 'Pontiac', 'Firebird', 15),
    ('1GKKRNED8B', 'GMC', 'Yukon', 11),
    ('JA32X2HU3C', 'GMC', 'Canyon', 11),
    ('WAUMF78K49', 'BMW', 'Z3', 5),
    ('19UUA9F51C', 'Mazda', 'Protege', 12),
    ('4T1BD1FK2F', 'Chevrolet', 'Suburban', 12);
    
INSERT INTO Engineer (EngID, EFName, ELName)
VALUES
	(1,'Dorris','Ashwood'),
	(2,'Suzi','Adame'),
	(3,'Urban','Jiricka');
    
INSERT INTO EngVan (VanReg, VanMake, VanModel, EngID, VMileage)
VALUES
    ('ABC123', 'Ford', 'Transit', 1, 60000),
    ('DEF456', 'Mercedes', 'Sprinter', 2, 70000),
    ('GHI789', 'Volkswagen', 'Transport', 3, 65000),
    ('JKL012', 'Renault', 'Master', 1, 75000),
    ('MNO345', 'Fiat', 'Ducato', 3, 50000);
    
INSERT INTO Breakdown (BDID, VehReg, VanReg, BDDATE, BDTIME, BDLoc)
VALUES
	(1, 'JN1CV6APXC', 'ABC123', '2023-05-17', '10:00:00', 'Bath'),
	(2, 'KMHGH4JH4C', 'DEF456', '2023-05-17', '12:30:00', 'London'),
	(3, 'WAUFL44D83', 'GHI789', '2023-06-10', '09:45:00', 'Exeter'),
	(4, '1GKKRNED8B', 'JKL012', '2023-06-15', '14:15:00', 'London'),
    (5, 'JA32X2HU3C', 'MNO345', '2023-07-05', '11:30:00', 'Liverpool'),
    (6, 'WAUMF78K49', 'ABC123', '2023-07-05', '15:45:00', 'Luton'),
    (7, '19UUA9F51C', 'DEF456', '2023-08-02', '10:20:00', 'Bristol'),
    (8, '4T1BD1FK2F', 'JKL012', '2023-08-05', '13:00:00', 'London'),
	(9, 'JN1CV6APXC', 'GHI789', '2023-09-15', '16:30:00', 'Bath'),
	(10, 'KMHGH4JH4C', 'JKL012', '2023-09-22', '09:00:00', 'London'),
	(11, 'WAUFL44D83', 'ABC123', '2023-09-22', '11:45:00', 'Exeter'),
	(12, '1GKKRNED8B', 'DEF456', '2023-09-30', '14:30:00', 'London');


-- TASK 3
SELECT MFName, MLName
FROM Members 
WHERE MLoc = 'London';

SELECT *
FROM Vehicle 
WHERE VehMake = 'GMC'; 

SELECT COUNT(*) AS num_engineers
FROM Engineer;

SELECT COUNT(*) AS num_members
FROM Members;

SELECT *
FROM Breakdown
WHERE BDDATE > '2023-07-26';

SELECT *
FROM Breakdown
WHERE BDDATE > '2023-05-26' AND BDDATE < '2023-07-26';

SELECT COUNT(*) AS num_brokendowns
FROM Breakdown 
WHERE VehReg = 'WAUFL44D83';

SELECT VehReg, COUNT(*) AS num_brokendowns
FROM Breakdown
GROUP BY VehReg
HAVING COUNT(*) > 1;


-- TASK 4
CREATE TABLE MshipType (
    MTID INT PRIMARY KEY,
    Type VARCHAR(6),
    MPrice DECIMAL(4, 2)
);

INSERT INTO MshipType (MTID, Type, MPrice)
VALUES
    (1, 'Gold', 99.99),
    (2, 'Silver', 59.99),
    (3, 'Bronze', 39.99);
    

-- TASK 5
ALTER TABLE Members
ADD MTID INT NULL,
ADD FOREIGN KEY (MTID) REFERENCES MshipType(MTID);

UPDATE Members
SET MTID = FLOOR(1 + RAND() * 3);


-- TASK 6
SELECT *
FROM Vehicle
INNER JOIN Members
ON Vehicle.MemberID = Members.MemberID
WHERE Members.MemberID = 12;

SELECT Members.MemberID, COUNT(*) AS num_vehicle
FROM Vehicle
INNER JOIN Members ON Vehicle.MemberID = Members.MemberID
GROUP BY Members.MemberID
ORDER BY num_vehicle DESC;

SELECT COUNT(*) AS num_vans
FROM EngVan
WHERE EngID = 1;

SELECT *
FROM Members
INNER JOIN Vehicle ON Vehicle.MemberID = Members.MemberID
INNER JOIN Breakdown ON Vehicle.VehReg = Breakdown.VehReg
WHERE Breakdown.BDLoc = 'Bath';

SELECT *
FROM Members
INNER JOIN Vehicle ON Vehicle.MemberID = Members.MemberID
INNER JOIN Breakdown ON Vehicle.VehReg = Breakdown.VehReg
INNER JOIN EngVan ON Breakdown.VanReg = EngVan.VanReg
INNER JOIN Engineer ON EngVan.EngID = Engineer.EngID;

SELECT Breakdown.*, Members.*, Engineer.*
FROM Breakdown
INNER JOIN Vehicle ON Breakdown.VehReg = Vehicle.VehReg
INNER JOIN Members ON Vehicle.MemberID = Members.MemberID
INNER JOIN EngVan ON Breakdown.VanReg = EngVan.VanReg
INNER JOIN Engineer ON EngVan.EngID = Engineer.EngID
WHERE Breakdown.BDDATE >= '2023-06-01' AND Breakdown.BDDATE <= '2023-09-01';

-- The total number of breakdowns each engineer has attended
SELECT Engineer.EngID, Engineer.EFName, Engineer.ELName, COUNT(Breakdown.BDID) AS Total_Breakdowns_Attended
FROM Breakdown
INNER JOIN EngVan ON Breakdown.VanReg = EngVan.VanReg
INNER JOIN Engineer ON EngVan.EngID = Engineer.EngID
GROUP BY Engineer.EngID, Engineer.EFName, Engineer.ELName
ORDER BY Total_Breakdowns_Attended DESC;

-- The total revenue from membership by type
SELECT MshipType.Type, COUNT(Members.MemberID) AS Total_Members, (MshipType.MPrice * COUNT(Members.MemberID)) AS Total_Revenue
FROM Members
INNER JOIN MshipType ON Members.MTID = MshipType.MTID
GROUP BY MshipType.Type, MshipType.MPrice;

-- The vehicles with the highest number of breakdowns
SELECT Vehicle.VehMake, Vehicle.VehModel, COUNT(Breakdown.BDID) AS Number_of_Breakdowns
FROM Vehicle
INNER JOIN Breakdown ON Vehicle.VehReg = Breakdown.VehReg
GROUP BY Vehicle.VehMake, Vehicle.VehModel
ORDER BY Number_of_Breakdowns DESC;


-- TASK 7
CREATE DATABASE PastryShopDB;
USE PastryShopDB;

CREATE TABLE Orders (
	OrderID INT PRIMARY KEY,
    CustomerID INT,
    OrderDate DATE,
    Quantity INT,
    Price DECIMAL(6, 2)
);

INSERT INTO Orders (OrderID, CustomerID, OrderDate, Quantity, Price)
VALUES 
    (1, 1, '2023-01-01', 5, 2.99),  
    (2, 2, '2023-02-01', 2, 3.99),  
    (3, 3, '2023-03-01', 1, 4.99),  
    (4, 1, '2023-04-01', 10, 1.99), 
    (5, 2, '2023-05-01', 3, 3.50),  
    (6, 3, '2023-06-01', 2, 4.75),  
    (7, 1, '2023-07-01', 4, 3.25),  
    (8, 2, '2023-08-01', 5, 2.99),  
    (9, 3, '2023-09-01', 6, 3.99),  
    (10, 1, '2023-10-01', 7, 2.50); 
    
SELECT AVG(Quantity) AS AverageQuantity
FROM Orders;

SELECT MAX(Price) AS MaxPrice
FROM Orders;

SELECT MIN(Price) AS MinPrice
FROM Orders;

SELECT SUM(Quantity) AS TotalPastries
FROM Orders;

SELECT SUM(Quantity * Price) AS TotalRevenue
FROM Orders;


-- TASK 8
SELECT Members.MemberID, Members.MFName, Members.MLName, 
CASE 
    WHEN COUNT(Vehicle.VehReg) > 1 THEN 'Yes'
    ELSE 'No'
END AS Multi_Car_Policy
FROM Members
INNER JOIN Vehicle ON Members.MemberID = Vehicle.MemberID
GROUP BY Members.MemberID, Members.MFName, Members.MLName;

ALTER TABLE Vehicle
ADD BasePremium DECIMAL(8, 2) DEFAULT 100.00; 

SELECT Vehicle.VehReg, Vehicle.VehMake, Vehicle.VehModel, COUNT(Breakdown.BDID) AS NumberOfBreakdowns, 
Vehicle.BasePremium,
CASE 
    WHEN COUNT(Breakdown.BDID) > 2 THEN Vehicle.BasePremium * 1.10
    WHEN COUNT(Breakdown.BDID) = 2 THEN Vehicle.BasePremium * 1.05
    WHEN COUNT(Breakdown.BDID) = 1 THEN Vehicle.BasePremium
    ELSE Vehicle.BasePremium * 0.90
END AS AdjustedPremium
FROM Vehicle
LEFT JOIN Breakdown ON Vehicle.VehReg = Breakdown.VehReg
GROUP BY Vehicle.VehReg, Vehicle.VehMake, Vehicle.VehModel, Vehicle.BasePremium;

