import { Canvas, useThree } from '@react-three/fiber';
import { useState, useEffect, useCallback } from 'react';
import { WebGLRenderer, Scene, Camera, Color } from 'three';

import Room from './scene/Room';
import AlbumInfoPanel from './scene/AlbumInfoPanel';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import AlertModal from './components/AlertModal/AlertModal';

import { searchAlbums } from './api/albums';
import type { Album } from './types/album';

import { MAX_ALBUMS } from './scene/layout';

import './App.css';
import CoachMark from './components/CoachMark/CoachMark';
import NameInput from './components/NameInput/NameInput';

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

  const [isAlbumInfoOpen, setIsAlbumInfoOpen] = useState(
    () =>
      !window.matchMedia('(orientation: portrait)').matches,
  );

  const [isSearchOpen, setIsSearchOpen] = useState(true);

  const [isPortrait, setIsPortrait] = useState(
    () =>
      window.matchMedia('(orientation: portrait)').matches,
  );

  const [isPortraitNoticeOpen, setIsPortraitNoticeOpen] =
    useState(
      () =>
        window.matchMedia('(orientation: portrait)')
          .matches &&
        localStorage.getItem('portraitNoticeDismissed') !==
          'true',
    );

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(orientation:portrait)',
    );

    const handleOrientationChange = (
      event: MediaQueryListEvent,
    ) => {
      setIsPortrait(event.matches);

      if (event.matches) {
        setIsAlbumInfoOpen(false);
      }

      if (
        event.matches &&
        localStorage.getItem('portraitNoticeDismissed') !==
          'true'
      ) {
        setIsPortraitNoticeOpen(true);
      }
    };

    mediaQuery.addEventListener(
      'change',
      handleOrientationChange,
    );

    return () => {
      mediaQuery.removeEventListener(
        'change',
        handleOrientationChange,
      );
    };
  }, []);

  const [alertModal, setAlertModal] = useState<{
    message: string;
    type: 'alert' | 'confirm';
    onConfirm?: () => void;
  } | null>(null);
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('userName') ?? '';
  });
  const [isNameSubmitted, setIsNameSubmitted] =
    useState(false);

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

  const handleEnterGallery = (name: string) => {
    localStorage.setItem('userName', name);
    setUserName(name);
    setIsNameSubmitted(true);
  };

  const handleCloseCoachMark = () => {
    localStorage.setItem('coachMarkCompleted', 'true');

    setIsCoachMarkOpen(false);
  };

  const handleClosePortraitNotice = () => {
    localStorage.setItem('portraitNoticeDismissed', 'true');

    setIsPortraitNoticeOpen(false);
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

  const handleSelectDisplayedAlbum = (album: Album) => {
    setSelectedAlbum(album);
    setIsAlbumInfoOpen(true);

    if (isPortrait) {
      setIsSearchOpen(false);
    }
  };

  const handleSelectAlbum = (album: Album) => {
    // 같은 앨범 중복 추가 방지
    const alreadyExists = selectedAlbums.some(
      (item) => item?.id === album.id,
    );

    if (alreadyExists) {
      setAlertModal({
        message: '이미 추가된 앨범입니다.',
        type: 'alert',
      });
      return;
    }

    // 액자를 선택하지 않은 경우
    if (selectedSlotIndex === null) {
      setAlertModal({
        message: '액자를 먼저 선택하세요.',
        type: 'alert',
      });
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

    if (isPortrait) {
      setIsSearchOpen(false);
    }

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
    setAlertModal({
      message: '모든 앨범을 삭제하시겠습니까?',
      type: 'confirm',
      onConfirm: () => {
        setSelectedAlbums(Array(MAX_ALBUMS).fill(null));
        setSelectedAlbum(null);
        setSelectedSlotIndex(null);
      },
    });
  };

  const handleCloseAlbumInfo = () => {
    setIsAlbumInfoOpen(false);
  };

  const handleRendererReady = useCallback(
    (gl: WebGLRenderer, scene: Scene, camera: Camera) => {
      setRenderer({ gl, scene, camera });
    },
    [],
  );

  if (!isNameSubmitted) {
    return (
      <>
        <NameInput
          initialName={userName}
          onEnter={handleEnterGallery}
          onAlert={(message) => {
            setAlertModal({
              message,
              type: 'alert',
            });
          }}
        />

        {alertModal && (
          <AlertModal
            message={alertModal.message}
            type={alertModal.type}
            onClose={() => setAlertModal(null)}
            onConfirm={alertModal.onConfirm}
          />
        )}
      </>
    );
  }

  return (
    <div className="app">
      <div className="canvas-container">
        {isPortraitNoticeOpen && (
          <div
            className="
              fixed left-1/2 top-[84px] z-[100]
              flex -translate-x-1/2 items-center gap-3
              rounded-xl
              border border-gallery-border
              bg-gallery-panel/95
              px-4 py-3
              text-sm text-text-secondary
              shadow-gallery
              backdrop-blur-md
            "
          >
            <p className="whitespace-nowrap">
              가로 화면에서 더 편하게 볼 수 있어요.
            </p>

            <button
              type="button"
              onClick={handleClosePortraitNotice}
              className="
                shrink-0
                text-lg leading-none
                text-text-muted
                transition-colors
                hover:text-text-primary
              "
              aria-label="안내 닫기"
            >
              ×
            </button>
          </div>
        )}

        <SearchBar
          onSearch={handleSearch}
          isLoading={isLoading}
          isCoachMarkTarget={
            isCoachMarkOpen && coachMarkStep === 0
          }
          isOpen={isSearchOpen}
          onToggle={() => {
            const nextIsSearchOpen = !isSearchOpen;

            setIsSearchOpen(nextIsSearchOpen);

            if (isPortrait && nextIsSearchOpen) {
              setIsAlbumInfoOpen(false);
            }
          }}
        />

        {isSearchOpen && (
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
        )}

        <h1
          className="
            pointer-events-none
            fixed left-1/2 top-6
            z-30
            -translate-x-1/2
            whitespace-nowrap
            text-xl font-semibold
            tracking-tight
            text-text-primary
          "
        >
          {userName}의 음악 갤러리
        </h1>

        <Canvas
          shadows
          gl={{
            preserveDrawingBuffer: true,
            alpha: true,
          }}
          scene={{
            background: new Color('#F8F5F2'),
          }}
          camera={{
            position: [7, 4, 7],
            fov: 55,
          }}
        >
          <Room
            albums={selectedAlbums}
            onSelect={handleSelectDisplayedAlbum}
            selectedSlotIndex={selectedSlotIndex}
            onSelectSlot={handleSelectSlot}
          />

          <GalleryCanvasCapture
            onReady={handleRendererReady}
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

              // Three.js Canvas 이미지
              const galleryImage = gl.domElement.toDataURL(
                'image/jpeg',
                0.95,
              );

              // 이미지 로드
              const image = new Image();

              image.onload = () => {
                // 저장용 Canvas
                const canvas =
                  document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                  return;
                }

                const titleHeight = 120;

                canvas.width = image.width;
                canvas.height = image.height + titleHeight;

                // 배경
                ctx.fillStyle = '#f8f8f8';
                ctx.fillRect(
                  0,
                  0,
                  canvas.width,
                  canvas.height,
                );

                // 제목
                ctx.fillStyle = '#222222';
                ctx.font = '600 50px "Pretendard Variable"';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                ctx.fillText(
                  `${userName}의 음악 갤러리`,
                  canvas.width / 2,
                  titleHeight / 2,
                );

                // 3D 갤러리 이미지
                ctx.drawImage(
                  image,
                  0,
                  titleHeight,
                  image.width,
                  image.height,
                );

                // 최종 이미지
                const finalImage = canvas.toDataURL(
                  'image/jpeg',
                  0.95,
                );

                // 다운로드
                const link = document.createElement('a');

                const safeUserName = userName.replace(
                  /[\\/:*?"<>|]/g,
                  '',
                );
                link.download = `${safeUserName}의_음악_갤러리.jpg`;
                link.href = finalImage;
                link.click();

                // 기존 설정 복구
                gl.setPixelRatio(originalPixelRatio);
                gl.render(scene, camera);
              };

              image.src = galleryImage;
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

      {alertModal && (
        <AlertModal
          message={alertModal.message}
          type={alertModal.type}
          onClose={() => setAlertModal(null)}
          onConfirm={alertModal.onConfirm}
        />
      )}
    </div>
  );
}

export default App;
