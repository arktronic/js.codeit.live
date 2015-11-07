(function() {
    function extend(destination, source) {
        for (var property in source) destination[property] = source[property];
        return destination;
    }
    
    window.jasmine = jasmineRequire.core(jasmineRequire);
    var env = jasmine.getEnv();
    var jasmineInterface = jasmineRequire.interface(jasmine, env);
    extend(window, jasmineInterface);
    env.catchExceptions(true);
    env.throwOnExpectationFailure(false);

    env.addReporter(textReporter);

    window.setTimeout = window.setTimeout;
    window.setInterval = window.setInterval;
    window.clearTimeout = window.clearTimeout;
    window.clearInterval = window.clearInterval;
}());
