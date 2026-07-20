export function getLeftWallPosition(
  index: number,
): [number, number, number] {
  const row = index % 2;
  const col = Math.floor(index / 2);

  return [-5.92, 3 - row * 1.5, -4 + col * 2];
}
