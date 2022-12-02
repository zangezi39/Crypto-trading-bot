'use strict';
require("dotenv").config();
const ccxt = require('ccxt');

console.log('CCXT Version:', ccxt version)

async function main () {

  const exchange = new ccxt.kraken ({
    'enable rate limit': true,
    "apiKey": process.env.KRAKEN_API_KEY,
    "secret": process.env.KRAKEN_SECRET_KEY,
  })

  console.log('-----------------------------------------------------')

  console.log('Loading markets...')
  const market = await exchange.loadMarkets()
  console.log('Markets loaded')

  //exchange.verbose = true  // uncomment for debugging purposes

  try {

    const symbol = 'BTC/USD'
      , market = exchange.market(symbol)
      , { base, quote } = market
      , type = 'market'
      , amount = market['limits']['amount']['min']
      , price = undefined
      ,  params = {
          'leverage': 2,
      }

    console.log('-----------------------------------------------------')

    // https://www.kraken.com/en-us/features/api#add-standard-order
    console.log('Placing order...');
    let order = await exchange.createOrder (symbol, type, 'buy', amount, price, params);
    console.log('Order placed:');
    console.log(order);

    console.log('-----------------------------------------------------')

    // https://www.kraken.com/en-us/features/api#get-open-positions
    console.log('Fetching open positions...');
    const positionsParams = { 'docalcs': true };
    let openPositions = await exchange.fetchPositions(positionsParams);
    console.log('Current positions:');
    console.log(openPositions);

    console.log('-----------------------------------------------------')


  }
}
