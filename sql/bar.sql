-- create the database
DROP DATABASE IF EXISTS cst336project;
CREATE DATABASE cst336project;

-- select the database
USE cst336project;

-- bar table
CREATE TABLE IF NOT EXISTS `cst336project`.`bars`(
`bar_id` INT(5) NOT NULL AUTO_INCREMENT,
`candy_name` VARCHAR(45) NOT NULL,
`wrap_color` VARCHAR(45) NOT NULL,
`nut` CHAR(1) NOT NULL,
`nut_type` VARCHAR(45) NOT NULL,
`size_oz` FLOAT(5,2) NOT NULL,
`kcal` FLOAT(5) NOT NULL,
`price` NUMERIC(5,2) NOT NULL,
PRIMARY KEY(`bar_id`));

-- insert rows into the tables
INSERT INTO bars VALUES
(1,'Kit Kat','red','n','none',1.5,210,1.50), 
(2,'Snickers','brown','y','peanuts',1.86,250,1.75), 
(3,'Twix','gold','n','none',1.79,250,1.50), 
(4,'Reeses Peanut Butter Cups','orange','y','peanuts',1.5,210,1.75), 
(5,'Milky Way','brown','n','none',1.84,240,1.50), 
(6,'Butterfinger','yellow','y','peanuts',1.9,250,1.75), 
(7,'Hershey Bar','brown','n','none',1.55,220,1.50), 
(8,'Almond Joy','blue','y','almonds_coconut',1.61,220,2.00), 
(9,'3 Musketeers','silver','n','none',1.92,240,1.50), 
(10,'Baby Ruth','silver','y','peanuts',2.1,280,1.75), 
(11,'100 Grand Bar','red','n','none',1.5,190,1.50), 
(12,'Mounds','red','n','coconut',1.75,240,1.75), 
(13,'Nestle Crunch','blue','n','none',1.55,220,1.50), 
(14,'Mr. Goodbar','yellow','y','peanuts',1.75,260,1.75), 
(15,'Heath','brown','n','none',1.4,210,1.50),
(16,'Skor','black','n','none',1.4,200,1.50),
(17,'Oh Henry!','yellow','y','peanuts',1.8,240,1.75),
(18,'5th Avenue','brown','y','peanuts',2.0,260,1.75),
(19,'Whatchamacallit','tan','y','peanuts',1.6,230,1.75),
(20,'Cadbury Creme Egg','purple','n','none',1.2,150,2.00);

