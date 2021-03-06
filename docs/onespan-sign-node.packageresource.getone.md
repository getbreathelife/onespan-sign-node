<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [onespan-sign-node](./onespan-sign-node.md) &gt; [PackageResource](./onespan-sign-node.packageresource.md) &gt; [getOne](./onespan-sign-node.packageresource.getone.md)

## PackageResource.getOne() method

Retrieves a single package (transaction).

<b>Signature:</b>

```typescript
getOne(packageId: string): Promise<Package>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  packageId | string | Package ID |

<b>Returns:</b>

Promise&lt;[Package](./onespan-sign-node.package.md)<!-- -->&gt;

The package associated with the given ID.

## Remarks

- [REST API documentation (OneSpan)](https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages._packageId.get)

- [Creating a Transaction for a Sender (OneSpan)](https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/creating-transaction-sender)

