$(document).ready(() => {
  // const appointmentFor = $("#appointmentfor").on("click", event => {
  //   event.preventDefault();
  // });
  const serviceView = $("#appointmentfor");
  const stylistView = $("#stylist");

  // display stylists in dropdown
  const getStylist = async () => await $.get("/api/stylist");
  const displayStylists = async response => {
    const stylistPromise = Promise.resolve(response);
    const stylistJSON = await stylistPromise;
    stylistJSON.forEach(stylist => {
      stylistView.append(
        `<option id ="${stylist.id}" value="${stylist.stylistName}">${stylist.stylistName}</option>`
      );
    });
  };
  displayStylists(getStylist());
  // display services in dropdown
  const getService = async () => await $.get("/api/services");
  const displayServices = async response => {
    const servicePromise = Promise.resolve(response);
    const serviceJSON = await servicePromise;
    serviceJSON.forEach(service => {
      serviceView.append(
        `<option id="${service.id}" value="${service.description}">${service.description}</option>`
      );
    });
  };
  displayServices(getService());

  // get userId
  const getUser = async () => await $.get("/api/user_data");
  const displayUser = async response => {
    const userPromise = Promise.resolve(response);
    const userJSON = await userPromise;
    const userId = userJSON.id;
    console.log("UserId :", userId);
    return userId;
  };
  displayUser(getUser());
});
// get dataTime and dataDate info
$(function() {
  $(".myc-day-time-container .myc-available-time").click(function() {
    const appointmentTime = $(this).attr("data-time");
    console.log("appointmentTime:", appointmentTime);
    const appointmentDate = $(this).attr("data-date");
    console.log("appointmentDate:", appointmentDate);
  });
});

// get stylistId and serviceId
$(function() {
  $("#bookAppointmentBtn").click(function() {
    const serviceId = $("#appointmentfor option:selected").attr("id");
    console.log("serviceId:", serviceId);
    const stylistid = $("#stylist option:selected").attr("id");
    console.log("stylistId:", stylistid);
  });
});

/*   route for creating appointment
  app.post("/api/appointments", async (req, res) => {
    const {
      userId,
      stylistId,
      appointmentDate,
      appointmentTime,
      serviceId,
      complete
    } = req.body; */
