import React from 'react';
import { Metrics } from '../types/api';

interface MetricsCardProps {
  title: string;
  metrics: Metrics;
  type: 'strategy' | 'baseline';
}

const MetricsCard: React.FC<MetricsCardProps> = ({ title, metrics, type }) => {
  const formatPercent = (value: number): string => {
    return `${(value * 100).toFixed(2)}%`;
  };

  const getColorClass = (value: number, metric: string): string => {
    if (metric === 'total_return') return value > 0 ? 'text-green-600' : 'text-red-600';
    if (metric === 'max_drawdown') return 'text-red-600';
    if (metric === 'sharpe_ratio') return value > 1 ? 'text-green-600' : value > 0 ? 'text-yellow-600' : 'text-red-600';
    return 'text-gray-900';
  };

  const borderColor = type === 'strategy' ? 'border-blue-600' : 'border-green-600';
  const accentBg = type === 'strategy' ? 'bg-blue-600' : 'bg-green-600';

  return (
    <div className={`rounded-xl border-2 ${borderColor} overflow-hidden`}>
      {/* Header */}
      <div className={`${accentBg} px-5 py-3`}>
        <h3 className="text-white font-bold text-base">{title}</h3>
      </div>

      {/* Metrics */}
      <div className="divide-y divide-gray-100">
        <div className="flex items-center justify-between px-5 py-4">
          <span className="text-sm text-gray-600">Total Return</span>
          <span className={`text-lg font-bold font-mono ${getColorClass(metrics.total_return, 'total_return')}`}>
            {formatPercent(metrics.total_return)}
          </span>
        </div>
        <div className="flex items-center justify-between px-5 py-4">
          <span className="text-sm text-gray-600">Max Drawdown</span>
          <span className={`text-lg font-bold font-mono ${getColorClass(metrics.max_drawdown, 'max_drawdown')}`}>
            {formatPercent(metrics.max_drawdown)}
          </span>
        </div>
        <div className="flex items-center justify-between px-5 py-4">
          <span className="text-sm text-gray-600">Sharpe Ratio</span>
          <span className={`text-lg font-bold font-mono ${getColorClass(metrics.sharpe_ratio, 'sharpe_ratio')}`}>
            {metrics.sharpe_ratio.toFixed(2)}
          </span>
        </div>
        {metrics.num_trades != null && (
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-sm text-gray-600">Number of Trades</span>
            <span className="text-lg font-bold font-mono text-gray-900">
              {metrics.num_trades}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;
