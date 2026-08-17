export default function Walls() {
  return (
    <>
      {/* Left Wall */}
      <mesh
        receiveShadow
        position={[-6, 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <boxGeometry args={[12, 5, 0.2]} />
        <meshStandardMaterial color="#F4EFF2" />
      </mesh>

      {/* Right Wall */}
      <mesh
        receiveShadow
        position={[0, 2, -6]}
      >
        <boxGeometry args={[12, 5, 0.2]} />
        <meshStandardMaterial color="#F4EFF2" />
      </mesh>
    </>
  );
}
