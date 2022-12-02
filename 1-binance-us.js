'use strict';
require("dotenv").config();
const ccxt = require('ccxt');
const fs = require('fs');

(async function () {
  // 1. print-all-exchanges
  // fs.writeFileSync("ccxt-exchanges.json", JSON.stringify(ccxt.exchanges))
  // const exchangeId = 'binance'
  //   , exchangeClass = ccxt[exchangeId]
  //   , exchange = new exchangeClass ({
  //     'apiKey': 'BINANCE_API_KEY',      //specify own in .env
  //     'secret': 'BINANCE_SECRET_KEY',   //specify own in .env
  //   })
  const exchangeId = 'binanceus'
    , exchangeClass = ccxt[exchangeId]
    , exchange = new exchangeClass ({
      'apiKey': process.env.BINANCEUS_API_KEY,      //specify own in .env
      'secret': process.env.BINANCEUS_SECRET_KEY,   //specify own in .env
    })

  // pulls up account balances
    console.log("Binance US", await exchange.fetchBalance())

  // 2. load-market-data
   fs.writeFileSync("binance-market-data.json", JSON.stringify(await exchange.loadMarkets()))
   const markets = require("./binance-market-data.json");
   const marketsArr = Object.keys(markets).map(market=>market)
   fs.writeFileSync("binance-markets.json", JSON.stringify(marketsArr))
  //
  // const exchangeIdUS = 'binanceus'
  //   , exchangeClass = ccxt[exchangeIdUs]
  //   , exchange = new exchangeClassUs ({
  //     'apiKey': 'BINANCE_API_KEY',      //specify own in .env
  //     'secret': 'BINANCE_SECRET_KEY',   //specify own in .env
  //   })
    // console.log("Binance US", await exchangeUS.fetchBalance())

}) ();
