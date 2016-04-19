$(function() {
    var cmInput,
        cmOutput,
        babelOptions = {
            presets: ['es2015'],
            compact: false
        };
    
    function transpile() {
        var input = cmInput.getValue();
        
        try {
            var output = Babel.transform(input, babelOptions).code;
            cmOutput.setValue(output);
        } catch (ex) {
            cmOutput.setValue('*** ERROR ***\n\n' + ex);
        }
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
                    cmInput.setValue(data);
                });
            }
        }
    }
    
    cmInput = CodeMirror.fromTextArea(document.getElementById('input-area'), {
        lineNumbers: true
    });

    cmOutput = CodeMirror.fromTextArea(document.getElementById('output-area'), {
        lineNumbers: true,
        readOnly: true
    });
    
    loadCode();

    $('#run-button').click(function(event) {
        event.preventDefault();
        transpile();
    });
});
