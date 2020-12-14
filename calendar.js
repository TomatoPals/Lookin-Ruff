const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();
const selectYear = document.getElementById("year");
const selectMonth = document.getElementById("month");

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

// function next() {
//   currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
//   currentMonth = (currentMonth + 1) % 12;
//   showCalendar(currentMonth, currentYear);
// }

// function previous() {
//   currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
//   currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
//   showCalendar(currentMonth, currentYear);
// }

// function jump() {
//   currentYear = parseInt(selectYear.value);
//   currentMonth = parseInt(selectMonth.value);
//   showCalendar(currentMonth, currentYear);
// }

function showCalendar(month, year) {
  const firstDay = new Date(year, month).getDay();
  const daysInMonth = 32 - new Date(year, month, 32).getDate();

  const tbl = document.getElementById("calendar-body"); // body of the calendar

  // clearing all previous cells
  tbl.innerHTML = "";

  // filing data about month and in the page via DOM.
  monthAndYear.innerHTML = months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;

  // creating all cells
  let date = 1;
  for (let i = 0; i < 6; i++) {
    // creates a table row
    const row = document.createElement("tr");

    //creating individual cells, filing them up with data.
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        const cell = document.createElement("td");
        const cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        break;
      } else {
        const cell = document.createElement("td");
        const cellText = document.createTextNode(date);
        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          cell.classList.add("bg-info");
        } // color today's date
        cell.appendChild(cellText);
        row.appendChild(cell);
        date++;
      }
    }

    tbl.appendChild(row); // appending each row into calendar body.
  }
}
