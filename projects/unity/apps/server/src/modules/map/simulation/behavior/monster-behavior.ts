/* eslint-disable no-param-reassign */
import type { Monster } from '@modules/declaration/schemas/schema';
import type { IBehavior } from '@modules/map/simulation/behavior/behavior.base';
import type { Clock } from 'colyseus';

export class MonsterBehavior implements IBehavior {
  OnUpdate(state: Monster, clock: Clock): void {
    const { deltaTime } = clock;

    const monsterDB = state.__additionalData.mapMonsterDB;
    const { position: initialPosition } = monsterDB; // Vector3
    const { speed, moveRadius } = monsterDB.behavior; // number

    const currentPos = state.position.value; // Vector3
    const facingDir = state.position.facingDirection; // Vector3

    // Nếu không có hướng ban đầu, mặc định sang phải
    if (facingDir.x === 0) {
      facingDir.x = 1;
    }

    // Tính displacement
    const displacement = (speed * deltaTime * facingDir.x) / 1000;
    const newX = currentPos.x + displacement;

    const minX = initialPosition.x - moveRadius;
    const maxX = initialPosition.x + moveRadius;

    // Nếu chạm biên thì đổi hướng
    if (newX <= minX) {
      facingDir.x = 1; // quay sang phải
      currentPos.x = minX;
    } else if (newX >= maxX) {
      facingDir.x = -1; // quay sang trái
      currentPos.x = maxX;
    } else {
      currentPos.x = newX;
    }

    if (state.visualization.state !== 1) {
      state.visualization.state = 1; // set trạng thái đang di chuyển
    }

    // Cập nhật timestamp
    state.position.timestamp = clock.elapsedTime / 1000;
  }
}
