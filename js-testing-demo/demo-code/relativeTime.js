function RelativeTimeFormatter() {
  var oneDayMsec = 1000 * 60 * 60 * 24;

  function getMidnightOfDate(date) {
    var offsetMsec = date.getMilliseconds() +
        date.getSeconds() * 1000 +
        date.getMinutes() * 1000 * 60 +
        date.getHours() * 1000 * 60 * 60;

    return new Date(date.getTime() - offsetMsec);
  }

  function processPast(now, target) {
    var diff = Math.abs(target.getTime() - now.getTime()),
        diffDays = diff / oneDayMsec;

    if(diffDays < 1) {
      if(now.getDate() == target.getDate()) {
        return 'today';
      } else {
        return 'yesterday';
      }
    } else {
      var newDiff = Math.abs(getMidnightOfDate(target).getTime() - getMidnightOfDate(now).getTime()),
          newDiffDays = Math.floor(newDiff / oneDayMsec);

      if(newDiffDays == 1) {
        return 'yesterday';
      } else {
        return newDiffDays.toString() + ' days ago';
      }
    }
  }

  // The name "performFormat" is optional, but will appear in stack traces if errors occur.
  this.format = function performFormat(target) {
    var now = new Date(),
        diff = target.getTime() - now.getTime();

    if(diff < 0) {
      return processPast(now, target);
    } else if (diff > 0) {
      return 'in the future';
    } else {
      return 'now';
    }
  }
};