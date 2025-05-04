/* eslint-disable no-param-reassign */
import type { Monster } from '@modules/declaration/schemas/schema';
import type { IBehavior } from '@modules/map/simulation/behavior/behavior.base';
import type { Clock } from 'colyseus';

export class MonsterBehavior implements IBehavior {
  OnUpdate(state: Monster, clock: Clock): void {
    const { elapsedTime, deltaTime } = clock;

    const monsterDB = state.__additionalData.mapMonsterDB;
    const { position: initialPosition } = monsterDB; // Vector3
    const { speed, moveRadius } = monsterDB.behavior; // number

    const { value: currentPos } = state.position; // Vector3
    // const { facingDirection: currentFacingDirection } = state;

    // Tính hướng di chuyển (xem như sóng sin để dễ mô phỏng chuyển động qua lại)
    const direction = Math.sin(elapsedTime * 0.001) >= 0 ? 1 : -1;

    // Tính vị trí mới theo hướng và tốc độ
    const displacement = speed * deltaTime * direction;
    const newX = currentPos.x + displacement;

    // Clamp lại trong khoảng [initialPosition.x - moveRadius, initialPosition.x + moveRadius]
    const minX = initialPosition.x - moveRadius;
    const maxX = initialPosition.x + moveRadius;

    // Update position
    state.position.value.x = Math.max(minX, Math.min(maxX, newX));
    if (state.position.facingDirection.x !== direction) {
      state.position.facingDirection.x = direction;
    }
    state.position.timestamp = clock.elapsedTime;
  }
}
