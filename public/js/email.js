const sendEmail = $("#emailTest");

sendEmail.on("click", async () => {
  const getUserData = await $.get("/api/user_data");
  const getAppointmentInfo = await $.get("/api/appoinments");
  await $.post("/api/send", {
    email: getUserData.email,
    appointmentDate: getAppointmentInfo[0].appointment_date
  });
});
