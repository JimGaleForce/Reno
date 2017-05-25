
// Load reno(.min).js only if in Windows host

if (window.Windows) {
    console.log("//enlighten//: loading");

    window.RenoActivatedArgs = null;
    window.AppMapLoaded = false;

    var link = document.createElement("link");
    link.href = "https://galeforce.azurewebsites.net/reno.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    var js = document.createElement("script");
    js.type = "text/javascript";
    if (window.AppMap && window.AppMap.debug) {
        js.src = "https://galeforce.azurewebsites.net/reno.js";
    } else {
        js.src = "https://galeforce.azurewebsites.net/reno.min.js";
    }
    js.async = false;
    js.onreadystatechange = js.onload = function () {
        Windows.UI.WebUI.WebUIApplication.addEventListener('activated', function (args) {
            if (RenoLib.Reno.instance) {
                console.debug('//enlighten//: activating directly');
                RenoLib.Reno.instance.onActivated(args);
            } else {
                window.RenoActivatedArgs = args;
            }
        });

        window.AppMapLoading = false;
        var invokeWindowAppMap = function () {
            if (window.AppMapLoaded) {
                return; //done
            }

            if (typeof(window.AppMap) === 'undefined') {
                window.AppMap = {};
            }

            if (!window.AppMapLoading && typeof (RenoLib) !== "undefined" && typeof (window.AppMap) !== "undefined") {
                window.AppMapLoading = true;
                if (window.AppMap) {
                    window.AppMapLoaded = RenoLib.Reno.Load(window.AppMap);
                }
                window.AppMapLoading = false;
            }
            else {
                window.setTimeout(invokeWindowAppMap, 100);
            }
        };
        window.setTimeout(invokeWindowAppMap, 0);
    }
    document.head.appendChild(js);
}