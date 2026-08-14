import type { Album } from '../types/album';

type SearchAlbumsResponse = {
  albums: Album[];
  total: number;
};

export async function searchAlbums(
  query: string,
): Promise<SearchAlbumsResponse> {
  const response = await fetch(
    `http://localhost:3001/api/albums?query=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error('앨범 검색에 실패했습니다.');
  }

  const data = await response.json();

  return data;
}
