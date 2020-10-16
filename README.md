# ember-cli-guid

Utility addon for randomly generating **GUID** / **UUID**.

The utility can also compact and expand a **GUID** into and from a **string** using base64.

A compact **GUID** is beneficial for shorter urls and for smaller transfers.


## Example
```
import { compactGuid, createGuid, expandGuid } from 'ember-cli-guid';

let myGuid = createGuid(); // '13ab9d6a-9aa4-40da-ae0d-21181c373e18'
let myCompactedGuid = compactGuid(myGuid); // 'ap2rE6Sa2kCuDSEYHDc-GA'
let myExpandedGuid = expandGuid(myCompactedGuid); // '13ab9d6a-9aa4-40da-ae0d-21181c373e18'
```

Note: `createGuid` can return a compact **GUID**:
```
createGuid(true); // 'kFy4uun_BkaUdbSGYW1PYQ'
```


## Serverside Use (C#)
A compacted **GUID** can be easily expanded:
```
new Guid(Convert.FromBase64String(input.Replace("_", "/").Replace("-", "+") + "=="));
```

Similarly, a **GUID** can be compacted:
```
Convert.ToBase64String(input.ToByteArray()).Substring(0, 22).Replace("/", "_").Replace("+", "-");
```
