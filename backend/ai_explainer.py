def explain_trade(trade):
    f = trade["features"]
    pnl = trade["pnl"]

    explanations = []

    # --- Trend explanation ---
    if f["ma_ratio"] > 1.01:
        explanations.append(
            "Price was clearly above its 20-day moving average, which signals an upward trend."
        )
    elif f["ma_ratio"] > 1.0:
        explanations.append(
            "Price was slightly above its 20-day moving average, giving a weak bullish signal."
        )
    else:
        explanations.append(
            "Price was below its 20-day moving average, which weakens the bullish case."
        )

    # --- Momentum ---
    if f["return_5d"] > 0 and f["return_20d"] > 0:
        explanations.append(
            "Both short-term and medium-term returns were positive, indicating upward momentum."
        )
    elif f["return_5d"] < 0:
        explanations.append(
            "Recent short-term returns were negative, suggesting fragile momentum."
        )

    # --- RSI ---
    if f["rsi"] > 70:
        explanations.append(
            "RSI was high, meaning the market may have been overbought and vulnerable to pullbacks."
        )
    elif f["rsi"] < 30:
        explanations.append(
            "RSI was low, suggesting the market may have been oversold."
        )

    # --- Volatility / risk ---
    if f["volatility_20d"] > 0.4:
        explanations.append(
            "Recent volatility was elevated, increasing the risk of sudden price swings."
        )
    else:
        explanations.append(
            "Volatility was relatively low, which usually supports trend-following strategies."
        )

    # --- Outcome reflection ---
    if pnl > 0:
        explanations.append(
            "The trade ended profitably, meaning the bullish conditions persisted during the holding period."
        )
    else:
        explanations.append(
            "The trade lost money, showing that even strong bullish signals can fail in uncertain markets."
        )

    explanations.append(
        "This highlights that trading signals are probabilistic, not guarantees."
    )

    return " ".join(explanations)


def explain_trade_comparison(win_trade, lose_trade):
    wf = win_trade["features"]
    lf = lose_trade["features"]

    explanation = []

    explanation.append("COMPARISON OF A WINNING VS LOSING TRADE:\n")

    if wf["ma_ratio"] > lf["ma_ratio"]:
        explanation.append(
            "The winning trade entered with price further above its moving average, "
            "indicating a stronger underlying trend."
        )

    if wf["return_5d"] > lf["return_5d"]:
        explanation.append(
            "Short-term momentum was stronger in the winning trade."
        )

    if lf["rsi"] > 70:
        explanation.append(
            "The losing trade entered when RSI was high, suggesting overbought conditions."
        )

    if lf["volatility_20d"] > wf["volatility_20d"]:
        explanation.append(
            "The losing trade faced higher volatility, increasing the chance of adverse moves."
        )

    explanation.append(
        "This comparison shows that successful trades tend to occur during stable trends, "
        "while losing trades often happen when momentum is stretched or volatility is elevated."
    )

    return " ".join(explanation)


def explain_max_drawdown(peak_date, trough_date, drawdown_value, trades):
    explanation = []

    explanation.append(
        f"The maximum drawdown occurred between {peak_date.date()} and {trough_date.date()}."
    )

    explanation.append(
        f"During this period, the portfolio declined by approximately {abs(drawdown_value):.1%} from its previous peak."
    )

    losing_trades = [t for t in trades if t["pnl"] <= 0]
    winning_trades = [t for t in trades if t["pnl"] > 0]

    explanation.append(
        f"There were {len(trades)} trades during this drawdown period, "
        f"with {len(losing_trades)} losing trades and {len(winning_trades)} winning trades."
    )

    if len(losing_trades) > len(winning_trades):
        explanation.append(
            "Losses dominated this period, which caused the portfolio to steadily decline."
        )
    else:
        explanation.append(
            "Even though some trades were profitable, losses outweighed gains during this period."
        )

    explanation.append(
        "This drawdown illustrates that consecutive small losses can be more damaging than a single large loss."
    )

    explanation.append(
        "The key lesson is that drawdowns are inevitable in probabilistic systems, "
        "and strategies must be designed so users can emotionally and financially survive them."
    )

    return " ".join(explanation)
