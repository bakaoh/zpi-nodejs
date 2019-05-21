/* eslint-disable no-console */
const {
  App,
  genDeeplink
} = require('../lib');

const app = new App(process.env.APP_ID, process.env.APP_MAC_KEY, process.env.APP_CB_KEY, 'sandbox');
app.createOrder('190521_64101', 'ZPI', 1000, Date.now(),
  '{"deal_id": 2310,"user_id": 237949,"ref_code": "ZPI"}',
  '[{"voucher_id": 284130,"voucher_price": 1000}]',
  'Mua mã ưu đãi của BRAND')
  .then(data => console.log(genDeeplink(data.orderurl)))
  .catch(err => console.error(err));
