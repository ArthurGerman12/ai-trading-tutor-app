import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FeatureComparison as FeatureComparisonType } from '../types/api';

interface FeatureComparisonProps {
  data: FeatureComparisonType;
}

interface ChartDataPoint {
  feature: string;
  winning: number;
  losing: number;
}

const FeatureComparison: React.FC<FeatureComparisonProps> = ({ data }) => {
  const chartData: ChartDataPoint[] = Object.entries(data).map(([feature, values]) => ({
    feature: feature.replace(/_/g, ' ').toUpperCase(),
    winning: values.winning,
    losing: values.losing,
  }));

  return (
    <div className="feature-comparison">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 100 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="feature" 
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="winning" fill="#059669" name="Winning Trades" />
          <Bar dataKey="losing" fill="#dc2626" name="Losing Trades" />
        </BarChart>
      </ResponsiveContainer>

      <div className="feature-insights">
        <h4>Key Insights:</h4>
        <ul>
          {Object.entries(data).map(([feature, values]) => {
            const diff = values.winning - values.losing;
            const diffPercent = ((diff / Math.abs(values.losing || 1)) * 100).toFixed(1);
            return (
              <li key={feature}>
                <strong>{feature.replace(/_/g, ' ')}:</strong> 
                {diff > 0 ? ' Higher' : ' Lower'} in winning trades 
                ({diff > 0 ? '+' : ''}{diffPercent}%)
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FeatureComparison;
