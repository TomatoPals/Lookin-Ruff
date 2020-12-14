$(document).ready(function() {
  const getServices = async () => await $.get("/api/services");

  const displayServices = async response => {
    const servicePromise = Promise.resolve(response);
    const serviceJSON = await servicePromise;
    const serviceDiv = $("<div class='service'>");
    serviceJSON.forEach(element => {
      const description = element.description;
      const price = element.price;
      const duration = element.duration;
      serviceDiv.append(
        `<span>${description}</span><span>${price}</span><span>${duration}</span></br>`
      );
    });
    $("#servicesContent").prepend(serviceDiv);
  };
  displayServices(getServices());
});
