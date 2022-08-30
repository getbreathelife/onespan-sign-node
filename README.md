# onespan-sign-node

Node.js library for the OneSpan Sign API. (Version 11.46)

If you wish to contribute to this project, please read the [contribution guidelines](./CONTRIBUTING.md).

## API Documentation

You can view the latest documentation [here](./docs/index.md).

## Feature Support

### [Packages (Transactions)](https://community.onespan.com/products/onespan-sign/sandbox#/Packages)
| Endpoints                                                | `GET`              | `POST`             | `PUT`              | `DELETE`           |
|----------------------------------------------------------|--------------------|--------------------|--------------------|--------------------|
| `/api/packages`                                          | :white_check_mark: | :white_check_mark: | -                  | -                  |
| `/api/packages/{packageId}`                              | :white_check_mark: | -                  | :white_check_mark: | :white_check_mark: |
| `/api/packages/{packageId}/audit`                        | :white_check_mark: | -                  | -                  | -                  |
| `/api/packages/{packageId}/clone`                        | -                  | :x:                | -                  | -                  |
| `/api/packages/{packageId}/evidence/summary`             | :white_check_mark: | -                  | -                  | -                  |
| `/api/packages/{packageId}/fieldSummary`                 | :x:                | -                  | -                  | -                  |
| `/api/packages/{packageId}/referencedConditions`         | :x:                | -                  | -                  | -                  |
| `/api/packages/{packageId}/signers/{signerId}/approvals` | :x:                | -                  | -                  | -                  |
| `/api/packages/{packageId}/signingStatus`                | :x:                | -                  | -                  | -                  |

### [Documents](https://community.onespan.com/products/onespan-sign/sandbox#/Documents)
| Endpoints                                                        | `GET`              | `POST`              | `PUT` | `DELETE`           |
|------------------------------------------------------------------|--------------------|---------------------|-------|--------------------|
| `/api/packages/{packageId}/documents`                            | -                  | :white_check_mark:  | :x:   | :white_check_mark: |
| `/api/packages/{packageId}/documents/zip`                        | :white_check_mark: | -                   | -     | -                  |
| `/api/packages/{packageId}/documents/signConfirm`                | -                  | :x:                 | -     | -                  |
| `/api/packages/{packageId}/documents/signed_documents`           | -                  | :x:                 | -     | -                  |
| `/api/packages/{packageId}/documents/visibility`                 | :white_check_mark: | :white_check_mark:  | -     | -                  |
| `/api/packages/{packageId}/documents/{documentId}`               | :white_check_mark: | :white_check_mark:  | :x:   | :white_check_mark: |
| `/api/packages/{packageId}/documents/{documentId}/original`      | :white_check_mark: | -                   | -     | -                  |
| `/api/packages/{packageId}/documents/{documentId}/pdf`           | :white_check_mark: | -                   | -     | -                  |
| `/api/packages/{packageId}/documents/{documentId}/layout`        | -                  | :x:                 | -     | -                  |
| `/api/packages/{packageId}/documents/{documentId}/pages/{index}` | :white_check_mark: | -                   | -     | -                  |

### [Senders](https://community.onespan.com/products/onespan-sign/sandbox#/Senders)
| Endpoints                                         | `GET`              | `POST`             | `PUT` | `DELETE`           |
|---------------------------------------------------|--------------------|--------------------|-------|--------------------|
| `/api/account/senders`                            | :white_check_mark: | :white_check_mark: | -     | -                  |
| `/api/account/senders/{senderId}`                 | :white_check_mark: | :x:                | -     | :white_check_mark: |
| `/api/account/senders/{senderId}/invite`          | -                  | :white_check_mark: | -     | -                  |
| `/api/account/senders/{senderId}/password`        | -                  | :x:                | -     | -                  |
| `/api/account/senders/{senderId}/resetpassword`   | -                  | :x:                | -     | -                  |
| `/api/account/senders/{senderId}/signature/image` | :white_check_mark: | :white_check_mark: | -     | :white_check_mark: |

### [Callback](https://community.onespan.com/products/onespan-sign/sandbox#/Callback)
| Endpoints                                         | `GET`              | `POST`             | `PUT` | `DELETE` |
|---------------------------------------------------|--------------------|--------------------|-------|----------|
| `/api/callback`                                   | :white_check_mark: | :white_check_mark: | -     | -        |
| `/api/callback/connectors/{origin}`               | :x:                | :x:                | -     | -        |

Any other resources not mentioned in this document are currently **unsupported**.

## Tests

### Unit tests using [Jest](https://jestjs.io/)

Run `yarn test` from the project root.

### Manual tests using REPL

To start in repl mode run `yarn repl`. This will start an interactive repl, in which you can invoke and test the OneSpanSign class

**Example**

```sh
// Step 1: Start repl
yarn repl

// Step 2: Test code
> console.log(OneSpanSign)
```


