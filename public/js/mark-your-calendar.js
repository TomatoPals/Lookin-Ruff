(function($) {
  Date.prototype.addDays = function(days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  $.fn.markyourcalendar = function(opts) {
    const prevHtml = "<div class='btn btn-primary button button1' id='myc-prev-week'><</div>";
    const nextHtml = "<div class='btn btn-primary button button1' id='myc-next-week'>></div>";
    const defaults = {
      availability: [[], [], [], [], [], [], []],
      isMultiple: false,
      months: [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec"
      ],
      prevHtml: prevHtml,
      nextHtml: nextHtml,
      selectedDates: [],
      startDate: new Date(),
      weekdays: ["sun", "mon", "tue", "wed", "thurs", "fri", "sat"]
    };
    const settings = $.extend({}, defaults, opts);
    // const html = ``;

    const onClick = settings.onClick;
    const onClickNavigator = settings.onClickNavigator;
    const instance = this;

    this.getMonthName = function(idx) {
      return settings.months[idx];
    };

    const formatDate = function(d) {
      let date = "" + d.getDate();
      let month = "" + (d.getMonth() + 1);
      const year = d.getFullYear();
      if (date.length < 2) {
        date = "0" + date;
      }
      if (month.length < 2) {
        month = "0" + month;
      }
      return year + "-" + month + "-" + date;
    };
    // Controller to change to previous week
    this.getNavControl = function() {
      const previousWeekHtml = `<div id="myc-prev-week-container"> ${settings.prevHtml} </div>`;
      const nextWeekHtml = `<div id="myc-prev-week-container"> ${settings.nextHtml} </div>`;
      const monthYearHtml = `<div id="myc-current-month-year-container"> ${this.getMonthName(
        settings.startDate.getMonth()
      )} ${settings.startDate.getFullYear()} </div> `;

      const navHtml = `<div id="myc-nav-container"> ${previousWeekHtml} ${monthYearHtml} ${nextWeekHtml} <div style="clear:both;"></div></div>`;
      return navHtml;
    };

    this.getDatesHeader = function() {
      let tmp = "";
      for (i = 0; i < 7; i++) {
        const d = settings.startDate.addDays(i);
        tmp += `<div class="myc-date-header" id="myc-date-header-${i}"><div class="myc-date-number"> ${d.getDate()}</div><div class="myc-date-display"> ${
          settings.weekdays[d.getDay()]
        }</div></div>`;
      }
      const ret = `<div id="myc-dates-container">${tmp}</div>`;
      return ret;
    };

    this.getAvailableTimes = function() {
      let tmp = "";
      for (i = 0; i < 7; i++) {
        let tmpAvailTimes = "";
        $.each(settings.availability[i], function() {
          tmpAvailTimes += `<a href="javascript:;" class="btn btn-primary button button1 myc-available-time " data-time="${this}" data-date="${formatDate(
            settings.startDate.addDays(i)
          )} ">${this}</a>`;
        });
        tmp += `<div class="myc-day-time-container" id="myc-day-time-container-${i}">${tmpAvailTimes}<div style="clear:both;"></div></div>`;
      }
      return tmp;
    };

    this.setAvailability = function(arr) {
      settings.availability = arr;
      render();
    };

    // clear
    this.clearAvailability = function() {
      settings.availability = [[], [], [], [], [], [], []];
    };
    this.on("click", "#myc-prev-week", function() {
      settings.startDate = settings.startDate.addDays(-7);
      instance.clearAvailability();
      render(instance);

      if ($.isFunction(onClickNavigator)) {
        onClickNavigator.call(this, ...arguments, instance);
      }
    });

    this.on("click", "#myc-next-week", function() {
      settings.startDate = settings.startDate.addDays(7);
      instance.clearAvailability();
      render(instance);

      if ($.isFunction(onClickNavigator)) {
        onClickNavigator.call(this, ...arguments, instance);
      }
    });

    this.on("click", ".myc-available-time", function() {
      const date = $(this).data("date");
      const time = $(this).data("time");
      const tmp = date + " " + time;
      if ($(this).hasClass("selected")) {
        $(this).removeClass("selected");
        const idx = settings.selectedDates.indexOf(tmp);
        if (idx !== -1) {
          settings.selectedDates.splice(idx, 1);
        }
      } else {
        if (settings.isMultiple) {
          $(this).addClass("selected");
          settings.selectedDates.push(tmp);
        } else {
          settings.selectedDates.pop();
          if (!settings.selectedDates.length) {
            $(".myc-available-time").removeClass("selected");
            $(this).addClass("selected");
            settings.selectedDates.push(tmp);
          }
        }
      }
      if ($.isFunction(onClick)) {
        onClick.call(this, ...arguments, settings.selectedDates);
      }
      function createModal() {
        modal.style.display = "block";
      }
      createModal();
    });

    const render = function() {
      ret = `<div id="myc-container"><div id="myc-nav-container"> ${instance.getNavControl()}</div><div id="myc-week-container"><div id="myc-dates-container">${instance.getDatesHeader()}</div><div id="myc-available-time-container">${instance.getAvailableTimes()}</div></div></div>`;
      instance.html(ret);
    };

    render();
  };
})(jQuery);

const modal = document.getElementById("apptModal");
const btn = $(".myc-available-time");
const span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
};
span.onclick = function() {
  modal.style.display = "none";
};
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
