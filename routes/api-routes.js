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
    console.log(req.body);
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
      // html: `<b>Your upcoming appointment is scheduled for: ${req.body.appointmentDate}</b>`
      html: `<!doctype html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
          <title>
          </title>
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style type="text/css">
            #outlook a{padding: 0;}
                  .ReadMsgBody{width: 100%;}
                  .ExternalClass{width: 100%;}
                  .ExternalClass *{line-height: 100%;}
                  body{margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}
                  table, td{border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;}
                  img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}
                  p{display: block; margin: 13px 0;}
          </style>
          <!--[if !mso]><!-->
          <style type="text/css">
            @media only screen and (max-width:480px) {
                        @-ms-viewport {width: 320px;}
                        @viewport {	width: 320px; }
                    }
          </style>
          <!--<![endif]-->
          <!--[if mso]> 
          <xml> 
            <o:OfficeDocumentSettings> 
              <o:AllowPNG/> 
              <o:PixelsPerInch>96</o:PixelsPerInch> 
            </o:OfficeDocumentSettings> 
          </xml>
          <![endif]-->
          <!--[if lte mso 11]> 
          <style type="text/css"> 
            .outlook-group-fix{width:100% !important;}
          </style>
          <![endif]-->
          <style type="text/css">
            @media only screen and (min-width:480px) {
            .dys-column-per-100 {
              width: 100.000000% !important;
              max-width: 100.000000%;
            }
            }
            @media only screen and (max-width:480px) {
            
                    table.full-width-mobile { width: 100% !important; }
                    td.full-width-mobile { width: auto !important; }
            
            }
            @media only screen and (min-width:480px) {
            .dys-column-per-100 {
              width: 100.000000% !important;
              max-width: 100.000000%;
            }
            }
            @media only screen and (min-width:480px) {
            .dys-column-per-50 {
              width: 50.000000% !important;
              max-width: 50.000000%;
            }
            .dys-column-per-100 {
              width: 100.000000% !important;
              max-width: 100.000000%;
            }
            .dys-column-per-90 {
              width: 90% !important;
              max-width: 90%;
            }
            }
            @media only screen and (min-width:480px) {
            .dys-column-per-100 {
              width: 100.000000% !important;
              max-width: 100.000000%;
            }
            }
          </style>
        </head>
        <body>
          <div>
            <!--[if mso | IE]>
      <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
            <div style='margin:0px auto;max-width:600px;'>
              <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='width:100%;'>
                <tbody>
                  <tr>
                    <td style='direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;'>
                      <!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
      <![endif]-->
                      <div class='dys-column-per-100 outlook-group-fix' style='direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;'>
                        <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='vertical-align:top;' width='100%'>
                          <tr>
                            <td align='center' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                              <div style="color:#37302D;font-family:'Droid Sans', 'Helvetica Neue', Arial, sans-serif;font-size:30px;line-height:1;text-align:center;">
                                LookinRuff
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <!--[if mso | IE]>
      </td></tr></table>
      <![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!--[if mso | IE]>
      </td></tr></table>
      <![endif]-->
            <!--[if mso | IE]>
      <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
            <div style='background:#2eabe5;background-color:#2eabe5;margin:0px auto;max-width:600px;'>
              <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='background:#2eabe5;background-color:#2eabe5;width:100%;'>
                <tbody>
                  <tr>
                    <td style='direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;'>
                      <!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
      <![endif]-->
                      <div class='dys-column-per-100 outlook-group-fix' style='direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;'>
                        <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='vertical-align:top;' width='100%'>
                          <tr>
                            <td align='center' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                              <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='border-collapse:collapse;border-spacing:0px;'>
                                <tbody>
                                  <tr>
                                    <td style='width:400px;'>
                                      <img alt='Descriptive Alt Text' height='189' src='assets/lookinRuff_Em.png' style='border:none;display:block;font-size:13px;height:123px;outline:none;text-decoration:none;width:100%;' width='400' />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align='center' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                              <div style="color:#FFFFFF;font-family:'Droid Sans', 'Helvetica Neue', Arial, sans-serif;font-size:36px;line-height:1;text-align:center;">
                                Thank You!
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td align='center' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                              <div style="color:#ffffff;font-family:'Droid Sans', 'Helvetica Neue', Arial, sans-serif;font-size:24px;line-height:20px;text-align:center;">
                                Your Grooming appointment for <strong>${req.body.dogName}</strong> has been confirmed.
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td align='center' style='font-size:0px;padding:10px 25px;word-break:break-word;' vertical-align='middle'>
                              <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='border-collapse:separate;line-height:100%;width:250px;'>
                                <tr>
                                  <td align='center' bgcolor='#178F8F' role='presentation' style='background-color:#2eabe5;border:none;border-radius:4px;cursor:auto;padding:10px 25px;' valign='middle'>
                                      <img alt='Descriptive Alt Text' height='300' src='assets/lookinRuff_Cir.png' style='border:none;display:block;font-size:13px;height:200px;outline:none;text-decoration:none;width:100%;' width='300' />
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <div style="color:#ffffff;font-family:'Droid Sans', 'Helvetica Neue', Arial, sans-serif;font-size:16px;line-height:20px;text-align:center;">
                          Please bring a copy of ${req.body.dogName}'s updated Proof of vaccination(s).
                        </div>
      <![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!--[if mso | IE]>
      </td></tr></table>
      <![endif]-->
            <!--[if mso | IE]>
      <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
            <div style='background:#005a96;background-color:#005a96;margin:0px auto;max-width:600px;'>
              <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='background:#005a96;background-color:#005a96;width:100%;'>
                <tbody>
                  <tr>
                    <td style='direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;'>
                      <!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:300px;">
      <![endif]-->
                      <div class='dys-column-per-50 outlook-group-fix' style='direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;'>
                        <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='vertical-align:top;' width='100%'>
                          <tr>
                            <td align='left' style='font-size:0px;padding:25px 25px 0 50px;word-break:break-word;'>
                              <div style="color:#FFFFFF;font-family:'Droid Sans', 'Helvetica Neue', Arial, sans-serif;font-size:13px;line-height:1;text-align:left;">
                                Bart Cusick
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td align='left' style='font-size:0px;padding:0 25px 0 50px;word-break:break-word;'>
                              <div style="color:#ffffff;font-family:'Droid Sans', 'Helvetica Neue', Arial, sans-serif;font-size:13px;line-height:1;text-align:left;">
                                  213 Artesian dr. Garner, NC 27529 (919)555-5555
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <!--[if mso | IE]>
      </td><td style="vertical-align:top;width:300px;">
      <![endif]-->
                      <div class='dys-column-per-50 outlook-group-fix' style='direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;'>
                        <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='vertical-align:top;' width='100%'>
                          <tr>
                            <td align='right' style='font-size:0px;padding:25px 50px 0 25px;word-break:break-word;'>
                              <div style="color:#FFFFFF;font-family:'Droid Sans', 'Helvetica Neue', Arial, sans-serif;font-size:13px;line-height:1;text-align:right;">
                                Invoice: 00234
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td align='right' style='font-size:0px;padding:0 50px 0 25px;word-break:break-word;'>
                              <div style="color:#ffffff;font-family:'Droid Sans', 'Helvetica Neue', Arial, sans-serif;font-size:13px;line-height:1;text-align:right;">
                                Dec 16, 2020
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <!--[if mso | IE]>
      </td></tr></table>
      <![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!--[if mso | IE]>
      </td></tr></table>
      <![endif]-->
            <!--[if mso | IE]>
      <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
            <div style='background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;'>
              <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='background:#005a96;background-color:#005a96;width:100%;'>
                <tbody>
                  <tr>
                    <td style='direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;'>
                      <!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
      <![endif]-->
                      <div class='dys-column-per-100 outlook-group-fix' style='direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;'>
                        <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='vertical-align:top;' width='100%'>
                          <tr>
                            <td align='left' style='font-size:0px;padding:10px 50px;word-break:break-word;'>
                              <table border='0' cellpadding='10' cellspacing='0' style='cellpadding:10;cellspacing:0;color:#000000;font-family:Helvetica, Arial, sans-serif;font-size:18px;line-height:22px;table-layout:auto;width:100%;' width='100%'>
                                <tbody>
                                  <tr align='center'>
                                    <th align='center' style='font-weight: normal; background-color: #2eabe5; color: #151f44;'>
                                      Your Appointment is scheduled for:
                                    </th>
                                  </tr>
                                  <tr>
                                    <td style='background-color: #55c1f4; color: #151f44; text-align: center;font-size:24px;'>${req.body.appointmentDate} at <strong>${req.body.appointmentTime}</strong>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <!--[if mso | IE]>
      </td></tr></table>
      <![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!--[if mso | IE]>
      </td></tr></table>
      <![endif]-->
            <!--[if mso | IE]>
      <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
            <div style='background:#2eabe5;background-color:#2eabe5;margin:0px auto;max-width:600px;'>
              <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='background:#2eabe5;background-color:#2eabe5;width:100%;'>
                <tbody>
                  <tr>
                    <td style='direction:ltr;font-size:0px;padding:10px 0;text-align:center;vertical-align:top;'>
                      <!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:540px;">
      <![endif]-->
                      <div class='dys-column-per-90 outlook-group-fix' style='direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;'>
                        <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='vertical-align:top;' width='100%'>
                          <tr>
                            <td align='left' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                              <div style="color:#000000;font-family:'Droid Sans', 'Helvetica Neue', Arial, sans-serif;font-size:13px;line-height:1;text-align:left;">
                                Thank you for your business. Please contact us with any questions regarding your Appointment. LookingRuff inc.
                              </div>
                              <br>
                              <div style="color:#000000;font-family:'Droid Sans', 'Helvetica Neue', Arial, sans-serif;font-size:8px;line-height:1;text-align:center;">
                                  Missed Appointments not canceled within 24 hrs of hte scheduled time will be charged 5x the normal rate.
                                </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <!--[if mso | IE]>
      </td></tr></table>
      <![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!--[if mso | IE]>
      </td></tr></table>
      <![endif]-->
            <!--[if mso | IE]>
      <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
            <div style='background:#151F44;background-color:#151F44;margin:0px auto;max-width:600px;'>
              <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='background:#414141;background-color:#414141;width:100%;'>
                <tbody>
                  <tr>
                    <td style='direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;text-align:center;vertical-align:top;'>
                      <!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
      <![endif]-->
                      <!--[if mso | IE]>
      </td></tr></table>
      <![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!--[if mso | IE]>
      </td></tr></table>
      <![endif]-->
            <!--[if mso | IE]>
      <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
            <div style='background:#151F44;background-color:#151F44;margin:0px auto;max-width:600px;'>
              <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='background:#151F44;background-color:#151F44;width:100%;'>
                <tbody>
                  <tr>
                    <td style='direction:ltr;font-size:0px;padding:20px 0;padding-top:0px;text-align:center;vertical-align:top;'>
                      <!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
      <![endif]-->
                      <div class='dys-column-per-100 outlook-group-fix' style='direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;'>
                        <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='vertical-align:top;' width='100%'>
                          <tr>
                            <td align='center' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                              <div style="color:#BBBBBB;font-family:'Droid Sans', 'Helvetica Neue', Arial, sans-serif;font-size:12px;line-height:1;text-align:center;">
                                View in Browser | Unsubscribe | Contact © 2019 All Rights Reserved
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <!--[if mso | IE]>
      </td></tr></table>
      <![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!--[if mso | IE]>
      </td></tr></table>
      <![endif]-->
          </div>
        </body>
      </html>`
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
