export default function Walls() {
  return (
    <>
      {/* 뒤 벽 */}
      <mesh position={[0, 2, -6]}>
        <boxGeometry args={[12, 5, 0.2]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </>
  );
}
