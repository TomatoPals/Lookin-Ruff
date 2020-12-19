$(document).ready(() => {
  // declares appointment as global variable
  window.appointment = {};
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
    const email = userJSON.email;
    const dogName = userJSON.dogName;
    appointment.userId = userId;
    appointment.email = email;
    appointment.dogName = dogName;
  };
  displayUser(getUser());
});
// get dataTime and dataDate info
$(() => {
  $(".myc-day-time-container .myc-available-time").click(function() {
    const appointmentTime = $(this).attr("data-time");
    const appointmentDate = $(this).attr("data-date");
    appointment.appointmentDate = appointmentDate;
    appointment.appointmentTime = appointmentTime;
  });
});

// get stylistId and serviceId
$(() => {
  $("#bookAppointmentBtn").click(() => {
    const serviceId = $("#appointmentfor option:selected").attr("id");
    const stylistId = $("#stylist option:selected").attr("id");
    appointment.serviceId = serviceId;
    appointment.stylistId = stylistId;
    bookAppointment(
      appointment.userId,
      appointment.stylistId,
      appointment.appointmentDate,
      appointment.appointmentTime,
      appointment.serviceId,
      appointment.email,
      appointment.dogName
    );
  });
});

const bookAppointment = (
  userId,
  stylistId,
  appointmentDate,
  appointmentTime,
  serviceId,
  email,
  dogName
) => {
  $.post("/api/appointments", {
    UserId: userId,
    stylistId: stylistId,
    appointmentDate: appointmentDate,
    appointmentTime: appointmentTime,
    serviceId: serviceId,
    complete: false
  })
    .then(() => {
      $.post("/api/send", {
        email: email,
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime,
        dogName: dogName
      });
      window.location.replace("/members");
    })

    .catch(handleBookingErr);
  console.log("Error:", data);
};

function handleBookingErr(err) {
  $("#alert .msg").text(err.responseJSON);
  $("#alert").fadeIn(500);
}
