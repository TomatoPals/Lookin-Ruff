$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const firstNameInput = $("input#firstName-input");
  const lastNameInput = $("input#lastName-input");
  const phoneInput = $("input#phone-input");
  const addressInput = $("input#address-input");
  const address2Input = $("input#address2-input");
  const cityInput = $("input#city-input");
  const stateInput = $("input#state-input");
  const zipInput = $("input#zipCode-input");
  const dogName = $("input#dogName-input");
  const dogNote = $("#dogNote");
<<<<<<< HEAD

  // const temperment = $("#temperment").val();
  let temperments = [];
=======
>>>>>>> main

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      phone: phoneInput.val().trim(),
      address: addressInput.val().trim(),
      address2: address2Input.val().trim(),
      city: cityInput.val().trim(),
      state: stateInput.val().trim(),
      zipCode: zipInput.val().trim(),
      dogName: dogName.val().trim(),
      dogNote: dogNote.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.email,
      userData.password,
      userData.firstName,
      userData.lastName,
      userData.phone,
      userData.address,
      userData.address2,
      userData.city,
      userData.state,
      userData.zipCode,
      userData.dogName,
      userData.dogNote
    );
    emailInput.val("");
    passwordInput.val("");
    firstNameInput.val("");
    lastNameInput.val("");
    phoneInput.val("");
    addressInput.val("");
    address2Input.val("");
    cityInput.val("");
    stateInput.val("");
    zipInput.val("");
    dogName.val("");
    dogNote.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  //defining the end point here with post request, this is handles in api-routes
  function signUpUser(
    email,
    password,
    firstName,
    lastName,
    phone,
    address,
    address2,
    city,
    state,
    zipCode,
    dogName,
    dogNote
  ) {
    $.post("/api/signup", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      address: address,
      address2: address2,
      city: city,
      state: state,
      zipCode: zipCode,
      dogName: dogName,
      dogNote: dogNote
    })
      .then(() => {
        window.location.replace("/members");
      })
      .catch(handleLoginErr);
    console.log("Error:", data);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});

//have .get that will get data from the db, then .then to  populate dropdowns on this page when it opens
