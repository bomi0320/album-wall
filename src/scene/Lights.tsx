export default function Lights() {
  return (
    <>
      {/* 전체 공간을 은은하게 밝혀주는 기본 조명 */}
      <ambientLight intensity={0.8} />

      {/* 공간 전체에 부드러운 따뜻함을 추가 */}
      <directionalLight
        position={[4, 7, 5]}
        intensity={1.2}
        color="#FFF5EC"
      />

      {/* 갤러리 중앙을 비추는 부드러운 조명 */}
      <spotLight
        castShadow
        position={[0, 6, 1]}
        angle={0.8}
        intensity={35}
        penumbra={1}
        color="#FFF1E6"
      />
    </>
  );
}
