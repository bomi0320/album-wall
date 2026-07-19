import { OrbitControls } from '@react-three/drei';

export default function Room() {
  return (
    <>
      {/* 조명 */}
      <ambientLight intensity={2} />

      {/* 큐브 */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* 마우스 조작 */}
      <OrbitControls />
    </>
  );
}
