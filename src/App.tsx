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
  const [albums, setAlbums] = useState<Album[]>([]);

  const [selectedAlbums, setSelectedAlbums] = useState<
    Album[]
  >([]);

  const [selectedAlbum, setSelectedAlbum] =
    useState<Album | null>(null);

  const handleSearch = async (query: string) => {
    try {
      const results = await searchAlbums(query);

      setAlbums(results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectAlbum = (album: Album) => {
    setSelectedAlbums((prev) => {
      // 같은 앨범 중복 추가 방지
      const alreadyExists = prev.some(
        (item) => item.id === album.id,
      );

      if (alreadyExists) {
        return prev;
      }

      return [...prev, album]; // 앨범을 벽에 추가
    });

    setSelectedAlbum(album); // 그 앨범을 정보 패널에서 보여주기
  };

  return (
    <div className="app">
      <div className="canvas-container">
        <SearchBar onSearch={handleSearch} />

        <SearchResults
          albums={albums}
          onSelect={handleSelectAlbum}
        />

        <Canvas
          shadows
          camera={{
            position: [10, 5, 10],
            fov: 65,
          }}
        >
          <Room
            albums={selectedAlbums}
            onSelect={setSelectedAlbum}
          />
        </Canvas>
      </div>

      <AlbumInfoPanel album={selectedAlbum} />
    </div>
  );
}

export default App;
