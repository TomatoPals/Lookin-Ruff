$(document).ready(() => {
  $("#serviceDetails").on("click", event => {
    event.preventDefault();
    event.stopPropagation();
    const inputDescription = $("#inputDescription");
    const inputPrice = $("#inputPrice");
    const inputDuration = $("#inputDuration");
    const deleteService = async () =>
      await $.ajax({
        url: `/api/services/${event.target.id}`,
        type: "DELETE"
      });

    const createService = async () =>
      await $.post("/api/services", {
        description: `${inputDescription.val()}`,
        price: `${inputPrice.val()}`,
        duration: `${inputDuration.val()}`
      });
    if (`${event.target.getAttribute("data-btn")}` === "save") {
      createService();
      location.reload();
    } else {
      if (`${event.target.getAttribute("data-btn")}` === "delete") {
        deleteService();
        location.reload();
      }
    }
  });

  const getServices = async () => await $.get("/api/services");

  const displayServices = async response => {
    const servicePromise = Promise.resolve(response);
    const serviceJSON = await servicePromise;
    const serviceDetails = $("#serviceDetails");
    serviceJSON.forEach(element => {
      const id = element.id;
      const description = element.description;
      const price = element.price;
      const duration = element.duration;
      serviceDetails.append(`<div class="col-6">${description}</div>`);
      serviceDetails.append(`<div class="col-2">${price}</div>`);
      serviceDetails.append(`<div class="col-2">${duration}</div>`);
      serviceDetails.append(
        `<div class="col-2"><button data-btn="delete" id="${id}">Delete</button></div>`
      );
    });
    serviceDetails.append(
      `<div class="col-6"><input type="text" style="width:400px"  placeholder="Please enter a service description" id="inputDescription"></div>`
    );
    serviceDetails.append(
      `<div class="col-2"><input type="text" placeholder="Enter Price" id="inputPrice"></div>`
    );
    serviceDetails.append(
      `<div class="col-2"><input type="text" placeholder="Enter Duration"  id="inputDuration"></div>`
    );
    serviceDetails.append(
      `<div class="col-2"><button data-btn="save" id="saveBtn">Save</button></div>`
    );
  };
  displayServices(getServices());
});
