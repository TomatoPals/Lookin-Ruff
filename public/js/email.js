const sendEmail = $("#emailTest");

sendEmail.on("click", async () => {
  const getUserData = await $.get("/api/user_data");
  const getAppointmentInfo = await $.get("/api/getappoinments");
  console.log(getAppointmentInfo);
  const postEmail = await $.post("/api/send", {
    email: getUserData.email,
    appointmentDate: getAppointmentInfo[0].appointment_date,
  });
});
