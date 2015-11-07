var textReporter = {
    log: function(message, indent, color) {
        if(indent === undefined) indent = 0;
        if(color === undefined) color = '#000';
        
        var div = window.parent.document.createElement('div');
        div.className = 'message';
        div.style.cssText = 'padding-left: ' + (indent * 20) + 'px; color: ' + color + ';';
        div.innerHTML = message;
        window.parent.document.getElementById("test-output").appendChild(div);
    },
    
    jasmineStarted: function(suiteInfo) {
        this.log('Jasmine v' + jasmine.version + ' started.', 0, '#33d');
    },
    
    suiteStarted: function(result) {
        this.log(result.fullName);
    },
    
    specStarted: function(result) {
        this.log(result.description, 1);
    },
    
    specDone: function(result) {
        var color = '#000';
        if(result.status == 'failed')
            color = '#d33';
        else if(result.status == 'pending' || result.status == 'disabled')
            color = '#999';
        else if(result.status == 'passed')
            color = '#393';
        
        this.log('[' + result.status + ']', 2, color);
        for(var i = 0; i < result.failedExpectations.length; i++) {
            this.log('Spec failure: ' + result.failedExpectations[i].message, 3, '#d33');
            this.log('Stack trace:\r\n' + result.failedExpectations[i].stack, 3, '#999');
        }
    },
    
    suiteDone: function(result) {
        this.log(result.description + ': ' + result.status);
        for(var i = 0; i < result.failedExpectations.length; i++) {
            this.log('Suite failure: ' + result.failedExpectations[i].message, 1, '#d33');
            this.log('Stack trace:\r\n' + result.failedExpectations[i].stack, 1, '#999');
        }
    },
    
    jasmineDone: function() {
        this.log('Test run complete.\r\n\r\n', 0, '#33d');
    },
    
    externalError: function(message, url, lineNumber) {
        this.log('Script error on line ' + lineNumber + ': ' + message, 0, '#d33');
        return true;
    }
};

window.onerror = function(message, url, lineNumber) {
    return textReporter.externalError.call(textReporter, message, url, lineNumber);
};
