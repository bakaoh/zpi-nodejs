const url = require('url');

const createOrder = () => {
};

const genDeeplink = (orderUrl) => {
  const order = new url.URL(orderUrl).searchParams.get('order');
  const orderHex = Buffer.from(order, 'utf8').toString('hex');
  const gwUrl = orderUrl.includes('sbgateway.zalopay.vn')
    ? `https://dev.zalopay.co/merchantgw/pay?orderHex=${orderHex}`
    : `https://social.zalopay.vn/merchantgw/pay?orderHex=${orderHex}`;

  return `http://zalo.me/sc/${encodeURIComponent(gwUrl)}`;
};

export {
  createOrder,
  genDeeplink
};
