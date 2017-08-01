namespace RenoLib {
    export class AppBar extends Activity {
        type: ActivityType = ActivityType.AppBar;

        show: any;

        //commands contain the icons/text/commands to add to the appbar when activated
        commands: any[];
        buttons: AppBarCommand[];
        elementId: string;

        constructor(appBar: any) {
            super();
            this.load(appBar);
        }

        //loads client-specified appbar data for later dynamic execution
        load(appBar: any) {
            var def = this._default();

            this.show = Utils.default(appBar.show, def.appBar.show, true);
            this.commands = Utils.default(appBar.commands, def.appBar.commands, []);
            this.elementId = Utils.default(appBar.elementId, null);
            if (appBar.commands && appBar.keepDefaultCommands) {
                for (var i = 0; i < def.appBar.commands.length; i++) {
                    this.commands.splice(i, 0, def.appBar.commands[i]);
                }
            }
        }

        async activate() {
            if (Utils.eval(this.show, this, RenoLib.Reno.instance)) {
                await this.create();
            } else {
                Utils.debug('appbar show was false');
            }
        }

        async create() {
            Utils.debug('appBar-creating');
            var cmdBarPreexists = this.elementId !== null && this.elementId !== '';
            var cmdBar = cmdBarPreexists ? document.getElementById(this.elementId) : document.createElement('div');
            cmdBar.className = 'reno';
            cmdBar.id = 'commandbar';
            this.buttons = new Array<AppBarCommand>();

            for (var i = 0; i < this.commands.length; i++) {
                let command = null;
                for (var j = 0; j < this.buttons.length; j++) {
                    if (this.buttons[j].id === this.commands[i].id) {
                        command = this.buttons[j];
                    }
                }

                let found = command !== null;
                if (!found) {
                    Utils.debug('adding new cmd:' + this.commands[i].id);
                    command = new AppBarCommand(this.commands[i]);
                    this.buttons.push(command);

                    let existingButton = document.querySelector("commandbar " + command.id) as HTMLButtonElement;

                    let button = existingButton || document.createElement('button');
                    button.className = 'commandbutton reno';
                    button.textContent = command.icon;
                    button.id = command.id;
                    button.onclick = (sender) => { command.command(sender, command, this, Reno.instance); };

                    if (!existingButton) {
                        cmdBar.appendChild(button);
                    }
                } else {
                    Utils.debug('adopting from existing cmd:' + this.commands[i].id);
                    command.adopt(this.commands[i]);
                }
            }

            if (!cmdBarPreexists) {
                document.body.appendChild(cmdBar);
            }

            await this.refresh();
        }

        async refresh() { 
            for (var i = 0; i < this.buttons.length; i++) {
                var element = document.getElementById(this.buttons[i].id);
                var isHidden = element.className.indexOf(' hidden') > -1;
                var show = await Utils.eval(this.buttons[i].show, this.buttons[i], this, RenoLib.Reno.instance);

                if (!show) {
                    Utils.debug('appbarcmd ('+this.buttons[i].id+') show was false');
                }

                if (isHidden === show) {
                    if (!show) {
                        element.className += ' hidden';
                    } else {
                        element.className = element.className.replace(' hidden', '');
                    }
                }
            }
        }

        _default() {
            return {
                appBar: {
                    show: true,
                    commands: [
                        AppBarCommand._defaultPinCommand(),
                        AppBarCommand._defaultUnpinCommand(),
                        AppBarCommand._defaultShareCommand()
                    ]
                }
            };
        }
    }
}