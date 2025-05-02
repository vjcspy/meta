import type { UserData } from '@modules/auth/auth-impl';
import { extractToken } from '@modules/auth/util';
import type { MapOptions } from '@modules/declaration/map';
import { matchMaker } from 'colyseus';
import type { Request, Response } from 'express';
import _ from 'lodash';

import { MapIndex } from '../../../rooms/maps';

export const enter = async (req: Request, res: Response) => {
  const { mapId, forceNewInstance } = req.query;
  const useData: UserData = (req as any).auth;
  console.log('[MapMaker.enter] Enter with userData', useData);

  if (!forceNewInstance) {
    // Check xem đang có instance nào của map đó không
    const existingRoom = await matchMaker.query({
      name: MapIndex.MAP_V1,
    });
    console.log('[MapMaker.enter] existingRoom', existingRoom);
    const existingMap = _.find(
      existingRoom,
      (room) => room.metadata.creatorId === useData.id,
    );

    if (existingMap) {
      const reservation = await matchMaker.joinById(existingMap.roomId, {});
      return res.json(reservation);
    }
  }

  const reservation = await matchMaker.create(
    MapIndex.MAP_V1,
    {
      mapId,
      creatorId: useData.id,
    } as MapOptions,
    {
      token: extractToken(req.headers.authorization),
      headers: req.headers,
      ip: '123', // TODO: get real IP
    },
  );
  return res.json(reservation);
};
