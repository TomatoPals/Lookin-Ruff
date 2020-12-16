$(document).ready(() => {
  $("#appointmentfor").on("click", event => {
    event.preventDefault();
    console.log(`${event.target.id}`);
  });
  const serviceView = $("#appointmentfor");
  const stylistView = $("#stylist");

  const getStylist = async () => await $.get("/api/stylist");
  const displayStylists = async response => {
    const stylistPromise = Promise.resolve(response);
    const stylistJSON = await stylistPromise;
    stylistJSON.forEach(stylist => {
      stylistView.append(
        `<option value="${stylist.stylistName}">${stylist.stylistName}</option>`
      );
    });
    console.log(stylistJSON);
  };
  displayStylists(getStylist());

  // const getService = async () => await $.get("/api/services");
  // const displayServices = async response => {
  //   const servicePromise = Promise.resolve(response);
  //   const serviceJSON = await servicePromise;
  //   serviceJSON.forEach(service => {
  //     serviceView.append(
  //       `<option id="${service.id}" value="${service.description}">${service.description}</option>`
  //     );
  //   });
  //   console.log(serviceJSON);
  // };
  // displayServices(getService());

  // // testing
  // $("#bookAppointmentBtn").on("click", event => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   const appointmentfor = $("#inputDescription");
  //   const inputPrice = $("#inputPrice");
  //   const inputDuration = $("#inputDuration");
  //   const deleteService = async function() {
  //     await $.ajax({ url: `/api/services/${event.target.id}`, type: "DELETE" });
  //   };
  //   const createService = async function() {
  //     await $.post("/api/services", {
  //       description: `${inputDescription.val()}`,
  //       price: `${inputPrice.val()}`,
  //       duration: `${inputDuration.val()}`
  //     });
  //   };
  //   if (`${event.target.getAttribute("data-btn")}` === "save") {
  //     createService();
  //     location.reload();
  //   } else {
  //     if (`${event.target.getAttribute("data-btn")}` === "delete") {
  //       deleteService();
  //       location.reload();
  //     }
  //   }
  // });
});
