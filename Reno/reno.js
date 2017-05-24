var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var RenoLib;
(function (RenoLib) {
    var TileHelper = (function () {
        function TileHelper() {
        }
        TileHelper.createSecondaryTile = function (elementId, tileId, text, args, logoUri) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var currentTime, TileActivationArguments, newTileDesiredSize, tile, element, selectionRect, buttonCoordinates, placement;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            currentTime = new Date();
                            return [4 /*yield*/, RenoLib.Utils.eval(args)];
                        case 1:
                            TileActivationArguments = _a.sent();
                            newTileDesiredSize = Windows.UI.StartScreen.TileOptions.showNameOnLogo;
                            try {
                                tile = new Windows.UI.StartScreen.SecondaryTile(tileId, text, text, TileActivationArguments, newTileDesiredSize, logoUri);
                            }
                            catch (e) {
                                RenoLib.Utils.error('failed to create secondary tile', e);
                            }
                            element = document.getElementById(elementId);
                            if (element) {
                                selectionRect = element.getBoundingClientRect();
                                buttonCoordinates = { x: selectionRect.left, y: selectionRect.top, width: selectionRect.width, height: selectionRect.height };
                                placement = Windows.UI.Popups.Placement.above;
                                return [2 /*return*/, new Promise(function (resolve, reject) {
                                        try {
                                            tile.requestCreateForSelectionAsync(buttonCoordinates, placement).done(function (isCreated) {
                                                if (isCreated) {
                                                    resolve(true);
                                                }
                                                else {
                                                    reject(false);
                                                }
                                            });
                                        }
                                        catch (e) {
                                            RenoLib.Utils.error('failed to create secondary tile', e);
                                            reject(false);
                                        }
                                    })];
                            }
                            else {
                                RenoLib.Utils.debug('No element to place (shall I pin a tile) question above:' + elementId);
                                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            reject(false);
                                            return [2 /*return*/];
                                        });
                                    }); })];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        TileHelper.isTilePinned = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var tiles, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Windows.UI.StartScreen.SecondaryTile.findAllForPackageAsync()];
                        case 1:
                            tiles = _a.sent();
                            result = false;
                            tiles.forEach(function (tile) {
                                var myTileId = tile.tileId;
                                if (myTileId === id) {
                                    result = true;
                                    return result;
                                }
                            });
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        return TileHelper;
    }());
    RenoLib.TileHelper = TileHelper;
})(RenoLib || (RenoLib = {}));
//# sourceMappingURL=TileHelper.js.map
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var RenoLib;
(function (RenoLib) {
    var DebugType;
    (function (DebugType) {
        DebugType[DebugType["none"] = 0] = "none";
        DebugType[DebugType["log"] = 1] = "log";
        DebugType[DebugType["debug"] = 2] = "debug";
        DebugType[DebugType["error"] = 3] = "error";
    })(DebugType = RenoLib.DebugType || (RenoLib.DebugType = {}));
    var EvalType;
    (function (EvalType) {
        EvalType[EvalType["text"] = 0] = "text";
        EvalType[EvalType["element"] = 1] = "element";
        EvalType[EvalType["locatorOrTextToText"] = 2] = "locatorOrTextToText";
    })(EvalType = RenoLib.EvalType || (RenoLib.EvalType = {}));
    var Utils = (function () {
        function Utils() {
        }
        //defaults a value if it is undefined
        Utils.default = function (value) {
            var defaultValues = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                defaultValues[_i - 1] = arguments[_i];
            }
            if (typeof (value) !== "undefined") {
                return value;
            }
            for (var i = 0; i < defaultValues.length; i++) {
                if (typeof (defaultValues[i]) !== "undefined") {
                    return defaultValues[i];
                }
            }
            return value;
        };
        Utils.log = function (msg) {
            Utils.debug(msg, DebugType.log);
        };
        Utils.error = function (msg, e) {
            Utils.debug(msg, DebugType.error, e);
        };
        Utils.debug = function (msg, debugType, e) {
            if (debugType === void 0) { debugType = DebugType.debug; }
            if (e === void 0) { e = null; }
            var prefix = '///reno///: ';
            switch (debugType) {
                case DebugType.log:
                    console.log(prefix + msg);
                    break;
                case DebugType.debug:
                    if (Utils.isDebugging) {
                        console.debug(prefix + msg);
                    }
                    break;
                case DebugType.error:
                    console.log(prefix + msg + ': ' + e);
                    break;
                default:
                    console.log(prefix + msg);
            }
        };
        Utils.cleanText = function (text) {
            return text.replace(/[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '_');
        };
        Utils.hashCode = function (text) {
            var hash = 0, i, chr;
            if (text.length === 0)
                return hash.toString();
            for (i = 0; i < text.length; i++) {
                chr = text.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return hash.toString();
        };
        ;
        Utils.fireEvent = function (name) {
            var event;
            event = document.createEvent('HTMLEvents');
            event.initEvent(name, true, true);
            event.eventName = name;
            document.dispatchEvent(event);
        };
        Utils.getElement = function (locatorOrElement) {
            if (locatorOrElement instanceof HTMLElement) {
                return locatorOrElement;
            }
            if (typeof (locatorOrElement) === "function") {
                locatorOrElement = locatorOrElement();
            }
            if (typeof (locatorOrElement) !== "string") {
                return null;
            }
            if (locatorOrElement[0] === '#') {
                return document.getElementById(locatorOrElement.substring(1));
            }
            var elements;
            if (locatorOrElement[0] === '.') {
                elements = document.getElementsByClassName(locatorOrElement.substring(1));
            }
            else {
                elements = document.getElementsByTagName(locatorOrElement);
            }
            return elements.length > 0 ? elements[0] : null;
        };
        Utils.evalAs = function (valueOrFunction, asType, a, b, c, d) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (asType === EvalType.locatorOrTextToText) {
                                if (valueOrFunction.length > 0 && (valueOrFunction[0] === '#' || valueOrFunction[0] === '.')) {
                                    valueOrFunction = document.querySelector(valueOrFunction);
                                }
                                asType = EvalType.text;
                            }
                            return [4 /*yield*/, Utils.eval(valueOrFunction, a, b, c, d)];
                        case 1:
                            result = _a.sent();
                            if (asType === EvalType.text && typeof (result) !== 'string') {
                                if (result instanceof HTMLElement) {
                                    result = result.textContent;
                                }
                                return [2 /*return*/, (result || '')];
                            }
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        Utils.eval = function (valueOrFunction, a, b, c, d) {
            return __awaiter(this, void 0, void 0, function () {
                var e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(typeof (valueOrFunction) === "function")) return [3 /*break*/, 5];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, valueOrFunction(a, b, c, d)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            e_1 = _a.sent();
                            Utils.error('ERROR executing: ' + valueOrFunction, e_1);
                            return [2 /*return*/, null];
                        case 4: return [3 /*break*/, 6];
                        case 5: return [2 /*return*/, valueOrFunction];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        Utils.evalNow = function (valueOrFunction, a, b, c, d) {
            if (typeof (valueOrFunction) === "function") {
                try {
                    return valueOrFunction(a, b, c, d);
                }
                catch (e) {
                    Utils.error('ERROR executing: ' + valueOrFunction, e);
                    return null;
                }
            }
            else {
                return valueOrFunction;
            }
        };
        Utils.Html2Uri = function (idList, width, height) {
            Utils.debug('Html2Uri 1/6');
            var canvas = document.createElement('canvas');
            canvas.height = height;
            canvas.width = width;
            var ctx = canvas.getContext('2d');
            if (typeof (idList) === 'string') {
                idList = [{ locator: idList }];
            }
            var promises = [];
            for (var i = 0; i < idList.length; i++) {
                var p = Utils._Html2UriDrawItem(idList[i], ctx, width, height);
                if (p !== null) {
                    promises.push(p);
                }
            }
            var createOpenFirstFile = function (filename) {
                Utils.debug('Html2Uri 3a/6');
                return Windows.Storage.ApplicationData.current.localFolder.createFileAsync(filename, Windows.Storage.CreationCollisionOption.replaceExisting);
            };
            var openFile = function (filename) {
                Utils.debug('Html2Uri 3b/6');
                return Windows.Storage.ApplicationData.current.localFolder.getFileAsync(filename);
            };
            var openAsReadWrite = function (file) {
                Utils.debug('Html2Uri 4/6');
                return file.openAsync(Windows.Storage.FileAccessMode.readWrite);
            };
            var encode = function (output) {
                Utils.debug('Html2Uri 5/6');
                var encoderId = Windows.Graphics.Imaging.BitmapEncoder.pngEncoderId;
                return Windows.Graphics.Imaging.BitmapEncoder.createAsync(encoderId, output);
            };
            var draw = function (encoder) {
                Utils.debug('Html2Uri 6/6');
                var data = ctx.getImageData(0, 0, width, height);
                encoder.setPixelData(Windows.Graphics.Imaging.BitmapPixelFormat.rgba8, Windows.Graphics.Imaging.BitmapAlphaMode.ignore, width, height, 72, 72, Array.prototype.slice.call(data.data));
                return encoder.flushAsync();
            };
            var getImageToUrl = function (url) {
                Utils.debug('Html2Uri BBB3/6:' + url[0]);
                return window.RenoUtilities.Utils.getUrlToLocalAsync(url[0], '_image.png');
            };
            var returnUrl = function (filename) {
                Utils.debug('Html2Uri 8/6:' + filename);
                return new Windows.Foundation.Uri("ms-appdata:///local/" + filename);
            };
            var topUrl;
            var secondTry = function () {
                Utils.debug('Html2Uri 7/6');
                return getImageToUrl(topUrl).then(function () {
                    return returnUrl('_image.png');
                });
            };
            var firstTry = function () {
                return returnUrl('_canvas.png');
            };
            return Promise.all(promises).then(function (url) {
                topUrl = url;
                Utils.debug('Html2Uri 2/6');
                try {
                    return createOpenFirstFile('_canvas.png').then(openAsReadWrite).then(encode).then(draw).then(firstTry, secondTry);
                }
                catch (e) {
                    Utils.debug('Html2Uri error', e);
                    return secondTry;
                }
            });
        };
        Utils._Html2UriGetAndDraw = function (filename, ctx, width, height) {
            var fn = function (output) {
                Utils.debug('Html2Uri 4/6');
                var encoderId = Windows.Graphics.Imaging.BitmapEncoder.pngEncoderId;
                return Windows.Graphics.Imaging.BitmapEncoder.createAsync(encoderId, output).then(function (encoder) {
                    Utils.debug('Html2Uri 5/6');
                    try {
                        var data = ctx.getImageData(0, 0, width, height);
                        encoder.setPixelData(Windows.Graphics.Imaging.BitmapPixelFormat.rgba8, Windows.Graphics.Imaging.BitmapAlphaMode.ignore, width, height, 72, 72, Array.prototype.slice.call(data.data));
                        return encoder.flushAsync();
                    }
                    catch (exception) {
                        Utils.error('getImageData/encoder issue', exception);
                        return null;
                    }
                });
            };
            return fn;
        };
        Utils._Html2UriDrawItem = function (info, ctx, ctxWidth, ctxHeight) {
            var width = ctxWidth;
            var height = ctxHeight;
            var getLocatorMethod = function () {
                return Utils.eval(info.locator);
            };
            var useElementMethod = function (locator) {
                var useElementPromise = new Promise(function (resolve, reject) {
                    var element = Utils.getElement(locator);
                    if (!element) {
                        Utils.debug('no logo/image found: ' + info.locator);
                        reject();
                        return null;
                    }
                    Utils.debug('got logo: ' + info.locator);
                    resolve(element);
                });
                return useElementPromise;
            };
            var drawMethod = function (xelement) {
                var drawPromise = new Promise(function (resolve, reject) {
                    var x = 0;
                    var y = 0;
                    var element = xelement;
                    var draw = function () { return null; };
                    var item = element.tagName;
                    var style = element.currentStyle || window.getComputedStyle(element);
                    if (style) {
                        var backgroundImage = style.backgroundImage.slice(4, -1);
                    }
                    if (backgroundImage) {
                        element = document.createElement('img');
                    }
                    var calc = function () {
                        var hRatio = height / element.height;
                        var wRatio = width / element.width;
                        var stretch = Utils.default(info.stretch, 'Uniform');
                        if (stretch === 'Uniform') {
                            var isHeight = Math.abs(hRatio - 1) < Math.abs(wRatio - 1);
                            if (isHeight) {
                                width = element.width * hRatio;
                                x = (ctxWidth - width) / 2;
                            }
                            else {
                                height = element.height * wRatio;
                                y = (ctxHeight - height) / 2;
                            }
                        }
                        else if (stretch === 'Fill') {
                            //is the default code
                        }
                    };
                    draw = function () { return ctx.drawImage(element, x, y, width, height); };
                    if (backgroundImage) {
                        element.onload = function () {
                            calc();
                            draw();
                            resolve(element.src);
                        };
                        element.src = backgroundImage;
                        return;
                    }
                    else if (element.tagName === 'IMG') {
                        calc();
                        draw();
                    }
                    resolve(element.src);
                });
                return drawPromise;
            };
            return getLocatorMethod().then(useElementMethod).then(drawMethod);
            //this part doesn't work yet ...
            //var data = "data:image/svg+xml," +
            //    "<svg xmlns='http://www.w3.org/2000/svg' width='" + width + "' height='" + height + "'>" +
            //    "<foreignObject width='100%' height='100%'>" +
            //    element.outerHTML +
            //    "</foreignObject>" +
            //    "</svg>";
            //var img = new Image();
            //var p = new Promise((resolve, reject) => {
            //    img.onload = (x) => {
            //        var ppp = 0;
            //        console.debug('onload!');
            //    };
            //    img.src = data;
            //    // ctx.drawImage(img, 0, 0);
            //    resolve(); ///
            //    var i = 0;
            //});
            //return p;
        };
        Utils.Retrieve = function (url) {
            var _this = this;
            var promise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(typeof (window.RenoUtilities) !== 'undefined')) return [3 /*break*/, 2];
                            Utils.debug('about to Retrieve(' + url + ')');
                            return [4 /*yield*/, window.RenoUtilities.Utils.getUrlAsync(url)];
                        case 1:
                            result = _a.sent();
                            Utils.debug('got it:' + result);
                            resolve(result);
                            return [3 /*break*/, 3];
                        case 2:
                            Utils.debug('retrieve-unresolved!');
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            return promise;
        };
        Utils.Extract = function (pattern, dataType, formatType, condition, source) {
            var sectionToSearch;
            var promise = new Promise(function (resolve, reject) {
                //todo: remake this work for a wrapper too
                if (dataType === 'xml') {
                    var parsed;
                    try {
                        parsed = (new DOMParser()).parseFromString(source, 'application/xml');
                    }
                    catch (e) {
                        Utils.error('extract', e);
                    }
                    sectionToSearch = parsed;
                }
                else {
                    sectionToSearch = source;
                }
                var attrIndex = pattern.indexOf(':attr(');
                var attr = null;
                if (attrIndex > -1) {
                    var attrEndIndex = pattern.indexOf(')', attrIndex);
                    if (attrEndIndex > -1) {
                        attr = pattern.substr(attrIndex + 6, attrEndIndex - attrIndex - 6);
                        pattern = pattern.substr(0, attrIndex) + ((pattern.length > attrEndIndex + 1)
                            ? pattern.substr(attrEndIndex + 1)
                            : "");
                    }
                }
                var text = null;
                try {
                    text = sectionToSearch.querySelector(pattern);
                }
                catch (e) {
                    Utils.error('FS: selector failed: ' + pattern + " : ", e);
                    return null;
                }
                if (text === null) {
                    //none found
                    Utils.debug('FS: no matching selections: ' + pattern);
                    return null;
                }
                if (attr !== null) {
                    text = text.getAttributeNode(attr);
                }
                if (formatType === 'text') {
                    text = text.textContent;
                    if (text.indexOf('CDATA') > -1) {
                        var left = text.lastIndexOf('[');
                        var right = text.indexOf(']');
                        text = text.substr(left + 1, right - left - 1);
                    }
                }
                if (typeof (condition) === 'undefined' || condition === null) {
                    Utils.debug('found : ' + text);
                    resolve(text);
                    return true;
                }
                var found = false;
                var evaltext = condition.replace('value', '"' + text + '"');
                try {
                    found = !condition || eval(evaltext);
                }
                catch (e) {
                    console.error('err: (' + evaltext + ')', e);
                    found = true;
                }
                Utils.debug('found : ' + text);
                if (found) {
                    resolve(text);
                }
                else {
                    reject(text);
                }
                return found;
            });
            return promise;
        };
        ;
        Utils.Share = function (options) {
            var dataTransferManager = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
            if (options.ondatarequested) {
                dataTransferManager.ondatarequested = function (e) {
                    options.ondatarequested(e, options);
                };
            }
            if (options.ontargetapplicationchosen) {
                dataTransferManager.ontargetapplicationchosen = function (e) {
                    options.ontargetapplicationchosen(e, options);
                };
            }
            Windows.ApplicationModel.DataTransfer.DataTransferManager.showShareUI();
        };
        return Utils;
    }());
    Utils.isDebugging = false;
    RenoLib.Utils = Utils;
})(RenoLib || (RenoLib = {}));
//# sourceMappingURL=Utils.js.map
var RenoLib;
(function (RenoLib) {
    var Activity = (function () {
        function Activity() {
            this.type = ActivityType.custom;
        }
        Activity.prototype.activate = function () { };
        Activity.prototype.deactivate = function () { };
        Activity.prototype.pageChanged = function () { };
        Activity.prototype.refresh = function () { };
        return Activity;
    }());
    RenoLib.Activity = Activity;
    var ActivityType;
    (function (ActivityType) {
        ActivityType[ActivityType["custom"] = 0] = "custom";
        ActivityType[ActivityType["AppBar"] = 1] = "AppBar";
        ActivityType[ActivityType["AppTile"] = 2] = "AppTile";
        ActivityType[ActivityType["ShareTarget"] = 3] = "ShareTarget";
        ActivityType[ActivityType["Speech"] = 4] = "Speech";
    })(ActivityType = RenoLib.ActivityType || (RenoLib.ActivityType = {}));
})(RenoLib || (RenoLib = {}));
//# sourceMappingURL=Activity.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var RenoLib;
(function (RenoLib) {
    var AppInfo = (function (_super) {
        __extends(AppInfo, _super);
        function AppInfo(appInfo) {
            var _this = _super.call(this) || this;
            var def = _this._default();
            _this.protocol = appInfo.protocol;
            _this.id = appInfo.id;
            _this.name = appInfo.name;
            _this.isDebugging = appInfo.debug;
            _this.onActivated = appInfo.onActivated;
            _this.fullScreen = appInfo.fullScreen;
            _this.title = appInfo.title || def.title;
            _this.logo = appInfo.logo || 'img';
            RenoLib.Utils.isDebugging = _this.isDebugging;
            return _this;
        }
        AppInfo.prototype._activate = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = Windows.UI.ViewManagement.ApplicationView.getForCurrentView();
                            return [4 /*yield*/, RenoLib.Utils.eval(this.title)];
                        case 1:
                            _a.title = _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AppInfo.prototype._default = function () {
            return {
                title: function () { return document.title; }
            };
        };
        return AppInfo;
    }(RenoLib.Activity));
    RenoLib.AppInfo = AppInfo;
})(RenoLib || (RenoLib = {}));
//# sourceMappingURL=AppInfo.js.map
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var RenoLib;
(function (RenoLib) {
    var AppBarCommand = (function () {
        function AppBarCommand(command) {
            var def = AppBarCommand._defaultById(command.id);
            RenoLib.Utils.debug('(new) adopting from existing cmd:' + command.id);
            this.adopt(command, def);
        }
        AppBarCommand.prototype.adopt = function (first, second) {
            if (second === void 0) { second = this; }
            this.show = RenoLib.Utils.default(first.show, second.show);
            this.text = RenoLib.Utils.default(first.text, second.text);
            this.command = RenoLib.Utils.default(first.command, second.command);
            this.id = RenoLib.Utils.default(first.id, second.id);
            this.icon = RenoLib.Utils.default(first.icon, second.icon);
            this.options = RenoLib.Utils.default(second.options, first.options);
            this.options.args = RenoLib.Utils.default(first.options && first.options.args, second.options.args);
            this.options.ondatarequested = RenoLib.Utils.default(first.options && first.options.ondatarequested, second.options.ondatarequested);
            this.options.title = RenoLib.Utils.default(first.options && first.options.title, second.options.title);
            this.options.text = RenoLib.Utils.default(first.options && first.options.text, second.options.text);
            this.options.tileId = RenoLib.Utils.default(first.options && first.options.tileId, second.options.tileId);
            this.options.tileImage = RenoLib.Utils.default(first.options && first.options.tileImage, second.options.tileImage);
        };
        AppBarCommand._defaultById = function (id) {
            switch (id) {
                case 'ShareCommand': return AppBarCommand._defaultShareCommand();
                case 'PinCommand': return AppBarCommand._defaultPinCommand();
                case 'UnpinCommand': return AppBarCommand._defaultUnpinCommand();
                default: return AppBarCommand._default();
            }
        };
        AppBarCommand._default = function () {
            return {
                show: true,
                icon: 'help',
                options: {
                    args: ""
                }
            };
        };
        AppBarCommand._defaultPinCommand = function () {
            var _this = this;
            return {
                id: "PinCommand",
                text: RenoLib.Utils.default(RenoLib.Reno.instance.appInfo.name, RenoLib.Reno.instance.appInfo.id, 'pin'),
                icon: '\ue718',
                options: {
                    tileImage: RenoLib.Utils.default(RenoLib.Reno.instance.appInfo.logo, 'img'),
                    args: function () {
                        return document.URL;
                    },
                    tileId: document.URL
                },
                show: function (command, appBar, app) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, RenoLib.TileHelper.isTilePinned(app.appInfo.id + '.' + RenoLib.Utils.hashCode(command.options.tileId))];
                        case 1: return [2 /*return*/, !(_a.sent())];
                    }
                }); }); },
                command: function (sender, command, appBar, app) {
                    RenoLib.Utils.debug('tile:0:command');
                    var uri2 = RenoLib.Utils.Html2Uri([{ locator: command.options.tileImage, stretch: 'Uniform' }], 150, 150).then(function (uri) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        var _a, _b, _c, e_1;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    RenoLib.Utils.debug('tile:1:logo created');
                                    _d.label = 1;
                                case 1:
                                    _d.trys.push([1, 3, , 4]);
                                    _b = (_a = RenoLib.TileHelper).createSecondaryTile;
                                    _c = [command.id, app.appInfo.id + '.' + RenoLib.Utils.hashCode(command.options.tileId)];
                                    return [4 /*yield*/, RenoLib.Utils.evalAs(command.text, RenoLib.EvalType.locatorOrTextToText, document.URL)];
                                case 2:
                                    _b.apply(_a, _c.concat([_d.sent(), document.URL, uri])).then(function (worked) { return __awaiter(_this, void 0, void 0, function () {
                                        var file;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!!worked) return [3 /*break*/, 3];
                                                    RenoLib.Utils.debug('tile failed: deleting logo');
                                                    return [4 /*yield*/, Windows.Storage.ApplicationData.current.localFolder.getFileAsync(uri.toString())];
                                                case 1:
                                                    file = _a.sent();
                                                    return [4 /*yield*/, file.deleteAsync()];
                                                case 2:
                                                    _a.sent();
                                                    _a.label = 3;
                                                case 3:
                                                    appBar.refresh();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_1 = _d.sent();
                                    RenoLib.Utils.error('tile failed', e_1);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    return;
                }
            };
        };
        AppBarCommand._defaultUnpinCommand = function () {
            var _this = this;
            return {
                id: "UnpinCommand",
                text: "Unpin",
                icon: '\ue77a',
                options: {
                    args: function () {
                        return document.URL;
                    },
                    tileId: document.URL
                },
                show: function (command, appBar, app) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, RenoLib.TileHelper.isTilePinned(app.appInfo.id + '.' + RenoLib.Utils.hashCode(command.options.tileId))];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                }); }); },
                command: function (sender, command, appBar, app) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    var tileToBeDeleted, isDeleted;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                tileToBeDeleted = new Windows.UI.StartScreen.SecondaryTile(app.appInfo.id + '.' + RenoLib.Utils.hashCode(command.options.tileId));
                                return [4 /*yield*/, tileToBeDeleted.requestDeleteAsync()];
                            case 1:
                                isDeleted = _a.sent();
                                if (!isDeleted) return [3 /*break*/, 3];
                                // Secondary tile successfully deleted.
                                return [4 /*yield*/, appBar.refresh()];
                            case 2:
                                // Secondary tile successfully deleted.
                                _a.sent();
                                window.setTimeout(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, appBar.refresh()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                }); }); }, 250);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); }
            };
        };
        AppBarCommand._defaultShareCommand = function () {
            return {
                id: 'ShareCommand',
                text: 'Share',
                icon: '\ue72d',
                show: true,
                options: {
                    title: document.title,
                    text: 'Check this out! ' + document.location.href,
                    ondatarequested: function (e, options) {
                        e.request.data.properties.title = RenoLib.Utils.evalNow(options.title, document.URL);
                        e.request.data.setText(RenoLib.Utils.evalNow(options.text, document.URL));
                    }
                },
                command: function (sender, command, appBar, app) {
                    RenoLib.Utils.Share(command.options);
                }
            };
        };
        return AppBarCommand;
    }());
    RenoLib.AppBarCommand = AppBarCommand;
})(RenoLib || (RenoLib = {}));
//# sourceMappingURL=AppBarCommand.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var RenoLib;
(function (RenoLib) {
    var AppBar = (function (_super) {
        __extends(AppBar, _super);
        function AppBar(appBar) {
            var _this = _super.call(this) || this;
            _this.type = RenoLib.ActivityType.AppBar;
            _this.load(appBar);
            return _this;
        }
        //loads client-specified appbar data for later dynamic execution
        AppBar.prototype.load = function (appBar) {
            var def = this._default();
            this.show = RenoLib.Utils.default(appBar.show, def.appBar.show, true);
            this.commands = RenoLib.Utils.default(appBar.commands, def.appBar.commands, []);
            if (appBar.commands && appBar.keepDefaultCommands) {
                for (var i = 0; i < def.appBar.commands.length; i++) {
                    this.commands.splice(i, 0, def.appBar.commands[i]);
                }
            }
        };
        AppBar.prototype.activate = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!RenoLib.Utils.eval(this.show, this, RenoLib.Reno.instance)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.create()];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            RenoLib.Utils.debug('appbar show was false');
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        AppBar.prototype.create = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var cmdBar, _loop_1, this_1, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            RenoLib.Utils.debug('appBar-creating');
                            cmdBar = document.createElement('div');
                            cmdBar.className = 'reno';
                            cmdBar.id = 'commandbar';
                            this.buttons = new Array();
                            _loop_1 = function () {
                                var command = null;
                                for (var j = 0; j < this_1.buttons.length; j++) {
                                    if (this_1.buttons[j].id === this_1.commands[i].id) {
                                        command = this_1.buttons[j];
                                    }
                                }
                                var found = command !== null;
                                if (!found) {
                                    RenoLib.Utils.debug('adding new cmd:' + this_1.commands[i].id);
                                    command = new RenoLib.AppBarCommand(this_1.commands[i]);
                                    this_1.buttons.push(command);
                                    var button = document.createElement('button');
                                    button.className = 'commandbutton reno';
                                    button.textContent = command.icon;
                                    button.id = command.id;
                                    button.onclick = function (sender) { command.command(sender, command, _this, RenoLib.Reno.instance); };
                                    cmdBar.appendChild(button);
                                }
                                else {
                                    RenoLib.Utils.debug('adopting from existing cmd:' + this_1.commands[i].id);
                                    command.adopt(this_1.commands[i]);
                                }
                            };
                            this_1 = this;
                            for (i = 0; i < this.commands.length; i++) {
                                _loop_1();
                            }
                            document.body.appendChild(cmdBar);
                            return [4 /*yield*/, this.refresh()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AppBar.prototype.refresh = function () {
            return __awaiter(this, void 0, void 0, function () {
                var i, element, isHidden, show;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < this.buttons.length)) return [3 /*break*/, 4];
                            element = document.getElementById(this.buttons[i].id);
                            isHidden = element.className.indexOf(' hidden') > -1;
                            return [4 /*yield*/, RenoLib.Utils.eval(this.buttons[i].show, this.buttons[i], this, RenoLib.Reno.instance)];
                        case 2:
                            show = _a.sent();
                            if (!show) {
                                RenoLib.Utils.debug('appbarcmd (' + this.buttons[i].id + ') show was false');
                            }
                            if (isHidden === show) {
                                if (!show) {
                                    element.className += ' hidden';
                                }
                                else {
                                    element.className = element.className.replace(' hidden', '');
                                }
                            }
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        AppBar.prototype._default = function () {
            return {
                appBar: {
                    show: true,
                    commands: [
                        RenoLib.AppBarCommand._defaultPinCommand(),
                        RenoLib.AppBarCommand._defaultUnpinCommand(),
                        RenoLib.AppBarCommand._defaultShareCommand()
                    ]
                }
            };
        };
        return AppBar;
    }(RenoLib.Activity));
    RenoLib.AppBar = AppBar;
})(RenoLib || (RenoLib = {}));
//# sourceMappingURL=AppBar.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var RenoLib;
(function (RenoLib) {
    var AppTile = (function (_super) {
        __extends(AppTile, _super);
        function AppTile(appBar) {
            var _this = _super.call(this) || this;
            _this.load(appBar);
            return _this;
        }
        AppTile.prototype.load = function (appTile) {
            var def = this._default();
            this.tileImage = RenoLib.Utils.default(appTile.tileImage, def.tileImage);
            this.tileText = RenoLib.Utils.default(appTile.tileText, def.tileText);
            this.tileText.formatType = RenoLib.Utils.default(this.tileText.formatType, 'text');
            if (this.tileText.uri && typeof (this.tileText.type) === 'undefined' && this.tileText.uri.indexOf('rss') > -1) {
                this.tileText.type = 'rss';
            }
            if (this.tileText.type && this.tileText.type === 'rss') {
                this.tileText.type = 'xml';
                this.tileText.locator = RenoLib.Utils.default(this.tileText.locator, 'item>title');
            }
            this.durationSeconds = RenoLib.Utils.default(appTile.durationSeconds, def.durationSeconds);
            this.repeat = RenoLib.Utils.default(appTile.repeat, def.repeat);
        };
        AppTile.prototype.activate = function () {
            var _this = this;
            this.renderText().then(function (text) {
                var notifications = Windows.UI.Notifications;
                var template = notifications.TileTemplateType.tileWideImageAndText01;
                var tileXml = notifications.TileUpdateManager.getTemplateContent(template);
                var tileTextAttributes = tileXml.getElementsByTagName("text");
                tileTextAttributes[0].appendChild(tileXml.createTextNode(text));
                var tileImage = tileXml.getElementsByTagName("image");
                tileImage[0].attributes['src'] = _this.tileImage;
                var tileNotification = new notifications.TileNotification(tileXml);
                var currentTime = new Date();
                tileNotification.expirationTime = new Date(currentTime.getTime() + _this.durationSeconds * 1000);
                notifications.TileUpdateManager.createTileUpdaterForApplication().update(tileNotification);
                if (_this.repeat) {
                    window.setTimeout(function () { _this.activate(); }, _this.durationSeconds * 1000);
                }
            });
        };
        AppTile.prototype.renderText = function () {
            var _this = this;
            var promise = new Promise(function (resolve, reject) {
                if (_this.tileText.uri) {
                    RenoLib.Utils.Retrieve(_this.tileText.uri).then(function (data) {
                        resolve(RenoLib.Utils.Extract(_this.tileText.locator, _this.tileText.type, _this.tileText.formatType, null, data));
                    });
                }
                else {
                    resolve(_this.tileText);
                }
            });
            return promise;
        };
        AppTile.prototype._default = function () {
            var imgs = document.getElementsByTagName('img');
            return {
                tileImage: RenoLib.Utils.default(RenoLib.Reno.instance.appInfo.logo, 'img'),
                tileText: RenoLib.Utils.default(RenoLib.Reno.instance.appInfo.name, RenoLib.Reno.instance.appInfo.id, ''),
                durationSeconds: 86400,
                repeat: true
            };
        };
        return AppTile;
    }(RenoLib.Activity));
    RenoLib.AppTile = AppTile;
})(RenoLib || (RenoLib = {}));
//# sourceMappingURL=AppTile.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var RenoLib;
(function (RenoLib) {
    var ShareTarget = (function (_super) {
        __extends(ShareTarget, _super);
        function ShareTarget(shareTarget) {
            var _this = _super.call(this) || this;
            _this.type = RenoLib.ActivityType.ShareTarget;
            _this.shareOperation = null;
            _this.onShareReady = RenoLib.Utils.default(shareTarget.onShareReady, _this.onShareReady);
            return _this;
        }
        ShareTarget.prototype.shareReady = function (shareOperation) {
            //insert analytics
            this.shareOperation = shareOperation;
            if (this.onShareReady) {
                this.onShareReady(this.shareOperation);
            }
        };
        ShareTarget.prototype._default = function () {
            return {
                onShareReady: function (shareOperation) {
                    var title = shareOperation.data.properties.title;
                    var description = shareOperation.data.properties.description;
                    var packageFamilyName = shareOperation.data.properties.packageFamilyName;
                }
            };
        };
        return ShareTarget;
    }(RenoLib.Activity));
    RenoLib.ShareTarget = ShareTarget;
})(RenoLib || (RenoLib = {}));
//# sourceMappingURL=ShareTarget.js.map
// FILE IN PROGRESS
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var RenoLib;
(function (RenoLib) {
    var Speech = (function (_super) {
        __extends(Speech, _super);
        function Speech(speech) {
            var _this = _super.call(this) || this;
            _this.type = RenoLib.ActivityType.Speech;
            _this.load(speech);
            return _this;
        }
        Speech.prototype.load = function (speech) {
        };
        Speech.prototype.activate = function () {
            var _this = this;
            window.setInterval(function () { return _this._tick(); }, 500);
            this._requestMicrophonePermission().then(function (available) {
                if (available) {
                    _this.initializeRecognizer();
                }
            }, function (error) {
                var messageDialog = new Windows.UI.Popups.MessageDialog(error.message, "Exception");
                messageDialog.showAsync();
            });
            //this.initializeSpeech();
        };
        Speech.prototype._deactivate = function () {
            //if (this.recognizer != null) {
            //    this.recognizer.removeEventListener('statechanged', this.onSpeechRecognizerStateChanged, false);
            //    this.recognizer.close();
            //}
        };
        Speech.prototype._tick = function () {
        };
        Speech.prototype.initializeRecognizer = function (core) {
            if (core === void 0) { core = false; }
            RenoLib.Utils.debug('initializeRecognizer');
            if (typeof this.recognizer !== 'undefined') {
                this.recognizer = null;
            }
            try {
                this.recognizer = new Windows.Media.SpeechRecognition.SpeechRecognizer();
            }
            catch (e) {
                RenoLib.Utils.debug('failed to start speech recognition:' + e.toString());
                return;
            }
            //this.recognizer.continuousRecognitionSession.addEventListener('resultgenerated', (args) => this.onSpeechRecognizerResultGenerated(args), false);
            if (!core) {
                //this.refreshRecognition(true);
            }
            //this.recognizer.addEventListener('statechanged', (args) => this.onSpeechRecognizerStateChanged(args), false);
            // Handle continuous recognition events. Completed fires when various error states occur or the session otherwise ends.
            // ResultGenerated fires when recognized phrases are spoken or the garbage rule is hit.
            //this.recognizer.continuousRecognitionSession.addEventListener('completed', (args) => this.onSpeechRecognizerSessionCompleted(args), false);
        };
        Speech.prototype._requestMicrophonePermission = function () {
            return new Promise(function (resolve, reject) {
                try {
                    var captureSettings = new Windows.Media.Capture.MediaCaptureInitializationSettings();
                    captureSettings.streamingCaptureMode = Windows.Media.Capture.StreamingCaptureMode.audio;
                    var capture = new Windows.Media.Capture.MediaCapture();
                    capture.initializeAsync(captureSettings).then(function () {
                        resolve(true);
                    }, function (error) {
                        if (error.number === -2147024891) {
                            resolve(false);
                        }
                        else if (error.number === -1072845856) {
                            var messageDialog = new Windows.UI.Popups.MessageDialog("No Audio Capture devices are present on this system.");
                            messageDialog.showAsync();
                            resolve(false);
                        }
                        else {
                            reject(error);
                        }
                    });
                }
                catch (exception) {
                    if (exception.number === -2147221164) {
                        var messageDialog = new Windows.UI.Popups.MessageDialog("Media Player components not available on this system.");
                        messageDialog.showAsync();
                        return false;
                    }
                }
            });
        };
        return Speech;
    }(RenoLib.Activity));
    RenoLib.Speech = Speech;
    var SpeakStatus;
    (function (SpeakStatus) {
        SpeakStatus[SpeakStatus["NotReady"] = 0] = "NotReady";
        SpeakStatus[SpeakStatus["Ready"] = 1] = "Ready";
        SpeakStatus[SpeakStatus["Speaking"] = 2] = "Speaking";
        SpeakStatus[SpeakStatus["Paused"] = 3] = "Paused";
    })(SpeakStatus || (SpeakStatus = {}));
})(RenoLib || (RenoLib = {}));
//# sourceMappingURL=Speech.js.map
//
//
// Main class of the Reno library
//
//
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var RenoLib;
(function (RenoLib) {
    var Reno = (function () {
        function Reno(args) {
            if (args === void 0) { args = window.RenoActivatedArgs; }
            var _this = this;
            Reno.instance = this;
            if (args) {
                RenoLib.Utils.debug('ACTIVATED INDIRECT');
                this.onActivated(args);
            }
            window.addEventListener('focus', function () {
                _this.refresh();
            });
            this.addExpectedBehaviors();
        }
        Reno.Load = function (appMapSimple) {
            try {
                var reno = window.Reno = new Reno();
                reno.addAppInfo(appMapSimple);
                reno.addAbilities(appMapSimple.abilities);
                reno.activate();
                return true;
            }
            catch (e) {
                RenoLib.Utils.error('Reno failed to load', e);
                return false;
            }
        };
        Reno.prototype.addExpectedBehaviors = function () {
            //set up notifications
        };
        Reno.prototype.onActivated = function (eventInfo) {
            if (!eventInfo) {
                return;
            }
            if (this.appInfo && this.appInfo.onActivated) {
                var handled = RenoLib.Utils.eval(this.appInfo.onActivated, eventInfo);
                if (handled) {
                    return;
                }
            }
            if (!eventInfo.detail || eventInfo.detail.length === 0) {
                return;
            }
            if (eventInfo.detail[0].kind === Windows.ApplicationModel.Activation.ActivationKind.shareTarget) {
                var shareTarget = this.abilities.find(function (a) { return a.type === RenoLib.ActivityType.ShareTarget; });
                if (shareTarget) {
                    //todo: fix
                    //Windows.UI.Core.CoreDispatcher.call(() => shareTarget.shareReady(eventInfo.detail[0].shareOperation));
                }
            }
            if (eventInfo.detail[0].kind === Windows.ApplicationModel.Activation.ActivationKind.launch) {
                //tile launch
                var args = eventInfo.detail[0].arguments;
                RenoLib.Utils.debug('launch-args:' + args);
                if (args.indexOf('http') === 0) {
                    RenoLib.Utils.debug('launch-nav:' + args);
                    document.addEventListener('RenoActivate', function () { document.location.href = args; });
                    document.location.href = args;
                    RenoLib.Utils.debug('launch-navd:' + args);
                }
            }
        };
        Reno.prototype.refresh = function () {
            return __awaiter(this, void 0, void 0, function () {
                var i;
                return __generator(this, function (_a) {
                    for (i = 0; i < this.abilities.length; i++) {
                        this.abilities[i].refresh();
                    }
                    return [2 /*return*/];
                });
            });
        };
        //client adding abilities (appBar, appTile, etc)
        Reno.prototype.addAbilities = function (abilities) {
            this.abilities = new Array();
            if (abilities.appBar) {
                this.abilities.push(new RenoLib.AppBar(abilities.appBar));
            }
            if (abilities.appTile) {
                this.abilities.push(new RenoLib.AppTile(abilities.appTile));
            }
            if (abilities.speech) {
                this.abilities.push(new RenoLib.Speech(abilities.speech));
            }
        };
        Reno.prototype.addAppInfo = function (appInfo) {
            this.appInfo = new RenoLib.AppInfo(appInfo);
            ;
            if (this.appInfo.isDebugging) {
                RenoLib.Utils.isDebugging = this.appInfo.isDebugging;
            }
        };
        Reno.prototype.activate = function () {
            var _this = this;
            try {
                RenoLib.Utils.fireEvent('RenoActivate');
                if (this.appInfo) {
                    this.appInfo._activate();
                }
                if (document.readyState === "complete" || document.readyState === "loaded" || document.readyState === "interactive") {
                    this._activate();
                }
                else {
                    document.addEventListener("DOMContentLoaded", function () {
                        _this._activate();
                    });
                }
            }
            catch (e) {
                RenoLib.Utils.error('main activate failed', e);
            }
        };
        //client 'activating' the Reno library (registers listeners)
        Reno.prototype._activate = function () {
            for (var i = 0; i < this.abilities.length; i++) {
                this.abilities[i].activate();
            }
        };
        return Reno;
    }());
    RenoLib.Reno = Reno;
})(RenoLib || (RenoLib = {}));
//# sourceMappingURL=Reno.js.map