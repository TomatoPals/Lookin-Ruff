
/*insert user*/
INSERT INTO Users (isAdmin, firstName, lastName, email, address, address2, city, state, zipCode, phone,dogName, dogType, dogTemperament, password, createdAt, updatedAt) VALUES (true, 'Test', 'Account', 'test@test.com', '1234 Fake Street', 'Apt 1', 'Raleigh', 'NC', '27606', '919-555-1212','Spike', '283', '1', '$2a$10$RFWvjbxeUrEOLo5S91QOmewGQzds.WlqS9JKm0md.E.M0jmm31CKy', '2020-12-12 01:04:43', '2020-12-12 01:04:43');

/*insert stylist*/
INSERT INTO stylists (stylistName, createdAt) VALUES ('Bill Murray', '2020-12-11 09:36:27');

/*insert services*/
INSERT INTO services (description, price, duration, createdAt) VALUES ('15-minute brushing', '20.00', '15', '2020-12-11 09:36:27');
INSERT INTO services (description, price, duration, createdAt) VALUES ('Nail trim', '10.00', '20', '2020-12-11 09:36:27');
INSERT INTO services (description, price, duration, createdAt) VALUES ('Ear cleaning, hair removal & flushing (if needed)', '20.00', '20', '2020-12-11 09:36:27');
INSERT INTO services (description, price, duration, createdAt) VALUES ('Scissoring feet & pad shaving', '20.00', '30', '2020-12-11 09:36:27');
INSERT INTO services (description, price, duration, createdAt) VALUES ('Sanitary trim', '15.00', '60', '2020-12-11 09:36:27');
INSERT INTO services (description, price, duration, createdAt) VALUES ('Anal gland cleaning', '1000.00', '60', '2020-12-11 09:36:27');
INSERT INTO services (description, price, duration, createdAt) VALUES ('Bandana or bow', '10', '15', '2020-12-11 09:36:27');

/*sample appointments*/

INSERT INTO appointments (userId, stylistId, appointmentDate, appointmentTime, serviceId, createdAt) VALUES ('1', '1', '2020-12-12', '1:30','2', '2020-12-12 01:04:43');
INSERT INTO appointments (userId, stylistId, appointmentDate, appointmentTime, serviceId, createdAt) VALUES ('1', '1', '2020-12-12', '4:00','1', '2020-12-12 01:04:43');

