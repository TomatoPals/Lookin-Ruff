// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const nodemailer = require("nodemailer");

module.exports = function(app) {
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });
  app.post("/api/signup", (req, res) => {
    //posting to db user table
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      address: req.body.address,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      dogName: req.body.dogName,
      dogBreedId: req.body.dogBreedId,
      dogNote: req.body.dogNote
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        address: req.user.address,
        address2: req.user.address2,
        phone: req.user.phone,
        city: req.user.city,
        state: req.user.state,
        zipCode: req.user.zipCode,
        phone: req.user.phone,
        dogName: req.user.dogName,
        dogBreedId: req.user.dogBreedId,
        dogTempramentId: req.user.dogTempramentId,
        imageId: req.user.imageId,
        dogNote: req.user.dogNote
      });
    }
  });

  //Route for sending email
  app.post("/api/send", (req, res) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_LOGIN,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    const mailOptions = {
      from: "'Do Not Reply' <appointments@lookinruff.com>",
      to: `${req.body.email}`,
      subject: "Lookin-Ruff Appointment",
      html: `<b>Your upcoming appointment is scheduled for: ${req.body.appointmentDate}</b>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message %s sent: %s", info.messageId, info.response);
      res.render("index");
    });
  });

  //route for creating appointment
  app.post("/api/appointments", async (req, res) => {
    const {
      UserId,
      stylistId,
      appointmentDate,
      appointmentTime,
      serviceId,
      complete
    } = req.body;

    try {
      const createAppointment = await db.appointments.create({
        UserId,
        stylistId,
        appointmentDate,
        appointmentTime,
        serviceId,
        complete
      });
      res.json(createAppointment);
    } catch (error) {
      res.json(error);
    }
  });

  //route for

  // route for getting user appointment info
  app.get("/api/appointments", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      db.appointments
        .findAll({ where: { id: `${req.user.id}` } })
        .then(dbget => {
          res.json(dbget);
        });
    }
  });

  app.get("/api/appointments/:date", async (req, res) => {
    const dbStylist = await db.appointments.findAll({
      where: {
        appointmentDate: req.params.date
      },
      include: db.User
    });
    res.json(dbStylist);
  });

  //route for updating appointment info
  app.put("/api/appointments", async (req, res) => {
    const dbAppointment = await db.appointments.update(req.body, {
      where: {
        userId: req.body.user_id
      }
    });
    res.json(dbAppointment);
  });

  //route for adding a stylist
  app.post("/api/stylist", async (req, res) => {
    try {
      const createStylist = await db.stylists.create({
        stylistName: req.body.stylistName
      });
      res.json(createStylist);
    } catch (error) {
      res.json(error);
    }
  });

  //route for getting stylists
  app.get("/api/stylist", async (req, res) => {
    const dbStylist = await db.stylists.findAll({});
    res.json(dbStylist);
  });

  //route for deleteing a stylist
  app.delete("/api/stylist/:id", async (req, res) => {
    const dbStylist = await db.stylists.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json(dbStylist);
  });

  //route for adding a service
  app.post("/api/services", async (req, res) => {
    const { description, price, duration } = req.body;
    try {
      const createService = await db.services.create({
        description,
        price,
        duration
      });
      res.json(createService);
    } catch (error) {
      res.json(error);
    }
  });

  //route for getting services
  app.get("/api/services", async (req, res) => {
    const dbServices = await db.services.findAll({});
    res.json(dbServices);
  });

  //route for deleting a service
  app.delete("/api/services/:id", async (req, res) => {
    const dbService = await db.services.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json(dbService);
  });

  //route for updating a service
  app.put("/api/services", async (req, res) => {
    const dbService = await db.services.update(req.body, {
      where: {
        id: req.body.id
      }
    });
    res.json(dbService);
  });

  // Route for populating the temperments dropdown
  app.get("/api/temperament", (req, res) => {
    // findAll returns all entries for a table when used with no options

    db.dogTemperaments.findAll({}).then(dbTemperament => {
      res.json(dbTemperament);

    });
  });
};
