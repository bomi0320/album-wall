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

  const frameColor = isSelected
    ? '#D9A6B3'
    : isHovered
      ? '#CFAE98'
      : '#B99B7D';

  return (
    <group
      position={position}
      rotation={rotation}
      scale={isHovered || isSelected ? 1.04 : 1}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      onClick={onSelect}
    >
      {/* Back Panel */}
      <mesh
        castShadow
        receiveShadow
        position={[0, 0, -0.04]}
      >
        <boxGeometry args={[1.2, 1.2, 0.06]} />
        <meshStandardMaterial
          color="#E8DED5"
          roughness={0.9}
        />
      </mesh>

      {/* Top Frame */}
      <mesh
        castShadow
        receiveShadow
        position={[0, 0.55, 0]}
      >
        <boxGeometry args={[1.2, 0.1, 0.08]} />
        <meshStandardMaterial
          color={frameColor}
          roughness={0.75}
        />
      </mesh>

      {/* Bottom Frame */}
      <mesh
        castShadow
        receiveShadow
        position={[0, -0.55, 0]}
      >
        <boxGeometry args={[1.2, 0.1, 0.08]} />
        <meshStandardMaterial
          color={frameColor}
          roughness={0.75}
        />
      </mesh>

      {/* Left Frame */}
      <mesh
        castShadow
        receiveShadow
        position={[-0.55, 0, 0]}
      >
        <boxGeometry args={[0.1, 1.2, 0.08]} />
        <meshStandardMaterial
          color={frameColor}
          roughness={0.75}
        />
      </mesh>

      {/* Right Frame */}
      <mesh
        castShadow
        receiveShadow
        position={[0.55, 0, 0]}
      >
        <boxGeometry args={[0.1, 1.2, 0.08]} />
        <meshStandardMaterial
          color={frameColor}
          roughness={0.75}
        />
      </mesh>

      {/* Mat */}
      <mesh
        castShadow
        receiveShadow
        position={[0, 0, 0.045]}
        onClick={onSelect}
      >
        <planeGeometry args={[1.05, 1.05]} />
        <meshStandardMaterial
          color="#F7F1EB"
          roughness={1}
        />
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
      position={[0, 0, 0.055]}
    >
      <planeGeometry args={[0.92, 0.92]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}
