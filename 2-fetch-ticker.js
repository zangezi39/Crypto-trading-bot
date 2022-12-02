const ccxt = require ('ccxt');

(async function() {
  // all public functions - no need for API key

  // 0. can switch between multiple exchanges
  // const exchange = new ccxt.binance();
  // or
  const exchange = new ccxt.binanceus();
  // const exchange = new ccxt.coinbasepro();

  // 1. fetch ticker from exchange
  const ticker = await exchange.fetchTicker("MATIC/USDT");
  console.log(ticker);

  // 2. ohlcv
  const ohlc = await exchange.fetchOHLCV("MATIC/USDT", '4h', undefined, 8);

  ohlc.forEach(candle=> {
    console.log(candle)
  });


})();
