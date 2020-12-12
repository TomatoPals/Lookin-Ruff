(function($) {
  // https://stackoverflow.com/questions/563406/add-days-to-javascript-date
  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  $.fn.markyourcalendar = function(opts) {
    var prevHtml = `
            <div id="myc-prev-week">
                <
            </div>
        `;
    var nextHtml = `<div id="myc-next-week">></div>`;
    var defaults = {
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
        "dec",
      ],
      prevHtml: prevHtml,
      nextHtml: nextHtml,
      selectedDates: [],
      startDate: new Date(),
      weekdays: ["sun", "mon", "tue", "wed", "thurs", "fri", "sat"],
    };
    var settings = $.extend({}, defaults, opts);
    var html = ``;

    var onClick = settings.onClick;
    var onClickNavigator = settings.onClickNavigator;
    var instance = this;

    // kuhanin ang buwan
    this.getMonthName = function(idx) {
      return settings.months[idx];
    };

    var formatDate = function(d) {
      var date = "" + d.getDate();
      var month = "" + (d.getMonth() + 1);
      var year = d.getFullYear();
      if (date.length < 2) {
        date = "0" + date;
      }
      if (month.length < 2) {
        month = "0" + month;
      }
      return year + "-" + month + "-" + date;
    };
    // Controller to change
    this.getNavControl = function() {
      var previousWeekHtml =
        `<div id="myc-prev-week-container">` + settings.prevHtml + `</div>`;
      var nextWeekHtml =
        `<div id="myc-prev-week-container">` + settings.nextHtml + `</div>`;
      var monthYearHtml =
        `
                <div id="myc-current-month-year-container">
                    ` +
        this.getMonthName(settings.startDate.getMonth()) +
        " " +
        settings.startDate.getFullYear() +
        `
                </div>
            `;

      var navHtml =
        `
                <div id="myc-nav-container">
                    ` +
        previousWeekHtml +
        `
                    ` +
        monthYearHtml +
        `
                    ` +
        nextWeekHtml +
        `
                    <div style="clear:both;"></div>
                </div>
            `;
      return navHtml;
    };

    this.getDatesHeader = function() {
      var tmp = ``;
      for (i = 0; i < 7; i++) {
        var d = settings.startDate.addDays(i);
        tmp +=
          `
                    <div class="myc-date-header" id="myc-date-header-` +
          i +
          `">
                        <div class="myc-date-number">` +
          d.getDate() +
          `</div>
                        <div class="myc-date-display">` +
          settings.weekdays[d.getDay()] +
          `</div>
                    </div>
                `;
      }
      var ret = `<div id="myc-dates-container">` + tmp + `</div>`;
      return ret;
    };

    // kuhanin ang mga pwedeng oras sa bawat araw ng kasalukuyang linggo
    this.getAvailableTimes = function() {
      var tmp = ``;
      for (i = 0; i < 7; i++) {
        var tmpAvailTimes = ``;
        $.each(settings.availability[i], function() {
          tmpAvailTimes +=
            `
                        <a href="javascript:;" class="myc-available-time" data-time="` +
            this +
            `" data-date="` +
            formatDate(settings.startDate.addDays(i)) +
            `">
                            ` +
            this +
            `
                        </a>
                    `;
        });
        tmp +=
          `
                    <div class="myc-day-time-container" id="myc-day-time-container-` +
          i +
          `">
                        ` +
          tmpAvailTimes +
          `
                        <div style="clear:both;"></div>
                    </div>
                `;
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
      var date = $(this).data("date");
      var time = $(this).data("time");
      var tmp = date + " " + time;
      if ($(this).hasClass("selected")) {
        $(this).removeClass("selected");
        var idx = settings.selectedDates.indexOf(tmp);
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
    });

    var render = function() {
      ret =
        `
                <div id="myc-container">
                    <div id="myc-nav-container">` +
        instance.getNavControl() +
        `</div>
                    <div id="myc-week-container">
                        <div id="myc-dates-container">` +
        instance.getDatesHeader() +
        `</div>
                        <div id="myc-available-time-container">` +
        instance.getAvailableTimes() +
        `</div>
                    </div>
                </div>
            `;
      instance.html(ret);
    };

    render();
  };
})(jQuery);
