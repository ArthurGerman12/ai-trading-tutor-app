import React, { useState } from 'react';
import axios from 'axios';
import { Trade, TradeExplanation } from '../types/api';

const API_BASE_URL = 'http://localhost:8000';

interface TradesListProps {
  trades: Trade[];
  onSelectTrade: (index: number) => void;
  selectedTrade: number | null;
}

const TradesList: React.FC<TradesListProps> = ({ trades, onSelectTrade, selectedTrade }) => {
  const [expandedTrade, setExpandedTrade] = useState<number | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loadingExplanation, setLoadingExplanation] = useState<boolean>(false);

  const handleExplainClick = async (index: number) => {
    // If clicking the same trade, collapse it
    if (expandedTrade === index) {
      setExpandedTrade(null);
      setExplanation(null);
      return;
    }

    // Expand the new trade
    setExpandedTrade(index);
    setLoadingExplanation(true);
    onSelectTrade(index);

    try {
      const response = await axios.get<TradeExplanation>(
        `${API_BASE_URL}/api/trades/${index}/explain`
      );
      setExplanation(response.data.explanation);
    } catch (err) {
      console.error('Failed to fetch trade explanation:', err);
      setExplanation('Failed to load explanation. Please try again.');
    } finally {
      setLoadingExplanation(false);
    }
  };

  return (
    <div className="trades-table-container">
      <table className="trades-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Entry Date</th>
            <th>Exit Date</th>
            <th>Entry Price</th>
            <th>Exit Price</th>
            <th>P&L</th>
            <th>Probability</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, index) => (
            <React.Fragment key={index}>
              <tr 
                className={`${trade.pnl > 0 ? 'winning-trade' : 'losing-trade'} ${
                  selectedTrade === index ? 'selected' : ''
                } ${expandedTrade === index ? 'expanded' : ''}`}
              >
                <td>{index + 1}</td>
                <td>{new Date(trade.entry_date).toLocaleDateString()}</td>
                <td>{new Date(trade.exit_date).toLocaleDateString()}</td>
                <td>${trade.entry_price.toFixed(2)}</td>
                <td>${trade.exit_price.toFixed(2)}</td>
                <td className={trade.pnl > 0 ? 'positive' : 'negative'}>
                  {(trade.pnl * 100).toFixed(2)}%
                </td>
                <td>{(trade.bullish_prob * 100).toFixed(1)}%</td>
                <td>
                  <button 
                    className={`explain-btn ${expandedTrade === index ? 'active' : ''}`}
                    onClick={() => handleExplainClick(index)}
                  >
                    {expandedTrade === index ? '▲ Hide' : '▼ Explain'}
                  </button>
                </td>
              </tr>
              
              {/* Dropdown explanation row */}
              {expandedTrade === index && (
                <tr className="explanation-row">
                  <td colSpan={8}>
                    <div className="explanation-dropdown">
                      {loadingExplanation ? (
                        <div className="explanation-loading">
                          <div className="small-spinner"></div>
                          <span>Loading explanation...</span>
                        </div>
                      ) : (
                        <div className="explanation-content">
                          <div className="explanation-header">
                            <h4>🤖 AI Analysis</h4>
                            <div className="trade-summary">
                              <span className="summary-item">
                                <strong>Entry:</strong> {new Date(trade.entry_date).toLocaleDateString()}
                              </span>
                              <span className="summary-item">
                                <strong>Exit:</strong> {new Date(trade.exit_date).toLocaleDateString()}
                              </span>
                              <span className="summary-item">
                                <strong>Result:</strong> 
                                <span className={trade.pnl > 0 ? 'positive' : 'negative'}>
                                  {(trade.pnl * 100).toFixed(2)}%
                                </span>
                              </span>
                            </div>
                          </div>
                          <div className="explanation-text">
                            {explanation}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradesList;