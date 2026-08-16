import { Canvas } from '@react-three/fiber';
import { useState, useEffect } from 'react';

import Room from './scene/Room';
import AlbumInfoPanel from './scene/AlbumInfoPanel';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';

import { searchAlbums } from './api/albums';
import type { Album } from './types/album';

import { MAX_ALBUMS } from './scene/layout';

import './App.css';

function App() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const ALBUMS_PER_PAGE = 12;

  const [selectedAlbums, setSelectedAlbums] = useState<
    (Album | null)[]
  >(() => {
    const savedAlbums = localStorage.getItem(
      'selectedAlbums',
    );

    if (!savedAlbums) {
      return [];
    }

    try {
      const parsedAlbums = JSON.parse(savedAlbums);

      if (!Array.isArray(parsedAlbums)) {
        return [];
      }

      return [
        ...parsedAlbums,
        ...Array(MAX_ALBUMS - parsedAlbums.length).fill(
          null,
        ),
      ].slice(0, MAX_ALBUMS) as (Album | null)[];
    } catch (error) {
      console.error(
        '저장된 앨범 데이터를 불러오지 못했습니다.',
        error,
      );

      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      'selectedAlbums',
      JSON.stringify(selectedAlbums),
    );
  }, [selectedAlbums]);

  const [selectedAlbum, setSelectedAlbum] =
    useState<Album | null>(null);

  const [selectedSlotIndex, setSelectedSlotIndex] =
    useState<number | null>(null);

  const totalPages = Math.ceil(
    totalResults / ALBUMS_PER_PAGE,
  );

  const startIndex = (currentPage - 1) * ALBUMS_PER_PAGE;

  const visibleAlbums = albums.slice(
    startIndex,
    startIndex + ALBUMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = async (query: string) => {
    try {
      const result = await searchAlbums(query);

      setAlbums(result.albums);
      setTotalResults(result.total);
      setCurrentPage(1);

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectSlot = (index: number) => {
    setSelectedSlotIndex(index);
  };

  const handleSelectAlbum = (album: Album) => {
    // 같은 앨범 중복 추가 방지
    const alreadyExists = selectedAlbums.some(
      (item) => item?.id === album.id,
    );

    if (alreadyExists) {
      alert('이미 추가된 앨범입니다.');
      return;
    }

    setSelectedAlbums((prev) => {
      // 빈 액자를 선택한 경우 -> 해당 위치에 앨범 넣기
      if (selectedSlotIndex !== null) {
        return prev.map((item, index) =>
          index === selectedSlotIndex ? album : item,
        );
      }

      // 선택한 액자가 없는 경우 -> 기존 방식대로 빈 슬롯에 추가
      const emptyIndex = prev.findIndex(
        (item) => item === null,
      );

      if (emptyIndex !== -1) {
        return prev.map((item, index) =>
          index === emptyIndex ? album : item,
        );
      }

      return prev;
    });

    setSelectedAlbum(album);
    setSelectedSlotIndex(null); // 앨범 넣은 뒤에는 선택된 빈 액자 상태 해제
  };

  const handleDeleteAlbum = (albumId: number) => {
    setSelectedAlbums((prev) =>
      prev.map((album) =>
        album?.id === albumId ? null : album,
      ),
    );

    setSelectedAlbum(null);
  };

  return (
    <div className="app">
      <div className="canvas-container">
        <SearchBar onSearch={handleSearch} />

        <SearchResults
          albums={visibleAlbums}
          onSelect={handleSelectAlbum}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
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
            selectedSlotIndex={selectedSlotIndex}
            onSelectSlot={handleSelectSlot}
          />
        </Canvas>
      </div>

      <AlbumInfoPanel
        album={selectedAlbum}
        onDelete={handleDeleteAlbum}
      />
    </div>
  );
}

export default App;
