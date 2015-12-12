function RelativeTimeFormatter(hourFormatter, dayFormatter) {
  this.hourFormatter = hourFormatter;
  this.dayFormatter = dayFormatter;

  var oneHourMsec = 1000 * 60 * 60;

  this.format = function formatRelativeTime(target) {
    var now = new Date(),
        diff = target.getTime() - now.getTime(),
        absDiff = Math.abs(diff);

    if(diff == 0) {
      return 'now';
    }
    else if(absDiff / oneHourMsec < 8) {
      return this.hourFormatter.format(diff)
    }
    else {
      return this.dayFormatter.format(now, target);
    }
  }
};

function HourFormatter() {
  var oneHourMsec = 1000 * 60 * 60;

  this.format = function formatHours(diffValue) {
    var past = (diffValue < 0),
        hours = Math.floor(Math.abs(diffValue / oneHourMsec));

    var amount;
    if(hours == 0) {
      amount = 'less than an hour';
    }
    else if(hours == 1) {
      amount = 'one hour';
    }
    else {
      amount = hours + ' hours';
    }

    return amount + (past ? ' ago' : ' from now');
  }
}

function DayFormatter() {
  var oneDayMsec = 1000 * 60 * 60 * 24;

  function getMidnightOfDate(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  this.format = function formatDays(now, target) {
    var diff = getMidnightOfDate(target).getTime() - getMidnightOfDate(now).getTime(),
        days = Math.floor(Math.abs(diff / oneDayMsec)),
        past = (target.getTime() - now.getTime() < 0);

    if(days == 1) {
      return (diff < 0 ? 'yesterday' : 'tomorrow');
    }

    var amount;
    if(days == 0) {
      amount = 'less than a day';
    }
    else {
      amount = days + ' days';
    }

    return amount + (past ? ' ago' : ' from now');
  }
}
