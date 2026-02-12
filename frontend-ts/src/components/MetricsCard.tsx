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
    if (metric === 'total_return') return value > 0 ? 'positive' : 'negative';
    if (metric === 'max_drawdown') return 'negative';
    if (metric === 'sharpe_ratio') return value > 1 ? 'positive' : value > 0 ? 'neutral' : 'negative';
    return '';
  };

  return (
    <div className={`metrics-card ${type}`}>
      <h3>{title}</h3>
      <div className="metrics-list">
        <div className="metric-item">
          <span className="metric-label">Total Return</span>
          <span className={`metric-value ${getColorClass(metrics.total_return, 'total_return')}`}>
            {formatPercent(metrics.total_return)}
          </span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Max Drawdown</span>
          <span className={`metric-value ${getColorClass(metrics.max_drawdown, 'max_drawdown')}`}>
            {formatPercent(metrics.max_drawdown)}
          </span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Sharpe Ratio</span>
          <span className={`metric-value ${getColorClass(metrics.sharpe_ratio, 'sharpe_ratio')}`}>
            {metrics.sharpe_ratio.toFixed(2)}
          </span>
        </div>
        {metrics.num_trades && (
          <div className="metric-item">
            <span className="metric-label">Number of Trades</span>
            <span className="metric-value">{metrics.num_trades}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;
