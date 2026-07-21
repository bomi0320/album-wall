import { Canvas } from '@react-three/fiber';
import { useState } from 'react';

import Room from './scene/Room';
import AlbumInfoPanel from './scene/AlbumInfoPanel';

import type { Album } from './types/album';

import './App.css';

function App() {
  const [selectedAlbum, setSelectedAlbum] =
    useState<Album | null>(null);

  return (
    <div className="app">
      <div className="canvas-container">
        <Canvas
          shadows
          camera={{
            position: [10, 5, 10],
            fov: 65,
          }}
        >
          <Room
            selectedAlbum={selectedAlbum}
            setSelectedAlbum={setSelectedAlbum}
          />
        </Canvas>
      </div>

      <AlbumInfoPanel album={selectedAlbum} />
    </div>
  );
}

export default App;
