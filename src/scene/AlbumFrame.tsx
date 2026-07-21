import { useState } from 'react';
import { useTexture } from '@react-three/drei';

type AlbumFrameProps = {
  image: string;
  position: [number, number, number];
  rotation?: [number, number, number];
};

export default function AlbumFrame({
  image,
  position,
  rotation = [0, 0, 0],
}: AlbumFrameProps) {
  const [isHovered, setIsHovered] = useState(false);

  const texture = useTexture(image);

  return (
    <group
      position={position}
      rotation={rotation}
      scale={isHovered ? 1.1 : 1}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      {/* Frame */}
      <mesh
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.2, 1.2, 0.08]} />
        <meshStandardMaterial color="#8b6a4e" />
      </mesh>

      {/* Mat */}
      <mesh
        castShadow
        receiveShadow
        position={[0, 0, 0.045]}
      >
        <planeGeometry args={[1.08, 1.08]} />
        <meshBasicMaterial color="#f8f8f8" />
      </mesh>

      {/* Album Cover */}
      <mesh
        castShadow
        receiveShadow
        position={[0, 0, 0.05]}
      >
        <planeGeometry args={[0.92, 0.92]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </group>
  );
}
