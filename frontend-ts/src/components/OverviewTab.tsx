import React from 'react';
import { BacktestResponse, StrategyType } from '../types/api';
import MetricsCard from './MetricsCard';
import EquityCurveChart from './EquityCurveChart';

interface OverviewTabProps {
  backtestData: BacktestResponse;
  strategyType: StrategyType;
  showBuyHold: boolean;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ backtestData, strategyType, showBuyHold }) => {
  return (
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
  );
};

export default OverviewTab;
