import express from 'express';
import cors from 'cors';

const app = express(); // 서버
const PORT = 3001;

app.use(cors()); // 모든 요청 허용(나중엔 필요한 도메인만 허용하도록 수정)

// 테스트 api
app.get('/api/test', (_req, res) => {
  res.json({
    message: 'Backend is working',
  });
});

// 서버 켜기
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
