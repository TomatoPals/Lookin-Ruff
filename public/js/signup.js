$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  const temperment = $("#temperment").val();
  let temperment = [];
  getTemperment();

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  //have .get that will get data from the db, then .then to  populate dropdowns on this page when it opens
  function getTemperment() {
    $.get("/api/temperment", function(data){
      temperments = data;
    }).then (
      console.log('Temperments: ', temperments)
      //populate the returned temperments to the dropdown
    )
  }

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  //defining the end point here with post request, this is handles in api-routes
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});

//have .get that will get data from the db, then .then to  populate dropdowns on this page when it opens
