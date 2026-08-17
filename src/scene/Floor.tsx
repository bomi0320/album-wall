export default function Floor() {
  return (
    <mesh
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.5, 0]}
    >
      <planeGeometry args={[12, 12]} />

      <meshStandardMaterial
        color="#DCCFC4"
        roughness={0.8}
      />
    </mesh>
  );
}
