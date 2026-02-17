import React from 'react';
import { TrophyIcon, LightbulbIcon } from './Icons';

const EducationTab: React.FC = () => {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-4 border-blue-600">
        Understanding the Results
      </h2>

      {/* Buy & Hold Card */}
      <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 border-l-4 border-yellow-600 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-yellow-900 mb-4 flex items-center gap-2">
          <TrophyIcon className="w-6 h-6" />
          The Power of Buy & Hold: Why Patience Wins
        </h3>
        <p className="text-yellow-900 mb-4 leading-relaxed text-sm">
          One of the most important lessons from this analysis is that <strong>Buy & Hold typically
          outperforms active trading strategies</strong>, especially over the long term. Here's why:
        </p>
        <ul className="space-y-2 text-yellow-900 mb-6 text-sm">
          <li className="flex gap-2">
            <span className="text-yellow-600 font-bold text-xs">{'\u2713'}</span>
            <div>
              <strong>Time in the Market Beats Timing:</strong> Buy & Hold captures every day of growth.
            </div>
          </li>
          <li className="flex gap-2">
            <span className="text-yellow-600 font-bold text-xs">{'\u2713'}</span>
            <div>
              <strong>Compound Growth:</strong> Every dollar compounds continuously.
            </div>
          </li>
          <li className="flex gap-2">
            <span className="text-yellow-600 font-bold text-xs">{'\u2713'}</span>
            <div>
              <strong>Zero Trading Costs:</strong> Avoids commissions and slippage.
            </div>
          </li>
          <li className="flex gap-2">
            <span className="text-yellow-600 font-bold text-xs">{'\u2713'}</span>
            <div>
              <strong>Emotional Simplicity:</strong> No daily stress or decisions.
            </div>
          </li>
          <li className="flex gap-2">
            <span className="text-yellow-600 font-bold text-xs">{'\u2713'}</span>
            <div>
              <strong>Tax Efficiency:</strong> Long-term capital gains are taxed less.
            </div>
          </li>
        </ul>
        <div className="flex gap-3 bg-white/80 rounded-xl p-4 border-l-4 border-yellow-600">
          <LightbulbIcon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
          <div className="text-sm">
            <strong className="text-yellow-900">Key Insight:</strong>
            <span className="text-yellow-900"> Buy & Hold often shows higher returns with fewer decisions.
            <strong> Patience pays.</strong></span>
          </div>
        </div>
      </div>

      {/* Strategy Comparison Card */}
      <div className="bg-gray-50 border-l-4 border-blue-600 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Strategy Comparison</h3>
        <div className="space-y-3 text-gray-700 leading-relaxed text-sm">
          <p><strong className="text-blue-600">{'\ud83d\udee1\ufe0f'} Conservative:</strong> 65% threshold, 5-day hold, 0.45 volatility, cooldown enabled</p>
          <p><strong className="text-blue-600">{'\u26a1'} Aggressive:</strong> 52% threshold, 7-day hold, 0.65 volatility, cooldown enabled</p>
          <p><strong className="text-red-600">{'\ud83d\ude80'} Ultra:</strong> 48% threshold, 15-day hold, no volatility filter, no cooldown</p>
        </div>
      </div>

      {/* Key Lessons Card */}
      <div className="bg-gray-50 border-l-4 border-blue-600 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Key Lessons</h3>
        <ul className="space-y-2 text-gray-700 text-sm">
          <li>{'\u2713'} <strong>Patience wins:</strong> Buy & Hold requires discipline</li>
          <li>{'\u2713'} <strong>Activity {'\u2260'} Profit:</strong> More trades don't mean more money</li>
          <li>{'\u2713'} <strong>Time in market:</strong> Better than timing the market</li>
          <li>{'\u2713'} <strong>Past {'\u2260'} Future:</strong> History doesn't always repeat</li>
        </ul>
      </div>

      {/* Philosophy Card */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4">Project Philosophy</h3>
        <blockquote className="text-base italic bg-white/10 rounded-xl p-4 mb-4 text-center">
          "The goal is not to beat the market — the goal is to understand it."
        </blockquote>
        <p className="leading-relaxed text-sm">
          Even with ML, beating Buy & Hold in bull markets is hard.
          <strong> Active trading is exciting, but patience is profitable.</strong>
        </p>
      </div>
    </section>
  );
};

export default EducationTab;
