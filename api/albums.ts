type ITunesAlbum = {
  collectionId: number;
  collectionName: string;
  artistName: string;
  releaseDate: string;
  artworkUrl100: string;
  collectionViewUrl: string;
};

type ITunesSearchResponse = {
  resultCount: number;
  results: ITunesAlbum[];
};

type Album = {
  id: number;
  title: string;
  artist: string;
  year: number;
  image: string;
  appleMusicUrl: string;
};

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get('query');

  if (!query?.trim()) {
    return Response.json(
      {
        message: '검색어를 입력해주세요.',
      },
      { status: 400 },
    );
  }

  const limit = 200;

  try {
    const params = new URLSearchParams({
      term: query,
      country: 'KR',
      media: 'music',
      entity: 'album',
      limit: String(limit),
    });

    const response = await fetch(
      `https://itunes.apple.com/search?${params.toString()}`,
    );

    if (!response.ok) {
      throw new Error(
        `iTunes API error: ${response.status}`,
      );
    }

    const data =
      (await response.json()) as ITunesSearchResponse;

    const albums: Album[] = data.results.map((item) => ({
      id: item.collectionId,
      title: item.collectionName,
      artist: item.artistName,
      year: new Date(item.releaseDate).getFullYear(),
      image: item.artworkUrl100.replace(
        /\/\d+x\d+bb\.jpg$/,
        '/1000x1000bb.jpg',
      ),
      appleMusicUrl: item.collectionViewUrl,
    }));

    return Response.json({
      albums,
      total: data.resultCount,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: 'iTunes API 요청에 실패했습니다.',
      },
      { status: 500 },
    );
  }
}
