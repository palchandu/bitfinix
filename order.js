'use strict'

const BFX = require('bitfinex-api-node') 

const CREDENTIALS_REST = 
	{"API_KEY": '0NXUtXRog6vanl7lRT20tzHQvFitd9yDA4lEKp9wrnd',
	 "API_SECRET": 'kPNrnloB2ZtbuQ0u6UT9Tnkisw1zizlRPY36dP9vn58' };
const CREDENTIALS_WS = 
	{"API_KEY": '0NXUtXRog6vanl7lRT20tzHQvFitd9yDA4lEKp9wrnd',
	 "API_SECRET": 'kPNrnloB2ZtbuQ0u6UT9Tnkisw1zizlRPY36dP9vn58' };
	 

const brest = new BFX({ apiKey: '0NXUtXRog6vanl7lRT20tzHQvFitd9yDA4lEKp9wrnd', apiSecret: 'kPNrnloB2ZtbuQ0u6UT9Tnkisw1zizlRPY36dP9vn58' }).rest
const bws = new BFX({ apiKey: '0NXUtXRog6vanl7lRT20tzHQvFitd9yDA4lEKp9wrnd', apiSecret: 'kPNrnloB2ZtbuQ0u6UT9Tnkisw1zizlRPY36dP9vn58' }).ws

const TIME_PROGRAM_STARTED = Date.now()
const ONE_DAY_IN_MS = 86400000 

const PAYLOAD = 
	{"start":TIME_PROGRAM_STARTED - ONE_DAY_IN_MS,
	"end": TIME_PROGRAM_STARTED, 
	"limit":25} /* If you try and request more than 25 then the API will return "invalid" */

brest.makeAuthRequest("/auth/r/orders/hist", PAYLOAD, function (ERROR, REPLY) {
    if (ERROR) {
    	console.log(ERROR)
    	return 
    }
    console.log(REPLY)
})

bws.on('open', () => {
	bws.auth();
})

bws.on('message', (msg) => {
    const CHANNEL_NUMBER = msg[0];
    if(0 == CHANNEL_NUMBER){
        /* It's an unhandled message from an authenticated channel  */
 		console.log(msg);
		
        return;
    }
})

bws.on('error', console.error);