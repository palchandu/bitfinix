
const request = require('request')
const crypto = require('crypto')

const apiKey = '0NXUtXRog6vanl7lRT20tzHQvFitd9yDA4lEKp9wrnd'
const apiSecret = 'kPNrnloB2ZtbuQ0u6UT9Tnkisw1zizlRPY36dP9vn58'
const baseUrl = 'https://api.bitfinex.com'

const url = '/v1/order/new'
const nonce = Date.now().toString()
const completeURL = baseUrl + url
const body = {
  request: url,
  nonce: nonce,
  symbol: 'BTCUSD',
  amount: '0.3',
  price: '1000',
  exchange: 'bitfinex',
  side: 'sell',
  type: 'exchange market'

}
const payload = new Buffer(JSON.stringify(body))
	.toString('base64')

const signature = crypto
  .createHmac('sha384', apiSecret)
  .update(payload)
  .digest('hex')

  var data = {
    
    symbol: 'BTCUSD',
    amount: '0.3',
    price: '1000',
    exchange: 'bitfinex',
    side: 'sell',
    type: 'exchange market'
 }
const options = {
  url: completeURL,
  headers: {
    'X-BFX-APIKEY': apiKey,
    'X-BFX-PAYLOAD': payload,
    'X-BFX-SIGNATURE': signature
  },
  body: JSON.stringify(body)
}

return request.post(
  options,
  function(error, response, body) {
    console.log('response:', JSON.stringify(body, 0, 2))
  }
)