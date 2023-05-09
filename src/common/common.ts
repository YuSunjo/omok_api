import { Room } from '../room/schema/room.schema';

export class Common {
  static validateWinner(board): number {
    const dx = [1, 1, 0, -1];
    const dy = [0, 1, 1, 1];
    let ans = 0;

    function check(x, y, color) {
      for (let i = 0; i < 4; i++) {
        let [nx, ny] = [x + dx[i], y + dy[i]];
        let cnt = 1;

        while (1) {
          if (ny < 0 || ny >= 19 || nx < 0 || nx >= 19) break;

          if (board[nx][ny] !== color) {
            break;
          }
          cnt++;
          nx = nx + dx[i];
          ny = ny + dy[i];
        }
        if (cnt === 5) {
          const prevX = x - dx[i];
          const prevY = y - dy[i];
          if (prevY >= 0 && prevY < 19 && prevX >= 0 && prevX < 19) {
            if (board[prevX][prevY] === color) {
              continue;
            }
          }
          ans = color;
          return;
        }
      }
    }

    for (let i = 0; i < 19; i++) {
      for (let j = 0; j < 19; j++) {
        if (board[i][j] === 0) {
          continue;
        }
        check(i, j, board[i][j]);
      }
    }

    return ans;
  }

  static roomPlainToClass(room: Room) {
    return Room.plainToClass(room);
  }
}
