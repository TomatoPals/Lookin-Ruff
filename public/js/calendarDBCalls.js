$(document).ready(() => {
  const getStylist = async () => await $.get("/api/stylist");
  const displayStylists = async response => {
    const stylistView = $("#time");
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
});
