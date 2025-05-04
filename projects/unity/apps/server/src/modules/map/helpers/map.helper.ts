import type { MapData } from '@modules/declaration/types/map';
import { MapId } from '@modules/declaration/values/mapId';

export class MapHelper {
  public static async loadMapData(mapId: string): Promise<MapData> {
    switch (mapId) {
      case MapId.SANDBOX:
        return {
          id: MapId.SANDBOX,
          name: 'Sandbox',
          npcs: [],
          monsters: [
            {
              id: 'dummy_bug',
              position: {
                x: 0,
                y: 0,
                z: 0,
              },
              behavior: {
                speed: 2,
                moveRadius: 5,
              },
            },
          ],
        };
      default:
        console.warn(`[MapBaseRom.getMapData] MapId ${mapId} is not supported`);
        return null;
    }
  }
}
