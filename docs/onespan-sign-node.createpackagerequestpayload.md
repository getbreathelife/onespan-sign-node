<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [onespan-sign-node](./onespan-sign-node.md) &gt; [CreatePackageRequestPayload](./onespan-sign-node.createpackagerequestpayload.md)

## CreatePackageRequestPayload interface

Request payload for package creation operations.

<b>Signature:</b>

```typescript
export interface CreatePackageRequestPayload 
```

## Remarks

Request payload should at least contain ['name'](./onespan-sign-node.createpackagerequestpayload.name.md) property. See [REST API documentation](https://community.onespan.com/products/onespan-sign/sandbox#/Packages/api.packages.post) for more information.

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [autocomplete?](./onespan-sign-node.createpackagerequestpayload.autocomplete.md) | boolean | <i>(Optional)</i> |
|  [bulkSendable?](./onespan-sign-node.createpackagerequestpayload.bulksendable.md) | boolean | <i>(Optional)</i> |
|  [completed?](./onespan-sign-node.createpackagerequestpayload.completed.md) | string | <i>(Optional)</i> |
|  [consent?](./onespan-sign-node.createpackagerequestpayload.consent.md) | string | <i>(Optional)</i> |
|  [created?](./onespan-sign-node.createpackagerequestpayload.created.md) | string | <i>(Optional)</i> |
|  [data?](./onespan-sign-node.createpackagerequestpayload.data.md) | Record&lt;string, any&gt; | <i>(Optional)</i> |
|  [description?](./onespan-sign-node.createpackagerequestpayload.description.md) | string | <i>(Optional)</i> |
|  [documents?](./onespan-sign-node.createpackagerequestpayload.documents.md) | [DocumentMetadata](./onespan-sign-node.documentmetadata.md)<!-- -->\[\] | <i>(Optional)</i> |
|  [due?](./onespan-sign-node.createpackagerequestpayload.due.md) | string | <i>(Optional)</i> |
|  [emailMessage?](./onespan-sign-node.createpackagerequestpayload.emailmessage.md) | string | <i>(Optional)</i> |
|  [id?](./onespan-sign-node.createpackagerequestpayload.id.md) | string | <i>(Optional)</i> |
|  [language?](./onespan-sign-node.createpackagerequestpayload.language.md) | string | <i>(Optional)</i> |
|  [limits?](./onespan-sign-node.createpackagerequestpayload.limits.md) | PackageArtifactsLimits | <i>(Optional)</i> |
|  [messages?](./onespan-sign-node.createpackagerequestpayload.messages.md) | [Message](./onespan-sign-node.message.md)<!-- -->\[\] | <i>(Optional)</i> |
|  [name](./onespan-sign-node.createpackagerequestpayload.name.md) | string |  |
|  [notarized?](./onespan-sign-node.createpackagerequestpayload.notarized.md) | boolean | <i>(Optional)</i> |
|  [notaryRoleId?](./onespan-sign-node.createpackagerequestpayload.notaryroleid.md) | string | <i>(Optional)</i> |
|  [roles?](./onespan-sign-node.createpackagerequestpayload.roles.md) | Role\[\] | <i>(Optional)</i> |
|  [sender?](./onespan-sign-node.createpackagerequestpayload.sender.md) | Sender | <i>(Optional)</i> |
|  [settings?](./onespan-sign-node.createpackagerequestpayload.settings.md) | PackageSettings | <i>(Optional)</i> |
|  [signedDocumentDelivery?](./onespan-sign-node.createpackagerequestpayload.signeddocumentdelivery.md) | SignedDocumentDelivery | <i>(Optional)</i> |
|  [status?](./onespan-sign-node.createpackagerequestpayload.status.md) | [PackageStatus](./onespan-sign-node.packagestatus.md) | <i>(Optional)</i> |
|  [timezoneId?](./onespan-sign-node.createpackagerequestpayload.timezoneid.md) | string | <i>(Optional)</i> |
|  [trashed?](./onespan-sign-node.createpackagerequestpayload.trashed.md) | boolean | <i>(Optional)</i> |
|  [type?](./onespan-sign-node.createpackagerequestpayload.type.md) | [PackageType](./onespan-sign-node.packagetype.md) | <i>(Optional)</i> |
|  [updated?](./onespan-sign-node.createpackagerequestpayload.updated.md) | string | <i>(Optional)</i> |
|  [visibility?](./onespan-sign-node.createpackagerequestpayload.visibility.md) | [PackageVisibility](./onespan-sign-node.packagevisibility.md) | <i>(Optional)</i> |
