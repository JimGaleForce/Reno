namespace RenoLib {
    export class Activity {
        type: ActivityType = ActivityType.custom;

        activate() { }
        deactivate() { }
        pageChanged() { }

        refresh() { }
    }

    export enum ActivityType {
        custom,
        AppBar,
        AppTile,
        ShareTarget,
        Speech
    }
}