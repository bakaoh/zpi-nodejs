# ZPI NODEJS

[![Build Status](https://travis-ci.org/bakaoh/zpi-nodejs.svg?branch=master)](https://travis-ci.org/bakaoh/zpi-nodejs) [![npm version](https://badge.fury.io/js/zpi-nodejs.svg)](https://badge.fury.io/js/zpi-nodejs) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Usage

1. Install package

```bash
$ npm i zpi-nodejs
```

2. Create order ([Detail](https://developers.zalopay.vn/docs/merchant/index.html#d-n-hang-co-kich-th-c-nh))

```node
const { App } = require('zpi-nodejs');
const app = new App(appid, macKey, callbackKey);
const data = await app.createOrder(apptransid, appuser, amount, apptime, embeddata, item, description);
```

3. Generate deeplink

```node
const { genDeeplink } = require('zpi-nodejs');
genDeeplink(data.orderUrl);
```

3. Open deeplink from client
