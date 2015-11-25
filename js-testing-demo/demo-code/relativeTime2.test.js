describe('Relative Time Formatter', function() {
  var instance,
      currentDate = new Date(2015, 1, 1, 15, 30),
      hourFormatterStub,
      dayFormatterStub;

  beforeEach(function() {
    jasmine.clock().install();
    jasmine.clock().mockDate(currentDate);

    hourFormatterStub = jasmine.createSpy();
    dayFormatterStub = jasmine.createSpy();

    instance = new RelativeTimeFormatter({ format: hourFormatterStub }, { format: dayFormatterStub });
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('should format the current date/time as "now"', function() {
    expect(instance.format(currentDate)).toEqual('now');
  });

  it('should format less than 8 hours in the future using the hour formatter', function() {
    var date = new Date(2015, 1, 1, 20, 59, 59),
        expectedValue = 'returned hour string';

    hourFormatterStub.and.returnValue(expectedValue);

    var actualValue = instance.format(date);

    expect(hourFormatterStub.calls.count()).toEqual(1);
    expect(hourFormatterStub).toHaveBeenCalledWith(19799000);
    expect(actualValue).toEqual(expectedValue);
  });

  it('should format less than 8 hours in the past using the hour formatter', function() {
    var date = new Date(2015, 1, 1, 10, 15),
        expectedValue = 'returned hour string';

    hourFormatterStub.and.returnValue(expectedValue);

    var actualValue = instance.format(date);

    expect(hourFormatterStub.calls.count()).toEqual(1);
    expect(hourFormatterStub).toHaveBeenCalledWith(-18900000);
    expect(actualValue).toEqual(expectedValue);
  });

  it('should format more than 8 hours in the future using the day formatter', function() {
    var date = new Date(2015, 1, 1, 23, 59, 59),
        expectedValue = 'returned day string';

    dayFormatterStub.and.returnValue(expectedValue);

    var actualValue = instance.format(date);

    expect(dayFormatterStub.calls.count()).toEqual(1);
    expect(dayFormatterStub).toHaveBeenCalledWith(30599000);
    expect(actualValue).toEqual(expectedValue);
  });

  it('should format more than 8 hours in the past using the day formatter', function() {
    var date = new Date(2014, 12, 29),
        expectedValue = 'returned day string';

    dayFormatterStub.and.returnValue(expectedValue);

    var actualValue = instance.format(date);

    expect(dayFormatterStub.calls.count()).toEqual(1);
    expect(dayFormatterStub).toHaveBeenCalledWith(-315000000);
    expect(actualValue).toEqual(expectedValue);
  });
});

describe('Hour Formatter', function() {
  var instance,
      oneHourMsec = 1000 * 60 * 60;

  beforeEach(function() {
    instance = new HourFormatter();
  });

  it('should format +1ms as "less than an hour from now"', function() {
    expect(instance.format(1)).toEqual('less than an hour from now');
  });

  it('should format -1ms as "less than an hour ago"', function() {
    expect(instance.format(-1)).toEqual('less than an hour ago');
  });

  it('should format +1hr as "one hour from now"', function() {
    expect(instance.format(oneHourMsec)).toEqual('one hour from now');
  });

  it('should format -1hr as "one hour ago"', function() {
    expect(instance.format(-1 * oneHourMsec)).toEqual('one hour ago');
  });

  it('should format +1hr1ms as "one hour from now"', function() {
    expect(instance.format(oneHourMsec + 1)).toEqual('one hour from now');
  });

  it('should format -1hr1ms as "one hour ago"', function() {
    expect(instance.format(-1 * oneHourMsec - 1)).toEqual('one hour ago');
  });

  it('should format +5hrs as "5 hours from now"', function() {
    expect(instance.format(oneHourMsec * 5)).toEqual('5 hours from now');
  });

  it('should format -5hrs as "5 hours ago"', function() {
    expect(instance.format(-5 * oneHourMsec)).toEqual('5 hours ago');
  });
});

describe('Day Formatter', function() {
  var instance,
      currentDate = new Date(2015, 0, 1, 15, 30),
      oneDayMsec = 1000 * 60 * 60 * 24;

  beforeEach(function() {
    instance = new DayFormatter();
  });

  it('should format +1min as "less than a day from now"', function() {
    var date = new Date(2015, 0, 1, 15, 31);
    expect(instance.format(currentDate, date)).toEqual('less than a day from now');
  });

  it('should format -1min as "less than a day ago"', function() {
    var date = new Date(2015, 0, 1, 15, 29);
    expect(instance.format(currentDate, date)).toEqual('less than a day ago');
  });

  it('should format a few hours in the future as "less than a day from now"', function() {
    var date = new Date(2015, 0, 1, 23, 59, 59);
    expect(instance.format(currentDate, date)).toEqual('less than a day from now');
  });

  it('should format a few hours in the past as "less than a day ago"', function() {
    var date = new Date(2015, 0, 1);
    expect(instance.format(currentDate, date)).toEqual('less than a day ago');
  });

  it('should format midnight of the next day as "tomorrow"', function() {
    var date = new Date(2015, 0, 2);
    expect(instance.format(currentDate, date)).toEqual('tomorrow');
  });

  it('should format 23:59:59 of the next day as "tomorrow"', function() {
    var date = new Date(2015, 0, 2, 23, 59, 59);
    expect(instance.format(currentDate, date)).toEqual('tomorrow');
  });

  it('should format midnight of the previous day as "yesterday"', function() {
    var date = new Date(2014, 11, 31);
    expect(instance.format(currentDate, date)).toEqual('yesterday');
  });

  it('should format 23:59:59 of the previous day as "yesterday"', function() {
    var date = new Date(2014, 11, 31, 23, 59, 59);
    expect(instance.format(currentDate, date)).toEqual('yesterday');
  });

  it('should format 2 days in the future as "2 days from now"', function() {
    var date = new Date(2015, 0, 3);
    expect(instance.format(currentDate, date)).toEqual('2 days from now');
  });

  it('should format 2 days in the past as "2 days ago"', function() {
    var date = new Date(2014, 11, 30);
    expect(instance.format(currentDate, date)).toEqual('2 days ago');
  });

  it('should format a year in the past as "365 days ago"', function() {
    var date = new Date(2014, 0, 1);
    expect(instance.format(currentDate, date)).toEqual('365 days ago');
  });
});
