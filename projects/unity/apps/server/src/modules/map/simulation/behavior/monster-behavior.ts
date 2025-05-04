/* eslint-disable no-param-reassign */
import type { Monster } from '@modules/declaration/schemas/schema';
import type { IBehavior } from '@modules/map/simulation/behavior/behavior.base';
import { roundFloat } from '@modules/utils/float';
import type { Clock } from 'colyseus';

export class MonsterBehavior implements IBehavior {
  OnUpdate(state: Monster, clock: Clock): void {
    const { deltaTime, elapsedTime } = clock;

    const monsterDB = state.__additionalData.mapMonsterDB;
    const { position: initialPosition } = monsterDB; // Vector3
    const { speed, moveRadius } = monsterDB.behavior; // number

    const currentPos = state.position.value; // Vector3
    const facingDir = state.position.facingDirection; // Vector3

    // Nếu không có hướng ban đầu, mặc định sang phải
    if (facingDir.x === 0) {
      facingDir.x = 1;
    }

    // Pre-calculate speed per second
    const velocityPerMs = speed / 1000;

    // Tính displacement
    const displacement = velocityPerMs * deltaTime * facingDir.x;
    let newX = currentPos.x + displacement;

    const minX = initialPosition.x - moveRadius;
    const maxX = initialPosition.x + moveRadius;

    // Nếu chạm biên thì đổi hướng
    if (newX <= minX) {
      facingDir.x = 1; // quay sang phải
      newX = minX;
    } else if (newX >= maxX) {
      facingDir.x = -1; // quay sang trái
      newX = maxX;
    }

    // Làm tròn kết quả trước khi gán
    currentPos.x = roundFloat(newX);

    // Set trạng thái đang di chuyển nếu cần
    if (state.visualization.state !== 1) {
      state.visualization.state = 1;
    }

    // Cập nhật timestamp per second
    state.position.timestamp = elapsedTime / 1000;
  }
}
