//
//
// Main class of the Reno library
//
//

namespace RenoLib {
    export class Reno {
        abilities: Activity[];
        appInfo: AppInfo;
        static instance: Reno;

        constructor(args: any = (window as any).RenoActivatedArgs) {
            Reno.instance = this;
            
            if (args ) {
                Utils.debug('ACTIVATED INDIRECT');
                this.onActivated(args as CustomEvent);
            }

            window.addEventListener('focus', () => {
                this.refresh();
            });

            this.addExpectedBehaviors();
        }

        static Load(appMapSimple: any) {
            try {
                var reno = (window as any).Reno = new Reno();
                reno.addAppInfo(appMapSimple);
                reno.addAbilities(appMapSimple.abilities);
                reno.activate();
                return true;
            } catch (e) {
                Utils.error('Reno failed to load',  e);
                return false;
            }
        }

        addExpectedBehaviors() {
            //set up notifications
        }

        onActivated(eventInfo: CustomEvent) {
            if (!eventInfo) {
                return;
            }

            if (this.appInfo && this.appInfo.onActivated) {
                var handled = Utils.eval(this.appInfo.onActivated,eventInfo);
                if (handled) {
                    return;
                }
            }

            if (!eventInfo.detail || eventInfo.detail.length === 0) {
                return;
            }

            if (eventInfo.detail[0].kind === Windows.ApplicationModel.Activation.ActivationKind.shareTarget) {
                var shareTarget = (this.abilities as any).find(a => a.type === ActivityType.ShareTarget) as ShareTarget;
                if (shareTarget) {
                    //todo: fix
                    //Windows.UI.Core.CoreDispatcher.call(() => shareTarget.shareReady(eventInfo.detail[0].shareOperation));
                }
            }

            if (eventInfo.detail[0].kind === Windows.ApplicationModel.Activation.ActivationKind.launch) {
                //tile launch
                var args = eventInfo.detail[0].arguments;
                Utils.debug('launch-args:' + args);
                if (args.indexOf('http') === 0) {
                    Utils.debug('launch-nav:' + args);
                    document.addEventListener('RenoActivate', () => { document.location.href = args; });
                    document.location.href = args;                   
                    Utils.debug('launch-navd:' + args);
                }
            }
        }

        async refresh() {
            for (var i = 0; i < this.abilities.length; i++) {
                this.abilities[i].refresh();
            }
        }

        //client adding abilities (appBar, appTile, etc)
        addAbilities(abilities: any) {
            this.abilities = new Array<Activity>();
            if (abilities.appBar) {
                this.abilities.push(new AppBar(abilities.appBar));
            }
            if (abilities.appTile) {
                this.abilities.push(new AppTile(abilities.appTile));
            }
            if (abilities.speech) {
                this.abilities.push(new Speech(abilities.speech));
            }
        }

        addAppInfo(appInfo: any) {
            this.appInfo = new AppInfo(appInfo);;

            if (this.appInfo.isDebugging) {
                RenoLib.Utils.isDebugging = this.appInfo.isDebugging;
            }
        }

        activate() {
            try {
                Utils.fireEvent('RenoActivate');

                if (this.appInfo) {
                    this.appInfo._activate();
                }

                if (document.readyState === "complete" || document.readyState === "loaded" || document.readyState === "interactive") {
                    this._activate();
                } else {
                    document.addEventListener("DOMContentLoaded", () => {
                        this._activate();
                    });
                }
            } catch (e) {
                Utils.error('main activate failed', e);
            }
        }

        //client 'activating' the Reno library (registers listeners)
        _activate() {
            for (var i = 0; i < this.abilities.length; i++) {
                this.abilities[i].activate();
            }
        }
    }
}