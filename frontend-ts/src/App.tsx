import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EquityCurveChart from './components/EquityCurveChart';
import MetricsCard from './components/MetricsCard';
import TradesList from './components/TradesList';
import FeatureComparison from './components/FeatureComparison';
import FeatureImportance from './components/FeatureImportance';
import { BacktestResponse, TradeExplanation, TabType } from './types/api';
import {
  TrendingUpIcon,
  ChartIcon,
  CurrencyIcon,
  BookOpenIcon,
  ShieldIcon,
  BoltIcon,
  RocketIcon,
  AlertIcon,
  RefreshIcon,
  LightbulbIcon,
  TrophyIcon
} from './components/Icons';

const API_BASE_URL = 'http://localhost:8000';

type StrategyType = 'conservative' | 'aggressive' | 'ultra';
type StockSymbol = 'SPY' | 'QQQ' | 'TSLA' | 'NVDA' | 'AMD' | 'AAPL';

const STOCK_OPTIONS = [
  { symbol: 'SPY', name: 'S&P 500 ETF', description: 'Broad market, low volatility' },
  { symbol: 'QQQ', name: 'Nasdaq-100 ETF', description: 'Tech-heavy, moderate volatility' },
  { symbol: 'TSLA', name: 'Tesla', description: 'High volatility, big swings' },
  { symbol: 'NVDA', name: 'Nvidia', description: 'Semiconductor, high volatility' },
  { symbol: 'AMD', name: 'AMD', description: 'Tech stock, volatile' },
  { symbol: 'AAPL', name: 'Apple', description: 'Large cap tech, moderate volatility' },
];

