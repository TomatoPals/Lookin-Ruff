const sendEmail = $("#emailTest");

sendEmail.on("click", () => {
  $.get("/api/user_data").then((data) => {
    $.post("/api/send", { email: data.email });
  });
});
