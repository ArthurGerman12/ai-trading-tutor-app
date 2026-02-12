import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FeatureImportance as FeatureImportanceType, FeatureImportanceResponse } from '../types/api';

const API_BASE_URL = 'http://localhost:8000';

interface ChartDataPoint {
  name: string;
  value: number;
  coefficient: number;
}

const FeatureImportance: React.FC = () => {
  const [data, setData] = useState<FeatureImportanceType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeatureImportance = async (): Promise<void> => {
      try {
        const response = await axios.get<FeatureImportanceResponse>(`${API_BASE_URL}/api/feature-importance`);
        setData(response.data.features);
      } catch (err) {
        console.error('Failed to fetch feature importance:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatureImportance();
  }, []);

  if (loading) {
    return <div className="loading">Loading feature importance...</div>;
  }

  if (!data) {
    return <div className="error">Failed to load feature importance</div>;
  }

  const chartData: ChartDataPoint[] = data.map(f => ({
    name: f.name.replace(/_/g, ' ').toUpperCase(),
    value: f.abs_importance,
    coefficient: f.coefficient
  }));

  const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

  return (
    <div className="feature-importance">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 100 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
          />
          <YAxis label={{ value: 'Importance', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Bar dataKey="value" name="Importance">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="feature-table">
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Coefficient</th>
              <th>Importance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((feature, index) => (
              <tr key={index}>
                <td>{feature.name.replace(/_/g, ' ')}</td>
                <td className={feature.coefficient > 0 ? 'positive' : 'negative'}>
                  {feature.coefficient.toFixed(4)}
                </td>
                <td>{feature.abs_importance.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="interpretation">
        <h4>How to Interpret:</h4>
        <ul>
          <li><strong>Positive coefficient:</strong> Higher values increase bullish probability</li>
          <li><strong>Negative coefficient:</strong> Higher values decrease bullish probability</li>
          <li><strong>Importance:</strong> Absolute value shows feature's overall impact on predictions</li>
        </ul>
      </div>
    </div>
  );
};

export default FeatureImportance;
