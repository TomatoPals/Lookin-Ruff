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

  let clicked = false;
  let temperaments = [];

  $("#temperamentBtn").on("click", () => {
    $.get("/api/temperament", data => {
      temperaments = data;
      console.log(temperaments);
    }).then(() => {
      console.log("Temperaments: ", temperaments);
      //populate the returned temperments to the dropdown
      if (clicked === false) {
        for (let i = 0; i < temperaments.length; i++) {
          $("#myDropdown").append(
            `<option id="${temperaments[i].id}" value="${temperaments[i].temperament}">${temperaments[i].temperament}</option>`
          );
          clicked = true;
          console.log("Temperament: ", temperaments[i].temperament);
        }
      }
    });

    $("#myDropdown").toggle("show");
    event.preventDefault();
    console.log("myFunction is running");
    // filterFunction();
  });
});

// function filterFunction () {
//   const input = document.getElementById("myInput");
//   const filter = input.value.toUpperCase();
//   div = document.getElementById("myDropdown");
//   const a = div.getElementsByTagName("a");
//   for (let i = 0; i < a.length; i++) {
//     txtValue = a[i].textContent || a[i].innerText;
//     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//       a[i].style.display = "";
//     } else {
//       a[i].style.display = "none";
//     }
//   }
// };
