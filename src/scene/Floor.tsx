export default function Floor() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.5, 0]}
    >
      <planeGeometry args={[12, 12]} />

      <meshStandardMaterial color="#d9d9d9" />
    </mesh>
  );
}
