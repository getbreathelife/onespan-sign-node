<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [onespan-sign-node](./onespan-sign-node.md) &gt; [PackageResource](./onespan-sign-node.packageresource.md) &gt; [getAll](./onespan-sign-node.packageresource.getall.md)

## PackageResource.getAll() method

Retrieves all packages (transactions).

<b>Signature:</b>

```typescript
getAll(params?: Requests.GetAllPackagesParameters): Promise<Responses.BulkGetResponse<Package>>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  params | Requests.GetAllPackagesParameters | Additional parameters for the query |

<b>Returns:</b>

Promise&lt;Responses.BulkGetResponse&lt;[Package](./onespan-sign-node.package.md)<!-- -->&gt;&gt;

A payload that contains the result count and an array of the matched packages.

## Remarks

- [REST API documentation (OneSpan)](https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages.get)

- [Retrieving a List of Transactions (OneSpan)](https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/retrieving-list-transactions)

