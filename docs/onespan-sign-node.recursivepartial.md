<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [onespan-sign-node](./onespan-sign-node.md) &gt; [RecursivePartial](./onespan-sign-node.recursivepartial.md)

## RecursivePartial type

Recursively make properties in `T` optional

<b>Signature:</b>

```typescript
export declare type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};
```
<b>References:</b> [RecursivePartial](./onespan-sign-node.recursivepartial.md)

