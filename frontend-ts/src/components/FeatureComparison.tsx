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
    <div className="space-y-6">
      {/* Chart */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 100 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="feature"
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
              tick={{ fontSize: 11 }}
            />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Legend />
            <Bar dataKey="winning" fill="#059669" name="Winning Trades" radius={[6, 6, 0, 0]} />
            <Bar dataKey="losing" fill="#dc2626" name="Losing Trades" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="bg-green-50 border-l-4 border-green-600 rounded-xl p-5">
        <h4 className="text-base font-bold text-gray-900 mb-3">Key Insights:</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          {Object.entries(data).map(([feature, values]) => {
            const diff = values.winning - values.losing;
            const diffPercent = ((diff / Math.abs(values.losing || 1)) * 100).toFixed(1);
            return (
              <li key={feature} className="flex gap-2">
                <span className={`font-bold ${diff > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {diff > 0 ? '\u2191' : '\u2193'}
                </span>
                <span>
                  <strong className="capitalize">{feature.replace(/_/g, ' ')}:</strong>{' '}
                  {diff > 0 ? 'Higher' : 'Lower'} in winning trades ({diff > 0 ? '+' : ''}{diffPercent}%)
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FeatureComparison;
