const ROWS = 2;
const COLUMNS = 3;

const FRAMES_PER_WALL = ROWS * COLUMNS;
export const MAX_ALBUMS = FRAMES_PER_WALL * 2;

const FRAME_HORIZONTAL_GAP = 2;
const FRAME_VERTICAL_GAP = 1.5;

const LEFT_WALL_X = -5.84;
const RIGHT_WALL_Z = -5.84;

const START_X = -4;
const START_Y = 3;
const START_Z = -4;

export function getWallPosition(index: number): {
  position: [number, number, number];
  rotation: [number, number, number];
} {
  if (index < FRAMES_PER_WALL) {
    return getLeftWallPosition(index);
  }
  return getRightWallPosition(index - FRAMES_PER_WALL);
}

function getLeftWallPosition(index: number) {
  const row = index % ROWS;
  const col = Math.floor(index / ROWS);

  return {
    position: [
      LEFT_WALL_X,
      START_Y - row * FRAME_VERTICAL_GAP,
      START_Z + col * FRAME_HORIZONTAL_GAP,
    ] as [number, number, number],

    rotation: [0, Math.PI / 2, 0] as [
      number,
      number,
      number,
    ],
  };
}

function getRightWallPosition(index: number) {
  const row = index % ROWS;
  const col = Math.floor(index / ROWS);

  return {
    position: [
      START_X + col * FRAME_HORIZONTAL_GAP,
      START_Y - row * FRAME_VERTICAL_GAP,
      RIGHT_WALL_Z,
    ] as [number, number, number],

    rotation: [0, 0, 0] as [number, number, number],
  };
}
