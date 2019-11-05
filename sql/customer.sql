-- select the database
USE cst336project;

-- customer table
CREATE TABLE IF NOT EXISTS `cst336project`.`customer` (
    `customer_id` INT(11) NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `street_address` VARCHAR(45) NOT NULL,
    `city` VARCHAR(45) NOT NULL,
    `state` CHAR(2) NOT NULL,
    `zip` VARCHAR(10) NOT NULL,
    PRIMARY KEY (`customer_id`)
);

-- customer table
INSERT INTO customer VALUES 
(1,'Tony','Stark','10880 Malibu Point','Malibu','CA',90265),
(2,'Natasha','Romanoff','200 Park Avenue','New York','NY',10017),
(3,'Steve','Rogers','569 Leaman Place','Brooklyn Heights','NY',11201),
(4,'Bucky','Barnes','U.S. Army Camp Lehigh','','VA',''),
(5,'Bruce','Banner','1 Green Guy','Dayton','OH',45390),
(6,'Thor','','Asgard','Ida Galaxy','',''),
(7,'Quentin','Beck','Hole Way Apt 1A','Riverside','CA',92501),
(8,'Clint','Barton','Barton Farm','Waverly','OH',45690),
(9,'Thanos','','Titan','Marvel Universe','',''),
(10,'Peter','Parker','20 Ingram Street','Flushing','NY',11375);
