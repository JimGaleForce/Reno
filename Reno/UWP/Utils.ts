namespace RenoLib {
    export enum DebugType {
        none,
        log,
        debug,
        warning,
        error
    }

    export enum EvalType {
        text,
        element,
        locatorOrTextToText
    }

    export class Utils {
        static isDebugging: boolean = false;
        static debugWindow: Window;

        //defaults a value if it is undefined
        static default(value: any, ...defaultValues: any[]) {
            if (typeof (value) !== "undefined") {
                return value;
            }

            for (var i = 0; i < defaultValues.length; i++) {
                if (typeof (defaultValues[i]) !== "undefined") {
                    return defaultValues[i];
                }
            }

            return value;
        }

        static log(msg: string) {
            Utils.debug(msg, DebugType.log);
        }

        static error(msg: string, e: any) {
            Utils.debug(msg, DebugType.error, e);
        }

        static warning(msg: string) {
            Utils.debug(msg, DebugType.warning);
        }

        static debug(msg: string, debugType: DebugType = DebugType.debug, e: any = null) {
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
        }

        static cleanText(text: string) {
            return text.replace(/[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '_');
        }

        static hashCode(text: string) {
            var hash = 0, i, chr;
            if (text.length === 0) return hash.toString();
            for (i = 0; i < text.length; i++) {
                chr = text.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return hash.toString();
        };

        static fireEvent(name: string) {
            var event;

            event = document.createEvent('HTMLEvents');
            event.initEvent(name, true, true);
            event.eventName = name;
            document.dispatchEvent(event);
        }

        static getElement(locatorOrElement: any) {
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
            } else {
                elements = document.getElementsByTagName(locatorOrElement);
            }

            return elements.length > 0 ? elements[0] : null;
        }

        static async evalAs(valueOrFunction: any, asType: EvalType, a?,b?,c?,d? ) {
            if (asType === EvalType.locatorOrTextToText) {
                if (valueOrFunction.length > 0 && (valueOrFunction[0] === '#' || valueOrFunction[0] === '.')) {
                    valueOrFunction = document.querySelector(valueOrFunction);
                }

                asType = EvalType.text;
            }

            var result = await Utils.eval(valueOrFunction, a,b,c,d);

            if (asType === EvalType.text && typeof (result) !== 'string') {
                if (result instanceof HTMLElement) {
                    result = result.textContent;
                }

                return (result || '') as string;
            }

            return result;
        }

        static async eval(valueOrFunction: any, a?,b?,c?,d?) {
            if (typeof (valueOrFunction) === "function") {
                try {
                    return await valueOrFunction(a,b,c,d);
                } catch (e) {
                    Utils.error('ERROR executing: ' + valueOrFunction, e);
                    return null;
                }
            } else {
                return valueOrFunction;
            }
        }

        static evalNow(valueOrFunction: any, a?, b?, c?, d?) {
            if (typeof (valueOrFunction) === "function") {
                try {
                    return valueOrFunction(a, b, c, d);
                } catch (e) {
                    Utils.error('ERROR executing: ' + valueOrFunction, e);
                    return null;
                }
            } else {
                return valueOrFunction;
            }
        }

        static Html2Uri(idList: any, width: number, height: number) {
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

            var createOpenFirstFile = (filename) => {
                Utils.debug('Html2Uri 3a/6');
                return Windows.Storage.ApplicationData.current.localFolder.createFileAsync(filename, Windows.Storage.CreationCollisionOption.replaceExisting);
            };

            var openFile = (filename) => {
                Utils.debug('Html2Uri 3b/6');
                return Windows.Storage.ApplicationData.current.localFolder.getFileAsync(filename);
            }

            var openAsReadWrite = (file) => {
                Utils.debug('Html2Uri 4/6');
                return file.openAsync(Windows.Storage.FileAccessMode.readWrite);
            };

            var encode = output => {
                Utils.debug('Html2Uri 5/6');
                var encoderId = Windows.Graphics.Imaging.BitmapEncoder.pngEncoderId;
                return Windows.Graphics.Imaging.BitmapEncoder.createAsync(encoderId, output)
            };

            var draw = (encoder) => {
                Utils.debug('Html2Uri 6/6');
                var data = ctx.getImageData(0, 0, width, height);
                encoder.setPixelData(Windows.Graphics.Imaging.BitmapPixelFormat.rgba8, Windows.Graphics.Imaging.BitmapAlphaMode.ignore, width, height, 72, 72, Array.prototype.slice.call(data.data));
                return encoder.flushAsync();
            };

            var getImageToUrl = (url) => {
                Utils.debug('Html2Uri BBB3/6:'+url[0]);
                return (window as any).RenoUtilities.Utils.getUrlToLocalAsync(url[0], '_image.png');
            }

            var returnUrl = (filename) => {
                Utils.debug('Html2Uri 8/6:'+filename);
                return new Windows.Foundation.Uri("ms-appdata:///local/" + filename);
            }

            let topUrl;

            var secondTry = () => {
                Utils.debug('Html2Uri 7/6');
                return getImageToUrl(topUrl).then(() => {
                    return returnUrl('_image.png');
                });
            };

            var firstTry = () => {
                return returnUrl('_canvas.png');
            }

            return Promise.all(promises).then((url) => {
                topUrl = url;
                Utils.debug('Html2Uri 2/6');
                try {
                    return createOpenFirstFile('_canvas.png').then(openAsReadWrite).then(encode).then(draw).then(firstTry, secondTry);
                } catch (e) {
                    Utils.debug('Html2Uri error', e);
                    return secondTry;
                }
            });
        }

        static _Html2UriGetAndDraw(filename: string, ctx: CanvasRenderingContext2D, width: number, height: number) {
            var fn = output => {
                Utils.debug('Html2Uri 4/6');
                var encoderId = Windows.Graphics.Imaging.BitmapEncoder.pngEncoderId;
                return Windows.Graphics.Imaging.BitmapEncoder.createAsync(encoderId, output).then(
                    function (encoder) {
                        Utils.debug('Html2Uri 5/6');
                        try {
                            var data = ctx.getImageData(0, 0, width, height);
                            encoder.setPixelData(Windows.Graphics.Imaging.BitmapPixelFormat.rgba8, Windows.Graphics.Imaging.BitmapAlphaMode.ignore, width, height, 72, 72, Array.prototype.slice.call(data.data));
                            return encoder.flushAsync();
                        } catch (exception) {
                            Utils.error('getImageData/encoder issue', exception);
                            return null;
                        }
                    }
                );
            };

            return fn;
        }

        static _Html2UriDrawItem(info: any, ctx: CanvasRenderingContext2D, ctxWidth: number, ctxHeight: number) {
            var width = ctxWidth;
            var height = ctxHeight;

            var getLocatorMethod = () => {
                return Utils.eval(info.locator);
            }

            var useElementMethod = (locator) => {
                var useElementPromise = new Promise((resolve, reject) => {
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

            var drawMethod = xelement => {
                var drawPromise = new Promise((resolve, reject) => {
                    var x = 0;
                    var y = 0;

                    var element = xelement as any;

                    var draw = () => null;

                    var item = element.tagName;
                    var style = element.currentStyle || window.getComputedStyle(element);
                    if (style) {
                        var backgroundImage = style.backgroundImage.slice(4, -1);
                    }

                    if (backgroundImage) {
                        element = document.createElement('img');
                    }

                    var calc = () => {
                        var hRatio = height / element.height;
                        var wRatio = width / element.width;

                        var stretch = Utils.default(info.stretch, 'Uniform');
                        if (stretch === 'Uniform') {
                            var isHeight = Math.abs(hRatio - 1) < Math.abs(wRatio - 1);
                            if (isHeight) {
                                width = element.width * hRatio;
                                x = (ctxWidth - width) / 2;
                            } else {
                                height = element.height * wRatio;
                                y = (ctxHeight - height) / 2;
                            }
                        } else if (stretch === 'Fill') {
                            //is the default code
                        }
                    }

                    draw = () => ctx.drawImage(element as HTMLImageElement, x, y, width, height);

                    if (backgroundImage) {
                        element.onload = () => {
                            calc();
                            draw();
                            resolve(element.src);
                        }

                        element.src = backgroundImage;
                        return;
                    } else if (element.tagName === 'IMG') {
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
        }

        static Retrieve(url: string) {
            var promise = new Promise(async (resolve, reject) => {
                if (typeof ((window as any).RenoUtilities) !== 'undefined') {
                    Utils.debug('about to Retrieve(' + url + ')');
                    try {
                        var result = await (window as any).RenoUtilities.Utils.getUrlAsync(url);
                        Utils.debug('got it:' + result);
                        resolve(result);
                    } catch (e) {
                        Utils.error("Unable to call RenoUtilities", e);
                    } 
                } else {
                    Utils.warning('RenoUtilities is undefined (may need to include the project reference and rebuild).');
                }
            });

            return promise;
        }

        static Extract(pattern, dataType, formatType, condition, source) {
            var sectionToSearch;
            var promise = new Promise((resolve, reject) => {
                //todo: remake this work for a wrapper too
                if (dataType === 'xml') {
                    var parsed;
                    try {
                        parsed = (new DOMParser()).parseFromString(source, 'application/xml');
                    } catch (e) {
                        Utils.error('extract', e);
                    }
                    sectionToSearch = parsed;
                } else {
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
                } catch (e) {
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
                } catch (e) {
                    console.error('err: (' + evaltext + ')', e);
                    found = true;
                }

                Utils.debug('found : ' + text);
                if (found) {
                    resolve(text);
                } else {
                    reject(text);
                }

                return found;
            });

            return promise;
        };

        static Share(options: any) {
            var dataTransferManager = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();

            if (options.ondatarequested) {
                dataTransferManager.ondatarequested = e => {
                    options.ondatarequested(e, options);
                };
            }

            if (options.ontargetapplicationchosen) {
                dataTransferManager.ontargetapplicationchosen = e => {
                    options.ontargetapplicationchosen(e, options);
                }
            }

            Windows.ApplicationModel.DataTransfer.DataTransferManager.showShareUI();
        }

        static defaultToEmpty(value: any) {
            return (typeof value === 'boolean' && value) ? {} : value;
        }

        static isNotFalse(value: any) {
            return (typeof value !== 'boolean' || value);
        }

        static requireObject(value: any) {
            return (typeof value === 'object') ? value : {};
        }
    }
}