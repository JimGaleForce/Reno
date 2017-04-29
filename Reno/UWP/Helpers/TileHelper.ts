namespace RenoLib {
    export class TileHelper {
        static async createSecondaryTile(elementId: string, tileId: string, text: string, args: string, logoUri: Windows.Foundation.Uri ) {
            var currentTime = new Date();
            var TileActivationArguments = await Utils.eval(args);
            var newTileDesiredSize = Windows.UI.StartScreen.TileOptions.showNameOnLogo;
            var tile;
            try {
                tile = new Windows.UI.StartScreen.SecondaryTile(tileId, text, text, TileActivationArguments, newTileDesiredSize, logoUri);
            } catch (e) {
                Utils.error('failed to create secondary tile', e);
            }
            var element = document.getElementById(elementId);
            if (element) {
                var selectionRect = element.getBoundingClientRect();
                var buttonCoordinates = { x: selectionRect.left, y: selectionRect.top, width: selectionRect.width, height: selectionRect.height };
                var placement = Windows.UI.Popups.Placement.above;
                return new Promise((resolve, reject) => {
                    try {
                        tile.requestCreateForSelectionAsync(buttonCoordinates, placement).done((isCreated) => {
                            if (isCreated) {
                                resolve(true);
                            } else {
                                reject(false);
                            }
                        });
                    } catch (e) {
                        Utils.error('failed to create secondary tile', e);
                        reject(false);
                    }
                });
            } else {
                Utils.debug('No element to place (shall I pin a tile) question above:' + elementId);
                return new Promise(async (resolve, reject) => {
                    reject(false);
                });
            }
        }

        static async isTilePinned(id: string) {
            var tiles = await Windows.UI.StartScreen.SecondaryTile.findAllForPackageAsync();
            var result = false;
            tiles.forEach((tile) => {
                var myTileId = tile.tileId;
                if (myTileId === id) {
                    result = true;
                    return result;
                }
            });
                
            return result;
        }
    }
}