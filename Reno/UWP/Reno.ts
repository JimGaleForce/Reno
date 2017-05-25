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

                if (Utils.isNotFalse(appMapSimple)) {
                    var appMapSimple2 = typeof (appMapSimple) === 'object' ? appMapSimple : {};
                    reno.addAppInfo(appMapSimple2);
                    if (Utils.isNotFalse(appMapSimple2.abilities)) {
                        appMapSimple2.abilities = typeof (appMapSimple2.abilities) === 'object' ? appMapSimple2.abilities : {};

                        reno.addAbilities(appMapSimple2.abilities);
                    }
                }

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

            if (eventInfo.detail[0].kind === Windows.ApplicationModel.Activation.ActivationKind.protocol) {
                //tile launch
                if (eventInfo && eventInfo.detail && eventInfo.detail[0] && eventInfo.detail[0].uri) {
                    var args = eventInfo.detail[0].uri.rawUri;
                    Utils.debug('protocol-args:' + args);
                    var index = args.indexOf('://');
                    if (index > -1) {
                        Utils.debug('protocol-nav:' + args);

                        var hostindex = document.location.href.indexOf('://');

                        document.addEventListener('RenoActivate', () => { document.location.href = args; });
                        document.location.href = document.location.href.substr(0, hostindex) + args.substr(index);
                        Utils.debug('protocol-navd:' + args);
                    }
                }
            }
        }

        async refresh() {
            for (var i = 0; i < this.abilities.length; i++) {
                this.abilities[i].refresh();
            }
        }

        //client adding abilities (appBar, appTile, etc)
        addAbilities(abilitiesX: any) {
            this.abilities = new Array<Activity>();

            let abilities2 = this._defaultAbilities() as any;
            if (typeof abilitiesX === 'object') {
                abilities2 = abilitiesX;
            }

            if (abilities2.appBar) {
                console.debug('a1');
                this.abilities.push(new AppBar(Utils.defaultToEmpty(abilities2.appBar)));
            }
            if (abilities2.appTile) {
                console.debug('a2');
                this.abilities.push(new AppTile(Utils.defaultToEmpty(abilities2.appTile)));
            }
            if (abilities2.speech) {
                console.debug('a3');
                this.abilities.push(new Speech(Utils.defaultToEmpty(abilities2.speech)));
            }
        }

        _defaultAbilities() {
            return {
                appBar: true
            }
        }

        addAppInfo(appInfo: any) {
            this.appInfo = new AppInfo(Utils.defaultToEmpty(appInfo));

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