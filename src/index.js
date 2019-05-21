const crypto = require('crypto');
const https = require('https');
const querystring = require('querystring');
const { URL } = require('url');

function App(appid, macKey, callbackKey, env = 'production') {
  this.appid = appid;
  this.macKey = macKey;
  this.callbackKey = callbackKey;
  this.env = env;
  this.baseUrl = this.env === 'production' ? 'zalopay.com.vn' : 'sandbox.zalopay.com.vn';
}

function createOrder(apptransid, appuser, amount, apptime, embeddata, item, description) {
  const hmacinput = `${this.appid}|${apptransid}|${appuser}|${amount}|${apptime}|${embeddata}|${item}`;
  const mac = crypto.createHmac('SHA256', this.macKey).update(hmacinput).digest('hex');
  const postData = querystring.stringify({
    appid: this.appid, apptransid, appuser, amount, apptime, embeddata, item, description, mac
  });

  const options = {
    host: this.baseUrl,
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

function getStatus(apptransid) {
  const hmacinput = `${this.appid}|${apptransid}|${this.macKey}`;
  const mac = crypto.createHmac('SHA256', this.macKey).update(hmacinput).digest('hex');
  const getData = querystring.stringify({
    appid: this.appid, apptransid, mac
  });

  const reqUrl = `https://${this.baseUrl}/v001/tpe/getstatusbyapptransid?${getData}`;
  return new Promise(((resolve, reject) => {
    https.get(reqUrl, (res) => {
      let result = '';
      res.on('data', (chunk) => { result += chunk; });
      res.on('end', () => { resolve(JSON.parse(result)); });
      res.on('error', (err) => { reject(err); });
    }).on('error', (err) => { reject(err); });
  }));
}

App.prototype.createOrder = createOrder;
App.prototype.getStatus = getStatus;

const genDeeplink = (orderUrl) => {
  const order = new URL(orderUrl).searchParams.get('order');
  const orderHex = Buffer.from(order, 'utf8').toString('hex');
  const gwUrl = orderUrl.includes('sbgateway.zalopay.vn')
    ? `https://dev.zalopay.co/merchantgw/pay?orderhex=${orderHex}`
    : `https://social.zalopay.vn/merchantgw/pay?orderhex=${orderHex}`;

  return `http://zalo.me/sc/${encodeURIComponent(gwUrl)}`;
};

export {
  App,
  genDeeplink
};
