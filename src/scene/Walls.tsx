export default function Walls() {
  return (
    <>
      {/* Back Wall */}
      <mesh position={[0, 2, -6]}>
        <boxGeometry args={[12, 5, 0.2]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Left Wall */}
      <mesh
        position={[-6, 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <boxGeometry args={[12, 5, 0.2]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </>
  );
}
