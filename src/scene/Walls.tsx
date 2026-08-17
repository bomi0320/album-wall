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
        <meshStandardMaterial
          color="#F7F3F0"
          roughness={0.9}
        />
      </mesh>

      {/* Right Wall */}
      <mesh
        receiveShadow
        position={[0, 2, -6]}
      >
        <boxGeometry args={[12, 5, 0.2]} />
        <meshStandardMaterial
          color="#F7F3F0"
          roughness={0.9}
        />
      </mesh>

      {/* Left Wall - Baseboard */}
      <mesh
        position={[-5.88, -0.2, 0]}
        receiveShadow
      >
        <boxGeometry args={[0.12, 0.6, 12]} />
        <meshStandardMaterial
          color="#E3D8D2"
          roughness={0.85}
        />
      </mesh>

      {/* Right Wall - Baseboard */}
      <mesh
        position={[0, -0.2, -5.88]}
        receiveShadow
      >
        <boxGeometry args={[12, 0.6, 0.12]} />
        <meshStandardMaterial
          color="#E3D8D2"
          roughness={0.85}
        />
      </mesh>
    </>
  );
}
