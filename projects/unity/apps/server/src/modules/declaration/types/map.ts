import type { MapMonsterDB } from '@modules/declaration/dto/db/map/monster';
import type { IBehavior } from '@modules/map/simulation/behavior/behavior.base';

export type MapOptions = {
  mapId: string;
  creatorId: string;
};

export type MapMetadata = {
  mapId: string;
  creatorId: string;
};

export type MapPresenceMessage = {
  type: string;
  payload: any;
};

export type MapData = {
  id: string;
  name: string;
  npcs: any[];
  monsters: MapMonsterDB[];
};

export type PlayerAdditionalData = {
  sessionId: string;
};

export type MonsterAdditionalData = {
  mapMonsterDB: MapMonsterDB;
  behavior: IBehavior;
};
