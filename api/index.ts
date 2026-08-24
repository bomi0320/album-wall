import express from 'express';
import cors from 'cors';

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

const app = express();

app.use(cors());

app.get('/api/test', (_req, res) => {
  res.json({
    message: 'Backend is working',
  });
});

app.get('/api/albums', async (req, res) => {
  const query = req.query.query;

  if (typeof query !== 'string' || !query.trim()) {
    return res.status(400).json({
      message: '검색어를 입력해주세요.',
    });
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

    res.json({
      albums,
      total: data.resultCount,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'iTunes API 요청에 실패했습니다.',
    });
  }
});

export default app;
