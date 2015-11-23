describe('Relative Time Formatter', function() {
  var instance,
      currentDate = new Date(2015, 0, 1, 15, 30);

  beforeEach(function() {
    // Jasmine allows us to mock out clock-related functionality, so that we don't have to rely on the current system's date/time.
    jasmine.clock().install();
    jasmine.clock().mockDate(currentDate);

    instance = new RelativeTimeFormatter();
  });

  afterEach(function() {
    // Although in our case this isn't strictly needed, when you have multiple suites, you should leave the system in the state you found it.
    jasmine.clock().uninstall();
  });

  it('should format the current date/time as "now"', function() {
    expect(instance.format(currentDate)).toEqual('now');
  });

  it('should format 2015-01-01T23:59:59 as "in the future"', function() {
    var date = new Date(2015, 0, 1, 23, 59, 59);
    expect(instance.format(date)).toEqual('in the future');
  });

  it('should format 2015-01-01T00:00:00 as "today"', function() {
    var date = new Date(2015, 0, 1);
    expect(instance.format(date)).toEqual('today');
  });

  it('should format 2014-12-31T23:59:59 as "yesterday"', function() {
    var date = new Date(2014, 11, 31, 23, 59, 59);
    expect(instance.format(date)).toEqual('yesterday');
  });

  it('should format 2014-12-31T00:00:00 as "yesterday"', function() {
    var date = new Date(2014, 11, 31);
    expect(instance.format(date)).toEqual('yesterday');
  });

  it('should format 2014-12-30T23:59:59 as "2 days ago"', function() {
    var date = new Date(2014, 11, 30, 23, 59, 59);
    expect(instance.format(date)).toEqual('2 days ago');
  });

  it('should format 2014-12-30T00:00:00 as "2 days ago"', function() {
    var date = new Date(2014, 11, 30);
    expect(instance.format(date)).toEqual('2 days ago');
  });

  it('should format 2014-01-01T00:00:00 as "365 days ago"', function() {
    var date = new Date(2014, 0, 1);
    expect(instance.format(date)).toEqual('365 days ago');
  });
});