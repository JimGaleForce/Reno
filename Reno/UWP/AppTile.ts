namespace RenoLib {
    export class AppTile extends Activity {
        tileImage: any;
        tileText: any;
        durationSeconds: number;
        repeat: boolean;

        constructor(appBar: any) {
            super();
            this.load(appBar);
        }

        load(appTile: any) {
            var def = this._default();

            this.tileImage = Utils.default(appTile.tileImage, def.tileImage);
            this.tileText = Utils.default(appTile.tileText, def.tileText);

            this.tileText.formatType = Utils.default(this.tileText.formatType, 'text');

            if (this.tileText.uri && typeof (this.tileText.type) === 'undefined' && this.tileText.uri.indexOf('rss') > -1) {
                this.tileText.type = 'rss';
            }

            if (this.tileText.type && this.tileText.type === 'rss') {
                this.tileText.type = 'xml';
                this.tileText.locator = Utils.default(this.tileText.locator, 'item>title');
            }

            this.durationSeconds = Utils.default(appTile.durationSeconds, def.durationSeconds);
            this.repeat = Utils.default(appTile.repeat, def.repeat);
        }

        activate() { 
            this.renderText().then(text => {
                var notifications = Windows.UI.Notifications;
                var template = notifications.TileTemplateType.tileWideImageAndText01;
                var tileXml = notifications.TileUpdateManager.getTemplateContent(template);

                var tileTextAttributes = tileXml.getElementsByTagName("text");
                tileTextAttributes[0].appendChild(tileXml.createTextNode(text as string));

                var tileImage = tileXml.getElementsByTagName("image");
                tileImage[0].attributes['src'] = this.tileImage;

                var tileNotification = new notifications.TileNotification(tileXml);
                var currentTime = new Date();
                tileNotification.expirationTime = new Date(currentTime.getTime() + this.durationSeconds * 1000);
                notifications.TileUpdateManager.createTileUpdaterForApplication().update(tileNotification);

                if (this.repeat) {
                    window.setTimeout(() => { this.activate(); }, this.durationSeconds * 1000);
                }
            });
        }

        renderText() {
            var promise = new Promise((resolve, reject) => {
                if (this.tileText.uri) {
                    Utils.Retrieve(this.tileText.uri).then(data => {
                        resolve(Utils.Extract(this.tileText.locator, this.tileText.type, this.tileText.formatType, null, data));
                    });
                } else {
                    resolve(this.tileText);
                }
            });

            return promise;
        }

        _default() {
            var imgs = document.getElementsByTagName('img');

            return {
                tileImage: Utils.default(RenoLib.Reno.instance.appInfo.logo, 'img'),
                tileText: Utils.default(RenoLib.Reno.instance.appInfo.name, RenoLib.Reno.instance.appInfo.id, ''),
                durationSeconds: 86400,
                repeat: true
            }
        }
    }
}