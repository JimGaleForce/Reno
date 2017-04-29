namespace RenoLib {
    export class ShareTarget extends Activity {
        type: ActivityType = ActivityType.ShareTarget;

        onShareReady: (shareOperation) => {};
        shareOperation: any = null;

        constructor(shareTarget: any) {
            super();
            this.onShareReady = Utils.default(shareTarget.onShareReady, this.onShareReady);
        }

        shareReady(shareOperation: any) {
            //insert analytics
            this.shareOperation = shareOperation;
            if (this.onShareReady) {
                this.onShareReady(this.shareOperation);
            }
        }

        _default() {
            return {
                onShareReady: (shareOperation: any) => {
                    var title = shareOperation.data.properties.title;
                    var description = shareOperation.data.properties.description;
                    var packageFamilyName = shareOperation.data.properties.packageFamilyName;


                }
            }
        }
    }
}