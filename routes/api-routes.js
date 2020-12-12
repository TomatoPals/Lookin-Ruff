// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const nodemailer = require("nodemailer");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
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
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  //Route for sending email
  app.post("/api/send", (req, res) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "rylee.mueller@ethereal.email",
        pass: "X5cx2ym18s4NrQZGzE"
      }
    });
    let mailOptions = {
      from: '"Do Not Reply" <appointments@lookinruff.com>',
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
      userId,
      stylistId,
      appointmentDate,
      serviceId,
      complete
    } = req.body;

    try {
      const createAppointment = await db.Appointment.create({
        userId,
        stylistId,
        appointmentDate,
        serviceId,
        complete
      });
      res.json(createAppointment);
    } catch (error) {
      res.json(error);
    }
  });

  //route for

  //route for getting user appointment info
  app.get("/api/appointments", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      db.Appointment.findAll({ where: { id: `${req.user.id}` } }).then(
        dbget => {
          res.json(dbget);
        }
      );
    }
  });

  app.put("/api/appointments", async (req, res) => {
    const dbAppointment = await db.Appointment.update(req.body, {
      where: {
        user_id: req.body.user_id
      }
    });
    res.json(dbAppointment);
  });
};
