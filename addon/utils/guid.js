const GUID = /^[0-9a-f]{8}-?([0-9a-f]{4}-?){3}[0-9a-f]{12}$/i;

export function createGuid(compact = false) {
  let guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

  guid = guid.replace(/[xy]/g, c => {
    let rnd = Math.random() * 16 | 0;
    let v = c === 'x' ? rnd : (rnd & 0x3 | 0x8);
    return v.toString(16);
  });

  return compact ? compactGuid(guid) : guid;
}

export function compactGuid(guid) {
  if (!new RegExp(GUID).test(guid)) {
    return;
  }

  let g = guid.replace(/-/g, '');
  let rguid = g.substring(6, 8) + g.substring(4, 6) +
    g.substring(2, 4) + g.substring(0, 2) +
    g.substring(10, 12) + g.substring(8, 10) +
    g.substring(14, 16) + g.substring(12, 14) + g.substring(16);

  let hex = rguid
    .replace(/\r|\n/g, '')
    .replace(/([\da-fA-F]{2}) ?/g, '0x$1 ')
    .replace(/ +$/, '')
    .split(' ');

  let bytes = String.fromCharCode(...hex);
  let base64 = btoa(bytes);

  return base64.replace(/=/g, '').replace(/\//g, '_').replace(/\+/g, '-');
}

export function expandGuid(cguid) {
  if (!cguid || cguid.length !== 22) {
    return;
  }

  let base64 = `${cguid.replace(/_/g, '/').replace(/-/g, '+')}==`;
  let bytes = atob(base64);
  let g = [];

  for (let i = 0; i < bytes.length; i++) {
    let item = bytes.charCodeAt(i);
    g.push(`00${item.toString(16).toLowerCase()}`.substr(-2, 2));
  }

  return g.slice(0, 4)
    .reverse()
    .concat('-')
    .concat(g.slice(4, 6).reverse())
    .concat('-')
    .concat(g.slice(6, 8).reverse())
    .concat('-')
    .concat(g.slice(8, 10))
    .concat('-')
    .concat(g.slice(10))
    .join('');
}
