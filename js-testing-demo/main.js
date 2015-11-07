$(function() {
    var $jsFrame,
        cmJsCode,
        cmTestCode;
    
    function loadFrame() {
        if($jsFrame) {
            $jsFrame.remove();
        }
        
        $jsFrame = $('<iframe style="display: none" />');
        $('body').append($jsFrame);
        
        var frameDoc = $jsFrame[0].contentWindow.document;
        frameDoc.open();
        frameDoc.write('<script type="text/javascript" src="jasmine-2.3.4/jasmine.js"></script>');
        frameDoc.write('<script type="text/javascript" src="jasmine-reporter.js"></script>');
        frameDoc.write('<script type="text/javascript" src="jasmine-boot.js"></script>');
        frameDoc.write('<script type="text/javascript">' + cmJsCode.getValue() + '\r\n' + cmTestCode.getValue() + '</script>');
        frameDoc.close();
        
        console.log(cmTestCode.getValue());
        
        var ready = $.Deferred();
        $jsFrame.load(function() {
            ready.resolve();
        });
        
        return ready;
    }
    
    function runTests() {
        $('#test-output').empty();
        
        loadFrame().then(function() {
            $jsFrame[0].contentWindow.jasmine.getEnv().execute();
        });
    }
    
    function retrieveFile(name) {
        return $.ajax({
            url: name,
            dataType: 'text'
        });
    }
    
    function loadCode() {
        if(window.location.search != "") {
            var baseName = window.location.search.substr(1).split('&')[0].split('#')[0];
            if(baseName.match(/^[\w.]+$/) != null) {
                retrieveFile('demo-code/' + baseName + '.js').done(function(data) {
                    cmJsCode.setValue(data);
                });
                retrieveFile('demo-code/' + baseName + '.test.js').done(function(data) {
                    cmTestCode.setValue(data);
                });
            }
        }
    }
    
    function updateTestCodeLineNumbers() {
        var jsLines = cmJsCode.lineCount();
        cmTestCode.setOption('firstLineNumber', jsLines + 1);
    }
    
    cmTestCode = CodeMirror.fromTextArea(document.getElementById('test-code'), {
        lineNumbers: true
    });
    
    cmJsCode = CodeMirror.fromTextArea(document.getElementById('js-code'), {
        lineNumbers: true
    });
    
    cmJsCode.on('change', updateTestCodeLineNumbers);
    
    loadCode();

    $('#run-button').click(function(event) {
        event.preventDefault();
        runTests();
    });
});
