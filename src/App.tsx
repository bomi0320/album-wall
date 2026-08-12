import { Canvas } from '@react-three/fiber';
import { useState } from 'react';

import Room from './scene/Room';
import AlbumInfoPanel from './scene/AlbumInfoPanel';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';

import { searchAlbums } from './api/albums';
import type { Album } from './types/album';

import './App.css';

function App() {
  const [selectedAlbum, setSelectedAlbum] =
    useState<Album | null>(null);

  const [albums, setAlbums] = useState<Album[]>([]);

  const handleSearch = async (query: string) => {
    try {
      const results = await searchAlbums(query);

      setAlbums(results);

      console.log(results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <div className="canvas-container">
        <SearchBar onSearch={handleSearch} />

        <SearchResults albums={albums} />

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
