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

  let temperaments = [];

  $("#temperamentBtn").on("click", temperamentMenu => {
    $.get("/api/temperament", data => {
      temperaments = data;
      console.log(temperaments);
    }).then(() => {
      console.log("Temperments: ", temperaments);
      //populate the returned temperments to the dropdown
      for (i = 0; i < temperaments.length; i++) {
        $("<option/>")
          .val(temperaments[i])
          .text(temperaments[i])
          .appendTo("#mydropdown");
        console.log("Temperament: ", temperaments[i]);
      }
    });

    $("#myDropdown").toggle("show");
    event.preventDefault();
    console.log("myFunction is running");
    filterFunction();
  });
});

function filterFunction() {
  const input, filter;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  const a = div.getElementsByTagName("a");
  for (let i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
