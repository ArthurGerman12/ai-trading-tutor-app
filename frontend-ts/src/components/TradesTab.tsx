import React from 'react';
import { BacktestResponse, TradeExplanation } from '../types/api';
import TradesList from './TradesList';
import { LightbulbIcon } from './Icons';

interface TradesTabProps {
  backtestData: BacktestResponse;
  selectedTrade: number | null;
  tradeExplanation: TradeExplanation | null;
  onSelectTrade: (index: number) => void;
}

const TradesTab: React.FC<TradesTabProps> = ({
  backtestData,
  selectedTrade,
  tradeExplanation,
  onSelectTrade,
}) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-4 border-blue-600">
        All Trades
      </h2>

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
          <div className="bg-white rounded-xl p-5 border-l-4 border-blue-600">
            <p className="text-gray-700 leading-relaxed">{tradeExplanation.explanation}</p>
          </div>
        </div>
      )}

      <TradesList
        trades={backtestData.trades}
        onSelectTrade={onSelectTrade}
        selectedTrade={selectedTrade}
      />
    </section>
  );
};

export default TradesTab;
