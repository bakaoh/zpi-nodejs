/* eslint-disable no-console */
const {
  App,
  genDeeplink
} = require('../lib');

const app = new App(process.env.APP_ID, process.env.APP_MAC_KEY, process.env.APP_CB_KEY, 'sandbox');
app.createOrder('190513_64101f51', 'ZPI', 1000, Date.now(), '', '', '')
  .then(data => console.log(genDeeplink(data.orderurl)))
  .catch(err => console.error(err));
