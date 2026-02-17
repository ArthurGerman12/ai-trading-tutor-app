import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BacktestResponse, TradeExplanation, TabType, StrategyType, StockSymbol } from './types/api';
import { API_BASE_URL } from './constants';
import { AlertIcon } from './components/Icons';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import StockSelector from './components/StockSelector';
import StrategySelector from './components/StrategySelector';
import OverviewTab from './components/OverviewTab';
import TradesTab from './components/TradesTab';
import FeaturesTab from './components/FeaturesTab';
import EducationTab from './components/EducationTab';
import Footer from './components/Footer';
import Tutorial from './components/Tutorial';

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
  const [showTutorial, setShowTutorial] = useState<boolean>(false);

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
        <Header onTutorialOpen={() => setShowTutorial(true)} />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[500px]">
          <StockSelector
            stockSymbol={stockSymbol}
            loading={loading}
            onStockChange={handleStockChange}
          />
          <StrategySelector
            strategyType={strategyType}
            loading={loading}
            showBuyHold={showBuyHold}
            onStrategyChange={handleStrategyToggle}
            onShowBuyHoldChange={setShowBuyHold}
          />

          {activeTab === 'overview' && (
            <OverviewTab
              backtestData={backtestData}
              strategyType={strategyType}
              showBuyHold={showBuyHold}
            />
          )}
          {activeTab === 'trades' && (
            <TradesTab
              backtestData={backtestData}
              selectedTrade={selectedTrade}
              tradeExplanation={tradeExplanation}
              onSelectTrade={fetchTradeExplanation}
            />
          )}
          {activeTab === 'features' && (
            <FeaturesTab backtestData={backtestData} />
          )}
          {activeTab === 'education' && (
            <EducationTab />
          )}
        </div>

        <Footer onRefresh={() => fetchBacktest(strategyType, stockSymbol)} />
      </div>

      {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
    </div>
  );
};

export default App;
