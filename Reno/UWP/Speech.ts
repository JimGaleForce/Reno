// FILE IN PROGRESS

namespace RenoLib {
    export class Speech extends Activity {
        type: ActivityType = ActivityType.Speech;

        recognizer: any;

        constructor(speech: any) {
            super();
            this.load(speech);
        }

        load(speech: any) {

        }

        activate() {
            window.setInterval(() => this._tick(), 500);
            this._requestMicrophonePermission().then(available => {
                if (available) {
                    this.initializeRecognizer();
                }
            },
                error => {
                    var messageDialog = new Windows.UI.Popups.MessageDialog(error.message, "Exception");
                    messageDialog.showAsync();
                });

            //this.initializeSpeech();
        }

        _deactivate() {
            //if (this.recognizer != null) {
            //    this.recognizer.removeEventListener('statechanged', this.onSpeechRecognizerStateChanged, false);
            //    this.recognizer.close();
            //}
        }

        _tick() {

        }

        initializeRecognizer(core: boolean = false) { //note: default language - todo: choose from list
            Utils.debug('initializeRecognizer');

            if (typeof this.recognizer !== 'undefined') {
                this.recognizer = null;
            }

            try {
                this.recognizer = new Windows.Media.SpeechRecognition.SpeechRecognizer();
            } catch (e) {
                Utils.debug('failed to start speech recognition:' + e.toString());
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
        }

        _requestMicrophonePermission() {
            return new Promise((resolve, reject) => {
                try {
                    var captureSettings = new Windows.Media.Capture.MediaCaptureInitializationSettings();
                    captureSettings.streamingCaptureMode = Windows.Media.Capture.StreamingCaptureMode.audio;

                    var capture = new Windows.Media.Capture.MediaCapture();
                    capture.initializeAsync(captureSettings).then(() => {
                        resolve(true);
                    },
                        error => {
                            if (error.number === -2147024891) { // Access denied (microphone disabled in settings)
                                resolve(false);
                            } else if (error.number === -1072845856) { // No recording device present.
                                var messageDialog = new Windows.UI.Popups.MessageDialog("No Audio Capture devices are present on this system.");
                                messageDialog.showAsync();
                                resolve(false);
                            } else {
                                reject(error);
                            }
                        });
                } catch (exception) {
                    if (exception.number === -2147221164) { // REGDB_E_CLASSNOTREG
                        var messageDialog = new Windows.UI.Popups.MessageDialog("Media Player components not available on this system.");
                        messageDialog.showAsync();
                        return false;
                    }
                }
            });
        }

    }

    enum SpeakStatus {
        NotReady,
        Ready,
        Speaking,
        Paused
    }
}