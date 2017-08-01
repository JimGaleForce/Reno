window.AppMap = {
    id: 'RenoSample',
    debug: true,
    logo: '#logo',
    abilities: {
        appBar: {
            keepDefaultCommands: true,
            elementId: 'myCommandBar',
            commands: [
                {
                    id: 'PinCommand',
                    text: document.title
                },
                {
                    id: 'ShareCommand',
                    options: {
                        text: 'This is awesome! ' + document.location.href
                    }
                }
            ]
        }
    }
};