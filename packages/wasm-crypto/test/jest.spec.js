// Copyright 2019-2022 @polkadot/wasm-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @jest-environment jsdom
 */

// override-require in jest.config.js

import { beforeAll, tests, wasm } from './all/index.cjs';

describe('wasm-crypto', () => {
  beforeEach(async () => {
    await beforeAll();
  });

  Object.keys(tests).forEach((name) => {
    it(name, () => tests[name](wasm));
  });
});
