import type { Album } from '../types/album';

export const searchAlbums = async (
  query: string,
): Promise<Album[]> => {
  const response = await fetch(
    `http://localhost:3001/api/albums?query=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error('앨범 검색에 실패했습니다.');
  }

  const data: Album[] = await response.json();

  return data;
};
