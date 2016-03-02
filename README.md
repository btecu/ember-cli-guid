# ember-cli-guid

Utility addon for randomly generating **GUID** / **UUID**.

The utility can also compact and expand a **GUID** into and from a **string** using base64.

A compact **GUID** is beneficial for shorter urls and for smaller transfers.


## Requirements
`compact()` and `expand()` require IE10 or polyfill for `atob` and `btoa`.


## Example
```
import Guid from 'ember-cli-guid';

let myGuid = Guid.create(); // '13ab9d6a-9aa4-40da-ae0d-21181c373e18'
let myCompactedGuid = Guid.compact(myGuid); // 'ap2rE6Sa2kCuDSEYHDc-GA'
let myExpandedGuid = Guid.expand(myCompactedGuid); // '13ab9d6a-9aa4-40da-ae0d-21181c373e18'
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
