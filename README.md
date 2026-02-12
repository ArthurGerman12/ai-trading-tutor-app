# 📈 AI Trading Tutor - React Web Application

> Transform your Python stock analysis scripts into a beautiful, interactive web application

![Status](https://img.shields.io/badge/status-ready-green)
![Python](https://img.shields.io/badge/python-3.8+-blue)
![React](https://img.shields.io/badge/react-18.2-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-green)

## 🎯 What is This?

This project transforms your educational stock market AI programs into a full-stack web application. Instead of running Python scripts manually and viewing matplotlib charts, you now have:

- **Beautiful React Dashboard** - Interactive, professional UI
- **Real-time Analysis** - Click buttons to run backtests
- **AI Explanations** - Understand every trade with detailed explanations
- **Performance Metrics** - Visual comparison of strategies
- **Educational Focus** - Learn market behavior, not just make predictions

## ✨ Features

### 📊 Interactive Dashboard
- Live equity curve charts comparing ML strategy vs Buy & Hold
- Performance metrics cards with beautiful gradients
- Trade-by-trade analysis with sortable tables

### 🤖 AI Explanations
- Click any trade to get detailed AI-generated explanations
- Understand why trades won or lost
- Learn about market conditions and risk factors

### 📈 Feature Analysis
- Visual comparison of features in winning vs losing trades
- Feature importance rankings
- Educational insights about market indicators

### 🎓 Learning Module
- Maximum drawdown explanations
- Strategy logic breakdown
- Key lessons about probabilistic trading

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User's Browser                        │
│              http://localhost:3000                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTP/JSON
                     │
┌────────────────────▼────────────────────────────────────┐
│                  React Frontend                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Components:                                     │   │
│  │  - EquityCurveChart (Recharts)                   │   │
│  │  - MetricsCard                                   │   │
│  │  - TradesList                                    │   │
│  │  - FeatureComparison                             │   │
│  │  - FeatureImportance                             │   │
│  └──────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ REST API Calls
                     │
┌────────────────────▼────────────────────────────────────┐
│                 FastAPI Backend                          │
│              http://localhost:8000                       │
│  ┌──────────────────────────────────────────────────┐   │
│  │  API Endpoints:                                  │   │
│  │  GET /api/backtest                               │   │
│  │  GET /api/trades/{id}/explain                    │   │
│  │  GET /api/trades/compare                         │   │
│  │  GET /api/feature-importance                     │   │
│  └──────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Uses Your Scripts
                     │
┌────────────────────▼────────────────────────────────────┐
│              Your Python ML Engine                       │
│  ┌──────────────────────────────────────────────────┐   │
│  │  - dataset_builder.py                            │   │
│  │  - train_trend_model.py                          │   │
│  │  - backtest_strategy.py                          │   │
│  │  - ai_explainer.py                               │   │
│  │  - feature_importance.py                         │   │
│  └──────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Downloads Data
                     │
┌────────────────────▼────────────────────────────────────┐
│                Yahoo Finance API                         │
│              (via yfinance library)                      │
└─────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### Option 1: Automatic Startup (Recommended)

**On macOS/Linux:**
```bash
./start.sh
```

**On Windows:**
```cmd
start.bat
```

This will:
1. ✅ Check prerequisites
2. 📦 Install dependencies
3. 🚀 Start both servers
4. 🌐 Open your browser automatically

### Option 2: Manual Startup

**Terminal 1 - Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm start
```

### Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Documentation:** http://localhost:8000/docs

## 📸 Screenshots

### Overview Dashboard
Shows equity curve, performance metrics, and trade summary at a glance.

### Trades Analysis
Detailed table of all trades with AI explanations available on-click.

### Feature Insights
Visual comparison of technical indicators in winning vs losing trades.

### Learning Module
Educational content about strategy logic and market behavior.

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern, fast Python web framework
- **Pandas** - Data manipulation
- **scikit-learn** - Machine learning models
- **yfinance** - Stock market data
- **uvicorn** - ASGI server

### Frontend
- **React** - UI library
- **Recharts** - Interactive charts
- **Axios** - HTTP client
- **CSS3** - Custom styling with gradients

## 📊 What Changed from Your Original Scripts?

Your original scripts worked great but:
- ❌ Required manual execution
- ❌ Showed matplotlib charts (not interactive)
- ❌ Printed results to console
- ❌ No way to share or deploy

Now you have:
- ✅ **Web API** - Accessible from anywhere
- ✅ **Interactive Charts** - Hover, zoom, compare
- ✅ **JSON Responses** - Can integrate with other tools
- ✅ **Professional UI** - Shareable with others
- ✅ **On-demand Execution** - Click to run analysis

**Your original logic is 100% preserved** - we just wrapped it in a modern web interface!

## 🎓 Educational Use Cases

This platform is perfect for:

1. **Learning Market Behavior**
   - See how different market conditions affect strategies
   - Understand why trades succeed or fail

2. **Strategy Development**
   - Test different parameters
   - Compare multiple approaches
   - Learn from backtesting results

3. **Risk Management Education**
   - Understand drawdowns
   - See probability vs certainty
   - Learn position sizing effects

4. **Teaching Others**
   - Share the dashboard with students
   - Interactive demonstrations
   - Real data, safe environment

## ⚙️ Customization

### Change Stock Symbol
Edit `backend/dataset_builder.py`:
```python
dataset = build_dataset("AAPL")  # Any ticker symbol
```

### Adjust Strategy Parameters
Edit `backend/backtest_strategy.py`:
```python
INITIAL_CAPITAL = 10_000
THRESHOLD = 0.65  # Entry probability threshold
HOLD_DAYS = 5     # Holding period
```

### Modify Features
Edit `backend/train_trend_model.py`:
```python
FEATURE_COLUMNS = [
    "return_5d",
    "return_20d",
    "ma_ratio",
    # Add or remove features
]
```

## 🐛 Troubleshooting

### Backend won't start
- Check Python version: `python --version` (need 3.8+)
- Activate virtual environment
- Install dependencies: `pip install -r requirements.txt`

### Frontend shows connection error
- Ensure backend is running on port 8000
- Check CORS settings in `backend/main.py`
- Clear browser cache

### Charts not loading
- Check browser console (F12)
- Verify data is being returned from `/api/backtest`
- Check network tab for failed requests

### Slow initial load
- First run downloads several years of stock data
- This is normal and only happens once
- Subsequent runs use cached model and data

## 📈 Future Enhancements

Potential additions:
- [ ] Multiple stock symbol comparison
- [ ] User accounts and saved strategies
- [ ] Real-time data updates
- [ ] More chart types (candlesticks, volume)
- [ ] Strategy parameter optimizer
- [ ] Export results to PDF/Excel
- [ ] Mobile-responsive improvements
- [ ] Dark mode theme

## ⚠️ Disclaimer

**EDUCATIONAL USE ONLY**

This platform is designed to teach market behavior and trading concepts. It is:
- ❌ NOT financial advice
- ❌ NOT a guaranteed profit system
- ❌ NOT for real money trading

Remember: **"The goal is not to beat the market — the goal is to understand it."**

## 📝 License

This project wraps your existing educational stock analysis scripts. Please maintain the educational-only license.

## 🤝 Contributing

This is your personal project! Feel free to:
- Add new features
- Improve the UI
- Add more analysis tools
- Share with the educational community

## 📧 Support

For issues:
1. Check the SETUP_GUIDE.md
2. Review browser console errors
3. Check backend terminal output
4. Verify all dependencies are installed

---

**Built with ❤️ to make financial education accessible and interactive**

*Happy Learning! 📚📈*
