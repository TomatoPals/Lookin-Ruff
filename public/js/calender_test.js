$(document).ready(() => {
  //ids of each input
  const idsOfInputBlocks = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  const buttonInputIds = {
    9: "9AMSubmitBtn",
    10: "10AMSubmitBtn",
    11: "11AMSubmitBtn",
    12: "12PMSubmitBtn",
    13: "1PMSubmitBtn",
    14: "2PMSubmitBtn",
    15: "3PMSubmitBtn",
    16: "4PMSubmitBtn",
    17: "5PMSubmitBtn",
  };

  //displays current date at the top of the page
  $(currentDay).text(moment().format("dddd, MMMM Do"));

  //loops through ids and compares them to the current hour anc changing their color
  for (i in idsOfInputBlocks) {
    if (idsOfInputBlocks[i] < moment().hour()) {
      $(`#${idsOfInputBlocks[i]}`).addClass("past");
    } else if (idsOfInputBlocks[i] === moment().hour()) {
      $(`#${idsOfInputBlocks[i]}`).addClass("present");
    } else $(`#${idsOfInputBlocks[i]}`).addClass("future");
  }

  for (const [key, value] of Object.entries(localStorage)) {
    $(`#${key}`).val(`${value}`);
  }

  $("#calendarBlock").on("click", (event) => {
    for (const [key, value] of Object.entries(buttonInputIds)) {
      if (value === event.target.id) {
        localStorage.setItem(`${key}`, $(`#${key}`).val());
      }
    }
  });
});
