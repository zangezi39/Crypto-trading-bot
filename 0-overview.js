'use strict';
require("dotenv").config();
const ccxt = require('ccxt');

(async function () {
  let kraken = new ccxt.kraken()
  let bitfinex = new ccxt.bitfinex ({ verbose: true })
  let huobipro = new ccxt.huobipro ()

  const exchangeId = 'binanceus'
    , exchangeClass = ccxt[exchangeId]
    , exchange = new exchangeClass ({
      'apiKey': process.env.BINANCEUS_API_KEY,      //specify own in .env
      'secret': process.env.BINANCEUS_SECRET_KEY,   //specify own in .env
    })

  console.log (kraken.id, await kraken.loadMarkets ())
  console.log (bitfinex.id, await bitfinex.loadMarkets ())
  console.log (huobipro.id, await huobipro.loadMarkets ())

  console.log (kraken.id, await kraken.fetchOrderBook (kraken.symbols[0]))
  console.log (bitfinex.id, await bitfinex.fetchTicker ('BTC/USD'))
  console.log (huobipro.id, await huobipro.fetchTrades ('ETH/USDT'))

  // pass/redefine custom exchange-specific order prams: type, amount, price or whatever
  // use a custom order type
  bitfinex.createLimitSellOrder ('BTC/USD', 1, 10, { 'type': 'trailing-stop' })

}) ();
