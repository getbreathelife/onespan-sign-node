<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [onespan-sign-node](./onespan-sign-node.md) &gt; [SenderResource](./onespan-sign-node.senderresource.md) &gt; [setDefaultSignature](./onespan-sign-node.senderresource.setdefaultsignature.md)

## SenderResource.setDefaultSignature() method

Uploads an image to be used by a recipient as their default signature when signing a transaction.

<b>Signature:</b>

```typescript
setDefaultSignature(senderId: string, signatureImage: Buffer | Readable): Promise<void>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  senderId | string | Unique sender ID |
|  signatureImage | Buffer \| Readable | Image data to be used as the default signature |

<b>Returns:</b>

Promise&lt;void&gt;

## Remarks

- [REST API documentation (OneSpan)](https://community.onespan.com/products/onespan-sign/sandbox#/Senders/api.account.senders._senderId.signature.image.post)

