// Copyright 2019-2023 @polkadot/wasm-util authors & contributors
// SPDX-License-Identifier: Apache-2.0

// Use an array for our indexer - this is faster than using map access. In
// this case we assume ASCII-only inputs, so we cannot overflow the array
const CHR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/' as const;
const map = new Array<number>(256);

// We use charCodeAt for access here and in the decoder loop - this is faster
// on lookups (array + numbers) and also faster than accessing the specific
// character via data[i]
for (let i = 0, count = CHR.length; i < count; i++) {
  map[CHR.charCodeAt(i)] = i;
}

/**
 * @name base64Decode
 * @description
 * A base64 decoding function that operates in all environments. Unlike decoding
 * from Buffer (Node.js only) or atob (browser-only) this implementation is
 * slightly slower, but it is platform independent.
 *
 * For our usage, since we have access to the static final size, so we decode
 * to a specified output buffer. This also means we have applied a number of
 * optimizations based on this - checking output position instead of chars.
 */
export function base64Decode (data: string, out: Uint8Array): Uint8Array {
  let byte = 0;
  let bits = 0;
  let pos = -1;

  for (let i = 0, last = out.length - 1; pos !== last; i++) {
    // each character represents 6 bits
    byte = (byte << 6) | map[data.charCodeAt(i)];

    // each byte needs to contain 8 bits
    if ((bits += 6) >= 8) {
      out[++pos] = (byte >>> (bits -= 8)) & 0xff;
    }
  }

  return out;
}
