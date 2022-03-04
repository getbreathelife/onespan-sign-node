<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [onespan-sign-node](./onespan-sign-node.md) &gt; [DocumentResource](./onespan-sign-node.documentresource.md) &gt; [getMetadata](./onespan-sign-node.documentresource.getmetadata.md)

## DocumentResource.getMetadata() method

Retrieves metadata related to a given document.

<b>Signature:</b>

```typescript
getMetadata(packageId: string, documentId: string): Promise<DocumentMetadata>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  packageId | string | Package ID |
|  documentId | string | Document ID |

<b>Returns:</b>

Promise&lt;[DocumentMetadata](./onespan-sign-node.documentmetadata.md)<!-- -->&gt;

Metadata of the document

## Remarks

- [REST API documentation (OneSpan)](https://community.onespan.com/products/onespan-sign/sandbox#/Documents/api.packages._packageId.documents._documentId.get)
