// $(document).ready(() => {
//   // This file just does a GET request to figure out which user is logged in
//   // and updates the HTML on the page
//   $.get("/api/user_data").then(data => {
//     $("#welcome").text(data.firstName + " " + data.lastName);
//     // customer info
//     $("#firstName").val(data.firstName);
//     $("#lastName").val(data.lastName);
//     $("#email").val(data.email);
//     $("#phone").val(data.phone);
//     $("#address").val(data.address);
//     $("#address2").val(data.address2);
//     $("#city").val(data.city);
//     $("#state").val(data.state);
//     $("#zipCode").val(data.zipCode);
//     // dog info
//     $("#dogName").val(data.dogName);
//     $("#dogNote").val(data.dogNote);

  
    
//   });
// });

// const getTemperment = () => {
//   $.get("/api/temperment", data => {
//     temperments = data;
//   }).then(
//     // console.log("Temperments: ", temperments);
//     //populate the returned temperments to the dropdown
//     for (var i = 0; i < temperments.length; i++){
//       $('<option/>').val(temperments[i]).text(temperments[i]).appendTo('#mydropdown');
//     };
//   );
// };

const getTemperment = () => {
  $.get("/api/temperment", data => {
    temperments = data;
    console.log(temperments);
  }).then(()=>{console.log("Temperments: ", temperments)
  //populate the returned temperments to the dropdown
  for ( i = 0; i < temperments.length; i++){
    $('<option/>').val(temperments[i]).text(temperments[i]).appendTo('#mydropdown');
    console.log('Temperment: ', temperments[i]);
  };}
  );
};


function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
  event.preventDefault();
  console.log("myFunction is running");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}