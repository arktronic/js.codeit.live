describe('Relative Time Formatter (integration)', function() {
  var instance,
      currentDate = new Date(2015, 1, 1, 15, 30);

  beforeEach(function() {
    jasmine.clock().install();
    jasmine.clock().mockDate(currentDate);

    var hourFormatter = new HourFormatter();
    var dayFormatter = new DayFormatter();

    instance = new RelativeTimeFormatter(hourFormatter, dayFormatter);
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('should format approx. +5 hours as "5 hours from now"', function() {
    var date = new Date(2015, 1, 1, 20, 59, 59),
        expectedValue = '5 hours from now';

    var actualValue = instance.format(date);

    expect(actualValue).toEqual(expectedValue);
  });

  it('should format approx. -1 hour as "one hour ago"', function() {
    var date = new Date(2015, 1, 1, 14, 15),
        expectedValue = 'one hour ago';

    var actualValue = instance.format(date);

    expect(actualValue).toEqual(expectedValue);
  });

  it('should format approx. +9 hours as "less than a day from now"', function() {
    var date = new Date(2015, 1, 1, 23, 59, 59),
        expectedValue = 'less than a day from now';

    var actualValue = instance.format(date);

    expect(actualValue).toEqual(expectedValue);
  });

  it('should format approx. -3 days as "3 days ago"', function() {
    var date = new Date(2014, 12, 29),
        expectedValue = '3 days ago';

    var actualValue = instance.format(date);

    expect(actualValue).toEqual(expectedValue);
  });
});
