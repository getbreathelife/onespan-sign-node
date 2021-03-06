<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [onespan-sign-node](./onespan-sign-node.md) &gt; [Requests](./onespan-sign-node.requests.md) &gt; [GetAllPackagesParameters](./onespan-sign-node.requests.getallpackagesparameters.md)

## Requests.GetAllPackagesParameters interface

Request parameters for the get all packages operation. The parameters will be appended to the URL when the API request is made.

<b>Signature:</b>

```typescript
export interface GetAllPackagesParameters 
```

## Remarks

See [REST API documentation (OneSpan)](https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages.get)

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [dir?](./onespan-sign-node.requests.getallpackagesparameters.dir.md) | 'asc' \| 'desc' | <i>(Optional)</i> The direction according to which the data will be sorted. 'asc' for ascending and 'desc' for descending. |
|  [fields?](./onespan-sign-node.requests.getallpackagesparameters.fields.md) | 'id' | <i>(Optional)</i> Currently, "id" is the only available value. This means that only ID will be returned in each array node. |
|  [from?](./onespan-sign-node.requests.getallpackagesparameters.from.md) | number | <i>(Optional)</i> The first record that will be returned. Useful for pagination. |
|  [lastUpdatedEndDate?](./onespan-sign-node.requests.getallpackagesparameters.lastupdatedenddate.md) | Date \| string | <i>(Optional)</i> The date before which packages need to have been last updated in order to be retrieved. |
|  [lastUpdatedStartDate?](./onespan-sign-node.requests.getallpackagesparameters.lastupdatedstartdate.md) | Date \| string | <i>(Optional)</i> The date after which packages need to have been last updated in order to be retrieved. |
|  [ownerEmail?](./onespan-sign-node.requests.getallpackagesparameters.owneremail.md) | string | <i>(Optional)</i> The transaction owner's email address. Indicate the target user to search on. |
|  [ownerUserId?](./onespan-sign-node.requests.getallpackagesparameters.owneruserid.md) | string | <i>(Optional)</i> The transaction owner's ID. Indicate the target user to search on. |
|  [predefined?](./onespan-sign-node.requests.getallpackagesparameters.predefined.md) | 'all' \| 'awaitingSignature' \| 'sent' \| 'completed' \| 'expiringSoon' | <i>(Optional)</i> Filter the search result, by package status. |
|  [query?](./onespan-sign-node.requests.getallpackagesparameters.query.md) | 'drafts' \| 'inbox' \| 'trashed' | <i>(Optional)</i> The folder to search for. If not set, it will search in all folders except trashed. |
|  [search?](./onespan-sign-node.requests.getallpackagesparameters.search.md) | string | <i>(Optional)</i> Any text which is going to be used in conjunction with the [searchtype](./onespan-sign-node.requests.getallpackagesparameters.searchtype.md) if provided. |
|  [searchtype?](./onespan-sign-node.requests.getallpackagesparameters.searchtype.md) | 'exact' \| 'exactname' | <i>(Optional)</i> When empty, a wildcard search will be done in the package name and description for the search value, otherwise the allowable values will make more restrictive searches. |
|  [sort?](./onespan-sign-node.requests.getallpackagesparameters.sort.md) | 'created' \| 'completed' \| 'updated' \| 'due' \| 'name' \| 'status' | <i>(Optional)</i> The field according to which the data will be sorted. |
|  [to?](./onespan-sign-node.requests.getallpackagesparameters.to.md) | number | <i>(Optional)</i> The last record that will be returned. Useful for pagination. |
|  [type?](./onespan-sign-node.requests.getallpackagesparameters.type.md) | 'TEMPLATE' | <i>(Optional)</i> If a template is needed, set to <code>TEMPLATE</code> |
|  [visibility?](./onespan-sign-node.requests.getallpackagesparameters.visibility.md) | [PackageVisibility](./onespan-sign-node.packagevisibility.md) | <i>(Optional)</i> The visibility used to search for the template. ONLY used for templates. |

