'use strict';
require("dotenv").config();
const ccxt = require('ccxt');
const fs = require('fs');

(async function () {
  const exchange = new ccxt.bitstamp ({
    'apiKey': process.env.BITSTAMP_API_KEY,      //specify own in .env
    'secret': process.env.BITSTAMP_SECRET_KEY,   //specify own in .env
    timeout: 30000,
    enableRateLimit: true
  })
  const balances = await exchange.fetchBalance();
  console.log(balances);


  // const exchangeId = 'binanceus'
  //   , exchangeClass = ccxt[exchangeId]
  //   , exchange = new exchangeClass ({
  //     'apiKey': process.env.BINANCEUS_API_KEY,      //specify own in .env
  //     'secret': process.env.BINANCEUS_SECRET_KEY,   //specify own in .env
  //   })
  //
  // // pulls up account balances
  //   console.log("Binance US", await exchange.fetchBalance())

  // 2. load-market-data
   fs.writeFileSync("bitstamp-market-data.json", JSON.stringify(await exchange.loadMarkets()))
   const markets = require("./bitstamp-market-data.json");
   const marketsArr = Object.keys(markets).map(market=>market)
   fs.writeFileSync("bitstamp-markets.json", JSON.stringify(marketsArr))

}) ();
