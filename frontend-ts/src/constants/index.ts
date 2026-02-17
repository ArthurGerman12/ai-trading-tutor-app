import { StockSymbol, StrategyType } from '../types/api';

export const API_BASE_URL = 'http://localhost:8000';

export interface StockOption {
  symbol: StockSymbol;
  name: string;
  description: string;
}

export const STOCK_OPTIONS: StockOption[] = [
  { symbol: 'SPY', name: 'S&P 500 ETF', description: 'Broad market, low volatility' },
  { symbol: 'QQQ', name: 'Nasdaq-100 ETF', description: 'Tech-heavy, moderate volatility' },
  { symbol: 'TSLA', name: 'Tesla', description: 'High volatility, big swings' },
  { symbol: 'NVDA', name: 'Nvidia', description: 'Semiconductor, high volatility' },
  { symbol: 'AMD', name: 'AMD', description: 'Tech stock, volatile' },
  { symbol: 'AAPL', name: 'Apple', description: 'Large cap tech, moderate volatility' },
];

export const STRATEGY_PARAMS: Record<StrategyType, { entry: string; hold: string; vol: string; cooldown: string }> = {
  conservative: { entry: '65%', hold: '5 days', vol: '0.45', cooldown: '\u2713' },
  aggressive: { entry: '52%', hold: '7 days', vol: '0.65', cooldown: '\u2713' },
  ultra: { entry: '48%', hold: '15 days', vol: 'None', cooldown: '\u2717' },
};
