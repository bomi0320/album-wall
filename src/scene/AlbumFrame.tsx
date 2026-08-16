import { Suspense, useState } from 'react';
import { useTexture } from '@react-three/drei';

type AlbumFrameProps = {
  image?: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  onSelect: () => void;
  isSelected?: boolean;
};

export default function AlbumFrame({
  image,
  position,
  rotation = [0, 0, 0],
  onSelect,
  isSelected = false,
}: AlbumFrameProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <group
      position={position}
      rotation={rotation}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      onClick={onSelect}
    >
      {/* Frame */}
      <mesh
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.2, 1.2, 0.08]} />
        <meshStandardMaterial
          color={isSelected ? '#d88cff' : '#8b6a4e'}
        />
      </mesh>

      {/* Mat */}
      <mesh
        castShadow
        receiveShadow
        position={[0, 0, 0.045]}
        onClick={onSelect}
      >
        <planeGeometry args={[1.08, 1.08]} />
        <meshBasicMaterial color="#f8f8f8" />
      </mesh>

      {/* Album Cover */}
      {image && (
        <Suspense fallback={null}>
          <AlbumCover image={image} />
        </Suspense>
      )}
    </group>
  );
}

function AlbumCover({ image }: { image: string }) {
  const texture = useTexture(image);

  return (
    <mesh
      castShadow
      receiveShadow
      position={[0, 0, 0.05]}
    >
      <planeGeometry args={[0.92, 0.92]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}
