-- select the database
USE cst336_db026;

-- authentication table
CREATE TABLE `cst336_db026`.`p_authentication` (
  `userID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(25) NOT NULL,
  `password` VARCHAR(72) NOT NULL,
  PRIMARY KEY (`userID`));

-- insert rows into the tables
INSERT INTO p_authentication VALUES
(1,'adam@p5.com','$2y$12$H9hWKM0v2LY626bxgy8omONrh5JK8w7XUJ4S/xoAA.rvQv.wNIB1u'),
(2,'colin@p5.com','$2y$12$r/EOAK.WIky5osvKxUFLDO26ADdy7rAOL7mhqbRjp99Hd5p88k9Ou'),
(3,'jason@p5.com','$2y$12$L6LMYR.WC0rfp5fhTin5Fewwr0Xx9Su.fTADIOLtltmkkNkDUe7ya'),
(4,'marcus@p5.com','$2y$12$1j8WHgUhr2mDYMJds.IF5uSNQ8ZW7mz9HGpgrGBXbsjnWTz/hMCBq'),
(5,'admin@p5.com','$2y$12$dPjb/g/XeQoyhGaH4pRxTOgR/QlVLMqn2MTJ02q3j8OZOnl4AQy2S');
