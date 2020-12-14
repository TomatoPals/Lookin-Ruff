$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $("#welcome").text(data.firstName + " " + data.lastName);
    // customer info
    $("#firstName").val(data.firstName);
    $("#lastName").val(data.lastName);
    $("#email").val(data.email);
    $("#phone").val(data.phone);
    $("#address").val(data.address);
    $("#address2").val(data.address2);
    $("#city").val(data.city);
    $("#state").val(data.state);
    $("#zipCode").val(data.zipCode);
    // dog info
    $("#dogName").val(data.dogName);
    $("#dogNote").val(data.dogNote);
  });
});
