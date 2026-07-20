import { useTexture } from '@react-three/drei';

export default function AlbumFrame({
  image,
  position,
  rotation = [0, 0, 0],
}: AlbumFrameProps) {
  const texture = useTexture(image);
  return (
    <group
      position={position}
      rotation={rotation}
    >
      {/* Frame */}
      <mesh>
        <boxGeometry args={[1.2, 1.2, 0.08]} />
        <meshStandardMaterial color="#4e342e" />
      </mesh>

      {/* Album Cover */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </group>
  );
}

type AlbumFrameProps = {
  image: string;
  position: [number, number, number];
  rotation?: [number, number, number];
};
