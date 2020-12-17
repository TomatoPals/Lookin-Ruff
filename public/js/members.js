$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $("#welcome").text(data.firstName + " " + data.lastName);
    // customer info
    $("input#firstName-input").val(data.firstName);
    $("input#lastName-input").val(data.lastName);
    $("input#email-input").val(data.email);
    $("input#phone-input").val(data.phone);
    $("input#address-input").val(data.address);
    $("input#address2-input").val(data.address2);
    $("input#city-input").val(data.city);
    $("input#state-input").val(data.state);
    $("input#zipCode-input").val(data.zipCode);
    // dog info
    $("input#dogName-input").val(data.dogName);
    $("#dogNote").val(data.dogNote);
  });
});
