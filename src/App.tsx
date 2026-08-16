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

    // 선택한 빈 액자가 있는 경우
    if (selectedSlotIndex !== null) {
      setSelectedAlbums((prev) =>
        prev.map((item, index) =>
          index === selectedSlotIndex ? album : item,
        ),
      );

      setSelectedAlbum(album);
      setSelectedSlotIndex(null);

      return;
    }

    // 빈 액자 찾기
    const emptyIndex = selectedAlbums.findIndex(
      (item) => item === null,
    );

    // 빈 액자가 없는 경우
    if (emptyIndex === -1) {
      alert('앨범을 전시할 빈 액자가 없습니다.');
      return;
    }

    setSelectedAlbums((prev) =>
      prev.map((Item, index) =>
        index === emptyIndex ? album : Item,
      ),
    );

    setSelectedAlbum(album);
  };

  const handleDeleteAlbum = (albumId: number) => {
    setSelectedAlbums((prev) =>
      prev.map((album) =>
        album?.id === albumId ? null : album,
      ),
    );

    setSelectedAlbum(null);
  };

  const handleDeleteAllAlbums = () => {
    const confirmed = window.confirm(
      '모든 앨범을 삭제하시겠습니까?',
    );

    if (!confirmed) {
      return;
    }

    setSelectedAlbums(Array(MAX_ALBUMS).fill(null));

    setSelectedAlbum(null);
    setSelectedSlotIndex(null);
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
        onDeleteAll={handleDeleteAllAlbums}
      />
    </div>
  );
}

export default App;
