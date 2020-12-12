/*looking ruff schema*/

CREATE DATABASE looking_ruff_db;
USE looking_ruff_db;


/*stylist table*/
CREATE TABLE stylist (
    id INT NOT NULL AUTO_INCREMENT,
    stylist_name VARCHAR(100) NOT NULL,
    createdAt DATETIME DEFAULT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY (id)
);

/*roles table*/
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    role_name VARCHAR(100) NOT NULL,
    createdAt DATETIME DEFAULT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY (id)
);

/*dog_breed table*/
CREATE TABLE dog_breed (
    id INT NOT NULL AUTO_INCREMENT,
    breed_name VARCHAR(100) NOT NULL,
    breed_type_id INT DEFAULT NULL,
    breed_origin VARCHAR(100) DEFAULT NULL,
    breed_image VARCHAR(255) COLLATE UTF8_UNICODE_CI DEFAULT NULL,
    breed_pdf VARCHAR(255) COLLATE UTF8_UNICODE_CI DEFAULT NULL,
    createdAt DATETIME DEFAULT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY (id)
);


/*dog breed type*/
CREATE TABLE dog_breed_type (
    id INT NOT NULL AUTO_INCREMENT,
    breed_type_name VARCHAR(255) COLLATE UTF8_UNICODE_CI DEFAULT NULL,
    breed_type_id INT DEFAULT NULL,
    createdAt DATETIME DEFAULT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY (id)
);


/*dog_temperment table*/
CREATE TABLE dog_temperment (
    id INT NOT NULL AUTO_INCREMENT,
    temperment VARCHAR(100) NOT NULL,
    createdAt DATETIME DEFAULT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY (id)
);


/*dog_notes table */
CREATE TABLE dog_notes (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT(11) DEFAULT NULL,
    note VARCHAR(350) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY (id)
);

/*customer_images table */
CREATE TABLE customer_images (
    id TINYINT NOT NULL AUTO_INCREMENT,
    user_id INT(11) DEFAULT NULL,
    image VARCHAR(255) COLLATE UTF8_UNICODE_CI DEFAULT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY (id)
);

/*appointments table */
CREATE TABLE appointments (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT(11) NOT NULL,
    stylist_id INT(11) NOT NULL,
    appointment_date VARCHAR(50) NOT NULL,
    service_id INT(11) DEFAULT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    complete BOOLEAN DEFAULT NULL,
    PRIMARY KEY (id)
);


/*services table */
CREATE TABLE services (
    id INT NOT NULL AUTO_INCREMENT,
    service_descr VARCHAR(100) NOT NULL,
    price FLOAT DEFAULT NULL,
    duration VARCHAR(100) DEFAULT NULL,
    createdAt DATETIME DEFAULT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY (id)
);


/*services working_days */
CREATE TABLE working_days (
    id INT NOT NULL AUTO_INCREMENT,
    workday VARCHAR(50) NOT NULL,
    start_time VARCHAR(50) NOT NULL,
    end_time VARCHAR(50) NOT NULL,
    active BOOLEAN NOT NULL,
    createdAt DATETIME DEFAULT NULL,
    updatedAt DATETIME DEFAULT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE Users (
    id INT(11) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) COLLATE UTF8_UNICODE_CI NOT NULL,
    last_name VARCHAR(255) COLLATE UTF8_UNICODE_CI NOT NULL,
    email VARCHAR(128) COLLATE UTF8_UNICODE_CI NOT NULL,
    address VARCHAR(200) COLLATE UTF8_UNICODE_CI NOT NULL,
    address2 VARCHAR(200) COLLATE UTF8_UNICODE_CI DEFAULT NULL,
    city VARCHAR(128) COLLATE UTF8_UNICODE_CI NOT NULL,
    state VARCHAR(5) COLLATE UTF8_UNICODE_CI NOT NULL,
    zip_code VARCHAR(5) COLLATE UTF8_UNICODE_CI NOT NULL,
    phone VARCHAR(45) COLLATE UTF8_UNICODE_CI NOT NULL,
    role_id INT(11) DEFAULT NULL,
    dog_name VARCHAR(255) COLLATE UTF8_UNICODE_CI DEFAULT NULL,
    dog_breed_id INT DEFAULT NULL,
    dog_temperament_id VARCHAR(255) COLLATE UTF8_UNICODE_CI DEFAULT NULL,
    image_id TINYINT(3) DEFAULT '0',
    dog_note TEXT DEFAULT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY email (email)
);
