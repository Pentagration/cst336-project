-- select the database
USE cst336project;

-- bar table
CREATE TABLE IF NOT EXISTS `cst336project`.`inventory`(
`bar_id` INT(5) NOT NULL AUTO_INCREMENT,
`qty_instock` INT(5) NOT NULL,        -- Quantity available to sell
`qty_inshipping` INT(5) NOT NULL,     -- Quantity waiting to be shipped to customers
`qty_shipped` INT(5),                 -- Lifetime counter of the quantity shipped
`qty_on_order` INT (5) NOT NULL,      -- Quantity on order from the supplier
PRIMARY KEY(`bar_id`));

-- insert rows into the tables
INSERT INTO inventory VALUES
(1,100,0,0,0), 
(2,100,0,0,0), 
(3,100,0,0,0), 
(4,100,0,0,0), 
(5,100,0,0,0), 
(6,100,0,0,0), 
(7,100,0,0,0), 
(8,100,0,0,0), 
(9,100,0,0,0), 
(10,100,0,0,0), 
(11,100,0,0,0), 
(12,100,0,0,0), 
(13,100,0,0,0), 
(14,100,0,0,0), 
(15,100,0,0,0),
(16,100,0,0,0),
(17,100,0,0,0),
(18,100,0,0,0),
(19,100,0,0,0),
(20,100,0,0,0);
