import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Mock Sentiment Engine Logic
const getSentimentData = () => ({
  score: Math.random() * 100,
  top_tickers: [
    { ticker: '$SOL', sentiment: 'Bullish', volume: '1.2M' },
    { ticker: '$JUP', sentiment: 'Neutral', volume: '800K' },
    { ticker: '$BONK', sentiment: 'Very Bullish', volume: '2.5M' }
  ],
  agent_status: 'Active: Scanning X (formerly Twitter) for liquidity signals...'
});

app.get('/api/sentiment', (req, res) => {
  res.json(getSentimentData());
});

app.get('/api/vault/stats', (req, res) => {
  res.json({
    tvl: '$4,281,902',
    apy: '24.8%',
    active_positions: 12,
    rebalances_24h: 3
  });
});

app.listen(PORT, () => {
  console.log(`SentientVault Backend running on port ${PORT}`);
});