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
    console.log("UserId :", userId);
    appointment.userId = userId;
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
    appointment.appointmentDate = appointmentDate;
    appointment.appointmentTime = appointmentTime;
  });
});

// get stylistId and serviceId
$(function() {
  $("#bookAppointmentBtn").click(function() {
    const serviceId = $("#appointmentfor option:selected").attr("id");
    const stylistId = $("#stylist option:selected").attr("id");
    appointment.serviceId = serviceId;
    appointment.stylistId = stylistId;
    console.log("appointment:", appointment);
    bookAppointment();
  });
});

const bookAppointment = (
  userId = appointment.userId,
  stylistId = appointment.stylistId,
  appointmentDate = appointment.appointmentDate,
  appointmentTime = appointment.appointmentTime,
  serviceId = appointment.serviceId
) => {
  $.post("/api/appointments", {
    userId: userId,
    stylistId: stylistId,
    appointmentDate: appointmentDate,
    appointmentTime: appointmentTime,
    serviceId: serviceId,
    complete: false
  })
  .then(() => {
    window.location.replace("/members");
  })
  .catch(handleBookingErr);
  console.log("Error:", data);
};

function handleBookingErr(err) {
  $("#alert .msg").text(err.responseJSON);
  $("#alert").fadeIn(500);
}

