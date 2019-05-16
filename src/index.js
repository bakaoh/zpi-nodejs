const { URL } = require('url');
const crypto = require('crypto');
const https = require('https');
const querystring = require('querystring');

class App {
  constructor(appid, macKey, callbackKey, env = 'production') {
    this.appid = appid;
    this.macKey = macKey;
    this.callbackKey = callbackKey;
    this.env = env;
  }

  createOrder(apptransid, appuser, amount, apptime, embeddata, item, description) {
    const hmacinput = `${this.appid}|${apptransid}|${appuser}|${amount}|${apptime}|${embeddata}|${item}`;
    const mac = crypto.createHmac('SHA256', this.macKey).update(hmacinput).digest('hex');
    const postData = querystring.stringify({
      appid: this.appid, apptransid, appuser, amount, apptime, embeddata, item, description, mac
    });

    const options = {
      host: this.env === 'production' ? 'zalopay.com.vn' : 'sandbox.zalopay.com.vn',
      port: 443,
      method: 'POST',
      path: '/v001/tpe/createorder',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      }
    };

    return new Promise(((resolve, reject) => {
      const req = https.request(options, (res) => {
        let result = '';
        res.on('data', (chunk) => { result += chunk; });
        res.on('end', () => { resolve(JSON.parse(result)); });
        res.on('error', (err) => { reject(err); });
      });

      req.on('error', (err) => { reject(err); });
      req.write(postData);
      req.end();
    }));
  }
}

const genDeeplink = (orderUrl) => {
  const order = new URL(orderUrl).searchParams.get('order');
  const orderHex = Buffer.from(order, 'utf8').toString('hex');
  const gwUrl = orderUrl.includes('sbgateway.zalopay.vn')
    ? `https://dev.zalopay.co/merchantgw/pay?orderHex=${orderHex}`
    : `https://social.zalopay.vn/merchantgw/pay?orderHex=${orderHex}`;

  return `http://zalo.me/sc/${encodeURIComponent(gwUrl)}`;
};

export {
  App,
  genDeeplink
};
