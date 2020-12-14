/*looking ruff schema*/

CREATE DATABASE looking_ruff_db;
USE looking_ruff_db;


/*stylist table*/
CREATE TABLE stylist (
    id INT NOT NULL AUTO_INCREMENT,
    stylistName VARCHAR(100) NOT NULL,
    createdAt DATETIME DEFAULT NULL,
    updatedAt DATETIME DEFAULT NULL,
    PRIMARY KEY (id)
);

/*roles table*/
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    roleName VARCHAR(100) NOT NULL,
    createdAt DATETIME DEFAULT NULL,
    updatedAt DATETIME DEFAULT NULL,
    PRIMARY KEY (id)
);

/*dog_breed table*/
CREATE TABLE dogBreed (
    id INT NOT NULL AUTO_INCREMENT,
    breedName VARCHAR(100) NOT NULL,
    breedTypeId INT DEFAULT NULL,
    breedOrigin VARCHAR(100) DEFAULT NULL,
    breedImage VARCHAR(255) COLLATE UTF8_UNICODE_CI DEFAULT NULL,
    breedPdf VARCHAR(255) COLLATE UTF8_UNICODE_CI DEFAULT NULL,
    createdAt DATETIME DEFAULT NULL,
    updatedAt DATETIME DEFAULT NULL,
    PRIMARY KEY (id)
);


/*dog breed type*/
CREATE TABLE dogBreedType (
    id INT NOT NULL AUTO_INCREMENT,
    breedTypeName VARCHAR(255) COLLATE UTF8_UNICODE_CI DEFAULT NULL,
    breedTypeId INT DEFAULT NULL,
    createdAt DATETIME DEFAULT NULL,
    updatedAt DATETIME DEFAULT NULL,
    PRIMARY KEY (id)
);


/*dog_temperment table*/
CREATE TABLE dogTemperment (
    id INT NOT NULL AUTO_INCREMENT,
    temperment VARCHAR(100) NOT NULL,
    createdAt DATETIME DEFAULT NULL,
    updatedAt DATETIME DEFAULT NULL,
    PRIMARY KEY (id)
);


/*dog_notes table */
CREATE TABLE dogNotes (
    id INT NOT NULL AUTO_INCREMENT,
    userId INT(11) DEFAULT NULL,
    note VARCHAR(350) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME DEFAULT NULL,
    PRIMARY KEY (id)
);

/*customer_images table */
CREATE TABLE customerImages (
    id TINYINT NOT NULL AUTO_INCREMENT,
    userId INT(11) DEFAULT NULL,
    image VARCHAR(255) COLLATE UTF8_UNICODE_CI DEFAULT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME DEFAULT NULL,
    PRIMARY KEY (id)
);

/*appointments table */
CREATE TABLE appointments (
    id INT NOT NULL AUTO_INCREMENT,
    userId INT(11) NOT NULL,
    stylistId INT(11) NOT NULL,
    appointmentDate VARCHAR(50) NOT NULL,
    serviceId INT(11) DEFAULT NULL,
    createdAt DATETIME NOT NULL,
    complete BOOLEAN DEFAULT NULL,
    updatedAt DATETIME DEFAULT NULL,
    PRIMARY KEY (id)
);


/*services table */
CREATE TABLE services (
    id INT NOT NULL AUTO_INCREMENT,
    description VARCHAR(100) NOT NULL,
    price FLOAT DEFAULT NULL,
    duration VARCHAR(100) DEFAULT NULL,
    createdAt DATETIME DEFAULT NULL,
    updatedAt DATETIME DEFAULT NULL,
    PRIMARY KEY (id)
);


/*services working_days */
CREATE TABLE workingDays (
    id INT NOT NULL AUTO_INCREMENT,
    workday VARCHAR(50) NOT NULL,
    startTime VARCHAR(50) NOT NULL,
    endTime VARCHAR(50) NOT NULL,
    active BOOLEAN NOT NULL,
    createdAt DATETIME DEFAULT NULL,
    updatedAt DATETIME DEFAULT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE Users (
    id INT(11) NOT NULL AUTO_INCREMENT,
    isAdmin BOOLEAN DEFAULT false,
    firstName VARCHAR(255) COLLATE UTF8_UNICODE_CI NOT NULL,
    lastName VARCHAR(255) COLLATE UTF8_UNICODE_CI NOT NULL,
    email VARCHAR(128) COLLATE UTF8_UNICODE_CI NOT NULL,
    address VARCHAR(200) COLLATE UTF8_UNICODE_CI NOT NULL,
    address2 VARCHAR(200) COLLATE UTF8_UNICODE_CI DEFAULT NULL,
    city VARCHAR(128) COLLATE UTF8_UNICODE_CI NOT NULL,
    state VARCHAR(5) COLLATE UTF8_UNICODE_CI NOT NULL,
    zipCode VARCHAR(5) COLLATE UTF8_UNICODE_CI NOT NULL,
    phone VARCHAR(45) COLLATE UTF8_UNICODE_CI NOT NULL,
    roleId INT(11) DEFAULT NULL,
    dogName VARCHAR(255) COLLATE UTF8_UNICODE_CI DEFAULT NULL,
    dogBreedId INT DEFAULT NULL,
    dogTempramentId VARCHAR(255) COLLATE UTF8_UNICODE_CI DEFAULT NULL,
    imageId TINYINT(3) DEFAULT '0',
    dogNote TEXT DEFAULT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY email (email)
);


/*add foreign key to appointments for user_id*/

ALTER TABLE `looking_ruff_db`.`appointments` 
ADD INDEX `fk_user_id_idx` (`userId` ASC);
;
ALTER TABLE `looking_ruff_db`.`appointments` 
ADD CONSTRAINT `fk_user_id`
  FOREIGN KEY (`userId`)
  REFERENCES `looking_ruff_db`.`Users` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;