namespace RenoLib {
    export class AppBarCommand {
        show: any;
        text: any;
        command: any;
        id: any;
        icon: any;
        options: any;

        constructor(command: any) {
            var def = AppBarCommand._defaultById(command.id) as any;

            Utils.debug('(new) adopting from existing cmd:' + command.id);
            this.adopt(command, def);
        }

        adopt(first: any, second: any = this) {
            this.show = Utils.default(first.show, second.show);
            this.text = Utils.default(first.text, second.text);
            this.command = Utils.default(first.command, second.command);
            this.id = Utils.default(first.id, second.id);
            this.icon = Utils.default(first.icon, second.icon);

            this.options = Utils.default(second.options, first.options);
            this.options.args = Utils.default(first.options && first.options.args, second.options.args);

            this.options.ondatarequested = Utils.default(first.options && first.options.ondatarequested, second.options.ondatarequested);
            this.options.title = Utils.default(first.options && first.options.title, second.options.title);
            this.options.text = Utils.default(first.options && first.options.text, second.options.text);
            this.options.tileId = Utils.default(first.options && first.options.tileId, second.options.tileId);
            this.options.tileImage = Utils.default(first.options && first.options.tileImage, second.options.tileImage);
        }

        static _defaultById(id: string) {
            switch (id) {
                case 'ShareCommand': return AppBarCommand._defaultShareCommand();
                case 'PinCommand': return AppBarCommand._defaultPinCommand();
                case 'UnpinCommand': return AppBarCommand._defaultUnpinCommand();
                default: return AppBarCommand._default();
            }
        }

        static _default() {
            return {
                show: true,
                icon: 'help',
                options: {
                    args: ""
                }
            }
        }

        static _defaultPinCommand() {
            return {
                id: "PinCommand",
                text: Utils.default(RenoLib.Reno.instance.appInfo.name, RenoLib.Reno.instance.appInfo.id, 'pin'),
                icon: '\ue718',
                options: {
                    tileImage: Utils.default(RenoLib.Reno.instance.appInfo.logo, 'img'), 
                    args: () => {
                        return document.URL;
                    },
                    tileId: document.URL
                },
                show: async (command, appBar, app) => { return !await RenoLib.TileHelper.isTilePinned(app.appInfo.id+'.'+Utils.hashCode(command.options.tileId)); },
                command: (sender, command, appBar, app) => {
                    Utils.debug('tile:0:command');
                    var uri2 = RenoLib.Utils.Html2Uri([{ locator: command.options.tileImage, stretch: 'Uniform' }], 150, 150).then(async uri => {
                        Utils.debug('tile:1:logo created');
                        try {
                            RenoLib.TileHelper.createSecondaryTile(command.id, app.appInfo.id + '.' + Utils.hashCode(command.options.tileId), await Utils.evalAs(command.text, EvalType.locatorOrTextToText, document.URL), document.URL, uri).then(async (worked) => {
                                if (!worked) {
                                    Utils.debug('tile failed: deleting logo');
                                    var file = await Windows.Storage.ApplicationData.current.localFolder.getFileAsync(uri.toString());
                                    await file.deleteAsync();
                                }

                                appBar.refresh();
                            });
                        } catch (e) {
                            Utils.error('tile failed', e);
                        }
                    });

                    return;
                }
            };
        }

        static _defaultUnpinCommand() {
            return {
                id: "UnpinCommand",
                text: "Unpin",
                icon: '\ue77a',
                options: {
                    args: () => {
                        return document.URL;
                    },
                    tileId: document.URL
                },
                show: async (command, appBar, app) => { return await RenoLib.TileHelper.isTilePinned(app.appInfo.id + '.' +Utils.hashCode(command.options.tileId)); },
                command: async (sender, command, appBar, app) => {
                    var tileToBeDeleted = new Windows.UI.StartScreen.SecondaryTile(app.appInfo.id + '.' +Utils.hashCode(command.options.tileId));

                    var isDeleted = await tileToBeDeleted.requestDeleteAsync();
                    if (isDeleted) {
                        // Secondary tile successfully deleted.
                        await appBar.refresh();
                        window.setTimeout(async () => { await appBar.refresh(); }, 250);
                    } else {
                        // Secondary tile not deleted.
                    }

                    return;
                }
            };
        }

        static _defaultShareCommand() {
            return {
                id: 'ShareCommand',
                text: 'Share',
                icon: '\ue72d',
                show: true,
                options: {
                    title: document.title,
                    text: 'Check this out! ' + document.location.href,
                    ondatarequested: (e, options) => {
                        e.request.data.properties.title = Utils.evalNow(options.title, document.URL);
                        e.request.data.setText(Utils.evalNow(options.text, document.URL));
                    }
                },
                command: (sender, command, appBar, app) => {
                    Utils.Share(command.options);
                }
            }
        }
    }
}