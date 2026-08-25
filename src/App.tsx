import { Canvas, useThree } from '@react-three/fiber';
import { useState, useEffect } from 'react';
import { WebGLRenderer, Scene, Camera } from 'three';

import Room from './scene/Room';
import AlbumInfoPanel from './scene/AlbumInfoPanel';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';

import { searchAlbums } from './api/albums';
import type { Album } from './types/album';

import { MAX_ALBUMS } from './scene/layout';

import './App.css';
import CoachMark from './components/CoachMark/CoachMark';

function GalleryCanvasCapture({
  onReady,
}: {
  onReady: (
    gl: WebGLRenderer,
    scene: Scene,
    camera: Camera,
  ) => void;
}) {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    onReady(gl, scene, camera);
  }, [gl, scene, camera, onReady]);

  return null;
}

function App() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isAlbumInfoOpen, setIsAlbumInfoOpen] =
    useState(true);

  const [isCoachMarkOpen, setIsCoachMarkOpen] = useState(
    () => {
      return (
        localStorage.getItem('coachMarkCompleted') !==
        'true'
      );
    },
  );

  const [coachMarkStep, setCoachMarkStep] = useState(0);

  const [renderer, setRenderer] = useState<{
    gl: WebGLRenderer;
    scene: Scene;
    camera: Camera;
  } | null>(null);

  const ALBUMS_PER_PAGE = 12;

  const [selectedAlbums, setSelectedAlbums] = useState<
    (Album | null)[]
  >(() => {
    const savedAlbums = localStorage.getItem(
      'selectedAlbums',
    );

    // 처음 방문한 경우: 빈 액자 12개 생성
    if (!savedAlbums) {
      return Array(MAX_ALBUMS).fill(null);
    }

    try {
      const parsedAlbums = JSON.parse(savedAlbums);

      if (!Array.isArray(parsedAlbums)) {
        return Array(MAX_ALBUMS).fill(null);
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

      return Array(MAX_ALBUMS).fill(null);
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

  const handleCloseCoachMark = () => {
    localStorage.setItem('coachMarkCompleted', 'true');

    setIsCoachMarkOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setHasSearched(true);

    try {
      const result = await searchAlbums(query);

      setAlbums(result.albums);
      setTotalResults(result.total);
      setCurrentPage(1);

      // Coach Mark 1단계
      // 실제 검색 결과가 있을 때만 2단계로 이동
      if (
        isCoachMarkOpen &&
        coachMarkStep === 0 &&
        result.albums.length > 0
      ) {
        setCoachMarkStep(1);
      }

      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSlot = (index: number) => {
    setSelectedSlotIndex(index);
    setSelectedAlbum(null);
    setIsAlbumInfoOpen(true);

    // Coach Mark 2단계: 액자 선택 완료 → 3단계로 이동
    if (isCoachMarkOpen && coachMarkStep === 1) {
      setCoachMarkStep(2);
    }
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

    // 액자를 선택하지 않은 경우
    if (selectedSlotIndex === null) {
      alert('액자를 먼저 선택하세요.');
      return;
    }

    // 선택한 액자에 앨범 추가
    setSelectedAlbums((prev) =>
      prev.map((item, index) =>
        index === selectedSlotIndex ? album : item,
      ),
    );

    setSelectedAlbum(album);
    setSelectedSlotIndex(null);
    setIsAlbumInfoOpen(true);

    // Coach Mark 3단계: 앨범 전시 완료 -> 튜토리얼 종료
    if (isCoachMarkOpen && coachMarkStep === 2) {
      handleCloseCoachMark();
    }
  };

  const handleDeleteAlbum = (albumId: number) => {
    const deletedSlotIndex = selectedAlbums.findIndex(
      (album) => album?.id === albumId,
    );

    setSelectedAlbums((prev) =>
      prev.map((album) =>
        album?.id === albumId ? null : album,
      ),
    );

    setSelectedAlbum(null);
    setSelectedSlotIndex(deletedSlotIndex);
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

  const handleCloseAlbumInfo = () => {
    setIsAlbumInfoOpen(false);
  };

  return (
    <div className="app">
      <div className="canvas-container">
        <SearchBar
          onSearch={handleSearch}
          isLoading={isLoading}
          isCoachMarkTarget={
            isCoachMarkOpen && coachMarkStep === 0
          }
        />

        <SearchResults
          albums={visibleAlbums}
          selectedAlbums={selectedAlbums}
          onSelect={handleSelectAlbum}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          hasSearched={hasSearched}
          isCoachMarkTarget={
            isCoachMarkOpen && coachMarkStep === 2
          }
        />

        <Canvas
          shadows
          gl={{ preserveDrawingBuffer: true }}
          camera={{
            position: [7, 4, 7],
            fov: 55,
          }}
        >
          <Room
            albums={selectedAlbums}
            onSelect={setSelectedAlbum}
            selectedSlotIndex={selectedSlotIndex}
            onSelectSlot={handleSelectSlot}
          />

          <GalleryCanvasCapture
            onReady={(gl, scene, camera) => {
              setRenderer({ gl, scene, camera });
            }}
          />
        </Canvas>

        {renderer && (
          <button
            type="button"
            className="
              fixed right-6 top-6 z-30
              rounded-xl
              border border-gallery-border
              bg-gallery-panel/95
              px-4 py-2.5
              text-sm font-medium
              text-text-primary
              shadow-gallery
              backdrop-blur-md
              transition-all duration-200
              hover:bg-primary-soft
              hover:text-text-primary
              active:scale-95
            "
            onClick={() => {
              const { gl, scene, camera } = renderer;

              const originalPixelRatio = gl.getPixelRatio();

              gl.setPixelRatio(2);

              gl.render(scene, camera);

              const image = gl.domElement.toDataURL(
                'image/jpeg',
                0.95,
              );

              gl.setPixelRatio(originalPixelRatio);

              gl.render(scene, camera);

              const link = document.createElement('a');
              link.download = 'album-wall.jpg';
              link.href = image;
              link.click();
            }}
          >
            갤러리 저장
          </button>
        )}
      </div>

      {isAlbumInfoOpen && (
        <AlbumInfoPanel
          album={selectedAlbum}
          onDelete={handleDeleteAlbum}
          onDeleteAll={handleDeleteAllAlbums}
          onClose={handleCloseAlbumInfo}
        />
      )}

      {isCoachMarkOpen && (
        <CoachMark
          step={coachMarkStep}
          onClose={handleCloseCoachMark}
        />
      )}
    </div>
  );
}

export default App;
