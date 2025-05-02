import type { UserData } from '@modules/auth/auth-impl';
import { extractToken } from '@modules/auth/util';
import type { MapOptions } from '@modules/declaration/map';
import { matchMaker } from 'colyseus';
import type { Request, Response } from 'express';
import _ from 'lodash';

import { MapIndex } from '../../../rooms/maps';

export const enter = async (req: Request, res: Response) => {
  const { mapId, forceNewInstance } = req.query;
  const userData: UserData = (req as any).auth;

  console.log('[MapMaker.enter] Enter with userData', userData);

  const roomName = MapIndex.MAP_V1;

  if (!forceNewInstance) {
    const existingRooms = await matchMaker.query({ name: roomName });
    console.log('[MapMaker.enter] existingRoom', existingRooms);

    const existingMap = _.find(
      existingRooms,
      (room) => room.metadata.creatorId === userData.id,
    );
    if (existingMap) {
      const reservation = await matchMaker.joinById(existingMap.roomId, {});
      return res.json(reservation);
    }
  }

  const payload: MapOptions = {
    mapId: mapId as string,
    creatorId: userData.id,
  };

  const clientOptions = {
    token: extractToken(req.headers.authorization),
    headers: req.headers,
    ip: '123', // TODO: get real IP
  };

  const reservation =
    mapId === 'sandbox'
      ? await matchMaker.joinOrCreate(roomName, payload, clientOptions)
      : await matchMaker.create(roomName, payload, clientOptions);

  return res.json(reservation);
};
