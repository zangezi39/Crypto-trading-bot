'use strict';
require("dotenv").config();
const ccxt = require('ccxt');

(async function () {
  const exchange = new ccxt.binanceus ({
    'apiKey': process.env.BINANCEUS_API_KEY,      //specify in .env
    'secret': process.env.BINANCEUS_SECRET_KEY,   //specify in .env
    tid : 'us',
    timeout: 30000,
    enableRateLimit: true
  })

//  exchange.set_sandbox_mode(true);

//  exchange.verbose = true  // uncomment for debugging purposes
//   // check query methods available on the exchange
//   console.log(exchange.has);
//
// //  exchange.setSandboxMode (true)  // enable sandbox mode
  const balances = await exchange.fetchBalance();
  console.log(await exchange.fetchBalance());
//
//   const ticker = await exchange.fetchTicker("MATIC/USD");
//   console.log(ticker);
//
//   // ohlcv
//   const ohlc = await exchange.fetchOHLCV("MATIC/USD", '4h', undefined, 12);
//
//   ohlc.forEach(candle=> {
//     console.log(candle)
//   });
//
//   // fetch order fetchOrderBook
  // console.log(await exchange.fetchOrderBook("MATIC/USD"));

  try {

    const symbol = "MATIC/USD"
      , market = exchange.market(symbol)
      , { base, quote } = market
      ,type = 'market' // 'market' or 'limit'
//    const timeInForce = 'GTC' // 'GTC', 'IOC', 'FOK', 'PO'
//      , side = 'buy' // 'buy' or 'sell'
      , amount = 5
      , price = undefined
      , params = {}
    // console.log(market);

    console.log('-----------------------------------------------------')

    console.log('Placing order...');
    const order = await exchange.createOrder(symbol, type, 'buy', amount, price, params);
    console.log('Order placed:');
    console.log(order);

    console.log('-----------------------------------------------------')

    console.log('Fetching open positions...');
    const positionsParams = { 'docalcs': true };
    let openPositions = await exchange.fetchPositions(positionsParams);
    console.log('Current positions:');
    console.log(openPositions);

    console.log('-----------------------------------------------------')

    console.log('Fetching balance...');
    let balance = await exchange.fetchTotalBalance();
    console.log('Fetched balance:');
    console.log(base, balance[MATIC]);
    console.log(quote, balance[USD]);

    console.log('-----------------------------------------------------')
    //
    // console.log('Closing the position...');
    // order = await exchange.createOrder(symbol, type, 'sell', amount, rice, params);
    // console.log('Got a response:');
    // console.log(order);
    //
    // console.log('-----------------------------------------------------')
    //
    // console.log('Fetching balance...');
    // let balance = await exchange.fetchTotalBalance();
    // console.log('Fetched balance:');
    // console.log(base, balance[base], '(base)');
    // console.log(quote, balance[quote], '(quote)');


  } catch (err) {
     console.log('Transaction failed...')
     console.log('Error message:', err.message)
  }

}) ();
