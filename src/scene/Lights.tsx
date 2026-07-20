export default function Lights() {
  return (
    <>
      <ambientLight intensity={1.5} />

      <directionalLight
        position={[5, 8, 5]}
        intensity={2}
      />

      <spotLight
        castShadow
        position={[0, 6, 0]}
        angle={0.4}
        intensity={60}
        penumbra={0.5}
      />
    </>
  );
}
