namespace RenoLib {
    export class AppInfo extends Activity {
        id: string;
        name: string;
        isDebugging: any;
        protocol: string;
        onActivated: any;
        fullScreen: any;
        title: any;
        logo: any;

        constructor(appInfo: any) {
            super();

            var def = this._default();

            this.protocol = appInfo.protocol;
            this.id = appInfo.id;
            this.name = appInfo.name;
            this.isDebugging = appInfo.debug;
            this.onActivated = appInfo.onActivated;
            this.fullScreen = appInfo.fullScreen;
            this.title = appInfo.title || def.title;
            this.logo = appInfo.logo || 'img';

            Utils.isDebugging = this.isDebugging;
        }

        async _activate() {
            Windows.UI.ViewManagement.ApplicationView.getForCurrentView().title = await Utils.eval(this.title);
        }

        _default() {
            return {
                title: () => document.title
            }
        }
    }
}