const App: React.FC = () => {
  const [backtestData, setBacktestData] = useState<BacktestResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedTrade, setSelectedTrade] = useState<number | null>(null);
  const [tradeExplanation, setTradeExplanation] = useState<TradeExplanation | null>(null);
  const [strategyType, setStrategyType] = useState<StrategyType>('conservative');
  const [stockSymbol, setStockSymbol] = useState<StockSymbol>('SPY');
  const [showBuyHold, setShowBuyHold] = useState<boolean>(true);

  const fetchBacktest = async (
    strategy: StrategyType = strategyType,
    symbol: StockSymbol = stockSymbol
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<BacktestResponse>(
        `${API_BASE_URL}/api/backtest?strategy=${strategy}&symbol=${symbol}`
      );
      setBacktestData(response.data);
      setStrategyType(strategy);
      setStockSymbol(symbol);
    } catch (err) {
      setError((err as Error).message || 'Failed to fetch backtest data');
    } finally {
      setLoading(false);
    }
  };

  const handleStrategyToggle = (newStrategy: StrategyType) => {
    fetchBacktest(newStrategy, stockSymbol);
  };

  const handleStockChange = (newSymbol: StockSymbol) => {
    fetchBacktest(strategyType, newSymbol);
  };

  const fetchTradeExplanation = async (tradeIndex: number): Promise<void> => {
    try {
      const response = await axios.get<TradeExplanation>(`${API_BASE_URL}/api/trades/${tradeIndex}/explain`);
      setTradeExplanation(response.data);
      setSelectedTrade(tradeIndex);
    } catch (err) {
      console.error('Failed to fetch trade explanation:', err);
    }
  };

  useEffect(() => {
    fetchBacktest();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-5">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-12 flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-6 text-xl text-gray-700 font-medium">Running {strategyType} backtest on {stockSymbol}...</p>
            <p className="mt-2 text-sm text-gray-500">This may take 30-60 seconds</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-5">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-12 flex flex-col items-center justify-center min-h-[400px]">
            <div className="text-red-500 mb-4">
              <AlertIcon className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => fetchBacktest()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!backtestData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-5">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-12 flex flex-col items-center justify-center min-h-[400px]">
            <p className="text-xl text-gray-700 mb-6">No data available</p>
            <button 
              onClick={() => fetchBacktest()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Load Data
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="bg-white rounded-2xl shadow-xl p-8 mb-5 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <TrendingUpIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">AI Trading Tutor</h1>
          </div>
          <p className="text-lg text-gray-600 mb-4">Educational Market Intelligence Platform</p>
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-900 px-5 py-2 rounded-lg font-medium">
            <AlertIcon className="w-4 h-4" />
            <span>Educational purposes only - Not financial advice</span>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="bg-white rounded-2xl shadow-xl p-3 mb-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: ChartIcon },
              { id: 'trades', label: 'Trades Analysis', icon: CurrencyIcon },
              { id: 'features', label: 'Feature Insights', icon: LightbulbIcon },
              { id: 'education', label: 'Learning', icon: BookOpenIcon },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm md:text-base">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[500px]">
          {/* Stock Selector */}
          <section className="bg-gradient-to-r from-indigo-100 to-purple-100 border-2 border-indigo-300 rounded-2xl p-6 mb-6">
            <div className="text-center mb-5">
              <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                <TrendingUpIcon className="w-5 h-5" />
                Select Stock/ETF
              </h3>
              <p className="text-sm text-gray-700">Choose different stocks to see how the ML strategy performs</p>
            </div>
            <div className="flex justify-center mb-4">
              <select 
                value={stockSymbol} 
                onChange={(e) => handleStockChange(e.target.value as StockSymbol)}
                disabled={loading}
                className="w-full max-w-2xl px-4 py-2 text-base border-2 border-indigo-400 rounded-xl bg-white cursor-pointer hover:border-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {STOCK_OPTIONS.map(stock => (
                  <option key={stock.symbol} value={stock.symbol}>
                    {stock.symbol} - {stock.name} ({stock.description})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/80 rounded-lg p-3 text-gray-700">
              <LightbulbIcon className="w-4 h-4 text-yellow-600" />
              <span className="text-sm">Higher volatility stocks (like TSLA) show bigger differences between strategies</span>
            </div>
          </section>

          {/* Strategy Selector */}
          <section className="bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-300 rounded-2xl p-6 mb-8">
            <div className="text-center mb-5">
              <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                <ChartIcon className="w-5 h-5" />
                Strategy Comparison
              </h3>
              <p className="text-sm text-gray-700">Compare three different trading strategies</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <button
                onClick={() => handleStrategyToggle('conservative')}
                disabled={loading}
                className={`p-5 rounded-xl border-2 transition-all ${
                  strategyType === 'conservative'
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-800 shadow-xl'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-blue-600 hover:shadow-lg'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="flex flex-col items-center gap-2">
                  <ShieldIcon className="w-6 h-6" />
                  <span className="text-lg font-bold">Conservative</span>
                  <span className="text-xs opacity-80">Lowest risk, selective</span>
                </div>
              </button>

              <button
                onClick={() => handleStrategyToggle('aggressive')}
                disabled={loading}
                className={`p-5 rounded-xl border-2 transition-all ${
                  strategyType === 'aggressive'
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-800 shadow-xl'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-blue-600 hover:shadow-lg'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="flex flex-col items-center gap-2">
                  <BoltIcon className="w-6 h-6" />
                  <span className="text-lg font-bold">Aggressive</span>
                  <span className="text-xs opacity-80">Moderate risk, more trades</span>
                </div>
              </button>

              <button
                onClick={() => handleStrategyToggle('ultra')}
                disabled={loading}
                className={`p-5 rounded-xl border-2 transition-all ${
                  strategyType === 'ultra'
                    ? 'bg-gradient-to-br from-red-600 to-red-700 text-white border-red-800 shadow-xl'
                    : 'bg-gradient-to-br from-yellow-400 to-orange-500 border-orange-600 text-white hover:shadow-lg'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="flex flex-col items-center gap-2">
                  <RocketIcon className="w-6 h-6" />
                  <span className="text-lg font-bold">Ultra Aggressive</span>
                  <span className="text-xs opacity-80">Highest risk, max trades</span>
                </div>
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-3 p-4 bg-white rounded-xl border border-gray-300 mb-4">
              {strategyType === 'conservative' && (
                <>
                  <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">Entry: 65%</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">Hold: 5 days</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">Vol: 0.45</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">Cooldown: ✓</span>
                </>
              )}
              {strategyType === 'aggressive' && (
                <>
                  <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">Entry: 52%</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">Hold: 7 days</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">Vol: 0.65</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">Cooldown: ✓</span>
                </>
              )}
              {strategyType === 'ultra' && (
                <>
                  <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">Entry: 48%</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">Hold: 15 days</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">Vol: None</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">Cooldown: ✗</span>
                </>
              )}
            </div>

            {/* Buy & Hold Toggle */}
            <div className="p-4 bg-white rounded-xl border-2 border-gray-300 text-center">
              <label className="flex items-center justify-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showBuyHold}
                  onChange={(e) => setShowBuyHold(e.target.checked)}
                  className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                />
                <span className="text-base font-medium text-gray-900">Show Buy & Hold Benchmark</span>
              </label>
              <p className="mt-2 text-xs text-gray-600 italic">
                Buy & Hold represents simply purchasing and holding the stock/ETF with no trading
              </p>
            </div>
          </section>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <>
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-4 border-blue-600">
                  Performance Metrics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MetricsCard 
                    title={`ML Strategy (${strategyType.charAt(0).toUpperCase() + strategyType.slice(1)})`}
                    metrics={backtestData.metrics}
                    type="strategy"
                  />
                  {showBuyHold && (
                    <MetricsCard 
                      title="Buy & Hold (Benchmark)" 
                      metrics={backtestData.buy_hold_metrics}
                      type="baseline"
                    />
                  )}
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-4 border-blue-600">
                  Equity Curve
                </h2>
                <EquityCurveChart 
                  data={backtestData.equity_curve} 
                  showBuyHold={showBuyHold}
                />
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-4 border-blue-600">
                  Trade Summary
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-5 rounded-xl border-l-4 border-blue-600 text-center">
                    <span className="block text-sm text-gray-600 mb-2">Total Trades</span>
                    <span className="block text-3xl font-bold text-gray-900">{backtestData.metrics.num_trades}</span>
                  </div>
                  <div className="bg-green-50 p-5 rounded-xl border-l-4 border-green-600 text-center">
                    <span className="block text-sm text-gray-600 mb-2">Winning</span>
                    <span className="block text-3xl font-bold text-green-700">{backtestData.winning_trades}</span>
                  </div>
                  <div className="bg-red-50 p-5 rounded-xl border-l-4 border-red-600 text-center">
                    <span className="block text-sm text-gray-600 mb-2">Losing</span>
                    <span className="block text-3xl font-bold text-red-700">{backtestData.losing_trades}</span>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-xl border-l-4 border-blue-600 text-center">
                    <span className="block text-sm text-gray-600 mb-2">Win Rate</span>
                    <span className="block text-3xl font-bold text-gray-900">
                      {backtestData.metrics.num_trades && backtestData.metrics.num_trades > 0
                        ? ((backtestData.winning_trades / backtestData.metrics.num_trades) * 100).toFixed(1)
                        : '0.0'}%
                    </span>
                  </div>
                </div>
              </section>
            </>
          )}

          {activeTab === 'trades' && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-4 border-blue-600">
                All Trades
              </h2>
              <TradesList 
                trades={backtestData.trades} 
                onSelectTrade={fetchTradeExplanation}
                selectedTrade={selectedTrade}
              />

              {/* Display Trade Explanation if available */}
              {tradeExplanation && (
                <div className="mt-8 bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <LightbulbIcon className="w-5 h-5 text-blue-600" />
                    AI Trade Explanation
                  </h3>
                  <div className="bg-white rounded-xl p-5 mb-4 border border-gray-200">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Entry Date:</span>
                        <p className="font-semibold text-gray-900">
                          {new Date(tradeExplanation.trade.entry_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Exit Date:</span>
                        <p className="font-semibold text-gray-900">
                          {new Date(tradeExplanation.trade.exit_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Entry Price:</span>
                        <p className="font-semibold text-gray-900">
                          ${tradeExplanation.trade.entry_price.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">P&L:</span>
                        <p className={`font-semibold ${tradeExplanation.trade.pnl > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {(tradeExplanation.trade.pnl * 100).toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-5 border-l-4 border-blue-600">
                    <p className="text-gray-700 leading-relaxed">{tradeExplanation.explanation}</p>
                  </div>
                </div>
              )}
            </section>
          )}

          {activeTab === 'features' && (
            <>
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-4 border-blue-600">
                  Winning vs Losing Trade Features
                </h2>
                <FeatureComparison data={backtestData.feature_comparison} />
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-4 border-blue-600">
                  Feature Importance
                </h2>
                <FeatureImportance />
              </section>
            </>
          )}

          {activeTab === 'education' && (
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-4 border-blue-600">
                Understanding the Results
              </h2>
              
              {/* Buy & Hold Card */}
              <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 border-l-4 border-yellow-600 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-yellow-900 mb-4 flex items-center gap-2">
                  <TrophyIcon className="w-6 h-6" />
                  The Power of Buy & Hold: Why Patience Wins
                </h3>
                <p className="text-yellow-900 mb-4 leading-relaxed text-sm">
                  One of the most important lessons from this analysis is that <strong>Buy & Hold typically 
                  outperforms active trading strategies</strong>, especially over the long term. Here's why:
                </p>
                <ul className="space-y-2 text-yellow-900 mb-6 text-sm">
                  <li className="flex gap-2">
                    <span className="text-yellow-600 font-bold text-xs">✓</span>
                    <div>
                      <strong>Time in the Market Beats Timing:</strong> Buy & Hold captures every day of growth.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-600 font-bold text-xs">✓</span>
                    <div>
                      <strong>Compound Growth:</strong> Every dollar compounds continuously.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-600 font-bold text-xs">✓</span>
                    <div>
                      <strong>Zero Trading Costs:</strong> Avoids commissions and slippage.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-600 font-bold text-xs">✓</span>
                    <div>
                      <strong>Emotional Simplicity:</strong> No daily stress or decisions.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-600 font-bold text-xs">✓</span>
                    <div>
                      <strong>Tax Efficiency:</strong> Long-term capital gains are taxed less.
                    </div>
                  </li>
                </ul>
                <div className="flex gap-3 bg-white/80 rounded-xl p-4 border-l-4 border-yellow-600">
                  <LightbulbIcon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                  <div className="text-sm">
                    <strong className="text-yellow-900">Key Insight:</strong>
                    <span className="text-yellow-900"> Buy & Hold often shows higher returns with fewer decisions. 
                    <strong> Patience pays.</strong></span>
                  </div>
                </div>
              </div>

              {/* Other Education Cards */}
              <div className="bg-gray-50 border-l-4 border-blue-600 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Strategy Comparison</h3>
                <div className="space-y-3 text-gray-700 leading-relaxed text-sm">
                  <p><strong className="text-blue-600">🛡️ Conservative:</strong> 65% threshold, 5-day hold, 0.45 volatility, cooldown enabled</p>
                  <p><strong className="text-blue-600">⚡ Aggressive:</strong> 52% threshold, 7-day hold, 0.65 volatility, cooldown enabled</p>
                  <p><strong className="text-red-600">🚀 Ultra:</strong> 48% threshold, 15-day hold, no volatility filter, no cooldown</p>
                </div>
              </div>

              <div className="bg-gray-50 border-l-4 border-blue-600 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Lessons</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>✓ <strong>Patience wins:</strong> Buy & Hold requires discipline</li>
                  <li>✓ <strong>Activity ≠ Profit:</strong> More trades don't mean more money</li>
                  <li>✓ <strong>Time in market:</strong> Better than timing the market</li>
                  <li>✓ <strong>Past ≠ Future:</strong> History doesn't always repeat</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">Project Philosophy</h3>
                <blockquote className="text-base italic bg-white/10 rounded-xl p-4 mb-4 text-center">
                  "The goal is not to beat the market — the goal is to understand it."
                </blockquote>
                <p className="leading-relaxed text-sm">
                  Even with ML, beating Buy & Hold in bull markets is hard. 
                  <strong> Active trading is exciting, but patience is profitable.</strong>
                </p>
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-white rounded-2xl shadow-xl p-5 mt-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">AI Trading Tutor v1.0 | Educational Platform</p>
          <button 
            onClick={() => fetchBacktest(strategyType, stockSymbol)}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            <RefreshIcon className="w-4 h-4" />
            Refresh Data
          </button>
        </footer>
      </div>
    </div>
  );
};

export default App;