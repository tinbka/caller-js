(function (global, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define(factory)
    else {
        global.caller = factory();
    }
})(this, function () {
    var config = {
        // for a Ruby on Rails app where `/assets/app/` directory stands for app-specific javascripts
        appSources: ['/assets/(app/|application-)']
    };

    /**
     * Rubyish stack trace output powered by Stacktrace-js
     * @requires stacktrace-js/stacktrace
     * @param silent [Boolean] if false, print full stack trace, otherwise (default) scope to application code (/assets/app/*)
     **/
    function log (silent) {
        var c = toArray(silent, silent !== false ? 0 : 1);
        if (!c.length)
            return;
          
        var subject = c[0].split('@'),
            string = subject[1] + " `" + subject[0] + "' called:\n" +
                c.slice(1).map(function (line) {
                    return '    from ' + line.split('@')[1] + ' in `' + line.split('@')[0] + "'";
                }).join('\n');
                
        console.log(string);
    }
    
    /**
     * Stacktrace cleaner
     * @param silent [Boolean] if false, prints full stack trace, otherwise (default) scopes to application code ( /assets/app/* )
     * @param offset [Integer] offset in lines. Set it to 1+ when making caller-decorator functions. Default: 0
     **/
    function toArray (silent, offset) {
        if (typeof window.printStackTrace != 'function')
            return [];
            
        if (typeof offset == 'undefined')
            offset = 0;
            
        var trace = window.printStackTrace();
            
        if (silent !== false) {
            var re = new RegExp("://[^/]+(" + config.appSources.join('|') + ").*\\.js\\b");
            trace = trace.filter(function (line) {
                return line.match(re);
            });
        } else
            trace = trace.slice(4);
            
        return trace.slice(offset);
    }
    
    return {
        config: config,
        log: log,
        toArray: toArray
    };
})