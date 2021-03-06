<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [onespan-sign-node](./onespan-sign-node.md) &gt; [Requests](./onespan-sign-node.requests.md) &gt; [BulkCreateDocumentData](./onespan-sign-node.requests.bulkcreatedocumentdata.md)

## Requests.BulkCreateDocumentData interface

Request payload for each entry in the bulk create document operations.

<b>Signature:</b>

```typescript
export interface BulkCreateDocumentData 
```

## Remarks

Only [\`name\`](./onespan-sign-node.requests.bulkcreatedocumentdata.name.md) is required. See:

- [REST API documentation](https://community.onespan.com/products/onespan-sign/sandbox#/Documents/api.packages._packageId.documents.post)

- [Uploading &amp; Deleting Documents](https://community.onespan.com/documentation/onespan-sign/guides/feature-guides/developer/uploading-deleting-documents) (Uploading Multiple Documents)

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [approvals?](./onespan-sign-node.requests.bulkcreatedocumentdata.approvals.md) | [RecursivePartial](./onespan-sign-node.recursivepartial.md)<!-- -->&lt;[DocumentApproval](./onespan-sign-node.documentapproval.md)<!-- -->&gt;\[\] | <i>(Optional)</i> |
|  [data?](./onespan-sign-node.requests.bulkcreatedocumentdata.data.md) | Record&lt;string, any&gt; | <i>(Optional)</i> Custom data that is passed through. |
|  [description?](./onespan-sign-node.requests.bulkcreatedocumentdata.description.md) | string | <i>(Optional)</i> Document description |
|  [documentBody](./onespan-sign-node.requests.bulkcreatedocumentdata.documentbody.md) | DocumentBody | Data and filename of the document |
|  [external?](./onespan-sign-node.requests.bulkcreatedocumentdata.external.md) | Partial&lt;External&gt; | <i>(Optional)</i> |
|  [extract?](./onespan-sign-node.requests.bulkcreatedocumentdata.extract.md) | boolean | <i>(Optional)</i> Enable/disable extraction on the document |
|  [extractionTypes?](./onespan-sign-node.requests.bulkcreatedocumentdata.extractiontypes.md) | [ExtractionType](./onespan-sign-node.extractiontype.md)<!-- -->\[\] | <i>(Optional)</i> Types of extraction for this document. |
|  [fields?](./onespan-sign-node.requests.bulkcreatedocumentdata.fields.md) | [RecursivePartial](./onespan-sign-node.recursivepartial.md)<!-- -->&lt;[DocumentField](./onespan-sign-node.documentfield.md)<!-- -->&gt;\[\] | <i>(Optional)</i> Document fields |
|  [id?](./onespan-sign-node.requests.bulkcreatedocumentdata.id.md) | string | <i>(Optional)</i> Document ID |
|  [index?](./onespan-sign-node.requests.bulkcreatedocumentdata.index.md) | number | <i>(Optional)</i> Document index |
|  [name](./onespan-sign-node.requests.bulkcreatedocumentdata.name.md) | string | Document name |
|  [pages?](./onespan-sign-node.requests.bulkcreatedocumentdata.pages.md) | [RecursivePartial](./onespan-sign-node.recursivepartial.md)<!-- -->&lt;[DocumentPage](./onespan-sign-node.documentpage.md)<!-- -->&gt;\[\] | <i>(Optional)</i> |
|  [signedHash?](./onespan-sign-node.requests.bulkcreatedocumentdata.signedhash.md) | string | <i>(Optional)</i> |
|  [signerVerificationToken?](./onespan-sign-node.requests.bulkcreatedocumentdata.signerverificationtoken.md) | string | <i>(Optional)</i> |
|  [size?](./onespan-sign-node.requests.bulkcreatedocumentdata.size.md) | number | <i>(Optional)</i> Document data size |
|  [status?](./onespan-sign-node.requests.bulkcreatedocumentdata.status.md) | string | <i>(Optional)</i> Document status |
|  [tagged?](./onespan-sign-node.requests.bulkcreatedocumentdata.tagged.md) | boolean | <i>(Optional)</i> |

