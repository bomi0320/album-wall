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

const app = express(); // 서버
const PORT = 3001;

app.use(cors()); // 모든 요청 허용(나중엔 필요한 도메인만 허용하도록 수정)

// 테스트 api
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

  try {
    const params = new URLSearchParams({
      term: query, // 사용자가 입력한 검색어
      country: 'KR', // 우선 kr로 설정
      media: 'music', // 음악 검색
      entity: 'album', // 앨범만 검색
      limit: '12', // 검색 결과 최대 12개만 가져오기
    });

    // iTunes 서버에 요청
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

    res.json(albums);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'iTunes API 요청에 실패했습니다.',
    });
  }
});

// 서버 켜기
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
