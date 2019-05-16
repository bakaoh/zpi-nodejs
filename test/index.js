import { assert } from 'chai';
import { genDeeplink } from '../src';

describe('genDeeplink', () => {
  it('should generate valid sandbox deeplink', () => {
    const orderUrl = 'https://sbgateway.zalopay.vn/openinapp?order=eyJ6cHRyYW5zdG9rZW4iOiJlSVV5ZTFuLUpqRUlWb1JJcC1XdEdRIiwiYXBwaWQiOjU4N30';
    const got = genDeeplink(orderUrl);
    const want = 'http://zalo.me/sc/https%3A%2F%2Fdev.zalopay.co%2Fmerchantgw%2Fpay%3ForderHex%3D65794a36634852795957357a644739725a5734694f694a6c535656355a5446754c55707152556c5762314a4a63433158644564524969776959584277615751694f6a55344e3330';
    assert.equal(want, got);
  });

  it('should generate valid production deeplink', () => {
    const orderUrl = 'https://gateway.zalopay.vn/openinapp?order=eyJ6cHRyYW5zdG9rZW4iOiJlSVV5ZTFuLUpqRUlWb1JJcC1XdEdRIiwiYXBwaWQiOjU4N30';
    const got = genDeeplink(orderUrl);
    const want = 'http://zalo.me/sc/https%3A%2F%2Fsocial.zalopay.vn%2Fmerchantgw%2Fpay%3ForderHex%3D65794a36634852795957357a644739725a5734694f694a6c535656355a5446754c55707152556c5762314a4a63433158644564524969776959584277615751694f6a55344e3330';
    assert.equal(want, got);
  });
});
