import React, { useState, useMemo } from 'react';
import { BacktestResponse, TradeExplanation, IndexedTrade, TradeFilter } from '../types/api';
import TradesList from './TradesList';
import TradePriceChart from './TradePriceChart';
import { LightbulbIcon, TrendingUpIcon, AlertIcon } from './Icons';

interface TradesTabProps {
  backtestData: BacktestResponse;
  selectedTrade: number | null;
  tradeExplanation: TradeExplanation | null;
  onSelectTrade: (index: number) => void;
}

const FILTER_OPTIONS: { value: TradeFilter; label: (count: number) => string; icon: React.FC<{ className?: string }> }[] = [
  { value: 'all', label: (n) => `All Trades (${n})`, icon: LightbulbIcon },
  { value: 'best', label: () => 'Best 10', icon: TrendingUpIcon },
  { value: 'worst', label: () => 'Worst 10', icon: AlertIcon },
];

const TradesTab: React.FC<TradesTabProps> = ({
  backtestData,
  selectedTrade,
  tradeExplanation,
  onSelectTrade,
}) => {
  const [tradeFilter, setTradeFilter] = useState<TradeFilter>('all');

  const strategy = backtestData.strategy_type || 'conservative';
  const symbol = backtestData.symbol || 'SPY';

  const filteredTrades: IndexedTrade[] = useMemo(() => {
    const indexed = backtestData.trades.map((trade, i) => ({ originalIndex: i, trade }));

    if (tradeFilter === 'best') {
      return [...indexed].sort((a, b) => b.trade.pnl - a.trade.pnl).slice(0, 10);
    } else if (tradeFilter === 'worst') {
      return [...indexed].sort((a, b) => a.trade.pnl - b.trade.pnl).slice(0, 10);
    }
    return indexed;
  }, [backtestData.trades, tradeFilter]);

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-4 border-blue-600">
        All Trades
      </h2>

      {/* Filter buttons */}
      <div className="flex gap-2 mb-5">
        {FILTER_OPTIONS.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setTradeFilter(value)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tradeFilter === value
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label(backtestData.trades.length)}
          </button>
        ))}
      </div>

      {/* Explanation card — shown above the table when a trade is selected */}
      {tradeExplanation && (
        <div className="mb-6 bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
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
          <div className="bg-white rounded-xl p-5 border-l-4 border-blue-600 whitespace-pre-line">
            <p className="text-gray-700 leading-relaxed">{tradeExplanation.explanation}</p>
          </div>

          {/* Price chart */}
          <TradePriceChart trade={tradeExplanation.trade} symbol={symbol} />
        </div>
      )}

      <TradesList
        trades={filteredTrades}
        onSelectTrade={onSelectTrade}
        selectedTrade={selectedTrade}
        strategy={strategy}
        symbol={symbol}
      />
    </section>
  );
};

export default TradesTab;
