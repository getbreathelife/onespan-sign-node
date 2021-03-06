<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [onespan-sign-node](./onespan-sign-node.md) &gt; [DocumentResource](./onespan-sign-node.documentresource.md) &gt; [updateVisibilityInfo](./onespan-sign-node.documentresource.updatevisibilityinfo.md)

## DocumentResource.updateVisibilityInfo() method

Updates information about which recipients can view specific documents in a package during a Signing Ceremony.

<b>Signature:</b>

```typescript
updateVisibilityInfo(packageId: string, payload: RecursivePartial<DocumentVisibility>): Promise<DocumentVisibility>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  packageId | string | Package ID |
|  payload | [RecursivePartial](./onespan-sign-node.recursivepartial.md)<!-- -->&lt;[DocumentVisibility](./onespan-sign-node.documentvisibility.md)<!-- -->&gt; | Updated document visibility information |

<b>Returns:</b>

Promise&lt;[DocumentVisibility](./onespan-sign-node.documentvisibility.md)<!-- -->&gt;

Document visibility information

## Remarks

- [REST API documentation (OneSpan)](https://community.onespan.com/products/onespan-sign/sandbox#/Documents/api.packages._packageId.documents.visibility.post)

