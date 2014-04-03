///////////////////////////////////////
//          CharManager v1.0         //
// Copyright 2014 The Mastboys3 Team //
///////////////////////////////////////

var fromChars = function () {
    var returnText = "";
    
    if (arguments.length == 1) {
        if (typeof arguments[0] == 'string' || arguments[0] instanceof String) {
            args = arguments[0].split(",");
            
            for (var i = 0; i < args.length; ++i) {
                returnText += String.fromCharCode(args[i]);
            }
            
            return returnText;
        } else if (typeof arguments[0] == 'array' || arguments[0] instanceof Array) {
            args = arguments[0];
            
            for (var i = 0; i < args.length; ++i) {
                returnText += String.fromCharCode(args[i]);
            }
            
            return returnText;
        }
    } else {
        for (var i = 0; i < arguments.length; ++i) {
            returnText += String.fromCharCode(arguments[i]);
        }
        
        return returnText;
    }
};

var toChars = function (arg) {
    var returnArray = [];
    
    if (typeof arg == 'string' || arg instanceof String) {
        var stringArray = arg.split("");
        
        for (var i = 0; i < stringArray.length; i++) {
            returnArray.push(arg.charCodeAt(i));
        }
        
        return returnArray;
    } else if (typeof arg == 'array' || arg instanceof Array) {
        var stringArray = arg;
        
        for (var i = 0; i < stringArray.length; i++) {
            returnArray.push(stringArray[i].charCodeAt(0));
        }
        
        return returnArray;
    }
};

var charset = function(char) {
    var meta = document.getElementsByTagName("meta");
    
    for (var i = 0; i < meta.length; i++) {
        if (meta[i].getAttribute("http-equiv") == "Content-Type") {
            var attrs = meta[i].getAttribute("content").split(",").join(";").split(";");
            
            for (var q = 0; q < attrs.length; q++) {
                if (attrs[q].indexOf("charset=") === 0) {
                    var charsetV = (attrs[q]).split("charset=");
                    
                    if (charsetV[1] == char) {
                        return;
                    } else {
                        var t = attrs;
                        
                        t[q] = "charset=" + char;
                        
                        document.getElementsByTagName("meta")[i].setAttribute("content", t.join(";"));
                        
                        return;
                    }
                }
            }
        }
    }
    
    meta = document.createElement("meta");
    meta.setAttribute("http-equiv", "Content-Type");
    meta.setAttribute("content", "text/html;charset=" + char);
    document.getElementsByTagName("head")[0].appendChild(meta);
}

var include = function(char) {
    var script = document.getElementsByTagName("script");
    
    for (var i = 0; i < script.length; i++) {
        if (script[i].getAttribute("src") != null) {
            if (script[i].getAttribute("src").indexOf(char) === 0) {
                return;
            }
        }
    }
    
    script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", char);
    document.getElementsByTagName("HEAD")[0].appendChild(script);
}

window.fromChars = fromChars;
window.toChars = toChars;
window.charset = charset;
window.include = include;
window.params = (function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1),
        params = {};
    
    while (match = search.exec(query)) {
        params[decode(match[1])] = decode(match[2]);
    }
    
    return params;
})();
