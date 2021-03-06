<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [onespan-sign-node](./onespan-sign-node.md) &gt; [DocumentResource](./onespan-sign-node.documentresource.md) &gt; [bulkCreate](./onespan-sign-node.documentresource.bulkcreate.md)

## DocumentResource.bulkCreate() method

Uploads multiple documents to an existing package.

<b>Signature:</b>

```typescript
bulkCreate(packageId: string, documents: Requests.BulkCreateDocumentData[]): Promise<DocumentMetadata[]>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  packageId | string | Package ID |
|  documents | Requests.BulkCreateDocumentData\[\] | Metadata and data of the to-be-uploaded documents |

<b>Returns:</b>

Promise&lt;[DocumentMetadata](./onespan-sign-node.documentmetadata.md)<!-- -->\[\]&gt;

Metadata of the uploaded documents

## Remarks

- [REST API documentation (OneSpan)](https://community.onespan.com/products/onespan-sign/sandbox#/Documents/api.packages._packageId.documents.post)

- [Uploading &amp; Deleting Documents (OneSpan)](https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/uploading-deleting-documents)

