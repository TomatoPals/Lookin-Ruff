$(document).ready(() => {
  $("#serviceDelete").on("click", event => {
    event.preventDefault();
    $.ajax({
      url: "/api/services",
      type: "DELETE",
      id: `${event.target.id}`
    });

    // location.reload();
    console.log(event.target.id);
  });
  const getServices = async () => await $.get("/api/services");

  const displayServices = async response => {
    const servicePromise = Promise.resolve(response);
    const serviceJSON = await servicePromise;
    const serviceDescription = $("#serviceDescription");
    const servicePrice = $("#servicePrice");
    const serviceDuration = $("#serviceDuration");
    const serviceDelete = $("#serviceDelete");
    serviceJSON.forEach(element => {
      const id = element.id;
      const description = element.description;
      const price = element.price;
      const duration = element.duration;
      serviceDescription.append(`<p>${description}</p></br>`);
      servicePrice.append(`<p>${price}</p></br>`);
      serviceDuration.append(`<p>${duration}</p></br>`);
      serviceDelete.append(`<p><button id="${id}">Delete</button></p>`);
    });
  };
  displayServices(getServices());
});
