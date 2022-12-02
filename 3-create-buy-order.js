'use strict';
require("dotenv").config();
const ccxt = require('ccxt');

(async function () {
  const exchange = new ccxt.binanceus ({
    'apiKey': process.env.BINANCEUS_API_KEY,      //specify own in .env
    'secret': process.env.BINANCEUS_SECRET_KEY,   //specify own in .env
    timeout: 30000,
    enableRateLimit: true
  })
//  exchange.setSandboxMode (true)  // enable sandbox mode
  const balances = await exchange.fetchBalance();
  console.log(balances.info.balances);
}) ();
